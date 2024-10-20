const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const ChatRoom =  sequelize.define('ChatRoom', {
    chat_room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    room_name: DataTypes.STRING,
    is_group: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = ChatRoom