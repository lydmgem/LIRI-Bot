require("dotenv").config();

// Load required Node Modules
var spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require('fs'); // file system
var moment = require('moment');

// Load Spotify keys
var keys = require('./keys.js');

// Command line arguments
var cmd = process.argv;

// LIRI command
var liriCommand = cmd[2];