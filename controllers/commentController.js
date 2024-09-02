import { createComment as createCommentInDB, getAllComments, getCommentPasswordById, updateComment as updateCommentInDB, deleteComment as deleteCommentInDB } from '../models/commentModel.js';
import bcrypt from 'bcrypt';

// 댓글 등록
export const createComment = async (req, res) => {
    const { postId } = req.params;
    const data = req.body;

    // 비밀번호 해시화
    data.password = await bcrypt.hash(data.password, 10);

    const comment = await createCommentInDB(data, postId);

    res.status(200).send(comment);
};

// 댓글 목록 조회
export const getComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await getAllComments(postId);
    res.send(comments);
}

// 댓글 수정
export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const data = req.body;

    // 비밀번호 체크
    const commentPassword = await getCommentPasswordById(commentId);
    const isPasswordCorrect = await bcrypt.compare(data.password, commentPassword);

    if (!isPasswordCorrect) {
        return res.status(403).send({ message: "비밀번호가 틀렸습니다" });
    }

    const comment = await updateCommentInDB(commentId, data);
    res.send(comment);
}

// 댓글 삭제
export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const data = req.body;

    // 비밀번호 체크
    const commentPassword = await getCommentPasswordById(commentId);
    const isPasswordCorrect = await bcrypt.compare(data.password, commentPassword);

    if (!isPasswordCorrect) {
        return res.status(403).send({ message: "비밀번호가 틀렸습니다" });
    }

    await deleteCommentInDB(commentId);
    res.status(200).send({ message: "답글 삭제 성공" });
}