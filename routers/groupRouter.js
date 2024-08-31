import express from 'express';
import * as groupController from '../controllers/groupController.js';
import * as memoryController from '../controllers/memoryController.js';
import { Prisma } from '@prisma/client';

const router = express.Router();

function asyncHandler(handler) {
    return async function (req, res) {
      try {
        await handler(req, res);
      } catch (e) {
        if (
          e.name === 'StructError' ||
          e instanceof Prisma.PrismaClientValidationError
        ) {
          res.status(400).send({ message: "잘못된 요청입니다" });
        } else if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2025'
        ) {
          res.sendStatus(404);
        } else {
          res.status(500).send({ message: "존재하지 않습니다" });
        }
      }
    };
  }
  

// 그룹 등록
router.post("/", asyncHandler(groupController.registerGroup));

// 그룹 목록 조회
router.get("/", asyncHandler(groupController.getGroups));

// 그룹 수정
router.put("/:groupId", asyncHandler(groupController.updateGroup));

// 그룹 삭제
router.delete("/:groupId", asyncHandler(groupController.deleteGroup));

// 그룹 상세 정보 확인
router.get("/:groupId", asyncHandler(groupController.getGroupDetail));

// 그룹 조회 권한 확인
router.post("/:groupId/verify-password", asyncHandler(groupController.checkGroupAccess));

// 그룹 공감하기
router.post("/:groupId/like", asyncHandler(groupController.likeGroup));

// 그룹 공개 여부 확인
router.get("/:groupId/is-public", asyncHandler(groupController.checkGroupPublic));

// 게시글 등록
router.post("/:groupId/posts", asyncHandler(memoryController.createMemory));

// 게시글 목록 조회
router.get("/:groupId/posts", asyncHandler(memoryController.getMemorys));

export default router;