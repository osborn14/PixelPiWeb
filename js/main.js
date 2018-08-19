import {COMMAND, REGISTER_DEVICE, DEVICE} from 'constants';

let server_address = window.location.hostname;
let mySocket = new WebSocket("ws://" + server_address + ":9000/ws");

window.addEventListener("load", function () {
    // create websocket instance

    // add event listener reacting when message is received
    mySocket.onmessage = function (event) {
        msg = JSON.parse(event.data);
        console.log(msg)

        if (msg.cmd === 'AUTHENTICATE') {
            text_login_status.textContent = msg.status;
        } else if (msg.cmd === 'CREATE_USER') {
            text_create_member_status.textContent = msg.status;
        } else if (msg.cmd === 'MESSAGE') {
            text_output.textContent = msg.text;
            text_output_sender.textContent = msg.sender + " said: ";
        }

    };
    //let form = document.getElementsByClassName("foo");
});

document.getElementById("button_register").addEventListener("click", function () {
    let client_msg = {
        COMMAND: REGISTER_DEVICE, 
        [DEVICE.DEVICE]: {
            [DEVICE.NAME]: 'Website',
            [DEVICE.CODE]: 'AD',
            [DEVICE.DESCRIPTION]: 'Admin accessing PixelPi from website'
        },
        
    }

    mySocket.send(JSON.stringify(client_msg))
    //e.preventDefault()
})


document.getElementById("button_create_member").addEventListener("click", function () {
    let text_new_username_input = document.getElementById("text_new_username_input");
    let text_new_password_input = document.getElementById("text_new_password_input");

    mySocket.send(JSON.stringify({cmd: 'CREATE_USER', username: text_new_username_input.value, password: text_new_password_input.value}))
    //e.preventDefault()
})

document.getElementById("button_sign_in").addEventListener("click", function () {
    let text_existing_username_input = document.getElementById("text_existing_username_input");
    let text_existing_password_input = document.getElementById("text_existing_password_input");

    mySocket.send(JSON.stringify({cmd: 'AUTHENTICATE', username: text_existing_username_input.value, password: text_existing_password_input.value}))
    //e.preventDefault()
})

document.getElementById("button_send_chat").addEventListener("click", function () {
    let text_chat_input = document.getElementById("text_chat_input");
    
    input_text = text_chat_input.value;
    mySocket.send(JSON.stringify({cmd: 'MESSAGE', text: input_text}))
    //e.preventDefault()
})