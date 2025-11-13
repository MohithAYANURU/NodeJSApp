import express from "express";
import { logMiddleware } from "./middleware/logger.js";
import {
  getAllUsers,
  getUserById,
  createUser,
} from "./controllers/userController.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.get("/users", logMiddleware, getAllUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js API!");
});
