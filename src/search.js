const axios = require('axios');
const { EmbedBuilder } = require('discord.js')
async function searchCoins(message,moneda){
  const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${moneda}`);
  const data = await response.data;
  let fieldLength = 0;
  let contador = 1;
  const Fields = []
  for(let i = 0;i<data.coins.length;i++){
    if(Fields.length>=25)break;
    const dato = {
      name:`${contador}. ${data.coins[i].name}`,
      value:data.coins[i].symbol,
      inline:true
    }
    fieldLength++;
    contador++;
    Fields.push(dato);
  }

  //para nft
  contador= 1;
  const FieldsNFT = []
  for(let i = 0;i<data.nfts.length;i++){
    if(FieldsNFT.length>=25)break;
    const dato = {
      name:`${contador}. ${data.nfts[i].name}`,
      value:data.nfts[i].symbol,
      inline:true
    }
    contador++;
    FieldsNFT.push(dato);
  }

  let nftResult = new EmbedBuilder()
  .setTitle(`NFT's Search results for ${moneda}`)
  .setColor(0x32db5f)
  .addFields(FieldsNFT || {name: "hola", value: "hola"})
  .setFooter({iconURL: 'https://play-lh.googleusercontent.com/N5OgI6csCfK3406xnALhhHzRjAgkkIONqADelDg_b8Ih9JxG3ipz3Vbg0rDlUSBQSw', text: "Information provided by CoinGecko."})
  
  let coinsResult = new EmbedBuilder()
  .setTitle(`Coins Search results for ${moneda}`)
  .setColor(0x32db5f)
  .addFields(Fields)
  .setFooter({iconURL: 'https://play-lh.googleusercontent.com/N5OgI6csCfK3406xnALhhHzRjAgkkIONqADelDg_b8Ih9JxG3ipz3Vbg0rDlUSBQSw', text: "Information provided by CoinGecko."})
  message.channel.send({embeds: [coinsResult,nftResult]});
}

module.exports.searchCoins = searchCoins;
