const { GraphQLObjectType } = require('graphql')
const baconMutation = require('../model/bacon/mutations')

module.exports = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        addBacon: baconMutation.addBacon,
        updateBacon: baconMutation.updateBacon
    }
})