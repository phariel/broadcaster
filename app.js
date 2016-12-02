var SerialPort = require('serialport');
var config = require('./config.json');
var port = new SerialPort(config.serialPort, {
    baudRate: 9600
});
var toUnicodeForIFlyTek = function (theString) {
    var unicodeArray = ['0xFD', '0x00', '', '0x01', '0x03'];
    var unicodeContentArray = [];
    var bitPrefix = '0x';
    var bitLength = '';

    for (var i = 0; i < theString.length; i++) {
        var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
        while (theUnicode.length < 4) {
            theUnicode = '0' + theUnicode;
        }
        unicodeContentArray.push(bitPrefix + theUnicode.substring(2, 4));
        unicodeContentArray.push(bitPrefix + theUnicode.substring(0, 2));
    }
    bitLength = (unicodeContentArray.length + 2).toString(16).toUpperCase();
    while (bitLength.length < 2) {
        bitLength = '0' + bitLength;
    }
    unicodeArray[2] = bitPrefix + bitLength;
    unicodeContentArray.forEach(function (v) {
        unicodeArray.push(v);
    });

    console.log(unicodeArray);

    return unicodeArray;
};

var tts1 = new Buffer(toUnicodeForIFlyTek("萨穆埃尔好帅！"));

function log(err) {
    console.log('Arduino met a problem: ');
    console.log(err.message);
    console.log('=======================');
}

port.on('open', function () {
    console.log('OPENING');
    port.on('data', function (chunk) {
        console.log(chunk.toString('utf8'));
    });
    port.write(tts1, function (err, res) {
        if (err) {
            log(err);
        } else {
            console.log(res);
        }
    });
});

// open errors will be emitted as an error event
port.on('error', function (err) {
    log(err);
});