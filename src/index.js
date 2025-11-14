// src/index.js
import express from "express"
import cors from "cors"
import { initializeDatabase } from "./config/database.js"

// Import routes
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import songRoutes from "./routes/songRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import recipeRoutes from "./routes/recipeRoutes.js"

const app = express()
const PORT = 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Initialize DB + create tables + seed data
await initializeDatabase()

// Root endpoint
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to the API",
		version: "1.0.0",
		environment: "development",
		endpoints: {
			users: "/users",
			books: "/books",
			movies: "/movies",
			songs: "/songs",
			products: "/products",
			events: "/events",
			recipes: "/recipes"
		}
	})
})

// Register routes
app.use("/users", userRoutes)
app.use("/books", bookRoutes)
app.use("/movies", movieRoutes)
app.use("/songs", songRoutes)
app.use("/products", productRoutes)
app.use("/events", eventRoutes)
app.use("/recipes", recipeRoutes)

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`)
})
