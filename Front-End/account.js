const USR_URL = "http://localhost:3000/api/users";
const ORDERS_URL = "http://localhost:3000/api/orders";
const Address_URL = "http://localhost:3000/api/addresses";
const TOKEN = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

async function fetchUserData() {
    try {
        const response = await axios.get(`${USR_URL}/me`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const user = response.data;
        if (user){
            document.getElementById("email").innerHTML = `
                <h3 class="sh">email</h3>
                <p class="sp" id="totalProducts">${user.email}</p>
                <button class="card-button">Edit</button>
            `;
            document.getElementById("OwnerSummary").innerHTML = `
                <h3 class="sh">Account Owner</h3>
                <p class="sp" id="totalOrders">Full name: ${user.firstName} ${user.lastName}</p>
                <p class="sp" id="totalSales">Username: ${user.username}</p>
                <button class="card-button">Edit</button>
            `;
            return user;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

async function fetchUserAddresses(id) {
    try {
        const response = await axios.get(`${Address_URL}/${id}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const address = response.data;
        if (!address || address.length === 0) {
            document.getElementById("AddressSummary").innerHTML = `
            <p>No addresses found.</p>
            <button href="add-address.html" class="card-button">Add Address</button>
            `;
            return;
        } else {
            document.getElementById("AddressSummary").innerHTML = `
                <div class="address-card">
                    <h3 class="sh">Saved Address</h3>
                    <p><b>street: </b> ${address.street}</p>
                     <p><b>city: </b> ${address.city}</p>
                      <p><b>state: </b> ${address.state}</p>
                      <p><b>zip code: </b> ${address.zip}</p>
                      </div>
                      <button id="edit-address" class="card-button">Edit</button>
            `;
                document.getElementById("edit-address").addEventListener("click", () => {
                window.location.href = "add-Address.html";
            });
            return address;
        }
    } catch (error) {
        console.error("Error fetching user addresses:", error);
    }
}

window.onload = async () => {
    const user = await fetchUserData();
    if (user) {
        const address = await fetchUserAddresses(user.address);
        if (!address || address.length === 0) {
            document.getElementById("AddressSummary").innerHTML = `
            <p>No addresses found.</p>
            <button id="edit-address" href="add-address.html" class="card-button">Add Address</button>
            `;
            document.getElementById("edit-address").addEventListener("click", () => {
                window.location.href = "add-Address.html";
            });
        }
    }
}