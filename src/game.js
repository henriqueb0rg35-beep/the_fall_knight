export const ITEMS={sword:{name:'Espada',icon:'⚔️'},shield:{name:'Escudo',icon:'🛡️'},fire:{name:'Fogo',icon:'📕'},heal:{name:'Cura',icon:'📗'},health:{name:'Poção vida',icon:'🧪'},energy:{name:'Poção vigor',icon:'⚗️'},herb:{name:'Erva verde',icon:'🌿'},essence:{name:'Essência',icon:'✧'},root:{name:'Raiz',icon:'🪵'}};
export const RECIPES={health:{herb:1,essence:1},energy:{essence:1,root:1}};
export const DROP_RATES={tree:.25,zombie:.15,grass:.05};
export function state(){return {hp:100,mana:100,stamina:100,slots:[{id:'sword',n:1},{id:'fire',n:1},{id:'heal',n:1},null,null,null,null,null,null,...Array(27).fill(null)],offhand:{id:'shield',n:1},selected:0,kills:0};}
export function addItem(s,id,n=1){const same=s.slots.find(x=>x?.id===id);if(same){same.n+=n;return true;}const i=s.slots.indexOf(null);if(i<0)return false;s.slots[i]={id,n};return true;}
export function count(s,id){return s.slots.reduce((n,x)=>n+(x?.id===id?x.n:0),0);}
export function craft(s,id){const r=RECIPES[id];if(!r||Object.entries(r).some(([k,n])=>count(s,k)<n))return false;const backup=s.slots.map(x=>x?{...x}:null);for(const [k,n] of Object.entries(r)){let left=n;for(let i=0;i<s.slots.length&&left;i++){const x=s.slots[i];if(x?.id===k){const used=Math.min(left,x.n);x.n-=used;left-=used;if(!x.n)s.slots[i]=null;}}}if(!addItem(s,id)){s.slots=backup;return false;}return true;}
export function swapHands(s){[s.offhand,s.slots[s.selected]]=[s.slots[s.selected],s.offhand];}
export function moveItem(s,a,b){[s.slots[a],s.slots[b]]=[s.slots[b],s.slots[a]];}
export function rollDrop(kind,random=Math.random){return random()<DROP_RATES[kind];}
