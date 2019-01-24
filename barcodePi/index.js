const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function(req, res,next) {
    res.status(200).send('<h3>Status: <span style="color:green">Up</span></h3>')
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (barcode) {
  barcode = barcode.trim()
  io.emit('barcode', barcode);
})

server.listen(5200);

io.on('connection', function(client) {
    console.log('Client connected');
});
