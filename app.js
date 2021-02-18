var http = require('http');
var fs = require('fs');

var index = fs.readFileSync('index.html');

var SerialPort = require("serialport");

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimeter: '\r\n'
});

var port = new SerialPort('COM9', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);



var app = http.createServer(function(req,res) {
    
    res.writeHead(200, {'Content_Type':'text/html'});
    res.end(index);
    
});

var io = require('socket.io')(app);


io.on('connection', function(socket) {
    console.log('Node is listeningm on connection');

});

parser.on('data', function(data) {
    console.log(data);

    io.emit('data', data);
});



app.listen(3000, () => {
    console.log('go to localhost:3000')
});