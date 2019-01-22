require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
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
    spotify.search({ type: 'track', query: request }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        for(i=0;i<data.tracks.items.length;i++){
            var artists = []
            var duration_ms = parseInt(data.tracks.items[i].duration_ms);
            var duration_min=Math.floor((duration_ms/1000/60)<<0)
            var duration_sec=Math.floor((duration_ms/1000)%60)
            if(duration_sec<10){duration_sec = '0'+duration_sec.toString()}
            for (j=0;j<data.tracks.items[i].album.artists.length;j++){
                artists.push(data.tracks.items[i].album.artists[j].name)
            }
      console.log('============================='+'\n'+
      'Artist(s): '+artists+'\n'+'Song: '+data.tracks.items[i].name+'\n'+'Preview link: '+data.tracks.items[i].preview_url+'\n'+
      'Album: '+data.tracks.items[i].album.name+'\n'+'Released: '+data.tracks.items[i].album.release_date+'\n'+'Duration: '+duration_min+':'+duration_sec
      +'\n'+'============================='+'\n'); 
         }  
    });
}
if (command==="movie-this") {
    
}
if (command==="do-what-it-says") {
    
}