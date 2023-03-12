var axios = require('axios');

var tools = require('./tools.js');
var sampleResponse = require('./sample-response.js');
const apiConfig = require('./config-soccer-api.json');
var logger = require("./logger.js");


const TODAY = tools.getTodaysDate();
const PREMIER_LEAGUE_ID = 39;
const CURRENT_SEASON = 2022;
const TZ = 'America/New_York';
const FIXTURE_URL = 'https://v3.football.api-sports.io/fixtures'

var fixturesConfig = {
  method: 'get',
  url: FIXTURE_URL,
  headers: {
    'x-apisports-key': `${apiConfig['api-key']}`
  },
  params: {
    league: PREMIER_LEAGUE_ID,
    season: CURRENT_SEASON,
    date: TODAY,
    timezone: TZ
  }
};




const retrieveGameData = function(){

  logger.log("retrieving today's game data")
  return new Promise((resolve, reject) =>{ 

      axios(fixturesConfig).then(function (response) {
          logger.log("successfully retrieved game data");
          logger.log(JSON.stringify(response.data));
          resolve(response.data);
      }).catch(function (error) {
          logger.log("unable to retrieve game data");
          console.log(error);
          reject(null);
      });

})};


const getSampleData = function(){
    return sampleResponse;
}





module.exports = {retrieveGameData, getSampleData};