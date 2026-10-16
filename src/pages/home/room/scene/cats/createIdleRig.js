/** 为确认过的静态网格添加原地动作与地面步态；独立克隆几何和材质，不改 GLTF 缓存。 */
import { Box3, Group, Mesh, Vector3, MeshDepthMaterial, RGBADepthPacking } from 'three';
import { addStandingPose } from './locomotion/standingPose.js';

export function createIdleRig(scene) {
  scene.updateMatrixWorld(true);
  const root = new Group();
  const uniforms = {
    uCatHead: { value: 0 }, uCatBreath: { value: 0 },
    uCatBlink: { value: 0 }, uCatTail: { value: 0 },
    uCatStand: { value: 0 }, uCatGait: { value: 0 }, uCatPhase: { value: 0 },
  };
  scene.traverse((node) => {
    if (!node.isMesh) return;
    const geometry = node.geometry.clone().applyMatrix4(node.matrixWorld);
    const material = node.material.clone();
    const eye = node.parent.name.startsWith('cat-eye-');
    const tail = node.name.startsWith('cat-tail');
    addStandingPose(geometry, tail);
    const eyeY = eye ? new Box3().setFromObject(node.parent).getCenter(new Vector3()).y : 0;
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms, { uCatEye: { value: eye ? 1 : 0 }, uCatEyeY: { value: eyeY }, uCatIsTail: { value: tail ? 1 : 0 } });
      shader.vertexShader = `attribute vec3 catStandingPosition, catStandingNormal;\nuniform float uCatHead, uCatBreath, uCatBlink, uCatTail, uCatEye, uCatEyeY, uCatIsTail, uCatStand, uCatGait, uCatPhase;\n` + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <beginnormal_vertex>', `
        #include <beginnormal_vertex>
        objectNormal = normalize(mix(objectNormal, catStandingNormal, uCatStand));
        float catAngle = uCatHead * smoothstep(0.48, 0.70, position.y);
        mat2 catTurn = mat2(cos(catAngle), -sin(catAngle), sin(catAngle), cos(catAngle));
        objectNormal.xz = catTurn * objectNormal.xz;
      `);
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
        #include <begin_vertex>
        if (uCatEye > 0.5) transformed.y = uCatEyeY + (transformed.y - uCatEyeY) * (1.0 - 0.94 * uCatBlink);
        float chest = smoothstep(0.16, 0.32, position.y) * (1.0 - smoothstep(0.46, 0.62, position.y));
        transformed.x *= 1.0 + uCatBreath * chest;
        float poseAngle = uCatHead * smoothstep(0.48, 0.70, position.y);
        mat2 poseTurn = mat2(cos(poseAngle), -sin(poseAngle), sin(poseAngle), cos(poseAngle));
        transformed.xz = poseTurn * (transformed.xz - vec2(0.0, 0.08)) + vec2(0.0, 0.08);
        // 使用腹部离地、后腿展开的独立站姿，原坐姿只在停留时恢复。
        transformed += uCatStand * (catStandingPosition - position);
        if (uCatIsTail < 0.5) {
          float leg = (1.0 - smoothstep(0.13, 0.32, position.y)) * smoothstep(0.045, 0.10, abs(position.x));
          float frontLeg = step(0.06, position.z);
          float side = step(0.0, position.x);
          // 四足错开落脚；支撑相向后，摆动相抬爪前送，步幅与世界位移配套。
          float cycle = fract(uCatPhase + side * 0.5 + frontLeg * 0.25);
          float swing = clamp((cycle - 0.6) / 0.4, 0.0, 1.0);
          float offset = cycle < 0.6 ? 0.09 - 0.18 * cycle / 0.6 : -0.09 + 0.18 * swing;
          transformed.z += leg * uCatStand * uCatGait * offset;
          transformed.y += leg * uCatStand * uCatGait * sin(swing * 3.14159265) * 0.055;
        }
        if (uCatIsTail > 0.5) transformed.x += uCatTail * smoothstep(-0.25, 0.22, position.z);
      `);
    };
    material.customProgramCacheKey = () => 'q-cat-ground-v3';
    const mesh = new Mesh(geometry, material);
    mesh.name = node.name;
    mesh.customDepthMaterial = new MeshDepthMaterial({ depthPacking: RGBADepthPacking });
    mesh.customDepthMaterial.onBeforeCompile = material.onBeforeCompile;
    mesh.customDepthMaterial.customProgramCacheKey = () => 'q-cat-ground-depth-v3';
    // 头部轮廓仅小幅移动；脚底接触阴影由身体和地面保持稳定。
    mesh.castShadow = true; mesh.receiveShadow = true;
    geometry.computeBoundingSphere(); geometry.boundingSphere.radius += 0.55;
    root.add(mesh);
  });
  root.position.y = -new Box3().setFromObject(root).min.y;
  return {
    root,
    update(pose) {
      uniforms.uCatHead.value = pose.head; uniforms.uCatBreath.value = pose.breath;
      uniforms.uCatBlink.value = pose.blink; uniforms.uCatTail.value = pose.tail;
      uniforms.uCatStand.value = pose.stand ?? 0; uniforms.uCatGait.value = pose.gait ?? 0;
      uniforms.uCatPhase.value = pose.phase ?? 0;
    },
    dispose() { root.children.forEach((mesh) => { mesh.geometry.dispose(); mesh.material.dispose(); mesh.customDepthMaterial.dispose(); }); },
  };
}
