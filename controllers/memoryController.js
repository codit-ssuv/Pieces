import { createMemory, deleteMemory, getAllMemorys, updateMemory } from '../models/memoryModel.js';
import bcrypt from 'bcrypt';

// 게시글 등록
export const createPost = async (req, res) => {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const { groupId } = req.params;
    const memory = await createMemory(data, groupId);
    res.status(201).send(memory);
};

// 게시글 조회
export const getPosts = async (req, res) => {
    const { groupId } = req.params;
    const memorys = await getAllMemorys(groupId);
    res.send(memorys);
}

// 게시글 수정
export const updatePost = async (req, res) => {
    const { postId } = req.params;
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    const memory = await updateMemory(postId, data);
    res.send(memory);
};

// 게시글 삭제
export const deletePost = async (req, res) => {
    const { postId } = req.params;
    await deleteMemory(postId);
    res.sendStatus(204);
};