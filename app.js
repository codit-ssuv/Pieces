import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

/////////////////////////////////////////
// 라우트 설정
import groupRouter from './routers/groupRouter.js';
import memoryRouter from './routers/memoryRouter.js';
import commentRouter from './routers/commentRouter.js';
import imageRouter from './routers/imageRouter.js';


app.use("/api/groups", groupRouter);
app.use("/api/posts", memoryRouter);
app.use("/api/comments", commentRouter);
app.use("/api/image", imageRouter);

/////////////////////////////////////////

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
