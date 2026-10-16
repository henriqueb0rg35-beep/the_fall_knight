import * as T from 'three';
const palette={iron:0x707978,dark:0x303e40,rust:0x735443,cloth:0x504b3d,skin:0x899078,bone:0xc3b99c,bark:0x403b30,leaf:0x263d32,gold:0x9e8245};
let atlas=null;
export function setAtlas(t){atlas=t;}
const mat=(c)=>new T.MeshStandardMaterial({color:palette[c]??c,flatShading:true,roughness:.96,map:atlas});
function part(g,geo,c,x,y,z,rx=0,rz=0){const m=new T.Mesh(geo,mat(c));m.position.set(x,y,z);m.rotation.set(rx,0,rz);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;}
function box(g,w,h,d,c,x=0,y=0,z=0,rz=0){return part(g,new T.BoxGeometry(w,h,d),c,x,y,z,0,rz);}
export function sword(){const g=new T.Group();box(g,.09,.85,.045,'iron',0,.35,0);part(g,new T.ConeGeometry(.065,.22,4),'iron',0,.88,0);box(g,.4,.06,.09,'gold',0,-.1,0);box(g,.08,.28,.08,'cloth',0,-.25,0);return g;}
export function shield(){const g=new T.Group();const s=part(g,new T.CylinderGeometry(.34,.23,.08,6),'dark',0,0,0,Math.PI/2);s.rotation.z=Math.PI/6;box(g,.05,.5,.11,'iron');box(g,.4,.04,.11,'iron');return g;}
export function book(type='fire'){const g=new T.Group();box(g,.34,.43,.12,type==='fire'?0x7e3525:0x345b43);box(g,.28,.36,.13,0xc0ae7d);box(g,.34,.43,.025,type==='fire'?0x7e3525:0x345b43,0,0,.08);box(g,.05,.22,.03,'gold',0,0,.1);box(g,.18,.05,.03,'gold',0,0,.1);return g;}
export function humanoid(type='knight'){
 const g=new T.Group(),sk=type==='skeleton',kn=type==='knight',arm=kn||type==='zombieArmor',body=kn?'iron':sk?'bone':'cloth';
 box(g,sk?.23:.47,.55,.27,body,0,1.12,0);box(g,.34,.23,.24,kn?'dark':body,0,.75,0);
 if(arm){box(g,.56,.16,.34,'dark',0,1.35,0);box(g,.3,.32,.32,'iron',0,1.67,0);box(g,.31,.045,.34,0x172324,0,1.7,.02);box(g,.05,.2,.03,'rust',.09,1.59,.18);for(let i=0;i<4;i++)box(g,.13,.012,.012,'rust',-.12+i*.07,1.13-i*.04,.145,-.6);}
 else {box(g,.28,.31,.27,sk?'bone':'skin',0,1.64,0);box(g,.055,.05,.015,0x171e18,-.07,1.68,.14);box(g,.055,.05,.015,0x171e18,.07,1.68,.14);}
 g.userData.limbs=[];for(const side of [-1,1]){const leg=new T.Group();leg.position.set(side*.14,.76,0);box(leg,sk?.08:.17,.62,.17,body,0,-.32,0);box(leg,.19,.12,.28,kn?'dark':body,0,-.65,.04);g.add(leg);g.userData.limbs.push(leg);const a=new T.Group();a.position.set(side*.34,1.33,0);box(a,sk?.07:.15,.55,.16,arm?'iron':body,0,-.24,0,side*.1);box(a,.14,.15,.15,kn?'dark':sk?'bone':'skin',0,-.55,0);if(arm)box(a,.25,.18,.3,'iron',0,0,0);g.add(a);g.userData.limbs.push(a);}
 if(sk){for(let i=0;i<4;i++)box(g,.35,.035,.27,'bone',0,.94+i*.09,0);const weapon=sword();weapon.scale.setScalar(.75);weapon.position.set(-.36,.65,.2);g.add(weapon);box(g,.23,.15,.27,'dark',.33,1.33,0);}if(kn){const cape=box(g,.4,.65,.035,'cloth',0,.97,-.2);cape.rotation.x=-.13;}
 return g;
}
export function tree(seed=1){const g=new T.Group();part(g,new T.CylinderGeometry(.18,.48,6,6),'bark',0,3,0);for(let i=0;i<4;i++){const a=i*2.4+seed;const b=part(g,new T.CylinderGeometry(.06,.16,2.3,5),'bark',Math.sin(a)*.65,3.2+i*.55,Math.cos(a)*.65);b.rotation.z=Math.sin(a)*.8;b.rotation.x=Math.cos(a)*.8;part(g,new T.IcosahedronGeometry(1.55,0),'leaf',Math.sin(a)*.8,5+i*.45,Math.cos(a)*.8);}return g;}
export function grass(){const g=new T.Group();for(let i=0;i<5;i++){const blade=part(g,new T.ConeGeometry(.075,.55+(i%2)*.2,3),i%2?0x596742:0x394e35,(i-2)*.08,.25,(i%2)*.1);blade.rotation.z=(i-2)*.15;}return g;}
export function campfire(){const g=new T.Group();for(let i=0;i<8;i++){const a=i*Math.PI/4;part(g,new T.DodecahedronGeometry(.22,0),0x60645c,Math.sin(a)*.7,.13,Math.cos(a)*.7);}for(let i=0;i<3;i++){const l=part(g,new T.CylinderGeometry(.12,.12,1.1,6),'bark',0,.16,0);l.rotation.z=Math.PI/2;l.rotation.y=i*2.1;}return g;}
