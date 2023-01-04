const mysql = require('mysql')
const db = mysql.createConnection({
host: "timeappstart.com",
user: "u713542740_dimaipatii",
password: "Xz9E8YthM2Z#N$v",
database:"u713542740_Time",
connectionLimit: 10 
})

module.exports = db;