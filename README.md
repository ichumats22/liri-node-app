# liri-node-app | INSTRUCTIONS:
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
        * NOTE: this command will only return a meaningful response for artists who have upcoming shows scheduled; otherwise, you will be prompted to choose another artist.
   * spotify-this-song: Spotify
   * movie-this: OMDB
