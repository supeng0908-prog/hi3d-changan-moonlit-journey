import * as THREE from 'three';
export function atmosphere(scene,env,plan){
 const animate=[],lights=[],waterMaterials=new Set();const cloth=new THREE.MeshStandardMaterial({color:0x8a3d30,roughness:.95,side:THREE.DoubleSide}),gold=new THREE.MeshStandardMaterial({color:0x9f824c,metalness:.5,roughness:.45});
 // Cloth pennants give the main routes movement and a human scale.
 for(const x of [-16,16])for(const z of [117,95,73,51,-20,-42,-67]){
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.035,.06,4.2,8),gold);pole.position.set(x,2.1,z);scene.add(pole);
  const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.15,1.9,8,12),cloth);flag.position.set(x+.6,3,z);flag.userData.original=flag.geometry.attributes.position.array.slice();scene.add(flag);animate.push(flag);
 }
 const paper=new THREE.MeshStandardMaterial({color:0xf5c683,emissive:0xe9a347,emissiveIntensity:.5,roughness:.8});
 for(const p of plan.lanterns){const lamp=new THREE.Mesh(new THREE.SphereGeometry(.28,12,10),paper);lamp.scale.y=1.35;lamp.position.set(p[0],p[2],p[1]);scene.add(lamp);}
 for(let i=0;i<4;i++){const l=new THREE.PointLight(0xffba70,4,10,2);scene.add(l);lights.push(l);}
 // A shaded lake surface with real wave-normal changes, retaining the existing island/bridge layout.
 env.traverse(o=>{if(!o.isMesh)return;const mats=Array.isArray(o.material)?o.material:[o.material];for(const m of mats){if(m.name==='曲江水'){waterMaterials.add(m);m.color.set(0x204a50);m.metalness=.55;m.roughness=.24;m.onBeforeCompile=shader=>{shader.uniforms.lakeTime={value:0};m.userData.shader=shader;shader.fragmentShader='uniform float lakeTime;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\nnormal=normalize(normal+vec3(sin(vViewPosition.x*2.3+lakeTime)*.065,cos(vViewPosition.y*3.1+lakeTime*.7)*.045,0.));');};}}});
 const positions=new Float32Array(160*3);for(let i=0;i<160;i++){positions[i*3]=(Math.random()-.5)*250;positions[i*3+1]=1+Math.random()*10;positions[i*3+2]=(Math.random()-.5)*260;}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));const particles=new THREE.Points(geo,new THREE.PointsMaterial({color:0xe7d7ad,size:.055,transparent:true,opacity:.5,depthWrite:false}));scene.add(particles);
 let frame=0;return (time,pos)=>{for(const flag of animate){const a=flag.geometry.attributes.position,b=flag.userData.original;for(let i=0;i<a.count;i++)a.array[i*3+2]=b[i*3+2]+Math.sin(time*2.4+b[i*3]*3+b[i*3+1]*1.2)*.11*(b[i*3]+.58);a.needsUpdate=true;}
 if(frame++%30===0){const close=[...plan.lanterns].sort((a,b)=>Math.hypot(a[0]-pos.x,a[1]-pos.z)-Math.hypot(b[0]-pos.x,b[1]-pos.z));lights.forEach((l,i)=>l.position.set(close[i][0],close[i][2],close[i][1]));}
 particles.rotation.y=time*.002;
 for(const m of waterMaterials)if(m.userData.shader)m.userData.shader.uniforms.lakeTime.value=time;
 };
}
