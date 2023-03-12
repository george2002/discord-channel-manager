const { Client, GatewayIntentBits  } = require('discord.js');

const logger = require('./logger.js');
const discordConfig = require("./config-discord.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});

const createChannel = function(fixtureList){

    client.guilds.fetch(discordConfig['guild-id']).then((guild)=>{

        fixtureList.forEach(function (fixture) {

            var homeTeam = fixture.teams.home.name;
            var awayTeam = fixture.teams.away.name;
            var channelName =  createChannelName(homeTeam, awayTeam);

            logger.log("processing game: " + channelName);
            if(guild.channels.cache.find(channel => channel.name === channelName)){
                logger.log("a channel already exists for this game. Skipping");
                return;
            }else{
                logger.log("a channel does not exist for this game. Creating.");
            }

            guild.channels.create({
                name: channelName,
                parent: discordConfig['parent-category-id']
            }).then((channel)=>{
                logger.log(`channel "${homeTeam} vs ${awayTeam}" created succcessfully`);
                channel.setPosition(0);
            }).catch(error =>{
                logger.log(`unable to create channel: ${homeTeam} vs ${awayTeam}.`);
                logger.log(`${error}`);
            });

        });

    })

}

const createChannelName = function(homeTeam, awayTeam){
    const homeTeamUpdated = homeTeam.replace(/\s+/g, '-');
    const awayTeamUpdated = awayTeam.replace(/\s+/g, '-');
    return `${homeTeamUpdated}-vs-${awayTeamUpdated}`.toLowerCase();
}

const login = new Promise((resolve, reject) =>{
    resolve(client.login(discordConfig['api-Key']));
});


module.exports = {login, createChannel};