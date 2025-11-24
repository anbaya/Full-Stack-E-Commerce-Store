const addAddress_URL = 'http://52.90.2.111:3000/api/addresses';
const TOKEN = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
const USER_URL = 'http://52.90.2.111:3000/api/users/me';

async function getUser(token) {
    try {
        const response = await axios.get(USER_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

async function addAddress(addressData, userId) {
    try {
        const response = await axios.post(addAddress_URL, addressData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            },
        });
        if (response.status === 201) {
            const user = await getUser(TOKEN);
            user.address = response.data._id;
            await axios.put(`http://52.90.2.111:3000/api/users/${user._id}`, user, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`
                }
            });
            return response.data;
        } else {
            throw new Error('Failed to add address');
        }
    } catch (error) {
        console.error('Error adding address:', error);
        throw error;
    }
}

document.getElementById('address-Form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const addressData = { fullName, phoneNumber, street, city, state, zip, country };
    try {
        const user = await getUser(TOKEN);
        if (!user) {
            alert('User not authenticated. Please log in.');
            return;
        }
        const addedAddress = await addAddress(addressData, user._id);
        alert('Address added successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add address. Please try again.');
    }
});