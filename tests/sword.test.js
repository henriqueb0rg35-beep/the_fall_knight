import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Box3,Vector3} from 'three';
import {sword} from '../src/models.js';
test('user sword retains UVs and has a correctly scaled grip',()=>{const m=sword();assert.equal(m.userData.source,'Sword.obj');assert.equal(m.children.length,7);assert.ok(Math.abs(new Box3().setFromObject(m).getSize(new Vector3()).y-1.3)<.0001);m.traverse(p=>{if(!p.isMesh)return;assert.equal(p.geometry.attributes.uv.count,p.geometry.attributes.position.count);assert.ok(p.geometry.attributes.normal);});});
test('hand instances have independent transforms and shared geometry',()=>{const a=sword(),b=sword();a.rotation.x=1;b.position.y=3;assert.equal(b.rotation.x,0);assert.equal(a.position.y,0);assert.equal(a.children[0].geometry,b.children[0].geometry);});
