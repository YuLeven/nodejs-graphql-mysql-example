const { GraphQLList,
        GraphQLID,
        GraphQLString,
        GraphQLFloat } = require('graphql')
const type = require('./type')
const mutation = require('./mutations')
const Bacon = require("./bacon")

// Defines the queries
module.exports = {
    bacons: {
        type: new GraphQLList(type),
        args: {
            type: {
                type: GraphQLString
            },
            price: {
                type: GraphQLFloat
            }
        },
        resolve: Bacon.findMatching.bind(Bacon)
    },
    bacon: {
        type,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve: Bacon.getByID.bind(Bacon)
    }
}