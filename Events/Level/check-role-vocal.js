const Discord = require("discord.js");
const Event = require("../../Structure/Event");

module.exports = new Event("ready", async (bot) => {
  const db = bot.db;
  const guildId = "ID_GUILD"; // Remplace par ton ID de serv
  const guild = bot.guilds.cache.get(guildId);

  if (!guild) {
    console.error(`Guilde avec l'ID ${guildId} non trouvée`);
    return;
  }

  const role = guild.roles.cache.find((r) => r.name === "🔊・Vocal"); // Nom du rôle vocal

  if (!role) {
    console.log("Rôle non trouvé");
    return;
  }

  // Vérifier si l'utilisateur a déjà le rôle vocal et ajouter les points en conséquence
  setInterval(async () => {
    guild.members.cache.forEach(async (member) => {
      if (member.roles.cache.has(role.id)) {
        const userId = member.user.id;
        db.query(`SELECT * FROM user WHERE userID = ${userId}`, async (err, req) => {
          if (req.length < 1) return;
          try {
            db.query(`UPDATE user SET voiceTime = ${parseInt(req[0].voiceTime) + 10} WHERE userID = ${userId}`);
          } catch (error) {
            console.error(error);
          }
        });
      }
    });
  }, 10000);
});
