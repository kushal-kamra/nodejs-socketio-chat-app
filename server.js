var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

var messages = [
    {name: 'Tim', message:'Hi'},
    {name: 'Jane', message:'Hi'},
    {name: 'Mary', message:'Hi'},
    {name: 'Ari', message:'Hi'}
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});