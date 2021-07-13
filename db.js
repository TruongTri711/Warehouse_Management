// ====================== lowdb ====================== 
var  low = require('./lowdb-1.0.0/src/main')
var FileSync = require('./lowdb-1.0.0/src/adapters/FileSync')
// cách coderx
var adapter = new FileSync('db.json')
var db = low(adapter)
// cách ông nước ngoài
//var db = low(new FileSync('db.json'))
db.defaults({ users: [] }).write()
// ===================================================

module.exports = db;