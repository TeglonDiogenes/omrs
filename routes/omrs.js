var express = require('express');
var router = express.Router();
const { debug, addMovie, initSession } = require("../lib");
const { addMovie } = require("../model/node/movie");
const { addProfile } = require("../model/node/profile");
const { addProfile } = require("../model/edge/rated");
const dotenv = require('dotenv');
dotenv.config();
const { URI, USER, PASSWORD } = process.env;

const { driver, session } = initSession(URI, USER, PASSWORD);

router.post('/create-movie', async function (req, res, next) {
    const { title, released, tagline } = req.body;
    const movieId = await addMovie(session, { title, released, tagline });
    const response = { movieId };
    debug(movieId);
    res.send(response);
});

router.post('/rank/:movieId', function (req, res, next) {
    const { profileUri, rank } = req.body;
    const movieId = req.params.movieId;
    // create 
});

router.get('/suggest-movies/:facebookProfileUri', function (req, res, next) {

});
router.get('/suggest-similar-profiles/:facebookProfileUri', function (req, res, next) {

});
module.exports = router;
