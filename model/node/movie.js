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
      }
}

const matchRecomendedMovies = async (session, profileAutoId) => {
  const result = await session.run(
      `MATCH (p1:Profile)-[:RATED]->(m:Movie)<-[:RATED]-(p2:Profile)
       WHERE ID(p1) = $profileAutoId
       WITH p1, COLLECT(DISTINCT m.title) AS commonMovies
       RETURN commonMovies`,{profileAutoId}
  );

  debug('matched recomended movies:', result);
  return result;
}
module.exports = {addMovie,matchRecomendedMovies}