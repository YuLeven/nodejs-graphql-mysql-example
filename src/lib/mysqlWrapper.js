const mySQLConnector = require('./mysqlConnector')

module.exports = class MySQLWrapper {
    
    /**
     * 
     * 
     * Queries the database
     * @param {String} query - The query itself
     * @param {Array} params - The parameters to be passed to MySQL
     * @returns {Promise} - A promise to a query result
     * 
     */
    static createQuery({query, params}) {

        return new Promise((succeed, fail) => {
            mySQLConnector.pool.getConnection((err, connection) => {

                //If an error was passed getting a connection, fails the promise sending it to the caller
                if (err) {
                    return fail(err)
                }

                //Runs the query
                connection.query(query, params, (err, rows) => {

                    //Releases the connection
                    connection.release()

                    //If an error was passed running the query, fails the promise sending it to the caller
                    if (err) {
                        return fail(err)
                    }

                    //Fulfills the promise
                    return succeed(rows)
                })
            })
        })
    }

    /**
     * 
     * 
     * Runs a transactional query
     * @param {MySQL.Connection} connection - The connection whose transaction will be used
     * @param {String} query - The query itself
     * @param {Array} params - The parameters to be passed to MySQL
     * @returns {Promise} - A promise to a query result
     * 
     */
    static createTransactionalQuery({query, params, connection}) {
        
        return new Promise((succeed, fail) => {

            connection.query(query, params, (err, rows) => {
                
                //If an error was passed running the query, fails the promise sending it to the caller
                if (err) {
                    return fail(err)
                }
                
                //Fulfills the promise
                return succeed(rows)
            })
        })
    }
    
    /**
     * 
     * 
     * Rollbacks a transaction
     * @param {MySQL.Connection} connection - The connection whose transaction will be rollbacked
     * @returns {Promise} - A promise to the rollback
     * 
     */
    static rollback(connection) {

        return new Promise((succeed, fail) => {

            try {
                connection.rollback(() => succeed())
            } catch (e) {
                return fail(e)
            } finally {
                connection.release()
            }

        })
    }

    /**
     * 
     * 
     * Commits a transaction
     * @param {MySQL.Connection} connection - The connection whose transaction will be commited
     * @returns {Promise} - A promise to the commit
     * 
     */
    static commit(connection) {

        return new Promise((succeed, fail) => {

            try {
                connection.commit(err => { 
                    if (err) { 
                        return rollback(connection, err)
                    }

                    return succeed()
                })
            } catch (e) {
                return fail(e)
            } finally {
                connection.release()
            }

        })

    }

    /**
     * 
     * 
     * Retrieves a connection from the pool to be used in transactions
     * @param {MySQL.Connection} connection - A connection from the pool
     * 
     */
    static getConnectionFromPool() {
        return new Promise((succeed, fail) => {

            mySQLConnector.pool.getConnection((err, connection) => {

                //Fails the promise if a connection cannot be retrieved
                if (err) {
                    return fail(err)
                }

                //Returns a conncetion
                return succeed(connection)
            })
        })
    }

    /**
     * 
     * 
     * Begins a new transaction in a connection
     * @param {MySQL.Connection} connection - A connection from the pool
     * 
     */
    static beginTransaction(connection) {
        return new Promise((succeed, fail) => {

            connection.beginTransaction(err => {

                //Fails the promise if the transaction cannot be opened
                if (err) {
                    return fail(err)
                }

                //Fulfills the promise
                return succeed(connection)
            })
        })
    }
}
