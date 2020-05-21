const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const topicrouter = require('./routes/topicrouter');
const userController = require('./controllers/userController')
const sessionController = require('./controllers/sessionController')

let app = express();
let port = process.env.PORT || 3001;

var mongoose = require('mongoose');
//var mongoDB = 'mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
var mongoDB = 'mongodb+srv://foorumiadmin:ig00LU@foorumi-rhnp0.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {userNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

// LOGIN API

// Register new user
app.post("/register", userController.user_create_post);

// Update user
app.put("/users/:id", middleware.checkToken, userController.user_update_put);

app.post("/login", sessionController.login_post);

// Get all users
app.get("/users", userController.user_list_get);

// Get user
app.get("/users/:id", userController.user_get);

// Delete user
app.delete("/users/:id", middleware.checkToken, userController.user_delete);

app.post("/logout", middleware.checkToken, sessionController.logout_post);

app.use("/api", topicrouter);
app.listen(port);
console.log("Running on port " + port);