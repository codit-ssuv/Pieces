import express from 'express';
import * as commentController from '../controllers/commentController.js';
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
  

// 댓글 수정
router.put("/:commentId", asyncHandler(commentController.updateComment));

// 댓글 삭제
router.delete("/:commentId", asyncHandler(commentController.deleteComment));

export default router;