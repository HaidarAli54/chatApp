document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation
        if (!username || !email || !password) {
            alert('All fields are required!');
            return;
        }

        // Create the data object to be sent to the server
        const data = {
            username,
            email,
            password,
        };

        try {
            // Send a POST request to the server
            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle successful registration (e.g., redirect to login)
                alert('Registration successful! Redirecting to login...');
                window.location.href = '/public/login.html';
            } else {
                // Handle errors (e.g., username or email already exists)
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again later.');
        }
    });
});
