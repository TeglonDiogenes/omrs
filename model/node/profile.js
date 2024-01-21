const { debug, getProfileId, isNumber } = require("../../lib");

// CREATE (TheMatrix:Profile {title:'The Matrix', released:1999, tagline:'Welcome to the Real World'})

const addProfile = async (session, profileUri) => {

    //TODO add unique constraint


    // get profile id + prefixi with Profile to create a string
    // ensure that profile id is number
    let profileId = getProfileId(profileUri);
    if (!isNumber(profileId)) {
        throw new Error("Unable to get profile id from " + profileUri);
    } else {
        profileId = "PROFILE_" + profileId
    }
    // try {
    const result = await session.run(
        `CREATE (${profileId}:Profile {profileUri:${profileUri}}}) RETURN ${profileId}`
    );

    debug('add Profile result:', result);
    return `${profileId}:Profile`;
    //   } 
    //TODO throw exeption if profile exists ? or handle in composed function?
    // TODO session should be closed when profile and rating edge is created
    //   finally {
    //     await session.close()
    //   }
}

module.exports = { addProfile }