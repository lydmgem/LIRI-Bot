# LIRI-Bot

## Requirements
* Make a Node.js app that will depend on user input from the command line
* We will integrate Spotify and OMDb APIs using the appropriate NPM modules
* Using API calls to parse through returned JSON objects and output them accordingly in specified format.
* Read commands and queries from file.

## Technologies Used
* Node.js
* Javascript
* Spotify API (via node-spotify-api npm module)
* OMDb API (via Axios npm module)
* Bands In Town (via Axios npm module)
* Moment.js (to convert the date response from our concert data)
* FS (File System npm module)

## How To Use:

As the user, you are given four commands:
_concert-this, spotify-this-song, movie-this, do-what-it-says_

Upon deciding which command your LIRI Bot will be executing, you must type in your parameters (with or without the quotation marks) like so:
```
node liri.js spotify-this-song la bamba
```
An error will be displayed with a possible solution if the command is not executed properly, whether it is a user error or a server error.

## Examples

#### **"concert-this"**

- When the user searches for an artist, their tour dates will display.
![concert-this](https://github.com/lydmgem/LIRI-Bot/blob/master/assets/images/getconcert.png?raw=true)

#### **"spotify-this-song"**

- When the user searches for a song, the artist, song title, a song preview link, and the album the song is from will display.
(Disclaimer: some songs may or may not have a song preview link available.)
![spotify-this-song](https://github.com/lydmgem/LIRI-Bot/blob/master/assets/images/spotifyit.png?raw=true)

#### **"movie-this"**

- When the user searches for a movie, the information returned will include the title, year, IMDB rating, Rotten Tomatoes rating, production location, languages that it is available in, the plot, and the actors featured in the movie.
![movie-this](https://github.com/lydmgem/LIRI-Bot/blob/master/assets/images/getmovie.png?raw=true)

#### **"do-what-it-says"**

- We grabbed the information from our "random.txt" file which had __spotify-this-song_,"I Want It That Way"_ and incorporated it into our getReadme function.
![do-what-it-says](https://raw.githubusercontent.com/lydmgem/LIRI-Bot/master/assets/images/dwis.png)
