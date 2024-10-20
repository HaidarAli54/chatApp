document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert('Both fields are required!');
            return;
        }

        const data = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();

                localStorage.setItem('token', responseData.token);

                alert('Login successful! Redirecting to the home page...');
                window.location.href = '/public/chatroom.html';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        }
    });
});
