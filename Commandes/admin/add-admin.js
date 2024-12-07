const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const chalk = require("chalk")

module.exports = new Command({

    name: "",
    description: "",
    utilisation: "",
    alias: ["up1"],
    permission: "",
    category: "",
    cooldown: 10,

    async run(bot, message, args, db) {
        
         if(message.author.id !== "owner-id") return message.delete()

      let user;
       if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
           user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value).catch(() => null) : (message.mentions.users.first() || await bot.users.fetch(args[0]).catch(() => null))
           if(!user) return message.reply("<:elexyr22:1067501213085597806> Cet utilisateur n'existe pas... <a:nop1:1068106487358038126>");
       } else {
           user = message.user ? message.user : message.author;
       }
       if(!user) return message.reply("<:elexyr22:1067501213085597806> Cet utilisateur n'existe pas... <a:nop1:1068106487358038126>");

       db.query(`SELECT * FROM admin WHERE userID = ${user.id}`, async (err, req) => {
        if(req.length > 1) return message.reply(`<:elexyr22:1067501213085597806> ${user} est déjà **Admin !** <a:non:1069328732554281080>`);
            
     let sql = `INSERT INTO admin (userID, username, statut) VALUES ('${user.id}', '${user.username}', 'ACTIF')`
            db.query(sql, function(err) {
                if(err) throw err;
            })

           return message.reply(`<:elexyr22:1067501213085597806> ${user} a bien été ajouté au **Admin !** <a:valide_or:1067501018906108024>`);
    
          })}})   
