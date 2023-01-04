const mysql = require('mysql')
const db = mysql.createConnection({
host: "35.157.117.28",
user: "u713542740_dimaipatii",
password: "Xz9E8YthM2Z#N$v",
database:"u713542740_Time",
connectionLimit: 10 
})

module.exports = db;