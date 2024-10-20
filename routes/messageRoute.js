const express = require('express');
const MessageController = require('../controller/messageController');

const messageController = new MessageController();
const router = express.Router();

router.post('/', messageController.sendMessage);
router.get('/:chatRoomId', messageController.getMessagesByRoom);

module.exports = router;

