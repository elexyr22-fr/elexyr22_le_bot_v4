const Discord = require("discord.js");
const Event = require("../../Structure/Event");

module.exports = new Event("guildCreate", async (bot, guild) => {
    console.log(`Nouveau serveur : ${guild.name} je suis à  ${bot.guilds.cache.size} serveurs !`);

    let serveur = guild.channels.cache.find(channel => channel.type === "GUILD_TEXT" && channel.permissionsFor(bot.user.id).has("CREATE_INSTANT_INVITE"));
    if (!serveur) return;

    let invite = await serveur.createInvite({ maxAge: 0, maxUses: 0 });

    const channelId = "ID_CHANNEL"; 
    let channel = bot.channels.cache.get(channelId);

    if (!channel) {
        try {
            channel = await bot.channels.fetch(channelId);
        } catch (error) {
            return;
        }}

    let addembed = new Discord.MessageEmbed()
        .setTitle(`Join de : ${guild.name} *(${guild.id})*`)
        .setThumbnail(guild.iconURL())
        .addField(`👑 Propriétaire:`, `<@${guild.ownerId}> - *(${guild.ownerId})*`)
        .addField(`Nombre de membres:`, `${guild.memberCount}`)
        .addField(`🛬 Invitation :`, `${invite}`)
        .setColor("11d646")
        .setTimestamp()
        .setFooter(`Merci grâce à toi nous sommes à ${bot.guilds.cache.size} serveurs`, bot.user.displayAvatarURL());

    if (channel) {
        channel.send({ embeds: [addembed] });
    } else {
        return;
    }
});
