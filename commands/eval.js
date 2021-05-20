const Eris = require("eris");
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if (message.author.id != "343412762522812419") return;

  if(!args[0]) return
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let çıkış = (`\`\`\`js\n${code}\n\`\`\``)
        message.channel.createMessage(çıkış)
    } catch(e) {
        message.channel.createMessage(`\`\`\`js\n${e}\n\`\`\``);
    }
}

module.exports.help = {
    name: "eval",
    aliase: [],
    descriptionen: "Shows the commands.",
    descriptiontr: "Bot gecikmesini gösterir.",
    usageen: "ping",
    usagetr: "ping",
    category: 'owner'
  }