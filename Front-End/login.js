const login_URL = '/api/users/login';

async function loginUser(credentials) {
    try {
        const response = await axios.post(login_URL, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const user = await loginUser({ email, password });
        document.cookie = `token=${user.token}; path=/;`;
        console.log('Login successful:', user);
        window.location.href = './home.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed.');
    }
});