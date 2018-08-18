// https://pastebin.com/twP1Ksv4

var mySocket = new WebSocket("ws://localhost:9000/ws");

window.addEventListener("load", function () {
    // create websocket instance

    // add event listener reacting when message is received
    mySocket.onmessage = function (event) {
        var output = document.getElementById("output");
        // put text into our output div
        //output.textContent = event.data;

        msg = JSON.parse(event.data);
        //var output = document.getElementById("text_output");

        if (msg.cmd === 'AUTHENTICATE') {
            text_login_status.textContent = msg.status;
        } else if (msg.cmd === 'CREATE_USER') {
            text_create_member_status.textContent = msg.status;
        } else if (msg.cmd === 'MESSAGE') {
            text_output.textContent = msg.text;
            text_output_sender.textContent = msg.sender + " said: ";
        }

    };
    //var form = document.getElementsByClassName("foo");
});


document.getElementById("button_create_member").addEventListener("click", function () {
    var text_new_username_input = document.getElementById("text_new_username_input");
    var text_new_password_input = document.getElementById("text_new_password_input");

    mySocket.send(JSON.stringify({cmd: 'CREATE_USER', username: text_new_username_input.value, password: text_new_password_input.value}))
    //e.preventDefault()
})

document.getElementById("button_sign_in").addEventListener("click", function () {
    var text_existing_username_input = document.getElementById("text_existing_username_input");
    var text_existing_password_input = document.getElementById("text_existing_password_input");

    mySocket.send(JSON.stringify({cmd: 'AUTHENTICATE', username: text_existing_username_input.value, password: text_existing_password_input.value}))
    //e.preventDefault()
})

document.getElementById("button_send_chat").addEventListener("click", function () {
    var text_chat_input = document.getElementById("text_chat_input");
    
    input_text = text_chat_input.value;
    mySocket.send(JSON.stringify({cmd: 'MESSAGE', text: input_text}))
    //e.preventDefault()
})