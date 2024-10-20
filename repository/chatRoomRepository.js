const ChatRoom = require('../models/chatRoom');

class ChatRoomRepository {
    async createChatRoom(roomData) {
        return await ChatRoom.create(roomData);
    }

    async findChatRoomById(roomId) {
        return await ChatRoom.findByPk(roomId);
    }

    async findAllChatRooms() {
        return await ChatRoom.findAll();
    }
    async deleteChatRoom(chat_room_id) {
        const room = await this.findChatRoomById(chat_room_id);
        if (!room) {
            throw new Error('Chat room not found');
        }
        await room.destroy(); // Hapus entri
        return room; // Kembalikan ruangan yang dihapus
    }
}

module.exports = ChatRoomRepository
