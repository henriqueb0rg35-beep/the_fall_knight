import {readFile,writeFile} from 'node:fs/promises';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {Matrix4,Box3,Vector3} from 'three';
const raw=await readFile(new URL('../public/assets/imported/Sword.obj',import.meta.url),'utf8');
const source=new OBJLoader().parse(raw),bounds=new Box3().setFromObject(source);
const scale=1.3/bounds.getSize(new Vector3()).y;
// Grip center at source Y=-.25; retain the same hand pivot as the original sword.
const transform=new Matrix4().makeTranslation(0,-.25,0).multiply(new Matrix4().makeScale(scale,scale,scale)).multiply(new Matrix4().makeTranslation(0,.25,0));
const parts=[];source.traverse(m=>{if(!m.isMesh)return;const geometry=m.geometry.clone().applyMatrix4(transform);geometry.computeBoundingBox();geometry.computeBoundingSphere();const color=m.name.startsWith('Blade')?0xa0abae:m.name.startsWith('HandedCenter')?0x47372b:0x8e815d;const data=geometry.toJSON();for(const a of Object.values(data.data.attributes))a.array=a.array.map(v=>Math.round(v*1e6)/1e6);parts.push({name:m.name,color,geometry:data});});
await writeFile(new URL('../src/assets/sword.json',import.meta.url),JSON.stringify({source:'Sword.obj',height:1.3,grip:[0,-.25,0],parts}));
console.log('Prepared imported sword:',parts.length,'parts with original UVs.');
