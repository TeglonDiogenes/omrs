const { debug } = require("../../lib");

const getRatingEdges = async () => {
    edges = await session.run(
        `MATCH (m:Movie)
         WHERE ID(m) = 75
         MATCH (p:Profile)-[r:RATED]->(m)
         RETURN r`,
        { movieId }
    )
    debug('retrun Ratings edges:', edges)
    return edges;
}

const calculateAverageRating = (ratings) => {
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return null;
    }
    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / ratings.length;
    const roundedAverageRating = Math.round(averageRating * 100) / 100;
    return roundedAverageRating;
}

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
        // TODO recalculate average rating and store as property of Movie Node
        return node.properties.id;
    } finally {

        await session.close()
    }
}

module.exports = { addRating, getRatingEdges, calculateAverageRating};