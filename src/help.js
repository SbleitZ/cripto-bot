const { EmbedBuilder } = require('discord.js')
function Help(message,imagen_bot){
  let embed = new EmbedBuilder()
  .setTitle("Available commands")
  // .setAuthor({name: "CryptoBot", iconURL: imagen_bot})
  .setColor(0x00CC00)
  .addFields(
    {name: 'c!trending', value: 'Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)', inline: false},
    {name: 'c!coin <coin>', value: 'Provide information about the cryptocurrency you type in the <coin> field, remember that it must be the name of the cryptocurrency, not its token, e.g.: c!coin bitcoin', inline: false},
    {name: 'c!nft <coin>', value: 'command not available', inline: false},
    {name: 'c!search <text>', value:'search for coins or nfts listed on CoinGecko \nExample: c!search bitcoin', inline: true}
  )
  .setFooter({iconURL: imagen_bot, text: "More commands coming soon | CryptoBot"})

  message.channel.send({embeds: [embed]});
  // return embed;
}

module.exports.Help = Help;