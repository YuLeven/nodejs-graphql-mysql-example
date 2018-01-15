const mysql = require('mysql')

class MySQLConnector {

    //This constant-like getters will be used to connect to MySQL
    get MYSQL_DB_USER() { return process.env.MYSQL_DB_USER || 'root' }
    get MYSQL_DB_NAME() { return process.env.MYSQL_DB_NAME || 'exapp' }
    get MYSQL_DB_PASSWORD() { return process.env.MYSQL_DB_PASSWORD || '' }
    get MYSQL_DB_ADDRESS() { return process.env.MYSQL_DB_ADDRESS || 'localhost' }
    get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOL_SIZE || 10 }

    constructor() {
        //Instantiates the connection pool
        this.internalPool = mysql.createPool({
            host: this.MYSQL_DB_ADDRESS,
            user: this.MYSQL_DB_USER,
            database: this.MYSQL_DB_NAME,
            password: this.MYSQL_DB_PASSWORD,
            connectionLimit: this.MYSQL_DB_POOL_SIZE,
            waitForConnections: true
        })

        //Allows better control of openned connections
        this.registerThreadCounter()
    }

    /**
     * 
     * 
     * Registers an event lister to capture when new connections are oppened
     * This method uses console.log, but in an production environment you'd probably
     * use a async log write such as winston since console.log is blocking
     * 
     */
    registerThreadCounter() {
        this.internalPool.on('connection', (connection) => console.log(`New connection stablished with server on thread #${connection.threadId}`))
    }

    /**
     * 
     * 
     * Retrieves the connection pool
     * 
     */
    get pool() {
        return this.internalPool
    }
}

//Exports the connector singleton to be used by the wrapper
module.exports = new MySQLConnector()