const V="ss-2812fefa92";
self.addEventListener("install",e=>{self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request; if(r.method!=="GET") return;
  const net=fetch(r).then(res=>{ if(res.ok){const c=res.clone(); caches.open(V).then(ca=>ca.put(r,c));} return res; });
  if(r.mode==="navigate"||r.url.endsWith(".html")){ e.respondWith(net.catch(()=>caches.match(r).then(m=>m||caches.match("./")))); }
  else { e.respondWith(caches.match(r).then(m=>m||net)); }
});