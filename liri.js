require('dotenv').config();

var keys = require('../liri-node-app/key');
var moment = require('moment');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2]

var input = process.argv.slice(3).join(' ');
//console.log(input);

runLiri(command, input);

function runLiri(command, input) {
  switch (command) {
    case 'concert-this':
      runBandsInTown(input);
      break;
    case 'spotify-this-song':
      runSpotify(input);
      break;
    case 'movie-this':
      runOMDB(input);
      break;
    case 'do-what-it-says':
      runRandom(command, input);
      break;
  }
};

function runBandsInTown(input) {
  var request = require('request');
  request(`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`, function (error, response, body) {
    if (error) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
    }
    results = JSON.parse(body);
    if (results.length < 1) {
      console.log(`We're sorry but it looks like ${input} does not currently have any shows scheduled. Please try another artist.`);
    } else {
      console.log(`Have fun watching ${input} live!`);
      for (let i = 0; i < 5 && i < results.length; i++) {
        console.log(
          `Venue: ${results[i].venue.name}
          Location: ${results[i].venue.city}, ${results[i].venue.country}`);
        var eventDate = results[i].datetime.split('T')[0];
        eventDate = moment(eventDate, 'YYYY-MM-DD').format('MMM DD, YYYY');
        if (eventDate) {
            console.log(`Date: ${eventDate}`);
        } else {
          console.log('Date: TBA. Please check again later!')
        }
      }
    } 
  });
};

function runSpotify(input) {
  spotify.search({type: 'track', query: input, limit: 1}, function (err, data) {
    if (err) {
      return console.log('Error ocurred: ' + err);
    } else {
      song = data.tracks.items[0];
      console.log(`Artist: ${song.artists[0].name} 
      Song: ${song.name}
      Preview Link: ${song.preview_url}
      Album: ${song.album.name}`)
    }
  });
};

function runOMDB(input) {
  var request2 = require('request');
  request2(`http://www.omdbapi.com/?apikey=trilogy&t=${input}`, function (error, response, body) {
    if (error) {
        console.log(`error: ${error}`);
        console.log(`statusCode: ${response} && ${response.statusCode}`);
    } else {
      movie = JSON.parse(body);
      if (movie.Ratings.length < 1) {
        imdbRating = 'Rating information not available'
        rtRating = 'Rating information not available'
      } else {
        imdbRating = movie.Ratings[0].Value;
        rtRating = movie.Ratings[1].Value;
      }
      console.log(`Title: ${movie.Title}
      Year: ${movie.Year}
      Country: ${movie.Country}
      Language: ${movie.Language}
      Plot: ${movie.Plot}
      Cast: ${movie.Actors}
      IMDB Rating: ${imdbRating}
      Rotten Tomatoes Rating: ${rtRating}`);
    }
  });
};

function runRandom(command, input) {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      console.log(error)
    }
    inputArray = data.split(',');
    command = inputArray[0];
    input = inputArray[1].split('"');
    runLiri(command, input);
  });
};
