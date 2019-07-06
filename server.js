const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
const server = app.listen(1000);
const io = require('socket.io')(server);
var path = require("path");
var counter = 0;
var bodyParser = require('body-parser');
var session = require('express-session');


app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

app.get('/', (req, res) => {
    var results = req.body;
    res.render('index.ejs', {
        results:results
    });
});


io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    socket.on("posting_form", function (results) {
        socket.emit("random_number", {
            random_number: Math.floor(Math.random() * 1000) + 1
        });
        console.log("You emitted the following information to the server: " + results.name + " " + results.location + " " + results.language + " " + results.comment)
        socket.emit("updated_message", {
            response: results
        });
    })
})