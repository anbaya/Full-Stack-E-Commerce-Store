const USR_URL = "http://localhost:3000/api/users";
const ORDERS_URL = "http://localhost:3000/api/orders";
const Address_URL = "http://localhost:3000/api/addresses";
const TOKEN = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

async function fetchUserData() {
    try {
        const response = await axios.get(`${USR_URL}/me`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const user = response.data;
        if (user)
            return user
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

async function fetchUserAddresses(id) {
    try {
        const response = await axios.get(`${Address_URL}/${id}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const addresses = response.data;
        if (addresses.length === 0) {
            document.getElementById("AddressSummary").innerHTML = "<p>No addresses found.</p>";
        } else {
            document.getElementById("AddressSummary").innerHTML = addresses.map(address => `
                <div class="address-card">
                    <p>${address.street}, ${address.city}, ${address.state}, ${address.zipCode}</p>
                </div>
            `).join("");
        }
    } catch (error) {
        console.error("Error fetching user addresses:", error);
    }
}

window.onload = async () => {
    const user = await fetchUserData();
    if (user) {
        await fetchUserAddresses(user._id);
    }
}