const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/db');
const app = require('./app.js');

// Load environment variables from .env file

// Connect to the database and start the server

connectDB()
	.then(() => {
		// Start the server only after successful DB connection
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, "0.0.0.0", () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Database connection failed:", error);
		process.exit(1);  // ← This line terminates the app with error code 1
	});