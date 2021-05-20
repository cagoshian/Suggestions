const db = require('quick.db')
const Eris = require("eris");

function colorToSignedBit(s) {
	return (parseInt(s.substr(1), 16) << 8) / 256;
}

module.exports = {
	manageSuggestion: async (message, guild, sugid, type, client, dil, args) => {
		const data = db.fetch(`suggestion_${message.guildID}_${sugid}`);
		const author = client.users.get(data.author)
		let color = colorToSignedBit("#00FF00")
		if (type == "Approved") color = colorToSignedBit("#00FF00")
		if (type == "Denied") color = 16711680
		let displaytype = type
		if (dil == "turkish") {
			displaytype = type
			.replace('Approved', 'Onaylanmış')
			.replace('Denied', 'Reddedilmiş')
		}
		client.guilds.get(message.guildID).channels.get(data.channel).getMessage(data.msgid).then(async msg => {
			message.addReaction(`✅`)
			if (!db.has(`${type.toLowerCase()}channel_${message.guildID}`) || db.fetch(`${type.toLowerCase()}channel_${message.guildID}`) == msg.channel.id || !msg.channel.guild.channels.has(db.fetch(`${type.toLowerCase()}channel_${message.guildID}`))) {
				msg.edit({
					embed: {
						title: dil == "english" ? `Suggestion #${sugid}` : `Öneri #${sugid}`,
						description: data.suggestion,
						color,
						author: {
							name: dil == "english" ? `${type} suggestion - ${author.username}#${author.discriminator}` : `${type} öneri - ${author.username}#${author.discriminator}`,
							icon_url: author.avatarURL || author.defaultAvatarURL
						},
						footer: {
							text: client.user.username,
							icon_url: client.user.avatarURL || client.user.defaultAvatarURL
						},
						fields: args[1] ? [ {name: `${message.author.username}'s reason`, value: args.slice(1).join(' ')} ] : [],
						image: data.attachment ? {url: data.attachment} : null
					}
				})
				db.set(`suggestion_${message.guildID}_${sugid}.channel`, msg.channel.id)
				msg.removeReactions()
			}
			if (db.has(`${type.toLowerCase()}channel_${message.guildID}`) && db.fetch(`${type.toLowerCase()}channel_${message.guildID}`) != msg.channel.id && msg.channel.guild.channels.has(db.fetch(`${type.toLowerCase()}channel_${message.guildID}`))) {
				msg.delete()
				msg.channel.guild.channels.get(db.fetch(`${type.toLowerCase()}channel_${message.guildID}`)).createMessage({
					embed: {
						title: `Suggestion #${sugid}`,
						description: data.suggestion,
						color,
						author: {
							name: `${type} suggestion - ${author.username}#${author.discriminator}`,
							icon_url: author.avatarURL || author.defaultAvatarURL
						},
						footer: {
							text: client.user.username,
							icon_url: client.user.avatarURL || client.user.defaultAvatarURL
						},
						fields: args[1] ? [ {name: `${message.author.username}'s reason`, value: args.slice(1).join(' ')} ] : [],
						image: data.attachment ? {url: data.attachment} : null
					}
				}).then(async msgg => {
					db.set(`suggestion_${message.guildID}_${sugid}.channel`, msgg.channel.id)
					db.set(`suggestion_${message.guildID}_${sugid}.msgid`, msgg.id)
				})
			}
			db.set(`suggestion_${message.guildID}_${sugid}.status`, type.toLowerCase())
			if (!db.has(`denydm_${author.id}`)) client.users.get(author.id).getDMChannel().then(async ch => ch.createMessage({
				embed: {
					title: `Your suggestion has ${type.toLowerCase()}!`,
					description: `Your suggestion that in \`${message.channel.guild.name}\` has ${type.toLowerCase()}.\n**Suggestion number:** ${sugid}${args[1] ? `\n**Comment:** ${args.slice(1).join(' ')}` : ``}\n**Suggestion:** \`\`\`${data.suggestion}\`\`\``,
					color
				}
			})).catch(async e => console.log(`Someone's dm is closed (${e})`))
		})
	},
	attachImage: async (message, guild, sugid, type) => {
	
	}
}
