require('dotenv').config();

var keys = require('../liri-node-app/key');
var moment = require('moment');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2]

var input = process.argv.slice(3).join(' ');
var output = [];

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

function addToLog(output) {
  fs.appendFile("log.txt", output, function(error) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("Log entry added");
    }
  });
}


function runBandsInTown(input) {
  var request = require('request');
  request(`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`, function (error, response, body) {
    if (error) {
      output = `Bands In Town Error: ${error}`, `statusCode: ${response && response.statusCode}`;
      addToLog(output);
      console.log(output);
    }
    results = JSON.parse(body);
    if (results.length < 1) {
      output = `We're sorry but it looks like ${input} does not currently have any shows scheduled. Please try another artist.`
      addToLog(output);
      console.log(output);
    } else {
      output.push(`Have fun watching ${input} live!`);
      console.log(`Have fun watching ${input} live!`);
      for (let i = 0; i < 5 && i < results.length; i++) {
        var venue = results[i].venue.name;
        var location = `${results[i].venue.city}, ${results[i].venue.country}` 

        var eventDate = results[i].datetime.split('T')[0];
        eventDate = moment(eventDate, 'YYYY-MM-DD').format('MMM DD, YYYY');
        if (eventDate) {
          date = eventDate;
        } else {
          date = 'TBD'
        }
        var date = eventDate
        

        var event = `Venue: ${venue} 
        Location: ${location} 
        Date: ${date}`
        output.push(event)
        console.log(event);
      } 
      addToLog(`
      ${output[0]}
      ${output[1]}
      ${output[2]}
      ${output[3]}
      ${output[4]}
      ${output[5]}`);
    }
  });
};

function runSpotify(input) {
  spotify.search({type: 'track', query: input, limit: 5}, function (error, data) {
    if (error) {
      output = `Spotify Search Error Ocurred: ${error}`;
      addToLog(output);
      return console.log(output);
    } else {
      results = data.tracks.items
      for (let i = 0; i < 5 && i < results.length; i++) {
        song = data.tracks.items[i];
        var resp = `Song: ${song.name}
        Artist ${song.artists[0].name} 
        Album: ${song.album.name} 
        Preview Link: ${song.preview_url}`;
        output.push(resp);
        console.log(resp);
      } 
      addToLog(`\n
      ${output[0]}
      ${output[1]}
      ${output[2]}
      ${output[3]}
      ${output[4]}`);
    }
  });
};

function runOMDB(input) {
  var request2 = require('request');
  request2(`http://www.omdbapi.com/?apikey=trilogy&t=${input}`, function (error, response, body) {
    if (error) {
      output = `OMDB Error: ${error}`, `statusCode: ${response && response.statusCode}`;
      addToLog(output);
      console.log(output);
    } else {
      movie = JSON.parse(body);
      if (movie.Ratings.length < 1) {
        imdbRating = 'Rating information not available'
        rtRating = 'Rating information not available'
      } else {
        imdbRating = movie.Ratings[0].Value;
        rtRating = movie.Ratings[1].Value;
      }
      output = `\n
      Title: ${movie.Title}
      Year: ${movie.Year}
      Country: ${movie.Country}
      Language: ${movie.Language}
      Plot: ${movie.Plot}
      Cast: ${movie.Actors}
      IMDB Rating: ${imdbRating}
      Rotten Tomatoes Rating: ${rtRating}`
      addToLog(output)
      console.log(output);
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
