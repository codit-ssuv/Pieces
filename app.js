import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


/////////////////////////////////////////
// 라우트 설정
import groupRouter from './routers/groupRouter.js';


app.use("/api/groups", groupRouter);
/////////////////////////////////////////

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
