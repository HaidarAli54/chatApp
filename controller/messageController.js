const MessageRepository = require('../repository/messageRepository');

const messageRepository = new MessageRepository();



class MessageController {
    async sendMessage(req, res) {
        const { chat_room_id, user_id, content, message_type } = req.body;

        if (!chat_room_id || !user_id || !content || !message_type) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        try {
            const message = await messageRepository.createMessage({ 
                chat_room_id, 
                user_id, content, 
                message_type 
            });

            req.io.to(chat_room_id).emit('receiveMessage',  message);

            res.status(201).json({ message: 'message send succes' })

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getMessagesByRoom(req, res) {
        const { chatRoomId } = req.params;
        try {
            const messages = await messageRepository.findMessagesByChatRoomId(chatRoomId);
            res.json(messages);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = MessageController;