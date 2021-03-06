
module.exports = function (io) {

    let nicknames = [];

    io.on('connection', socket => {
        console.log('nuevo usuario conectado');

        socket.on('nuevo usuario', (data, cb) => {
            if (nicknames.indexOf(data) != -1) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
               updateNicknames();
            }
        });

        socket.on('enviar mensaje', data => {
            io.sockets.emit('nuevo mensaje', {
                msg: data, 
                nick: socket.nickname
            });
        });
        
        socket.on('disconnect', data => {
            if (!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            updateNicknames();
        });

        function updateNicknames(){
            io.sockets.emit('nombresdeusuario', nicknames);
        }
    })
}