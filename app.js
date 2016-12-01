var SerialPort = require('serialport');
var config = require('./config.json');
var port = new SerialPort(config.serialPort);

function log(err) {
    console.log('Arduino met a problem: ');
    console.log(err.message);
    console.log('=======================');
}

port.on('open', function () {
    port.on('data', function (chunk) {
        console.log(chunk.toString('utf8'));
    });
    port.write('2016-11-11', function (err) {
        if (err) {
            log(err);
        }
    });
});

// open errors will be emitted as an error event
port.on('error', function (err) {
    log(err);
});