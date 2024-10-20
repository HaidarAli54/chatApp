-- migrate:up
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE ChatRooms (
    chat_room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(255) NOT NULL,
    is_group BOOLEAN DEFAULT FALSE
);

CREATE TABLE Messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    chat_room_id INT,
    user_id INT,
    content TEXT NOT NULL,
    message_type ENUM('text', 'image', 'video', 'pdf') DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_room_id) REFERENCES ChatRooms(chat_room_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- migrate:down

DROP TABLE Users

DROP TABLE ChatRooms

DROP TABLE Messages