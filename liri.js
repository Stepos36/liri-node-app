require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
var command = process.argv[2];
var request = process.argv[3]
if (command==="concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(
        function(response) {
            var output = []
            for (i=0; i<response.data.length;i++)
                output[i] = ('========================='+'\n'+'Venue name: '+response.data[i].venue.name+'\n'+'At: '+response.data[i].venue.city+', '+
                response.data[i].venue.region+', '+response.data[i].venue.country+'\n'+moment(response.data[i].datetime).format('MM-DD-YYYY')+'\n'+'========================='
                +'\n'+'\n');
                console.log(output.toString().replace(/\n,/g, '\n').replace(/ ,/g, ''));
            }
    )
}
if (command==="spotify-this-song") {
    
}
if (command==="movie-this") {
    
}
if (command==="do-what-it-says") {
    
}