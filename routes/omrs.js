var express = require('express');
var router = express.Router();
const { debug, addMovie, initSession } = require("../lib");
const { addMovie } = require("../model/node/movie");
const { addProfile } = require("../model/node/profile");
const { addRating } = require("../model/edge/rated");
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

router.post('/rank/:movieId', async function (req, res, next) {
    const { profileUri, raiting } = req.body;
    const movieId = req.params.movieId;
    // TODO add profile if not exists, otherwise use existing node
    await addProfile(session,profileUri);
    const response = await addRating(session,movieId,profileUri, raiting);
    debug(response);
    // TODO should i close the session here ?
    res.send(response);
});

router.get('/suggest-movies/:facebookProfileUri', function (req, res, next) {

});
router.get('/suggest-similar-profiles/:facebookProfileUri', function (req, res, next) {

});
module.exports = router;
