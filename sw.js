const CACHE='treino-tracker-prod-v7';
const ASSETS=['./index.html','./manifest.json','./male-enhancements.js','./profile-tools.js','./lances-theme.js','./lances-tech-logo.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function inject(text){
 if(!text.includes('male-enhancements.js'))text=text.replace('</body>','<script src="./male-enhancements.js"></script></body>');
 if(!text.includes('profile-tools.js'))text=text.replace('</body>','<script src="./profile-tools.js"></script></body>');
 if(!text.includes('lances-theme.js'))text=text.replace('</body>','<script src="./lances-theme.js"></script></body>');
 return text;
}
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.pathname.endsWith('/index.html')||u.pathname.endsWith('/')){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(async r=>new Response(inject(await r.text()),{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})).catch(()=>caches.match('./index.html').then(async r=>r?new Response(inject(await r.text()),{headers:{'Content-Type':'text/html; charset=utf-8'}}):new Response('Offline',{status:503}))));
  return;
 }
 e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
});