const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user')
const ChatRoom = require('./chatRoom')

const Message = sequelize.define('Message', {
    message_id: {
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: DataTypes.TEXT,
    message_type: {
        type:  DataTypes.ENUM('text', 'Image', 'video', 'pdf'),
        defaultValue: 'text',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Message.belongsTo(User, { foreignKey: 'user_id' });
Message.belongsTo(ChatRoom, { foreignKey: 'chat_room_id' });

module.exports = Message;