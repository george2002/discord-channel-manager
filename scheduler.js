const nodeCron = require("node-cron");

const discordClient = require('./discordClient.js');
const logger = require('./logger.js');
const soccerClient = require('./soccer-api-client.js');
const tools = require('./tools.js');


const EVERY_SECOND = "* * * * * *";
const EVERY_FIVE_SECOND = "*/5 * * * * *";
const EVERY_FIFTEEN_MINUTES = "*/15 * * * *";
const EVERY_THIRTY_MINUTES = "*/30 * * * *";
const EVERY_THREE_HOURS = "0 */3 * * *";


const retrieveGameData = function(){
    soccerClient.retrieveGameData().then((data) =>{
        console.log()
        if(data && data.response && data.response && data.response.length !== 0){
            discordClient.login.then(() =>{
                logger.log("logged in successfully to discord");
                var fixtureList = [];
                data.response.forEach(function (fixture) {
                    fixtureList.push(fixture);
                });
                discordClient.createChannel(fixtureList);
            }).catch(err => {
                logger.log("unable to login: " + err)
            });
        }else{
            logger.log("no fixture data for " + tools.getTodaysDate());
        }
    }).catch(error =>{
        logger.log("unable to retrieve game data");
        logger.log(error);
    });
}

const restrieveSampleData = function(){
    const data = soccerClient.getSampleData();

    if(data && data.response){


        discordClient.login.then(() =>{
            console.log("logged in successfully to discord");
           
            data.response.forEach(function (fixture) {
                discordClient.createChannel(fixture.teams.home.name,fixture.teams.away.name);
            });
        }).catch(err => {
            logger.log("unable to login: " + err)
        });
    
        
    }else{
        logger.log("no fixture data for " + tools.getTodaysDate());
    }
}

function start(){

    logger.log("doing initial pull of data");
    retrieveGameData();

    const job = nodeCron.schedule(EVERY_THREE_HOURS, retrieveGameData);
    logger.log("scheduler started");

}


module.exports = { start };