var app = require('express')();
// passa o express para o http-server
var http = require('http').Server(app);
// passa o http-server par ao socketio
var io = require('socket.io')(http);

var count = 0;

// cria uma rota para fornecer o arquivo index.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
io.on('connection', function (socket) {

    console.log(socket.id);

    console.log('connected');
    count++;
    console.log('Count: ' + count);

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function (msg) {
        console.log(msg);
        console.log('disconnected');
        count--;
        console.log('Count: ' + count);
    });

    
});

// inicia o servidor na porta informada, no caso vamo iniciar na porta 3000
http.listen(8080, function () {
    console.log('Servidor rodando em: http://localhost:3000');
});