const register_URL = 'http://localhost:3000/api/users/register';

async function registerUser(details) {
    try {
        const response = await axios.post(register_URL, details, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.data) {
            throw new Error('Registration failed');
        }
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

document.getElementById('register-Form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const user = await registerUser({ firstName, lastName, username, email, password });
        document.cookie = `token=${user.token}; path=/;`;
        console.log('Registration successful:', user);
        window.location.href = './home.html';
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed.');
    }
});