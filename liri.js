require("dotenv").config();

var keys = require("../liri-node-app/key");

var spotify = new Spotify(keys.spotify);
console.log(spotify);