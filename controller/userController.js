const UserRepository =  require('../repository/userRepository');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository =  new UserRepository();

class UserController {
    async register(req, res) {
        const { username, password, email } = req.body;
        try {
            const existingUser = await userRepository.findByUsernameOrEmail(username, email);
        if (existingUser) {
            return res.status(400).json({ error: 'Username Or Email already exists' });
        }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userRepository.createUser({ username, password: hashedPassword, email });

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {

        const { email, password } = req.body;
        try {
            const user = await userRepository.findUserByEmail(email);

            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'password  is incorrect' });

            const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteChatRoom(req, res) {
        try {
            const { id } = req.params;
            const deletedRoom = await this.chatRoomRepository.deleteChatRoom(id);
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

module.exports = UserController;

