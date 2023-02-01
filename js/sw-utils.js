//Guardar dados no cache dinamico
function atualizarCacheDinamico(cacheDinamico,req,res){
if(res.ok){
    return caches.open(cacheDinamico).then(cache =>{

        cache.put(req,res.clone());
        return res.clone();
    });
}else{
    return res;
}
}