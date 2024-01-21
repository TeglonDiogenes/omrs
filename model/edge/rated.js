const { debug } = require("../../lib");

const addRating = async (session, movieId, profileUri, rating) => {

    try {
        result = await session.run(
            `MATCH (p:Profile {profileUri: $profileUri})
             MATCH (m:Movie {movieId: $movieId})
             CREATE (p)-[:RATED {rating: $rating}]->(m)`,
            { profileUri, movieId, rating }
        )
        debug('add Rating result:', result)
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        return node.properties.id;
    } finally {

        await session.close()
    }
}

module.exports = { addRating };