const graphqlHTTP = require('express-graphql')
const router = require('express').Router()
const util = require('../util/util')
const schema = require('../schema/index')

router.get('/', graphqlHTTP({
    schema,
    graphiql: !util.isProduction()
}))

router.post('/', graphqlHTTP({
    schema,
    graphiql: false
}))

module.exports = router
