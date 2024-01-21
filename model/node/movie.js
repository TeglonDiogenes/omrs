const { debug } = require("../../lib");

// CREATE (TheMatrix:Movie {title:'The Matrix', released:1999, tagline:'Welcome to the Real World'})

const addMovie = async (session, metaData) => {
    const {title} = metaData;
    let joinedTitle, result;
    if (title) {
        joinedTitle = title.split(" ").join("")
    } else {
        throw new Error("In order to add movie you need to define it's title at least.")
    }
    try {
         result = await session.run(
          `CREATE (${joinedTitle}:Movie ${JSON.stringify(metaData)})`
        )
        debug('add Movie result:', result)
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)
      
        return node.properties.id;
      } finally {

        await session.close()
        // TODO return movie id
      }
}

module.exports = {addMovie}