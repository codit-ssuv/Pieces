import express from 'express';
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
  

// 게시글 수정
router.put("/:postId", asyncHandler(memoryController.updateMemory));

// 게시글 삭제
router.delete("/:postId", asyncHandler(memoryController.deleteMemory));

// 게시글 상세 정보 조회
router.get("/:postId", asyncHandler(memoryController.getMemoryDetail));

// 게시글 조회 권한 확인
router.post("/:postId/verify-password", asyncHandler(memoryController.checkMemoryAccess));

// 게시글 공감하기
router.post("/:postId/like", asyncHandler(memoryController.likeMemory));

// 게시글 공개 여부 확인하기
router.get("/:postId/is-public", asyncHandler(memoryController.checkMemoryPublic));

export default router;