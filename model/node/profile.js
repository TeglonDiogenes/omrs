const { debug, getProfileId, isNumber } = require("../../lib");

//TODO add function that checks if profile exist

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

module.exports = { addProfile }