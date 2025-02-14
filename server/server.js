import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// Connect to database before starting the server
connectDB()
  .then(() => {
    // Middlewares
    app.use(cors());

    // Routes
    app.get("/", (req, res) => res.send("API Working!"));

app.post('/clerk',express.json(),clerkWebhooks);

    // Port
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });
