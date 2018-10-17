const socket = io();

const form = document.querySelector('form');
const msg = document.querySelector('#m');
const feed = document.querySelector('#feed');
const ejsData = document.querySelector('#data');
const header = document.querySelector('#chat-header');

// Define a cor do header conforme a cor do usuário
header.style.backgroundColor = ejsData.dataset.color;

form.addEventListener('submit', (event) => {
    if(msg.value != ""){
        event.preventDefault();
        const li = document.createElement('li');
        li.innerHTML = `<strong style="color:${ejsData.dataset.color}"> ${ejsData.dataset.nick}:</strong> ${ msg.value}`;
        feed.appendChild(li);
        socket.emit('chat message', {msg: msg.value, nick: ejsData.dataset.nick, color: ejsData.dataset.color});
        msg.value = '';
    }
    return false;
}, true);

socket.on("chat message", (data) => {
    console.log(data);
    const li = document.createElement('li');
    li.innerHTML = `<strong style='color:${data.color}'>${data.nick}: </strong>${data.msg}`;
    feed.appendChild(li);
});