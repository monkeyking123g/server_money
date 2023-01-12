// const mysql = require('mysql')
// const db = mysql.createConnection({
// host: "185.166.188.103",
// // port:3306,
// user: "u713542740_dimaipatii",
// password: "Xz9E8YthM2Z#N$v",
// database:"u713542740_Time",
// connectionLimit: 10 
// })

// module.exports = db;

const mysql = require('mysql')
const db = mysql.createConnection({
host: "containers-us-west-182.railway.app",
// port: 6229,
user: "root",
password: "6HYgKnxOv3oDJbRL8apl",
database:"railway",
connectionLimit: 10 
})

module.exports = db;