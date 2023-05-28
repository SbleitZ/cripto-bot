const mongoose = require('mongoose')
const MONGO_URL = "mongodb+srv://sbleit:asdf123@cluster0.pgo6fhw.mongodb.net/miapp?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, (err) =>{
    if(err){
        console.log("\x1b[31m","******** Error de conexión ********");
        console.log(err);
    }else{
        console.log("\x1b[32m",'******** Conexión exitosa ********');
    }
})

const serverSchema = new mongoose.Schema({
    id_server: {
        type: String,
        unique: true,
        required: true
    },
    nombre_server: {
        type: String,
        required: true
    },
    language:{
        type: String
    },
    prefix:{
        type: String
    }
});

const server = mongoose.model('servers-info',serverSchema)

async function addServer(body){
    try{
        const data = new server(body);
        data.save();
        console.log("Guardado con exito")
    }catch(err){
        console.log("No se ha enviado")
        //console.log(err)
    }
}
async function changeLanguage(_id_server,nuevoLenguaje){
    try{
        console.log(_id_server, nuevoLenguaje)
        const resData = await server.findOne({id_server: _id_server})
        Object.assign(resData,{language: nuevoLenguaje})
        await resData.save()
        return "Lenguaje cambiado a " + nuevoLenguaje;
    }catch(err){
        console.log("No se ha enviado")
        console.error(err);
    }
}
async function getData(_id_server){
    try{
        const resData = await server.findOne({id_server: _id_server});
        // console.log(resData);
        return resData;
    }catch(err){
        console.log(err)
    }
}

module.exports.addServer = addServer;
module.exports.changeLanguage = changeLanguage;
module.exports.getData = getData;