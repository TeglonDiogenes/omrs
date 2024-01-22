const { debug, getProfileId, isNumber } = require("../../lib");

//TODO add function that checks if profile exist

const matchSimilarProfiles = async (session, profileAutoId) => {
    const result = await session.run(
        `MATCH (p1:Profile)-[:RATED]->(m:Movie)<-[:RATED]-(p2:Profile)
        WHERE ID(p1) = $profileAutoId
        WITH p2, COLLECT(DISTINCT m.title) AS commonMovies
        RETURN p2`,{profileAutoId}
    );

    debug('matched similar profile movies:', result);
    return result;
}


const addProfile = async (session, profileUri) => {
    let profileId = getProfileId(profileUri);
    if (!isNumber(profileId)) {
        throw new Error("Unable to get profile id from " + profileUri);
    } else {
        profileId = "PROFILE_" + profileId
    }
    const result = await session.run(
        `CREATE (${profileId}:Profile {profileUri:${profileUri}}})`
    );

    debug('add Profile result:', result);
    return profileUri;

}

module.exports = { addProfile,matchSimilarProfiles }