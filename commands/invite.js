const Eris = require("eris");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

  function colorToSigned24Bit(s) {
    return (parseInt(s.substr(1), 16) << 8) / 256;
}

let dil = db.fetch(`dil_${message.guildID}`) || "english";

if (dil == "english") {
  let prefix = db.fetch(`prefix_${message.guildID}`) || "."
  if (!db.has('botcekilis')) message.channel.createMessage({embed: {title: `You can invite the bot using this link.`, description: `**Vote this bot:** [Vote](https://top.gg/bot/709351286922936362/vote)\n**Support server:** coming soon`, color: colorToSigned24Bit("#2F3136"), url: "https://discord.com/api/oauth2/authorize?client_id=709351286922936362&permissions=8&scope=bot"}})
  if (db.has('botcekilis')) message.channel.createMessage({embed: {title: `You can invite the bot using this link.`, description: `**Vote this bot:** [Vote](https://top.gg/bot/709351286922936362/vote)\n**Support server:** coming soon` + `\n \n<:rightarrow:709539888411836526> There is an active giveaway in the bot!\n**Giveaway** ${db.fetch(`botcekilis.english`)}\n**Join with** ${prefix}giveaway`, color: colorToSigned24Bit("#2F3136"), url: "https://discord.com/api/oauth2/authorize?client_id=709351286922936362&permissions=8&scope=bot"}})
}

if (dil == "turkish") {
  let prefix = db.fetch(`prefix_${message.guildID}`) || "."
  if (!db.has('botcekilis')) message.channel.createMessage({embed: {title: `Botu bu linki kullanarak davet edebilirsin.`, description: `**Botu oyla:** [Oyla](https://top.gg/bot/709351286922936362/vote)\n**Destek sunucusu:** yakında`, color: colorToSigned24Bit("#2F3136"), url: "https://discord.com/api/oauth2/authorize?client_id=709351286922936362&permissions=8&scope=bot"}})
  if (db.has('botcekilis')) message.channel.createMessage({embed: {title: `Botu bu linki kullanarak davet edebilirsin.`, description: `**Botu oyla:** [Oyla](https://top.gg/bot/709351286922936362/vote)\n**Destek sunucusu:** yakında` + `\n \n<:rightarrow:709539888411836526> Botta aktif bir çekiliş var!\n**Çekiliş** ${db.fetch(`botcekilis.turkish`)}\n**Katılmak için** ${prefix}çekiliş`, color: colorToSigned24Bit("#2F3136"), url: "https://discord.com/api/oauth2/authorize?client_id=709351286922936362&permissions=8&scope=bot"}})
}
}

module.exports.help = {
  name: "invite",
  nametr: "davet",
  aliase: ["davet"],
  descriptionen: "Shows the bot's invite link and other links.",
  descriptiontr: "Botun davet linkini ve diğer linkleri gösterir.",
  usageen: "staff",
  usagetr: "yetkili",
  category: 'help'
}