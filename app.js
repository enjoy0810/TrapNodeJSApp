const express       = require('express');
const path          = require('path');
const axios         = require('axios')

var app             = require('express')();
var http            = require('http').Server(app);
const router        = express.Router();

app.use(express.urlencoded());

app.use(express.json());

var savedInputs     = '';

router.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/:customurl',function(req,res) {
    res.json({'url': savedInputs});
});

router.post('/', function(req, res) {
    savedInputs     = req.body.myurl;

    var randStr     = generateRandomString();
    io.local.emit('message', randStr);
});

app.use('/', router);
var server          = app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

function generateRandomString(length = 10) {
    var charset     = "abcdefghijklmnopqrstuvwxyz0123456789",
    retVal          = "";

    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const { Server }    = require("socket.io");
const io            = new Server(server);

var _socket         = '';
io.on('connection', (socket) => {
    console.log('a user connected');
});