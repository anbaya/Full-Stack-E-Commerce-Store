const statusURL = '/api/dashboard/status';
const ordersURL = '/api/dashboard/orders';
const salesURL = '/api/dashboard/total-sales';


const getDashboardStatus = async () => {
    try {
        const response = await axios.get(statusURL);
        const responseSales = await axios.get(salesURL);
        const statusData = response.data;
        document.getElementById('totalProducts').innerText = `Total Products: ${statusData.totalProducts}`;
        document.getElementById('totalOrders').innerText = `Total Orders: ${statusData.totalOrders}`;
        document.getElementById('totalSales').innerText = `Total Sales: $${responseSales.data.totalSales}`;
        document.getElementById('totalUsers').innerText = `Total Users: ${statusData.totalUsers}`;
        // document.getElementById('totalMessages').innerText = `Total Messages: ${statusData.totalMessages}`;
    } catch (error) {
        console.error('Error fetching dashboard status:', error);
    }
};

const dashboardEventListener = () => {
        // manageProductsBtn = document.getElementById('manageProducts');
        // manageProductsBtn.addEventListener('click', () => {
        //     window.location.href = '../product.html';
        // });

        // manageOrdersBtn = document.getElementById('manageOrdersBtn');
        // manageOrdersBtn.addEventListener('click', () => {
        //     window.location.href = 'orders.html';
        // });
        // manageUsersBtn = document.getElementById('manageUsersBtn');
        // manageUsersBtn.addEventListener('click', () => {
        //     window.location.href = 'users.html';
        // });
    };

getDashboardStatus();
// dashboardEventListener();