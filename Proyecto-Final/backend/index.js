const Server = require('./server.js')
//falta aprender esto
const {connectDB} = require('./models/sqlite/config/db.js');

connectDB()
const server = new Server("ejs");


server.listen();