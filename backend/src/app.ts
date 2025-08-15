import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { userRoutes, feedbackRoutes, voteRoutes } from "./routes";
import { errorHandler, notFound } from "./middlewares";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/votes', voteRoutes);

// Home route
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    message: "Product Feedback API is running!",
    endpoints: {
      users: "/api/users",
      feedback: "/api/feedback", 
      votes: "/api/votes"
    }
  });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 API Documentation:`);
  console.log(`   Users: http://localhost:${PORT}/api/users`);
  console.log(`   Feedback: http://localhost:${PORT}/api/feedback`);
  console.log(`   Votes: http://localhost:${PORT}/api/votes`);
});
