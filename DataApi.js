
const fs = require ('fs');
const fetch = require('node-fetch');
const readline = require('readline');
const timestamp=require('time-stamp');
var lector = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*fetch('https://mindicador.cl/api').then(status).then(obtenerJson).then((datos)=>{
            fs.writeFile('datos.json',JSON.stringify(datos,null,2),(err)=>{console.error(err)}); 
        }).catch(console.error);
*/
function opcionMenu(opcion){
    const timestamp=require('time-stamp');
    switch(opcion){
        case '1':
            const timestamp=require('time-stamp');
         console.log('Opcion 1');
        let promesa=fetch('https://mindicador.cl/api').then(resolve=>{
            console.log("los datos se cargaron con exito");
            return resolve.json();
        },error=>{
            console.log("error al guardar los datos de la api");
        }).then((json)=>{
            console.log(json);
            
            let data=JSON.stringify(json,null,2);
            fs.writeFileSync('./indicadores/indicadores'+timestamp('YYYYMMDDHHmmss')+".json",data);
        })
        leerOpcion().then((opcion)=>{opcionMenu(opcion);}).catch(console.error);
        break;
        case '2': getFile('./datos.json').then(JSON.parse).then((datos)=>{
            obtenerPromedio(datos)}).catch(console.error);
        
        break;
        case '3': 
        
        break;
        case '4': process.exit(0);
        break;
        default: 
        console.log('Opcion no encontrada');
        break;
    }
}

const status = response =>{
    if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
};
const obtenerJson = response => {
    return response.json();
};
const getFile = fileName => {
    return new Promise((resolve,reject)=>{
        fs.readFile(fileName,(err,data)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
function obtenerPromedio(json){
    //console.log(json['uf'].valor);
    var info="PROMEDIOS \n";
    for (var elem in json){
        //console.log(elem);
        if(elem!='version' && elem!='autor' && elem!='fecha'){
            info+=elem+": "+json[elem].valor+"\n";
        }
    }
    console.log(info);
    //leerOpcion().then(  (opcion)=>{opcionMenu(opcion);} ).catch(console.error);
}

var leerOpcion = ()=>{
    return new Promise((resolve,reject)=>{
        console.log('Menu');
        console.log('1.- Actualizar Datos');
        console.log('2.- Ultimos 5 promedios');
        console.log('3.- Minimo y maximo ultimos 5 archivos');
        console.log('4.- Salir');    
        lector.question('Escriba su opcion: ', opcion =>{
            resolve(opcion);
        });
    });
}



leerOpcion().then((opcion)=>{opcionMenu(opcion);}).catch(console.error);