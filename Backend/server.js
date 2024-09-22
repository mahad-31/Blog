import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'; // If you're using CORS
import { userRouter } from './routes/user.js'; // Adjust path if necessary
import { postRouter } from './routes/post.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS if needed
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use routes
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use((req, res, next) => {
  console.log("Incoming request body:", req.body);
  next();
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Blogtest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
