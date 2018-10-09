var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function() {
    // we emit a connected message to let knwo the client that we are connected.
    socket.emit('client_connected', {data: 'New client!'});
});

socket.on('message', function (data) {
    console.log('MESSAGE')
    console.log('message form backend ' + data);
});

socket.on('alert', function (data) {
    console.log('ALERT')
    alert('Alert Message!! ' + data);
});

function json_button() {
    socket.send('json_button', '{"message": "test"}');
}

function alert_button() {
    socket.emit('alert_button', 'Message from client!!')
}