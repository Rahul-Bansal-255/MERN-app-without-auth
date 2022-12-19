import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes.js';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/UsersDB')
  .then(() => {
    console.log('Database connection established')
    app.listen(4000, () => {
      console.log('listening to PORT 4000')
    })
  })
  .catch((err) => {
    console.log('Database connection failed')
  })

app.use(cors({
  origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use((req, res) => {
  res.status(404).send()
})