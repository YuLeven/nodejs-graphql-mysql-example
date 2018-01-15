NodeJS graphQL MySQL example
==================================

This is a simple experimental example of how to match graphql-js and MySQL for the implementation of a GraphQL API.

- This project requires a version of NodeJS with support for async-await

Getting Started
---------------

```sh
# clone the project
git clone git@github.com:YuLeven/nodejs-graphql-mysql-example.git
cd nodejs-graphql-mysql-example

# Install dependencies
npm install

# Run the server
PORT=8080 MYSQL_DB_USER=root MYSQL_DB_NAME=exapp MYSQL_DB_PASSWORD=secret MYSQL_DB_ADDRESS=localhost MYSQL_DB_POOL_SIZE=10 npm start

# Access GraphQLi
http://localhost:8080/graphql
```

Please remember to export the example SQL schema located in ./sql/exapp.sql

## Example operations

#### Show all bacons
```js
{
  bacons {
    id,
    type,
    price
  }
}
```

### Filter bacons by price
```js
{
  bacons(price: 25) {
    id,
    type,
    price
  }
}
```

### Gets a bacon by its ID
```js
{
  bacon(id: 1) {
    id,
    type,
    price
  }
}
```

### Adds a new bacon
```js
mutation {
  addBacon(type: "truffy", price: 99) {
    id,
    type
    price
  }
}
```

### Updates a bacon
```js
mutation {
  updateBacon(id: 1, type: "musky", price: 1) {
    id,
    type
    price
  }
}
```

License
-------

MIT