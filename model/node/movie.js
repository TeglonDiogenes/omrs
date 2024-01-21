const { debug } = require("../../lib");

// CREATE (TheMatrix:Movie {title:'The Matrix', released:1999, tagline:'Welcome to the Real World'})

const addMovie = async (session, metaData) => {
    const {title} = metaData;
    let joinedTitle;
    if (title) {
        joinedTitle = title.split(" ").join("")
    } else {
        throw new Error("In order to add movie you need to define it's title at least.")
    }
    try {
        const result = await session.run(
          `CREATE (${joinedTitle}:Movie ${JSON.stringify(metaData)})`
        )
      
        debug('add Movie result:', result)
      } finally {
        await session.close()
      }
}

module.exports = {addMovie}