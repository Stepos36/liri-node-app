require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var colors = require('colors');
var moment = require('moment');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var request = process.argv[3];
var runProgram = function(command, request) {
if (command==="concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(
        function(response) {
            var output = [];
                if((response.data.length===18)||(response.data.length===0)){console.log('No results were found for this search')}
                else{
                    for (i=0; i<response.data.length;i++) {
                        if(response.data[i].venue.region){
                            output[i] = ('========================='.rainbow
                            +'\n'+'Venue name: '+response.data[i].venue.name.yellow
                            +'\n'+'At: '+response.data[i].venue.city.cyan+', '+response.data[i].venue.region.cyan+', '+response.data[i].venue.country.cyan
                            +'\n'+moment(response.data[i].datetime).format('MM-DD-YYYY')
                            +'\n'+'========================='.rainbow+'\n'+'\n');
                            console.log(output[i].toString());
                            }
                        else if(response.data[i].venue.region===''){
                            output[i] = ('========================='.rainbow
                            +'\n'+'Venue name: '+response.data[i].venue.name.yellow
                            +'\n'+'At: '+response.data[i].venue.city.cyan+', '+response.data[i].venue.country.cyan
                            +'\n'+moment(response.data[i].datetime).format('MM-DD-YYYY')
                            +'\n'+'========================='.rainbow+'\n'+'\n');
                            console.log(output[i].toString());
                            }
                    }
                }
        }
    )
}
if (command=="spotify-this-song") {
    if((request)||(request!==undefined)){}
    else{request='Ace of Base the sign'}
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
      console.log('============================='.rainbow
      +'\n'+'Artist(s): '+artists
      +'\n'+'Song: '+data.tracks.items[i].name.yellow
      +'\n'+'Preview link: '+data.tracks.items[i].preview_url.grey
      +'\n'+'Album: '+data.tracks.items[i].album.name.cyan
      +'\n'+'Released: '+data.tracks.items[i].album.release_date.yellow
      +'\n'+'Duration: '+duration_min+':'+duration_sec
      +'\n'+'============================='.rainbow+'\n'); 
         }  
    });
}
if (command==="movie-this") {
    if((request)||(request!==undefined)){}
    else{request='Mr Nobody'}
    axios.get('http://www.omdbapi.com/?t=+'+request+'&apikey=trilogy').then(
  function(response, error) {
    if (error) {
        return console.log('Error occurred: '+error);
      }
    console.log('==================================='.rainbow
    +'\n'+'Title: '+response.data.Title.yellow
    +'\n'+'Year of release: '+response.data.Year.cyan
    +'\n'+'IMDB rating: '+response.data.Ratings[0].Value.green
    +'\n'+'RottenTomatoes rating: '+response.data.Ratings[1].Value.red
    +'\n'+'Country: '+response.data.Country.yellow
    +'\n'+'Language: '+response.data.Language.cyan
    +'\n'+'Plot: '+response.data.Plot.grey
    +'\n'+'Actors: '+response.data.Actors.cyan
    +'\n'+'==================================='.rainbow+'\n');
    }
    )
}
if (command==="do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }
          dataArr = data.split(', ')
          command = dataArr[0]
          request = dataArr[1]
          runProgram(command, request)
        });        
}
}
runProgram(command, request)