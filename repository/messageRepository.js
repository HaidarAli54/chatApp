const Message = require('../models/message');

class MessageRepository {
    async createMessage(messageData) {
        return await Message.create(messageData);
    }

    async findMessagesByChatRoomId(chatRoomId) {
        return await Message.findAll({ where: { chat_room_id: chatRoomId }, order: [['created_at', 'ASC']] });
    }
}

module.exports = MessageRepository
