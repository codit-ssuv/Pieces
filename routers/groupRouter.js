import express from 'express';
const router = express.Router();
// groupController = require('../controllers/groupController');

// 그룹 등록
router.post("/", (req, res) => {
    res.send('Hello, World !');
});

// 그룹 목록 조회
router.get("/", (req, res) => {
    res.send('Hello, World ! get');
});

// 그룹 수정
router.put("/:groupId", (req, res) => {
    res.send('Hello, World ! put');
});

// 그룹 삭제
router.delete("/:groupId", (req, res) => {
    res.send('Hello, World ! delete');
});

export default router;