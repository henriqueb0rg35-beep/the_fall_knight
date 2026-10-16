import {mkdir,writeFile} from 'node:fs/promises';
import {OBJExporter} from 'three/addons/exporters/OBJExporter.js';
import {humanoid,sword,shield,book,tree,grass,campfire} from '../src/models.js';
const objects={knight:humanoid('knight'),'zombie-armored':humanoid('zombieArmor'),'zombie-rags':humanoid('zombieRags'),skeleton:humanoid('skeleton'),'iron-sword':sword(),shield:shield(),'fire-book':book('fire'),'healing-book':book('heal'),oak:tree(),grass:grass(),campfire:campfire()};
await mkdir('public/assets/models',{recursive:true});const exporter=new OBJExporter();const manifest={texture:'../weathered-atlas.svg',uv:'Each primitive includes explicit vt coordinates; box faces use 0–1 UV, cylinders unwrap around Y. All use the tiling weathered atlas.',models:[]};
for(const [name,model] of Object.entries(objects)){model.updateMatrixWorld(true);let triangles=0;model.traverse(m=>{if(m.isMesh)triangles+=(m.geometry.index?.count??m.geometry.attributes.position.count)/3;});await writeFile(`public/assets/models/${name}.obj`,exporter.parse(model));manifest.models.push({name,file:`${name}.obj`,triangles});}
await writeFile('public/assets/models/manifest.json',JSON.stringify(manifest,null,2));console.log('Exported',manifest.models.length,'UV-mapped models (including the supplied sword).');
