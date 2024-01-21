const { debug } = require("../../lib");

// CREATE (TheMatrix:Profile {title:'The Matrix', released:1999, tagline:'Welcome to the Real World'})

const addProfile = async (session, profileUri) => {
    //TODO get profile id + prefixit with Profile to create a string
    //TODO ensure that profile id is number
    //TODO add unique constraint
    //TODO throw exeption if profile exists ? or handle in composoed function?
    try {
        const result = await session.run(
          `CREATE (${joinedTitle}:Profile {profileUri:${profileUri}}})`
        )
      
        debug('add Profile result:', result)
      } finally {
        await session.close()
      }
}

module.exports = {addProfile}