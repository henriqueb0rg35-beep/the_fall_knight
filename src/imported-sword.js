import {BufferGeometryLoader,Group,Mesh,MeshStandardMaterial} from 'three';
import data from './assets/sword.json' with {type:'json'};
const loader=new BufferGeometryLoader();
// Geometry/materials are shared; every instance has its own transform hierarchy.
const parts=data.parts.map(p=>({name:p.name,geometry:loader.parse(p.geometry),material:new MeshStandardMaterial({color:p.color,metalness:.65,roughness:.62})}));
export function importedSword(){const g=new Group();g.name='Sword.obj';g.userData.source='Sword.obj';for(const p of parts){const m=new Mesh(p.geometry,p.material);m.name=p.name;m.castShadow=true;m.receiveShadow=true;g.add(m);}return g;}
