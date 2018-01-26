const { 
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLFloat
} = require('graphql')
const type = require('./type')
const Bacon = require('./bacon')

// Defines the mutations
module.exports = {
    addBacon: {
        type,
        args: {
            type:   { type: new GraphQLNonNull(GraphQLString) },
            price:  { type: new GraphQLNonNull(GraphQLFloat) },
        },
        resolve: Bacon.createEntry.bind(Bacon)
    },
    updateBacon: {
        type,
        args: {
            id:     { type: GraphQLID },
            type:   { type:new GraphQLNonNull(GraphQLString) },
            price:  { type: new GraphQLNonNull(GraphQLFloat) },
        },
        resolve: Bacon.updateEntry.bind(Bacon)
    }
}
