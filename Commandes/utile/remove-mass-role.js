const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Command = require("../../Structure/Command");
const chalk = require("chalk");

module.exports = new Command({
  name: "mass-role-remove",
  description: "Permet de retirer un rôle à tout le monde ayant ce rôle",
  utilisation: "",
  alias: ["mass-roll-remove", "roll"],
  permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
  category: "3) Utile",
  cooldown: 5,

  async run(bot, message, args) {
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) {
      return message.reply("<:elexyr22:1067501213085597806> Veuillez mentionner un rôle à retirer ? <a:mmhh:1067175530509639791>");
    }

    const humansButton = new MessageButton()
      .setCustomId("humans")
      .setLabel("👥")
      .setStyle("SUCCESS");
    const botsButton = new MessageButton()
      .setCustomId("bots")
      .setLabel("🤖")
      .setStyle("PRIMARY");
    const allButton = new MessageButton()
      .setCustomId("all")
      .setLabel("♾️")
      .setStyle("SECONDARY");

    const row = new MessageActionRow().addComponents(humansButton, botsButton, allButton);

    const filter = (interaction) => interaction.isButton() && ["humans", "bots", "all"].includes(interaction.customId);

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Retrait en masse d'un rôle")
      .setDescription(`Vous vous apprêtez à retirer le rôle "${role}" à tous les membres ayant ce rôle.\n\n **Que souhaitez-vous faire ?**\n👥・Retirer le rôle uniquement aux **humains.**\n🤖・Retirer le rôle uniquement aux **robots.**\n♾️・Retirer le rôle à **tous les membres.**`)
      .setFooter(`Demandé par : ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));

    const replyMessage = await message.reply({
      embeds: [embed],
      components: [row],
    });

    try {
      const collectedInteraction = await replyMessage.awaitMessageComponent({ filter, time: 60000 });

      if (!collectedInteraction) {
        replyMessage.edit({
          content: "*Temps écoulé, la commande a été annulée...*",
          components: [],
        });
        return;
      }

      let membersToProcess;
      const allMembers = await message.guild.members.fetch();

      if (collectedInteraction.customId === "humans") {
        membersToProcess = allMembers.filter(
          (member) => !member.user.bot && member.roles.cache.has(role.id)
        );
      } else if (collectedInteraction.customId === "bots") {
        membersToProcess = allMembers.filter(
          (member) => member.user.bot && member.roles.cache.has(role.id)
        );
      } else {
        membersToProcess = allMembers.filter((member) =>
          member.roles.cache.has(role.id)
        );
      }

      const totalMembers = membersToProcess.size; // Nombre total de membres ayant le rôle
      await collectedInteraction.deferUpdate().catch(console.error);

      let removedCount = 0;

      for (const member of membersToProcess.values()) {
        await member.roles.remove(role);
        removedCount++;
        console.log(chalk.red(`"${role.name}" retiré de "${member.user.username}" !`));
      }

      replyMessage.edit({
        content: `Le rôle ${role} a été retiré à ${
          collectedInteraction.customId === "all"
            ? `${totalMembers} membres`
            : collectedInteraction.customId === "humans"
            ? `${totalMembers} humains`
            : `${totalMembers} bots`
        }.\nNombre total de rôles retirés: ${removedCount}.`,
        components: [],
      });

      await message.reply(`<:elexyr22:1067501213085597806> Le retrait du \`\`${role.name}\`\` est terminé ! \`\`${removedCount}\`\` **membres** ont perdu __le rôle !__ <a:valide_or:1067501018906108024>`);
      console.log(chalk.yellow(`[CMD] "${message.author.username}" a utilisé la commande mass-role-remove sur '${message.guild.name}'`));
    } catch (error) {
      console.error("*Erreur lors du retrait du rôle...*", error);
      replyMessage.edit({
        content: `*Une erreur s'est produite lors du retrait du rôle \`\`${role.name}\`\`. Veuillez réessayer plus tard...*`,
        components: [],
      });
    }
  },
});
