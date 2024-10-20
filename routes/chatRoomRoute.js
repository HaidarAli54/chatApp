const express = require('express');
const ChatRoomController = require('../controller/chatRoomController');
const authenticateToken =  require('../utils/auth');

const chatRoomController =  new ChatRoomController();

const router = express.Router();

router.post('/', authenticateToken, chatRoomController.createRoom);
router.get('/', authenticateToken, chatRoomController.getRooms);
router.delete('/:id', chatRoomController.deleteChatRoom);

module.exports = router;