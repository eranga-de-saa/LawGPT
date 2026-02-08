import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import messageRouter from './routes/message.route';
import { query } from 'express-validator';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()) // Middleware to parse JSON bodies


app.use('/api/message', messageRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



