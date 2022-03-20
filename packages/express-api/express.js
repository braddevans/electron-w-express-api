// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⢿⣿⣿⠿⠛⠿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠉⠄⣀⡤⢤⣤⣈⠁⣠⡔⠶⣾⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⡿⠛⠋⠁⠄⠄⠄⣼⣿⠁⡀⢹⣿⣷⢹⡇⠄⠎⣿⣿⣿
// ⣿⣿⣿⠿⠛⠉⠁⠄⠄⠄⠄⠄⠄⠄⠹⣇⣀⣡⣾⣿⡿⠉⠛⠒⠒⠋⠉⢸
// ⡿⠋⠁⠄⠄⢀⣤⣤⡀⠄⠄⠄⠄⠄⠄⠈⠙⠛⠛⠉⠄⠄⠄⠄⠄⠄⠄⠈
// ⠄⠄⠄⠄⠄⢹⣧⡈⠿⣷⣄⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣠⢄⣾
// ⠄⠄⠄⠄⠄⠈⠻⢿⣶⣌⣙⡛⠛⠿⠶⠶⠶⠶⠶⠖⣒⣒⣚⣋⡩⢱⣾⣿
// ⠄⠄⠄⠄⠄⠄⠄⠄⠈⠉⠛⠛⠛⠻⠿⠿⠟⠛⠛⠛⠉⢉⣥⣶⣾⣿⣿⣿
// ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠒⠶⣿⣿⣿⣿⣿⣿⣿⣿
// ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿
// ⣿⡿⠛⠛⠛⢻⣿⠿⠛⠛⠛⢿⣿⣿⡿⠛⠛⠛⢻⡟⠛⣿⡿⠛⣻⣿⣿⣿
// ⡟⠄⣼⣿⣿⣿⡇⠄⣾⣿⣧⠄⢻⡏⠄⣼⣿⣿⣿⡇⠄⡟⢀⣴⣿⣿⣿⣿
// ⡇⠄⣿⣿⣿⣿⡄⠄⣿⣿⣿⠄⢸⡇⠄⣿⣿⣿⣿⡇⠄⣀⠈⢻⣿⣿⣿⣿
// ⣿⣄⠈⠙⠛⢻⣧⡄⠙⠛⠉⣠⣿⣷⣄⠈⠙⠛⢹⡇⠄⣿⣧⠄⠻⣿⣿⣿


const cors = require("cors");
const path = require('path');

const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

const db = require("./models");
const Role = db.role;
const logger = require('morgan');


const prodType = process.env.type.replaceAll("\'", "").replaceAll(" ", "");
const config = require(`../private-config/${prodType}/config.${prodType}.json`)
require("./middleware/loggingMiddleware")(app, config);


const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));


//setConnection().then(r => console.log);

async function setupDatabase() {
    if (!(await Role.findAll() > 0)) {
        db.sequelize.sync({force: true}).then(() => {
            console.log('Drop and Resync Db');
            initial();
        });
    }


    function initial() {
        Role.create({
            id: 1,
            name: "user"
        });

        Role.create({
            id: 2,
            name: "moderator"
        });

        Role.create({
            id: 3,
            name: "admin"
        });
    }

}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
const indexRoute = require("./routes/index")(express, config);
const authRoute = require("./routes/auth")(express, config);
const testRoute = require("./routes/tests")(express, config);
const messagesRoute = require("./routes/messages")(express, config);

app.set('view engine', 'ejs');
app.use("/", indexRoute.router)
app.use("/auth/", authRoute.router)
app.use("/test/", testRoute.router)
app.use("/messages/", messagesRoute.router)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (!prodType === "dev") {
    console.log("Express Process started")
} else {
    console.log("started on port: %s", config.port)
}

setupDatabase();

app.listen(config.port, '0.0.0.0')

module.exports = app;