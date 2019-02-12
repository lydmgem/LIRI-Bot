// Include dotenv NPM package
require("dotenv").config();

// Include keys
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Include file system NPM package
var fs = require('fs');

// Load required Node Modules

var axios = require('axios');
var moment = require('moment');

// Command line arguments
var cmd = process.argv;

// LIRI command & param
var action = cmd[2];
var search = cmd.slice(3).join(" ");

// Switch case for each LIRI action, using break to prevent looping through the same action.
function switchCase() {
    switch(action) {
        case 'concert-this':
        getConcert();
        break;

        case 'spotify-this-song':
        getSong();
        break;

        case 'movie-this':
        getMovie();
        break;

        case 'do-what-it-says':
        getReadme();
        break;

        default:                    // Used if there is a missing break
        console.log("Sorry, no can do buddy!");
        break;
    }
};

/*------------------------------------------------LIRI SEARCH FUNCTIONS--------------------------------------------------*/

// Bands in Town Artist Events API - Concert Search
// function getConcert() {

// var bandsUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
// console.log(bandsUrl);

// axios.get(bandsUrl).then(
//     function(response, error) {
//         // console.log(response.data);
//         console.log("Errors occurred: " + error);

//         var dateTime = response.data[1].datetime; 
//         var timeConvert = dateTime.split('T');
//         var newTime = moment(timeConvert[0]).format("MMMM D, YYYY");

//         console.log("***************************************\r\n\r\n");
//         console.log(
//             "Venue: " + (response.data[1].venue.name) +
//             "\nLocation: " + (response.data[1].venue.city) + ", " + (response.data[1].venue.country) +
//             "\nDate: " + newTime);
//         console.log("\r\n\r\n***************************************");
//         }
// )};

// Spotify API - Song Search
function getSong() {
    if (!search) {
        search = "The Sign - Ace of Base";
    }
    
    spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Errors occurred: ' + err);
        }

        console.log("***************************************\r\n\r\n");
        console.log(
            "Artist: " + (data.tracks.items[0].artists[0].name) +
            "\nSong Title: " + (data.tracks.items[0].name) +
            "\nPreview: " + (data.tracks.items[0].preview_url) +
            "\nAlbum: " + (data.tracks.items[0].album.name));
        console.log("\r\n\r\n***************************************");
    })
};

// OMDB API - Movie Search
function getMovie() {
    // console.log(omdbUrl);
    if (!search) {
        search = "Hocus Pocus";
    }
var omdbUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

axios.get(omdbUrl).then(
    function(res, err) {
        console.log(res);

        if (err) {
            console.log("Errors occurred: " + err);
        }
        else {
            console.log("***************************************\r\n\r\n");
            console.log(
                "Title: " + response.data.Title +
                "\nYear: " + response.data.Year +
                "\nIMDB Rating: " + response.data.Ratings[0].Value +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nProduction Location: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors: " + response.data.Actors);        
            console.log("\r\n\r\n***************************************");
        }
    }
)};

// Append "ReadMe"
switchCase();