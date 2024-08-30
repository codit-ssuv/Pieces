import { checkMemoryPublic, createMemory, deleteMemory, getAllMemorys, getMemoryById, getmeMoryPasswordById, likeMemory, updateMemory } from '../models/memoryModel.js';
import bcrypt from 'bcrypt';

// 게시글 등록
export const createPost = async (req, res) => {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const { postId } = req.params;
    const memory = await createMemory(data, postId);
    res.status(201).send(memory);
};

// 게시글 조회
export const getPosts = async (req, res) => {
    const { postId } = req.params;
    const memorys = await getAllMemorys(postId);
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

// 게시글 상세 정보 확인
export const getPostDetail = async (req, res) => {
    const { postId } = req.params;
    const post = await getMemoryById(postId);
    res.send(post);
};

// 게시글 조회 권한 확인
export const checkPostAccess = async (req, res) => {
    const { postId } = req.params;
    const { password } = req.body;
    const postPassword = await getmeMoryPasswordById(postId);

    res.send((await bcrypt.compare(password, postPassword)));
};

// 게시글 공감하기
export const likePost = async (req, res) => {
    const { postId } = req.params;
    const post = await likeMemory(postId);

    res.send(post);
};

// 게시글 공개 여부 확인
export const checkPostPublic = async (req, res) => {
    const { postId } = req.params;
    const postPublic = await checkMemoryPublic(postId);
    
    res.send(postPublic);
};