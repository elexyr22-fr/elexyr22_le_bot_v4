const Discord = require("discord.js")
const Command = require("../../Structure/Command")                                                                          

module.exports = new Command({

    name: "",
    description: "",
    utilisation: "",
    alias: ["set-voc"],
    permission: "",
    category: "",
    cooldown: 1,

    async run(bot, message, args) {
        
 		if(message.author.id !== "ID-OWNER") return message.reply("pas owner")
        
         const db = bot.db

      let user;
       if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
           user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value).catch(() => null) : (message.mentions.users.first() || await bot.users.fetch(args[0]).catch(() => null))
           if(!user) return message.reply("Cet utilisateur n'existe pas...");
       } else {
           user = message.user ? message.user : message.author;
       }
       if(!user) return message.reply("Cet utilisateur n'existe pas...");
        
        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");  
        db.query(`SELECT * FROM user WHERE userID = ${user.id}`, async (err, req) => {

       if(req.length < 1) return message.reply("*Cette personne n'est pas enregistrée dans le bot...*")

       db.query(`UPDATE user SET voiceTime = '${reason}' WHERE userID = ${user.id}`)
                     
       message.reply(`${user} à été changé !`)
              
            })}})
