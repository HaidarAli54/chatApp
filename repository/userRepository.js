const { Op } = require('sequelize');
const User = require('../models/user');
class UserRepository {
    async createUser(userData) {
        return await User.create(userData);
    }

    async findUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findByUsernameOrEmail(username, email) {
        return await User.findOne({ where: { [Op.or]: [
            {username: username},
            {email: email}
        ]} 
        });
    }

    async findUserById(userId) {
        return await User.findByPk(userId);
    }
}

module.exports = UserRepository