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

// 그룹 상세 정보 확인
router.get("/:groupId", groupController.getGroupDetail);

// 그룹 조회 권한 확인
router.post("/:groupId/verify-password", groupController.checkGroupAccess);

// 그룹 공감하기
router.post("/:groupId/like", groupController.likeGroup);

// 그룹 공개 여부 확인
router.get("/:groupId/is-public", groupController.checkGroupPublic);

export default router;