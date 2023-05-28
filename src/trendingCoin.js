const URL = 'https://api.coingecko.com/api/v3/search/trending'
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

async function trendingList(message){
  const response = await axios.get(URL)
  const data = await response.data;

  const color = Math.floor(Math.random() * (0xF44336 - 0x0099FF + 1) + 0x0099FF);
  let contador = 1;
  const fields = data.coins.map(element => {

    const dato = {
      name: `${contador}. ${element.item.name}`,
      value: `**Market cap**: ${element.item.market_cap_rank} \n **Price**: ${element.item.price_btc} BTC`, 
      inline: false
    }
    contador++;
    return dato;
  });
  // console.log(hola)
  const embed = new EmbedBuilder()
  
  .setColor(color)
  .setTitle(`The trend of cryptocurrencies in the last 24 hours(most searched)`)
  .addFields(fields)
  .setTimestamp()
  .setFooter({iconURL: 'https://play-lh.googleusercontent.com/N5OgI6csCfK3406xnALhhHzRjAgkkIONqADelDg_b8Ih9JxG3ipz3Vbg0rDlUSBQSw', text: "Information provided by CoinGecko."})
  message.channel.send( { embeds: [embed] } )
  
}

module.exports.trendingList = trendingList;
