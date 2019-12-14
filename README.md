# liri-node-app

![LIRI Demo](https://media.giphy.com/media/cmOQ0oLDtHIpXYoM7C/giphy.gif)

**ABOUT:**

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that:
  * Takes in user input
  * Searches Spotify for songs, Bands in Town for concerts, and OMDB for movies
  * Returns the requested data to the user.

**INSTRUCTIONS:**

In the console/terminal, type one of the following commands:
   * node liri.js concert-this
   * node liri.js spotify-this-song
   * node liri.js movie-this

Followed by the musician, song, or movie you'd like to search for:
   * node liri.js concert-this Paramore
   * node liri.js spotify-this-song Pools
   * node liri.js movie-this Mean Girls

The response is retrieved from the following API's:
   * concert-this: Bands In Town
     * _NOTE: this command will only return a meaningful response for artists who have upcoming shows scheduled; otherwise, you will be prompted to choose another artist._
   * spotify-this-song: Spotify
   * movie-this: OMDB

