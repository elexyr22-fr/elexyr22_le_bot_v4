const Discord = require("discord.js");
const Event = require("../../Structure/Event");
const SlashCommand = require("../../Structure/SlashCommand");
const chalk = require("chalk");

module.exports = new Event("ready", async (bot) => {
  const db = bot.db;
  await SlashCommand(bot);

  let statuses = () => [`${bot.guilds.cache.size} serveurs | .gg/gratuit`];

  setInterval(function () {
    let statusList = statuses();
    let status = statusList[Math.floor(Math.random() * statusList.length)];
    bot.user.setActivity(status, {
      type: "STREAMING",
      url: "https://www.twitch.tv/elexyr22_",
    });
  }, 10000); // Change interval to 10 seconds (10000 ms)

  console.log(chalk.bgBlue(`${bot.user.username}: En ligne sur ${bot.guilds.cache.size} serveurs !`));
});
