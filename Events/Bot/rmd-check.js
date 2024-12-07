const Discord = require("discord.js");
const Event = require("../../Structure/Event");
const chalk = require("chalk");

module.exports = new Event("ready", async (bot) => {
  const db = bot.db;

  setInterval(async () => {
    const currentTime = Date.now();

    db.query(`SELECT * FROM rmd`, async (err, req) => {
      if (err) {
        console.error("Erreur lors de la récupération des rappels depuis la base de données :", err);
        return;
      }

      const usersNotified = new Set();

      for (const row of req) {
        const timestamp = parseInt(row.timer);

        if (!isNaN(timestamp) && currentTime >= timestamp && !usersNotified.has(row.userID)) {
          try {
            const user = await bot.users.fetch(row.userID);

            if (user) {
              await user.send(`Rappel: **${row.reason}**`);
              usersNotified.add(row.userID); 
            }

            db.query(`DELETE FROM rmd WHERE userID = '${row.userID}' AND reason = '${row.reason}'`, (deleteErr) => {
              if (deleteErr) {
                console.error("Erreur lors de la suppression de l'entrée :", deleteErr);
              }
            });
          } catch (fetchErr) {
            db.query(`DELETE FROM rmd WHERE userID = '${row.userID}' AND reason = '${row.reason}'`);
            console.error("Erreur lors de la récupération de l'utilisateur :", fetchErr);
          }
        }
      }
    });
  }, 10000); // Change interval to 10 seconds (10000 ms)
});
