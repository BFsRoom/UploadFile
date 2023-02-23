import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config()

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "tests"
})

connection.connect(error => {
    if (error) {
        console.log(error.message)
    }

    console.log('db connected')
})

export default connection