var moment = require('moment-timezone');


//format YYYY-mm-dd
function getTodaysDate(){
    const today = moment().tz("America/New_York").format('YYYY-MM-DD');
    return today;
}

function getCurrentDateTime(){
    const today = moment().tz("America/New_York").format('YYYY-MM-DD HH:mm:ss');
    return today;
}


module.exports = { getTodaysDate, getCurrentDateTime };