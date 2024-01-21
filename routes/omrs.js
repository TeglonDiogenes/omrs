var express = require('express');
var router = express.Router();
const { debug, addMovie, initSession } = require("../lib");
const dotenv = require('dotenv');
dotenv.config();
const { URI, USER, PASSWORD } = process.env;

const { driver, session } = initSession(URI, USER, PASSWORD);

router.post('/create-movie', async function (req, res, next) {
    const { title, released, tagline } = req.body;
    const movieId = await addMovie(session,{title, released, tagline});
    res.send({movieId});
});

router.post('/rank/:movieId', function (req, res, next) {

});

router.get('/suggest-movies/:facebookProfileUri', function (req, res, next) {

});
router.get('/suggest-similar-profiles/:facebookProfileUri', function (req, res, next) {

});
module.exports = router;
