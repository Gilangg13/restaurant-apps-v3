if(!self.define){let e,i={};const n=(n,a)=>(n=new URL(n+".js",a).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,d)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let r={};const s=e=>n(e,c),f={module:{uri:c},exports:r,require:s};i[c]=Promise.all(a.map((e=>f[e]||s(e)))).then((e=>(d(...e),r)))}}define(["./workbox-94c66d79"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2.bundle.js",revision:"a2673f067f51e9a8fde0db85b2a98020"},{url:"946.bundle.js",revision:"cbc435a155cc44d631a17ce6c4bafa19"},{url:"app.webmanifest",revision:"57a4b8d9f03f35e734327ef3cf592f12"},{url:"app~309f7e27.bundle.js",revision:"20abd01fa1027508669524ebc3e90399"},{url:"app~309f7e27.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~a51fa3f5.bundle.js",revision:"0b0e243a3e21d5d7b4fc5451a7024bb6"},{url:"app~a51fa3f5.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~ca0940c6.bundle.js",revision:"bf1b1ab3df1a28b0226c74716d6c5074"},{url:"app~ca0940c6.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~d1658f4b.bundle.js",revision:"588f9d4594456473e96c34bd0b6ee1d9"},{url:"app~e4317507.bundle.js",revision:"315a8702d189570e2dd9e2d2923422c1"},{url:"app~e4317507.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"favicon.png",revision:"8b093dda9174e4c48da741329e7525e6"},{url:"icons/icon128x128.png",revision:"76bbe4c494c065c7cae52789da67c6fb"},{url:"icons/icon144x144.png",revision:"3b9c9f54ad25557452bc090b1cfa95c4"},{url:"icons/icon152x152.png",revision:"ec7f61edb88376f864b9fb43c4ca26dc"},{url:"icons/icon192x192.png",revision:"8b093dda9174e4c48da741329e7525e6"},{url:"icons/icon384x384.png",revision:"fce4baa9f588c7cb6b4fb521ca6f336d"},{url:"icons/icon512x512.png",revision:"ea9b330d6bc0d3adaebd0d54ca582a44"},{url:"icons/icon72x72.png",revision:"cda8d4101a89155578f9a58e4a74e9d4"},{url:"icons/icon96x96.png",revision:"342bb89916240fd1d6be88ef7733b39f"},{url:"index.html",revision:"d55612a2d13d1de87bf01d6f93b9056f"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev")),new e.StaleWhileRevalidate({cacheName:"restaurant-api",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/images/large")),new e.StaleWhileRevalidate({cacheName:"restaurant-image-api",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map
