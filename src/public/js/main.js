$(function () {

    const socket = io();

    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    const $users = $('#nombresdeusuarios')

    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit('nuevo usuario', $nickname.val(), data => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                $nickError.html(` 
                <div class =alert alert-danger> Este usuario ya existe. 
                </div>  
                `);
            }
            $nickname.val('');
        });
    });

    $messageForm.submit(e => {
        e.preventDefault();
        socket.emit('enviar mensaje', $messageBox.val());
        $messageBox.val('');
    });

    socket.on('nuevo mensaje', function(data) {
        $chat.append('<b>' + data.nick + '</b>:' + data.msg + '</br>');
    });

    socket.on('nombresdeusuario', data => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]} </p>`
        }
        $users.html(html);
    });
})