const ChatRoomRepository = require('../repository/chatRoomRepository');

const chatRoomRepository = new ChatRoomRepository();


class ChatRoomController {
    async createRoom(req, res) {
        const { room_name, is_group } = req.body;

        try {
            const chatRoom = await chatRoomRepository.createChatRoom({ room_name, is_group });
            res.status(201).json({ message: 'Chat room created successfully', chatRoom });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getRooms(req, res) {
        try {
            const chatRooms = await chatRoomRepository.findAllChatRooms();
            res.json(chatRooms);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteChatRoom(req, res) {
        try {
            const { id } = req.params;
            const deletedRoom = await chatRoomRepository.deleteChatRoom(id);
            res.status(200).json({ message: 'Chat room deleted successfully', room: deletedRoom });
        } catch (error) {
            if (error.message === 'Chat room not found') {
                return res.status(404).json({ message: 'Chat room not found' });
            }
            console.error('Error deleting chat room:', error);
            res.status(500).json({ message: 'Error deleting chat room', error: error.message });
        }
    }
}

module.exports = ChatRoomController;
