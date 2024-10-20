// Mengambil elemen form
const createRoomForm = document.getElementById('create-room-form');
const joinRoomForm = document.getElementById('join-room-form');
const roomNameInput = document.getElementById('room-name');
const joinRoomSelect = document.getElementById('join-room-select');


function populateRooms(rooms) {
    joinRoomSelect.innerHTML = '<option value="">Select a Room</option>';
    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.room_name;
        option.textContent = room.room_name;
        joinRoomSelect.appendChild(option);
    });
}
async function fetchRooms() {

    try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:5000/chatroom', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
        throw new Error('Failed to fetch rooms')
        }

        const rooms = await response.json();
        populateRooms(rooms);

    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
};


createRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roomName = document.getElementById('room-name').value.trim();

    if (roomName) {
        try {

            const token = localStorage.getItem('token'); 

            const response = await fetch('http://localhost:5000/chatroom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ room_name: roomName, is_group: true })
            });

            if (response.ok) {
                alert (`Room "${roomName}" created successfully!`);

                fetchRooms();


            } else {
                alert('Failed to create room. Please try again.');
            }
        } catch (error) {
            console.error('Error creating room:', error);
        }
    }
});

// Event untuk bergabung ke room yang ada
joinRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedRoom = joinRoomSelect.value;

    if (selectedRoom) {
        window.location.href = `/public/chat.html?room_name=${encodeURIComponent(selectedRoom)}`
    } else {
        alert('Please select a room to join.');
    }
});

document.addEventListener('DOMContentLoaded', fetchRooms);