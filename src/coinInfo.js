const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
/** 
 * URL: https://api.coingecko.com/api/v3/coins/bitcoin
 * Función: Entrega información de una moneda en especifico
*/
function buscarMoneda(monedaNombre, message, imagen_bot){
    // let monedaName = monedaNombre.trim().toLowerCase();
    // let data;
    // const emoji = message.guild.emojis.cache.find(e => e.name === monedaNombre);
    if(typeof(monedaNombre) == "undefined"){
        return message.reply("Debes incluir una criptomoneda en el comando")
    }
    axios.get(`https://api.coingecko.com/api/v3/coins/${monedaNombre}`)
    .then(res => {
        // return (
            const usdvalue = new Intl.NumberFormat('en-us', { maximumSignificantDigits: 6 }).format(res.data.market_data.current_price.usd)
            const circulating_supply = new Intl.NumberFormat('en-us', { maximumSignificantDigits: 3 }).format(res.data.market_data.circulating_supply)
            const total_volume = new Intl.NumberFormat('en-us', { maximumSignificantDigits: 3 }).format(res.data.market_data.total_volume.usd)
            const total_supply = new Intl.NumberFormat('en-us', { maximumSignificantDigits: 3 }).format(res.data.market_data.total_supply)
            const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(res.data.market_data.current_price.eur)
            const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Criptomoneda: ${res.data.name}`)
            .setURL(res.data.links.homepage[0])
            .setAuthor({ name: res.data.name.toUpperCase(), iconURL: res.data.image.small, url: res.data.links.homepage[0] })
            .addFields(
                {name: 'EUR' , value: `${res.data.market_data.current_price.eur.toFixed(4) == 0 ? res.data.market_data.current_price.eur:euro}` , inline: true},
                {name: 'ETH' , value: `${res.data.market_data.current_price.eth.toFixed(4) == 0 ? res.data.market_data.current_price.eth:res.data.market_data.current_price.eth.toFixed(6)}` , inline: true},
                {name: 'BTC' , value: `${res.data.market_data.current_price.btc.toFixed(4) == 0 ? res.data.market_data.current_price.btc:res.data.market_data.current_price.btc.toFixed(2)}` , inline: true},
                { name: 'Precio', value: `${usdvalue} USD`, inline: true },
                { name: 'Volumen (24h)', value: `${total_volume} USD`, inline: true },
                { name: '1h', value: `${res.data.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)} %`, inline: true },
                { name: '24h', value: `${res.data.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%`, inline: true },
                { name: '7d', value: `${res.data.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2)}%`, inline: true },
                { name: 'Cap. de Mercado', value: `${res.data.market_data.market_cap[res.data.symbol] || res.data.market_data.market_cap.usd} ${typeof(res.data.market_data.market_cap[res.data.symbol]) == "undefined" ? "USD":res.data.symbol.toUpperCase()}`, inline: true },
                { name: 'Acciones en circulación', value: `${circulating_supply}`, inline: true },
                { name: 'Acciones en totales', value: `${total_supply}`, inline: true }
            )
            // .setDescription(descripcion)
            .setThumbnail(res.data.image.large)
            .setTimestamp()
            .setFooter({iconURL: imagen_bot, text: "CryptoBot"})
            message.channel.send({ embeds: [embed] });
        // );
    }).catch(err => {
        console.log(err)
        message.channel.send("La moneda introducida no existe o esta mal escrita.")
        
    })

}
module.exports.buscarMoneda = buscarMoneda;

// {console.log(res.data.name)
//     console.log(res.data.symbol)
//     console.log(res.data.market_cap_rank)
//     console.log(res.data.genesis_date)
//     console.log(res.data.market_data.current_price.usd)}