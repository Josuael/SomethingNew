import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config({
    path: "./.env",
}); // Load environment variables from .env file

const startServer = async () => {
    try {
        await connectDB(); // Connect to the database

        app.on("error", (err) => {
            console.error("Error starting the server:", err);
            throw err; // Rethrow the error to be caught in the outer try-catch
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

startServer();