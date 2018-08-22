//import {COMMAND, REGISTER_DEVICE, DEVICE} from 'constants.js';
//TODO: Get imports working!

const COMMAND = 'Command';
const COMMANDS = {
    REGISTER_DEVICE: 'Register Device',
    UPDATE: 'Update',
    DISPLAY: 'Display'
};

const DISPLAY = {
    TASK_ID: '',
    
};

const DEVICE = 'Device';
const DEVICE_DETAILS = {
    DESCRIPTION: 'Description',
    LIST: 'Device List'
};

const INTERFACE = 'Interface';
const INTERFACE_DETAILS = {
    UNIQUE_IDENTIFIER: 'Unique Identifier',
    CODE: 'Code',
    DESCRIPTION: 'Description',
    LIST: 'Interface List'
};

const TASK = 'Task';
const TASK_DETAILS = {
    ON_OFF_CONTROL: 'On Off Control',
    DISPLAY_EFFECT: 'Display Effect',
    RGB: 'Rgb',
    LIST: 'Task List'
}

const ON_OFF_CONTROLS = {
    MANUAL = 'Manual',
    TIMER = 'Timer'
}

const DISPLAY_EFFECTS = {
    SIMPLE = 'Simple'
}



//TODO: Create consistency between device list, interface and Tasks

const sample_json = {
    [COMMAND]: COMMANDS.UPDATE,
    [DEVICE_DETAILS.LIST]: [
        {
            [DEVICE_DETAILS.DESCRIPTION]: 'test device 1',
            [INTERFACE_DETAILS.LIST]: [
                {
                    [INTERFACE_DETAILS.UNIQUE_IDENTIFIER]: 'NP01',
                    [INTERFACE_DETAILS.CODE]: 'NP',
                    [INTERFACE_DETAILS.DESCRIPTION]: '1st test',
                    [TASK_DETAILS.LIST]: [
                        {
                            [TASK_DETAILS.ON_OFF_CONTROL]: ON_OFF_CONTROLS.MANUAL,
                            [TASK_DETAILS.DISPLAY_EFFECT]: DISPLAY_EFFECTS.SIMPLE,
                            [TASK_DETAILS.RGB]: [0, 25, 0]
                        }, {
                            [TASK_DETAILS.ON_OFF_CONTROL]: ON_OFF_CONTROLS.TIMER,
                            [TASK_DETAILS.DISPLAY_EFFECT]: DISPLAY_EFFECTS.SIMPLE,
                            [TASK_DETAILS.RGB]: [[25, 0, 0], [0, 25, 0], [0, 0, 25]]
                        }
                    ]
                }, {
                    [INTERFACE_DETAILS.UNIQUE_IDENTIFIER]: 'NP02',
                    [INTERFACE_DETAILS.CODE]: 'NP',
                    [INTERFACE_DETAILS.DESCRIPTION]: '2nd test',
                    [TASK_DETAILS.LIST]: []
                } 
            ]
        }, {
            [DEVICE_DETAILS.DESCRIPTION]: 'test device 2',
            [INTERFACE_DETAILS.LIST]: [
                {
                    [INTERFACE_DETAILS.UNIQUE_IDENTIFIER]: '5001',
                    [INTERFACE_DETAILS.CODE]: '50',
                    [INTERFACE_DETAILS.DESCRIPTION]: 'Test Fifty Fifty interface',
                    [TASK_DETAILS.LIST]: [
                        {
                            [TASK_DETAILS.ON_OFF_CONTROL]: ON_OFF_CONTROLS.MANUAL,
                            [TASK_DETAILS.DISPLAY_EFFECT]: DISPLAY_EFFECTS.SIMPLE,
                            [TASK_DETAILS.RGB]: [255, 125, 0]
                        }
                    ]
                } 
            ]
        }
    ]
}
function createTaskTable(task_list) {
    let task_table = document.createElement("table");
    
    for (let i = 0; i < task_list.length; i++) {
        
    }
    
    return task_table;
}

function createInterfaceButtonContainer(interface_details) {
    let button_container = document.createElement("div");
        
    let interface_dropdown_button = document.createElement("BUTTON");
    
    interface_dropdown_button.setAttribute('class', 'collapsible');
    interface_dropdown_button.innerHTML = interface_details[INTERFACE_DETAILS.UNIQUE_IDENTIFIER] + ": " + interface_details[INTERFACE_DETAILS.DESCRIPTION];
    //document.getElementById( "a" ).setAttribute( "onClick", "javascript: Boo();" );
        
    let task_details = document.createElement("div");
    task_details.setAttribute('class', 'content');
    
    task_details.innerHTML = 'Sample task';
    
    task_details = createTaskTable(interface_detail[TASK_DETAILS.LIST]);
        
    let task_para = document.createElement("p");
    task_para.innerHTML = 'Sample task';
        
    button_container.appendChild(interface_dropdown_button);
    button_container.appendChild(task_details);
        
    return button_container;
}

let device_list = sample_json['Device List'];

for (let device_i = 0; device_i < device_list.length; device_i++) {
    let device_div = document.createElement("div");
    
    let device_label = document.createElement("h1");
    device_label.innerHTML = device_list[device_i][DEVICE_DETAILS.DESCRIPTION];
    device_div.appendChild(device_label);
    
    //device_dropdown_button.className = "collapsible";
    console.log(device_list[device_i][INTERFACE_DETAILS.LIST]);
    
    let interface_list = device_list[device_i][INTERFACE_DETAILS.LIST];
    for (let interface_i = 0; interface_i < interface_list.length; interface_i++) {
        let button_container = createInterfaceButtonContainer(interface_list[interface_i]);
        device_div.appendChild(button_container);
    }
    
    
    let currentDiv = document.getElementById("div1"); 
    document.body.insertBefore(device_div, currentDiv); 
}

// ***************** W3 CODE ******************
function setContainersToCollapsible(){
    var coll = document.getElementsByClassName("collapsible");
var i;
//console.log(coll.length);
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
}

// ******************** END **********************

setContainersToCollapsible();

//<button class="collapsible">Open Collapsible</button>
 //               <div class="content">
 //                   <p>Lo ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  // </div>
 //       </div>


let server_address = window.location.hostname;
server_address = '192.168.0.103';
let mySocket = new WebSocket("ws://" + server_address + ":9000/ws");

window.addEventListener("load", function () {
    // create websocket instance

    // add event listener reacting when message is received
    mySocket.onmessage = function (event) {
        let msg = JSON.parse(event.data);
        console.log(msg);
        
        if (msg[COMMAND] === COMMANDS.UPDATE) {
            console.log("Update command received!");
        }

//        if (msg.cmd === 'AUTHENTICATE') {
//            text_login_status.textContent = msg.status;
//        } else if (msg.cmd === 'CREATE_USER') {
//            text_create_member_status.textContent = msg.status;
//        } else if (msg.cmd === 'MESSAGE') {
//            text_output.textContent = msg.text;
//            text_output_sender.textContent = msg.sender + " said: ";
//        }

    };
    //let form = document.getElementsByClassName("foo");
});

document.getElementById("button_register").addEventListener("click", function () {
    let client_msg = {
        [COMMAND]: COMMANDS.REGISTER_DEVICE, 
        [DEVICE]: {
            [DEVICE_DETAILS.DESCRIPTION]: 'Admin accessing PixelPi from website'
        },
        [INTERFACE]: [{
            [INTERFACE_DETAILS.UNIQUE_IDENTIFIER]: 'AD01',
            [INTERFACE_DETAILS.CODE]: 'AD',
            [INTERFACE_DETAILS.DESCRIPTION]: 'Admin accessing PixelPi from website'
        }]
    };

    mySocket.send(JSON.stringify(client_msg));
    //e.preventDefault()
});


document.getElementById("button_display").addEventListener("click", function () {
    let r = document.getElementById("r_text_input");
    let g = document.getElementById("g_text_input");
    let b = document.getElementById("b_text_input");
    
    let client_msg = {
        [COMMAND]: COMMANDS.DISPLAY, 
        [DEVICE]: {
            [DEVICE_DETAILS.DESCRIPTION]: 'Admin accessing PixelPi from website'
        },
        [INTERFACE]: [{
            [INTERFACE_DETAILS.UNIQUE_IDENTIFIER]: 'AD01',
            [INTERFACE_DETAILS.CODE]: 'AD',
            [INTERFACE_DETAILS.DESCRIPTION]: 'Admin accessing PixelPi from website'
        }]
    };

    mySocket.send(JSON.stringify(client_msg));
    //e.preventDefault()
});

document.getElementById("button_sign_in").addEventListener("click", function () {
    let text_existing_username_input = document.getElementById("text_existing_username_input");
    let text_existing_password_input = document.getElementById("text_existing_password_input");

    mySocket.send(JSON.stringify({cmd: 'AUTHENTICATE', username: text_existing_username_input.value, password: text_existing_password_input.value}))
    //e.preventDefault()
});

document.getElementById("button_send_chat").addEventListener("click", function () {
    let text_chat_input = document.getElementById("text_chat_input");
    
    input_text = text_chat_input.value;
    mySocket.send(JSON.stringify({cmd: 'MESSAGE', text: input_text}))
    //e.preventDefault()
});