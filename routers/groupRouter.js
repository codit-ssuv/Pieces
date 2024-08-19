import express from 'express';
import * as groupController from '../controllers/groupController.js';

const router = express.Router();

// 그룹 등록
router.post("/", groupController.registerGroup);

// 그룹 목록 조회
router.get("/", groupController.getGroups);

// 그룹 수정
router.put("/:groupId", groupController.updateGroup);

// 그룹 삭제
router.delete("/:groupId", groupController.deleteGroup);

export default router;