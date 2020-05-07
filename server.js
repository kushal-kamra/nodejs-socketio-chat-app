var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    console.log('Mongo Connected');
});

var Message = mongoose.model('Message', {
    name: String,
    message: String
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body);
        var saved_message = await message.save(); 
        io.emit('message', req.body);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});
