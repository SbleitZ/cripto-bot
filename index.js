const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [131071] });
const { presence } = require('./src/presence')
const { pong, Help } = require('./src/help')
const { TOKEN } = require('./config.json')
const { buscarMoneda } = require('./src/coinInfo')
const { addServer, changeLanguage, getData } = require('./src/DB/mongo_conector');
const { trendingList } = require('./src/trendingCoin');
const { nftIdData } = require('./src/nft_id');
const { searchCoins } = require('./src/search');
//default prefix
let prefix = 'c!';
//lenguaje default
let languageDefault = 'es';
let textLanguage = require(`./languages/${languageDefault}.json`)
client.on('ready', () => {
  console.log(`Prendido ${client.user.tag}!`);
  
  client.user.setPresence(presence);
  client.user.setActivity(`${client.guilds.cache.size} servers`)
  // console.log(client.guilds.cache.size)
  
});

//48f01576-12ec-4f43-8736-dd48570af533
//que se guarden los servidores por la ID que posean y que al momento de generar un comando busque por esa id y ponga el prefix
//ejemplo : buscar.server(guild.id).prefix

// setTimeout(() => {console.log("Haciendo esperar")},2000)
async function generarData(idesota){
  try{
    const datita = await getData(idesota);
    console.log("estas aqui" + datita.id_server);
    testing = datita.id_server;
    languageDefault = datita.language;
    prefix = datita.prefix;
    textLanguage = require(`./languages/${languageDefault}.json`)
  }catch(err){
    console.log(err);
  }
}

client.on("guildCreate", guild => {
  console.log(`El bot ha sido agregado al servidor: ${guild.name} (id: ${guild.id})`);
  const body = {
    id_server: guild.id,
    nombre_server: guild.name,
    language: languageDefault,
    prefix: prefix
  }
  addServer(body);
});

client.on('messageCreate', async message =>{
  // setInterval(generarData, 10, message.guild.id);

  // generarData(message.guild.id);
  //eliminamos el prefix
  const responseCommand = message.content.split(prefix).splice(1)
  // console.log("Caambios" + guild.name)
  // console.log("Hola: " + message.guild.name)
  //elegimos el identificador
  const commando = responseCommand.join().split(" ")
  const command = responseCommand.join().split(" ")[0]
  if(message.content.startsWith("cambia mensaje")){
    let res = message.content.split(' ').splice(2)
    mensaje = res.join(" ")
    message.reply("Mensaje cambiado a " + mensaje)
  }
  if(command === "search"){
    searchCoins(message,commando[1]);
  }
  if(command === "help"){
    Help(message,client.user.avatarURL())
  }
  if(command === "coin"){
    buscarMoneda(commando[1], message, client.user.avatarURL());
  }
  if(command === "trending"){
    trendingList(message);
  }
  if(command === "nft"){
    const idNFT = commando[1];
    nftIdData(message,idNFT);
  }
  if(command === "changePrefix"){
    prefix = commando[1]
    message.reply(textLanguage.infoCommands.prefixChange + prefix)
  }
  if(command === "language"){
    // generarData(message.guild.id);
    
    message.reply(textLanguage.infoCommands.language + textLanguage.language)
  }
  if(command === "changeLanguage"){
    
    if(commando[1].length != 2) return message.reply(textLanguage.Errores.changeLanguage)
    let nuevoLenguaje = commando[1];
    
    changeLanguage(message.guild.id, nuevoLenguaje);
    // generarData(message.guild.id);
    // setTimeout(()=>{
    //   message.channel.send("Espera unos segundos...")
    // }, 2000)
    
    message.reply(textLanguage.infoCommands.languageChange + nuevoLenguaje)
  }
  if(command === "identificador"){
      // let mensajito = mensaje.join(" ");
      message.reply(mensaje);
  }
  
  if(command === "prefix"){
    message.reply(textLanguage.infoCommands.prefix + prefix)
  }
  
})


client.login(TOKEN);

