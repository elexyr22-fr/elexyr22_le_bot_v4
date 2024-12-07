const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Command = require("../../Structure/Command");
const chalk = require("chalk");

module.exports = new Command({
  name: "mass-role-add",
  description: "Permet d'ajouter un rôle à tout le monde",
  utilisation: "",
  alias: ["mass-role-add", "rall"],
  permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
  category: "3) Utile",
  cooldown: 10,

  async run(bot, message, args) {
    
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) {
      return message.reply("Veuillez mentionner un rôle à ajouter ?");
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

    const row = new MessageActionRow()
      .addComponents(humansButton, botsButton, allButton);

    const filter = (interaction) => {
      return (
        interaction.isButton() &&
        ["humans", "bots", "all"].includes(interaction.customId)
      );
    };

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Ajout en masse d'un rôle")
      .setDescription(`Vous vous apprêtez à donner le rôle "${role}" aux membres du serveur qui ne l'ont pas encore.\n\n **Que souhaitez-vous faire ?**\n👥・Attribuer le rôle uniquement aux **humains.**\n🤖・Attribuer le rôle uniquement aux **robots.**\n♾️・Attribuer le rôle à **tous les membres.**`)
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
        membersToProcess = allMembers.filter(member => !member.user.bot && !member.roles.cache.has(role.id));
      } else if (collectedInteraction.customId === "all") {
        membersToProcess = allMembers.filter(member => !member.roles.cache.has(role.id));
      } else if (collectedInteraction.customId === "bots") {
        membersToProcess = allMembers.filter(member => member.user.bot && !member.roles.cache.has(role.id));
      }

      await collectedInteraction.deferUpdate().catch(console.error);

      let addedCount = 0;
      for (const member of membersToProcess.values()) {
        await member.roles.add(role);
        addedCount++;
        console.log(chalk.green(`"${role.name}" ajouté à "${member.user.username}" !`));
      }

      replyMessage.edit({
        content: `Le rôle \`\`${role.name}\`\` a été attribué à \`\`${addedCount}\`\` ${
          collectedInteraction.customId === "all"
            ? "membres du serveur"
            : collectedInteraction.customId === "humans"
            ? "humains"
            : "bots"
        } qui ne l'avaient pas encore.`,
        components: [],
      });

      await message.reply(`L'attribution du \`\`${role.name}\`\` est fini, \`\`${addedCount}\`\` **membres** ont reçu __le rôle !__ `);
      console.log(chalk.yellow(`[CMD] "${message.author.username}" a utilisé la commande e!role-all sur '${message.guild.name}'`));
    } catch (error) {
      console.error("*Erreur lors de l'ajout du rôle...*", error);
      replyMessage.edit({
        content: `*Une erreur s'est produite lors de l'ajout du rôle \`\`${role.name}\`\`. Veuillez réessayer plus tard...*`,
        components: [],
      });
    }
  },
});
