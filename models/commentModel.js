import { PrismaClient } from '@prisma/client';
import * as s from 'superstruct';


const prisma = new PrismaClient();

// 댓글 생성 스키마 설정
const CreateComment = s.object({
    nickname: s.size(s.string(), 1, 10),
    content: s.string(),
    password: s.string()
});

// 댓글 수정 스키마 설정
const PatchComment = s.partial(CreateComment);

//////////////////////////////////////////////////
// 댓글 생성
export const createComment = async (data, postId) => {
    // 유효성 검사
    s.assert(data, CreateComment);

    const Comment = await prisma.comment.create({
        data: {
            ...data,
            postId: postId,
        },
    });

    return {
        id: Comment.id,
        nickname: Comment.nickname,
        content: Comment.content,
        createdAt: Comment.createdAt,
    };
};

// 댓글 목록 조회
export const getAllComments = async (postId, page = 1, pageSize = 10) => {
    // 페이지와 페이지 크기 유효성 검사
    const currentPage = Math.max(parseInt(page, 10), 1);
    const itemsPerPage = Math.max(parseInt(pageSize, 10), 1);
    const skip = (currentPage - 1) * itemsPerPage;

    // 전체 댓글 수 카운트
    const totalItemCount = await prisma.comment.count({
        where: { postId: postId },
    });

    // 댓글 목록 조회
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        skip: skip,
        take: itemsPerPage,
        select: {
            id: true,
            nickname: true,
            content: true,
            createdAt: true,
        },
    });

    return {
        currentPage,
        totalPages: Math.ceil(totalItemCount / itemsPerPage),
        totalItemCount,
        data: comments,
    };
};

// 댓글 비밀번호 확인
export const getCommentPasswordById = async (id) => {
    const comment = await prisma.comment.findUnique({
        where: { id },
        select: { password: true },
    });

    return comment?.password;
};

// 댓글 수정
export const updateComment = async (id, data) => {
    s.assert(data, PatchComment);

    // 댓글 업데이트
    const updateComment = await prisma.comment.update({
        where: { id },
        data,
    });

    return {
        id: updateComment.id,
        nickname: updateComment.nickname,
        content: updateComment.content,
        createdAt: updateComment.createdAt,
    };
}

// 댓글 삭제
export const deleteComment = async (id) => {
    return prisma.comment.delete({ where: { id }});
}