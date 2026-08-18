const CACHE='treino-tracker-v6';
const APP_VERSION='1.01';
const UPDATE_MARKER='tt-app-version';

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['./','./index.html','./manifest.json'])));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  const isHtml=url.pathname.endsWith('/index.html') || url.pathname.endsWith('/treino-tracker/');
  event.respondWith(
    fetch(event.request).then(async response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      if(!isHtml) return response;
      const type=response.headers.get('content-type')||'';
      if(!type.includes('text/html')) return response;
      const html=await response.text();
      const markerScript=`<script>(function(){try{var v='${APP_VERSION}',k='${UPDATE_MARKER}',old=localStorage.getItem(k);if(!old){localStorage.setItem(k,v);return;}if(old===v)return;var b=document.createElement('div');b.style='position:fixed;left:12px;right:12px;bottom:78px;z-index:9999;background:#111827;color:#fff;border-radius:14px;padding:12px 14px;box-shadow:0 8px 30px #0005;font:13px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif';b.innerHTML='<div style="font-weight:800">🆕 Nova versão disponível</div><div style="opacity:.8;margin-top:3px">Uma atualização do Treino Tracker está pronta.</div><button id="tt-update" style="margin-top:9px;border:0;border-radius:9px;padding:8px 12px;background:#fff;color:#111827;font-weight:800">Atualizar agora</button>';document.addEventListener('DOMContentLoaded',function(){document.body.appendChild(b);document.getElementById('tt-update').onclick=function(){localStorage.setItem(k,v);if(navigator.serviceWorker&&navigator.serviceWorker.getRegistration){navigator.serviceWorker.getRegistration().then(function(r){return r?r.update():null}).finally(function(){location.reload()})}else location.reload()};});}catch(e){}})();</script>`;
      return new Response(html.replace('</body>',markerScript+'</body>'),{status:response.status,statusText:response.statusText,headers:response.headers});
    }).catch(()=>caches.match(event.request))
  );
});
