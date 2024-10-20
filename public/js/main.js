const socket = io('http://localhost:3000');


const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('room_name');
const userList = document.getElementById('users');


if (roomName) {
    document.getElementById('room-name').textContent = roomName; // Menampilkan room_name

    // Mengirim informasi pengguna dan room ke server
    socket.emit('joinRoom', { roomName });
}

const chatMessages = document.querySelector('.chat-messages');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('msg');

socket.on('message', ({ message }) => {
    console.log(message)
    outputMessage({ message }); // Panggil fungsi untuk menampilkan pesan

    chatMessages.scrollTop = chatMessages.scrollHeight;
});


chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let msg = e.target.elements.msg.value;
    msg = msg.trim();
    if (!msg) {
        return false;
    }
  // Emit message to server
    socket.emit('chatMessage', msg);
  // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}


socket.on('message', (msg) => {
    const chatMessages = document.querySelector('.chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = msg; // Menampilkan pesan dari bot
    chatMessages.appendChild(messageElement);
});

function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
}

document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '/public/index.html';
    } else {
    }    
});

