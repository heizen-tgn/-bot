const Discord = require('discord.js-light');
const client = new Discord.Client({
    makeCache: Discord.Options.cacheWithLimits({
        ApplicationCommandManager: 0,
        BaseGuildEmojiManager: 0,
        ChannelManager: 0,
        GuildChannelManager: 0,
        GuildBanManager: 0,
        GuildInviteManager: 0,
        GuildManager: Infinity,
        GuildMemberManager: 0,
        GuildStickerManager: 0,
        GuildScheduledEventManager: 0,
        MessageManager: 0,
        PermissionOverwriteManager: 0,
        PresenceManager: 0,
        ReactionManager: 0,
        ReactionUserManager: 0,
        RoleManager: 0,
        StageInstanceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        UserManager: 0, 
        VoiceStateManager: 0 
    }),
    intents: 515,
});
let { readdirSync } = require('fs'); 
client.comandos = new Discord.Collection(); 

for(const file of readdirSync('./comandos/')) {    
    if(file.endsWith(".js")) {

        let fileName = file.substring(0, file.length - 3);
      
        let fileContents = require(`./comandos/${file}`);

        client.comandos.set(fileName, fileContents);
    }
}

for(const file of readdirSync('./eventos/')) {
    if(file.endsWith(".js")){

        let fileName = file.substring(0, file.length - 3);

        let fileContents = require(`./eventos/${file}`);

        client.on(fileName, fileContents.bind(null, client));

        delete require.cache[require.resolve(`./eventos/${file}`)]; 
    }
}

client.login(process.env.TOKEN)
  .then(() => { 
    console.log(`Estoy listo, soy ${client.user.tag}`);
  })
  .catch((err) => {
    console.error("Error al iniciar sesión: " + err);
  });