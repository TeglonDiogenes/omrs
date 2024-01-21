const neo4j = require('neo4j-driver');
const debug = require('debug')('omrs');

const initSession = (uri, user, password) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  const session = driver.session()
  return { driver, session };
}

const getProfileId = (profileUri) => {
  return parseInt(profileUri.split("/").pop().split("?")[0]);
}
function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}
module.exports = { debug, getProfileId, isNumber, addMovieRating, initSession }