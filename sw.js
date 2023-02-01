//imports
importScripts('js/sw-utils.js');





const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const IMUTABLE_CACHE = 'imutable-v1';

const APP_SHELL = [
    // '/',
    '/index.html',
    '/css/style.css',
    '/img/favicon.ico',
    '/img/avatars/spiderman.jpg',
    '/img/avatars/hulk.jpg',
    '/img/avatars/ironman.jpg',
    '/img/avatars/thor.jpg',
    '/img/avatars/wolverine.jpg',
    '/js/app.js'


];

const APP_SHELL_IMUTABLE =[
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.3.1/css/all.min.css',
    '/css/animate.css',
    '/js/libs/jquery.js'

];

self.addEventListener('install', e =>{
   const cacheStatic = caches.open(STATIC_CACHE).then(cache =>{

    return cache.addAll(APP_SHELL);
   });
   const cacheImutable = caches.open(IMUTABLE_CACHE).then(cache =>{

    return cache.addAll(APP_SHELL_IMUTABLE);
   });
  
    e.waitUntil(Promise.all([cacheStatic, cacheImutable]));
});

self.addEventListener('activate', event => {

    const resposta = caches.keys().then(keys =>{

        keys.forEach( key =>{
            if(key !== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
               
        
        })
    });


    event.waitUntil(resposta)
});


self.addEventListener('fetch', e =>{

    const resposta = caches.match(e.request).then(res =>{

        if(res){
            return res;
        }else{
            return fetch(e.request).then(newRes =>{
                 return atualizarCacheDinamico(DYNAMIC_CACHE, e.request, newRes)

            });
        }
        
    });
    e.respondWith(resposta);
});