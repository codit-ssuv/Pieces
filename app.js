import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

console.log("TEST")
app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
