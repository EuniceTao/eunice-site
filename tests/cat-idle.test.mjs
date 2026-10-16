/** 原地动作回归：动作边界、独立资源、爪底/根节点稳定与阴影同步。 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Box3 } from 'three';
import { createIdleRig } from '../src/pages/home/room/scene/cats/createIdleRig.js';
import { catIdlePose } from '../src/pages/home/room/scene/cats/catIdlePose.js';

test('poses remain bounded, blink briefly, and use different rhythms', () => {
  let differences = 0;
  for(let i=0;i<6000;i++){
    const a=catIdlePose(i/60,0), b=catIdlePose(i/60,1);
    for(const pose of [a,b]){
      assert.ok(Math.abs(pose.head)<=.161);
      assert.ok(Math.abs(pose.breath)<=.0121);
      assert.ok(pose.blink>=0 && pose.blink<=1);
      assert.ok(Math.abs(pose.tail)<=.0181);
    }
    if(a.blink!==b.blink)differences++;
  }
  assert.ok(differences>100);
});
for(const file of ['q-blue-white.glb','q-tabby.glb']){
  test(`${file}: no root drift, cloned resources, visible/shadow pose uniforms agree`, async()=>{
    const bytes=readFileSync(`public/cats/${file}`);
    const source=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
    const original=new Box3().setFromObject(source.scene);
    const rig=createIdleRig(source.scene);
    assert.ok(Math.abs(new Box3().setFromObject(rig.root).min.y)<1e-6);
    const position=rig.root.position.clone();
    const mesh=rig.root.children[0];
    let sourceMesh;source.scene.traverse(n=>{if(n.isMesh&&!sourceMesh)sourceMesh=n;});
    assert.notEqual(mesh.geometry,sourceMesh.geometry);assert.notEqual(mesh.material,sourceMesh.material);
    const shader=()=>({uniforms:{},vertexShader:'#include <beginnormal_vertex>\n#include <begin_vertex>'});
    const visible=shader(),shadow=shader();mesh.material.onBeforeCompile(visible);mesh.customDepthMaterial.onBeforeCompile(shadow);
    const initial=mesh.geometry.attributes.position.array.slice();
    for(let i=0;i<500;i++)rig.update(catIdlePose(i*.07,0));
    assert.deepEqual(rig.root.position,position);
    assert.deepEqual(mesh.geometry.attributes.position.array,initial);
    assert.equal(visible.uniforms.uCatHead,shadow.uniforms.uCatHead);
    rig.update({ ...catIdlePose(2, 1), stand: 1, gait: 1, phase: 3.25 });
    for (const name of ['uCatStand', 'uCatGait', 'uCatPhase']) {
      assert.equal(visible.uniforms[name], shadow.uniforms[name]);
    }
    assert.equal(visible.uniforms.uCatPhase.value, 3.25);
    rig.update(catIdlePose(3, 0));
    assert.equal(visible.uniforms.uCatStand.value, 0);
    assert.ok(rig.root.children.filter(n=>n.name.startsWith('cat-tail')).length===2);
    const eyeMeshes=rig.root.children.filter(n=>{
      const s=shader();n.material.onBeforeCompile(s);return s.uniforms.uCatEye.value===1;
    });
    assert.equal(eyeMeshes.length,8, 'both eyes and their highlights blink together');
    let cacheDisposed=false;sourceMesh.geometry.addEventListener('dispose',()=>{cacheDisposed=true;});
    rig.dispose();assert.equal(cacheDisposed,false);
    assert.deepEqual(new Box3().setFromObject(source.scene),original);
  });
}
