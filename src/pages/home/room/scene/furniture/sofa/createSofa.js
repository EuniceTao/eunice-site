/** 独立软包沙发，米制尺寸、织纹与压边；可直接嵌入 Three.js 场景。 */
import * as T from 'three';
import { SOFA_PALETTE as C } from '../../../../../../design-system/room/roomPalette.js';

function weave() {
  const n=1024, data=new Uint8Array(n*n*4), height=new Uint8Array(n*n*4);
  for(let y=0;y<n;y++) for(let x=0;x<n;x++) {
    const hash=Math.sin(x*12.9898+y*78.233)*43758.5453;
    const noise=hash-Math.floor(hash);
    const a=Math.sin(x*Math.PI/4), b=Math.sin(y*Math.PI/4);
    const over=(Math.floor(x/8)+Math.floor(y/8))%2;
    const thread=(over?a:b)*.55+(over?b:a)*.2;
    const slub=Math.sin(x*.11)*Math.sin(y*.037)*.15;
    const value=221+thread*12+(noise-.5)*10+slub*3;
    const i=(y*n+x)*4;
    data[i]=value;data[i+1]=value-3;data[i+2]=value-8;data[i+3]=255;
    height[i]=height[i+1]=height[i+2]=128+thread*100+(noise-.5)*28;height[i+3]=255;
  }
  return [data,height].map((pixels,i)=>{
    const t=new T.DataTexture(pixels,n,n);t.wrapS=t.wrapT=T.RepeatWrapping;
    t.repeat.set(3,3);t.anisotropy=8;t.magFilter=T.LinearFilter;t.minFilter=T.LinearMipmapLinearFilter;
    t.generateMipmaps=true;if(i===0)t.colorSpace=T.SRGBColorSpace;t.needsUpdate=true;return t;
  });
}

/** 均匀分段使大面也能鼓起，避免仅给硬盒子四角加圆角。 */
function cushionGeometry(w,h,d,r,puff=0) {
  const g=new T.BoxGeometry(w,h,d,38,24,30), p=g.attributes.position, uv=g.attributes.uv;
  const v=new T.Vector3(), core=new T.Vector3(), normal=new T.Vector3();
  for(let i=0;i<p.count;i++) {
    v.fromBufferAttribute(p,i);
    core.set(T.MathUtils.clamp(v.x,-w/2+r,w/2-r),T.MathUtils.clamp(v.y,-h/2+r,h/2-r),T.MathUtils.clamp(v.z,-d/2+r,d/2-r));
    normal.copy(v).sub(core).normalize();v.copy(core).addScaledVector(normal,r);
    const fx=Math.max(0,1-(v.x/(w/2))**2), fy=Math.max(0,1-(v.y/(h/2))**2), fz=Math.max(0,1-(v.z/(d/2))**2);
    v.y+=Math.sign(v.y)*puff*fx*fz;
    v.z+=Math.sign(v.z)*puff*.55*fx*fy;
    p.setXYZ(i,v.x,v.y,v.z);
    // UV 用原面法线选择投影，单位为米。
    const nx=Math.abs(g.attributes.normal.getX(i)),ny=Math.abs(g.attributes.normal.getY(i));
    if(nx>.5)uv.setXY(i,v.z,v.y);else if(ny>.5)uv.setXY(i,v.x,v.z);else uv.setXY(i,v.x,v.y);
  }
  g.computeVertexNormals();return g;
}
function seam(w,d,r,material,plane='xz') {
  const points=[];
  for(let c=0;c<4;c++) {
    const a=c*Math.PI/2,cx=(c===0||c===3?1:-1)*(w/2-r),cz=(c<2?1:-1)*(d/2-r);
    for(let j=0;j<=16;j++) {
      const t=a+j*Math.PI/32, x=cx+Math.cos(t)*r,z=cz+Math.sin(t)*r;
      points.push(plane==='xz'?new T.Vector3(x,0,z):new T.Vector3(x,z,0));
    }
  }
  const curve=new T.CatmullRomCurve3(points,true,'centripetal');
  return new T.Mesh(new T.TubeGeometry(curve,160,.0028,6,true),material);
}
export function createSofa() {
  const [map,bumpMap]=weave();
  const fabric=new T.MeshPhysicalMaterial({color:C.linen,map,bumpMap,bumpScale:.0015,roughness:.97,sheen:.55,sheenColor:new T.Color(C.sheen),sheenRoughness:.85});
  const piping=fabric.clone();piping.color.set(C.seam);
  const blue=fabric.clone();blue.color.set(C.pillow);
  const wood=new T.MeshStandardMaterial({color:C.feet,roughness:.65});
  const sofa=new T.Group();sofa.name='Tailored linen sofa';
  function part(size,pos,r=.04,puff=0,mat=fabric) {
    const m=new T.Mesh(cushionGeometry(...size,r,puff),mat);m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;sofa.add(m);return m;
  }
  for(const x of [-1.08,1.08])for(const z of [-.32,.32]) {
    const leg=new T.Mesh(new T.CylinderGeometry(.032,.026,.15,20),wood);leg.position.set(x,.085,z);leg.castShadow=true;sofa.add(leg);
  }
  part([2.48,.25,.89],[0,.275,0],.035,.005);
  part([2.44,.57,.16],[0,.64,-.365],.045,.005);
  for(const x of [-1.2,1.2]) {
    part([.205,.57,.92],[x,.48,.015],.045,.009);
  }
  for(const x of [-.548,.548]) {
    const seat=part([1.076,.175,.715],[x,.485,.09],.06,.018);
    const edge=seam(1.071,.71,.075,piping);edge.position.y=.043;seat.add(edge);
    const back=part([1.077,.46,.195],[x,.787,-.247],.065,.024);
    back.rotation.x=-.105;
    const backSeam=seam(1.072,.455,.075,piping,'xy');backSeam.position.z=.061;back.add(backSeam);
  }
  const pillow=part([.41,.415,.145],[-.84,.748,-.035],.045,.085,blue);
  pillow.rotation.set(-.32,.12,.24);
  const edge=seam(.403,.408,.075,blue,'xy');edge.position.z=.045;pillow.add(edge);
  const pillow2=part([.375,.36,.13],[.84,.72,-.025],.043,.07);
  pillow2.rotation.set(-.18,-.15,-.15);const edge2=seam(.368,.353,.07,piping,'xy');edge2.position.z=.043;pillow2.add(edge2);
  return sofa;
}
