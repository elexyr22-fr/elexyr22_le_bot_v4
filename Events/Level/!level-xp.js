const Discord = require("discord.js");
const Event = require("../../Structure/Event");

module.exports = new Event("messageCreate", async (bot, message) => {
    
    
    if(message.author.bot) return;
    
    const db = bot.db;

    db.query(`SELECT * FROM user WHERE userID = ${message.author.id}`, async (err, req) => {
        if(req.length < 1) {
            let sql = `INSERT INTO user (userID, xp, level, afk, voiceTime, bump, event, robot) VALUES (${message.author.id}, '0', '0', 'off', '0', '0', '0', 'off')`
            message.channel.send(`Bravo ${message.author}, tu as envoyé ton **premier message !**`).then(async mess => setTimeout(async () => {mess.delete()}, 3000))
            db.query(sql, function (err) {err})

        } else {
			if(message.guild.id !== "GUILD-ID") return; // id du serv
            let xp = 1
            db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) + xp}' WHERE userID = ${message.author.id}`)
            
            //Pour avoir que mes message compté
            /*db.query(`UPDATE user SET voiceTime = '99999' WHERE userID = ${message.author.id}`)
            db.query(`UPDATE user SET bump = '99999' WHERE userID = ${message.author.id}`)
            db.query(`UPDATE user SET event = '99999' WHERE userID = ${message.author.id}`) */
            //console.log(`${message.author.username} viens de gagné + 1 xp !`)

            //--------------------------------//
            let need = parseInt(req[0].xp)
            let nextLevelXP1 = 15;
            let nextLevelXP2 = 30;
            let nextLevelXP3 = 50;
            let nextLevelXP4 = 100;
            let nextLevelXP5 = 500;
            let nextLevelXP6 = 1000;
            let nextLevelXP7 = 3000;
            let nextLevelXP8 = 5000;
            let nextLevelXP9 = 10000;
            let nextLevelXP10 = 15000;
            //--------------------------------//
            let nextLevelVOC1 = 3600
            let nextLevelVOC2 = 18000
            let nextLevelVOC3 = 36000
            let nextLevelVOC4 = 72000
            let nextLevelVOC5 = 180000
            let nextLevelVOC6 = 360000
            let nextLevelVOC7 = 1080000
            let nextLevelVOC8 = 1800000
            let nextLevelVOC9 = 2880000
            let nextLevelVOC10 = 3600000
            //--------------------------------//    

            //const role = message.member.roles.cache.has("1065700492581273680")
            let role = message.id

			if(message.guild.id !== "GUILD-ID") return; // id de ebot
            
            if(parseInt(req[0].level) == 0) {
            if(parseInt(req[0].xp) >= nextLevelXP1) {
            if(parseInt(req[0].voiceTime) >= nextLevelVOC1) {
                db.query(`UPDATE user SET level = '1' WHERE userID = ${message.author.id}`)
                db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)

                let actif = message.guild.roles.cache.find(role => role.id === "ID 1")
                message.guild.members.cache.get(message.author.id).roles.add(actif)
                console.log(`${message.author.username} es passé niveau 1`)
                message.channel.send(`Bravo ${message.author}, tu es passé niveau \`1\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
              }}}

            if(parseInt(req[0].level) == 1) {
            if(parseInt(req[0].xp) >= nextLevelXP2) {
            if(parseInt(req[0].voiceTime) >= nextLevelVOC2) {
    
                    db.query(`UPDATE user SET level = '2' WHERE userID = ${message.author.id}`)
                    db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
    
                    let actif = message.guild.roles.cache.find(role => role.id === "ID 2")
                    message.guild.members.cache.get(message.author.id).roles.add(actif)
                
                    console.log(`${message.author.username} es passé niveau 2`)
                    message.channel.send(`Bravo ${message.author}, tu es passé niveau \`2\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                }}}

                    if(parseInt(req[0].level) == 2) {
                    if(parseInt(req[0].xp) >= nextLevelXP3) {
                    if(parseInt(req[0].voiceTime) >= nextLevelVOC3) {
            
                            db.query(`UPDATE user SET level = '3' WHERE userID = ${message.author.id}`)
                            db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
            
                            let actif = message.guild.roles.cache.find(role => role.id === "ID 3")
                            message.guild.members.cache.get(message.author.id).roles.add(actif)
                        
                            console.log(`${message.author.username} es passé niveau 3`)
                            message.channel.send(`Bravo ${message.author}, tu es passé niveau \`3\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                        }}}

                        if(parseInt(req[0].level) == 3) {
                        if(parseInt(req[0].xp) >= nextLevelXP4) {
                        if(parseInt(req[0].voiceTime) >= nextLevelVOC4) {
                        if(parseInt(req[0].bump) >= "1") {
                        if(role) {
                
                                db.query(`UPDATE user SET level = '4' WHERE userID = ${message.author.id}`)
                                db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
                
                                let actif = message.guild.roles.cache.find(role => role.id === "ID 4")
                                message.guild.members.cache.get(message.author.id).roles.add(actif)
                            
                                message.channel.send(`Bravo ${message.author}, tu es passé niveau \`4\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                            }}}}}

                            if(parseInt(req[0].level) == 4) {
                                if(parseInt(req[0].xp) >= nextLevelXP5) {
                                if(parseInt(req[0].voiceTime) >= nextLevelVOC5) {
                                if(parseInt(req[0].bump) >= "3") {
                                if(role) {
                        
                                        db.query(`UPDATE user SET level = '5' WHERE userID = ${message.author.id}`)
                                        db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
                        
                                        let actif = message.guild.roles.cache.find(role => role.id === "ID 5")
                                        message.guild.members.cache.get(message.author.id).roles.add(actif)
                                    
                                        message.channel.send(`Bravo ${message.author}, tu es passé niveau \`5\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                                    }}}}}

                                    if(parseInt(req[0].level) == 5) {
                                        if(parseInt(req[0].xp) >= nextLevelXP6) {
                                        if(parseInt(req[0].voiceTime) >= nextLevelVOC6) {
                                        if(parseInt(req[0].bump) >= "5") {
                                         if(role) {
                                      
                                                db.query(`UPDATE user SET level = '6' WHERE userID = ${message.author.id}`)
                                                db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
                                      
                                                let actif = message.guild.roles.cache.find(role => role.id === "ID 6")
                                                message.guild.members.cache.get(message.author.id).roles.add(actif)
                                             
                                                message.channel.send(`Bravo ${message.author}, tu es passé niveau \`6\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                                            }}}}}

                                                if(parseInt(req[0].level) == 6) {
                                                if(parseInt(req[0].xp) >= nextLevelXP7) {
                                                if(parseInt(req[0].voiceTime) >= nextLevelVOC7) {
                                                if(parseInt(req[0].bump) >= "10") {
                                                if(role) {  
                                          
                                                        db.query(`UPDATE user SET level = '7' WHERE userID = ${message.author.id}`)
                                                        db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
                                          
                                                        let actif = message.guild.roles.cache.find(role => role.id === "ID 7")
                                                        message.guild.members.cache.get(message.author.id).roles.add(actif)
                                                    
                                                        message.channel.send(`Bravo ${message.author}, tu es passé niveau \`7\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                                                    }}}}}

                                                    if(parseInt(req[0].level) == 7) {
                                                        if(parseInt(req[0].xp) >= nextLevelXP8) {
                                                        if(parseInt(req[0].voiceTime) >= nextLevelVOC8) {
                                                        if(parseInt(req[0].bump) >= "15") {
                                                        if(role) {
                                                
                                                                db.query(`UPDATE user SET level = '8' WHERE userID = ${message.author.id}`)
                                                                db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
                                                
                                                                let actif = message.guild.roles.cache.find(role => role.id === "ID 8") 
                                                                message.guild.members.cache.get(message.author.id).roles.add(actif)
                                                            
                                                                message.channel.send(`Bravo ${message.author}, tu es passé niveau \`8\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                                                            }}}}}

                                                            if(parseInt(req[0].level) == 8) {
                                                                if(parseInt(req[0].xp) >= nextLevelXP9) {
                                                                if(parseInt(req[0].voiceTime) >= nextLevelVOC9) {
                                                                if(parseInt(req[0].bump) >= "30") {
                                                                if(role) {  
                                                        
                                                   db.query(`UPDATE user SET level = '9' WHERE userID = ${message.author.id}`)
                                                   db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
                                                        
                                                                        let actif = message.guild.roles.cache.find(role => role.id === "ID 9") 
                                                                        message.guild.members.cache.get(message.author.id).roles.add(actif)
                                                                    
                                                                        message.channel.send(`Bravo ${message.author}, tu es passé niveau \`9\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                                                                   }}}}}
                                                    
                                                                    if(parseInt(req[0].level) == 9) {
                                                                    if(parseInt(req[0].xp) >= nextLevelXP10) {
                                                                    if(parseInt(req[0].voiceTime) >= nextLevelVOC10) {
                                                                    if(parseInt(req[0].bump) >= "50") {
                                                                    if(role) {
                                                            
                                     db.query(`UPDATE user SET level = '10' WHERE userID = ${message.author.id}`)
                                     db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
                                                    
                                                                            let actif = message.guild.roles.cache.find(role => role.id === "ID-10")
                                                                            message.guild.members.cache.get(message.author.id).roles.add(actif)
                                                                        
                                                                            message.channel.send(`Bravo ${message.author}, tu es passé niveau \`10\` !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                                                    
                                                                        }}}}}}})})
