// Pasquete API de Spotify
var SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste here your credentials
var clientId = 'e92b8106189f4f3da004377c102ab1a7',
    clientSecret = '8dc1646a18974e0598fd6503d190c9f0';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
})

const express = require('express');
const app = express();
const expressLayouts     = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//You'll need a basic index route, that renders a home page.

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/artists', function (req, res) {
  console.log(req);
  let artistSearch = req.query.artist;
  spotifyApi.searchArtists(artistSearch)
  .then(function(data) {
    let artistsArray = data.body.artists.items;
    res.render('artists', {artists: artistsArray});

  }, function(err) {
    console.error(err);
});
});


// El servidor esta escuchando en ese puerto
app.listen(3000, () => {
  console.log("Puerto 3000 Escuchando")
});
