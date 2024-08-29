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
          res.status(400).send({ message: e.message });
        } else if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2025'
        ) {
          res.sendStatus(404);
        } else {
          res.status(500).send({ message: e.message });
        }
      }
    };
  }
  

// 게시글 수정
router.put("/:postId", asyncHandler(memoryController.updatePost));

// 게시글 삭제
router.delete("/:postId", asyncHandler(memoryController.deletePost));

export default router;