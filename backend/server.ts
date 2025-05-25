import express from "express";
import helmet from "helmet";
import morgan from "morgan"; // Morgan is an HTTP request logger middleware for Node.js
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.ts";
import { sql } from "./config/db.ts";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // helmet is a security middleware that helps you protect app by setting various HTTP headers

// Morgan logs incoming requests to the console in 'dev' format (method, URL, status, response time)
// Useful for debugging and monitoring API usage
app.use(morgan("dev"));

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    console.log("Db initialized");
  } catch (error) {
    console.log("error initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port: " + PORT);
  });
});
