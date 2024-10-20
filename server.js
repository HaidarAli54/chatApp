const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRoute');
const messageRouter = require('./routes/messageRoute');
const chatRoomRouter = require('./routes/chatRoomRoute');
const socketIo = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const formatMessage = require('./utils/messages');

const botName = "RoomChat";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const rooms = [];

require('dotenv').config();
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/message', messageRouter);
app.use('/chatroom', chatRoomRouter);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Mengirim daftar room yang ada ke client
    socket.emit('roomList', rooms);

    // Event untuk membuat room baru
    socket.on('createRoom', (roomName) => {
        if (!rooms.includes(roomName)) {
            rooms.push(roomName);
            io.emit('roomCreated', roomName); // Update daftar room ke semua client
        }
    });

    // Event untuk join room
    socket.on('joinRoom', ({ roomName, username }) => {
        const user = userJoin(socket.id, username, roomName);
        socket.join(user.roomName);

        // Kirim pesan sambutan ke pengguna yang baru bergabung
        socket.emit('message', formatMessage(botName, 'Welcome to RoomChat!'));

        // Broadcast ke room saat pengguna bergabung
        socket.broadcast
            .to(user.roomName)
            .emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Kirim informasi pengguna dan room ke semua client dalam room
        io.to(user.roomName).emit('roomUsers', {
            room: user.roomName,
            users: getRoomUsers(user.roomName),
        });

        console.log(`User ${username} joined room ${roomName}`);
    });

    // Event untuk mengirim pesan
    socket.on('chat message', (msg) => {
        const user = getCurrentUser(socket.id);

        if (user && user.roomName) {
            io.to(user.roomName).emit('message', formatMessage(user.username, msg));
        }
    });

    // Event saat pengguna disconnect
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.roomName).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            // Perbarui daftar pengguna di room
            io.to(user.roomName).emit('roomUsers', {
                room: user.roomName,
                users: getRoomUsers(user.roomName),
            });
        }

        console.log('User disconnected:', socket.id);
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});
