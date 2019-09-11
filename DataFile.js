const fs=require('fs');
const fetch=require('node-fetch');



let promesa=fetch('https://mindicador.cl/api').then(resolve=>{
    console.log("los datos se cargaron con exito");
    return resolve.json();
},error=>{
    console.log("error al guardar los datos de la api");
}).then((json)=>{
    console.log(json);

    let data=JSON.stringify(json,null,2);
    fs.writeFileSync('datos.json',data);
})