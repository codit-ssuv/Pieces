import { checkPostPublic, createPost, deletePost, getAllPosts, getPostById, getPostPasswordById, likePost, updatePost } from '../models/memoryModel.js';
import bcrypt from 'bcrypt';

// 게시글 등록
export const createMemory = async (req, res) => {
    const { groupId } = req.params;
    const data = req.body;

    // postPassword를 password로 변경
    if (data.hasOwnProperty('postPassword')) {
        data.password = data.postPassword;
        delete data.postPassword;
    }

    // 비밀번호 해시화
    data.password = await bcrypt.hash(data.password, 10);

    // groupPassword 필드를 제외한 나머지 데이터 준비
    const { groupPassword, ...dataWithoutGroupPassword } = data;
    console.log(dataWithoutGroupPassword, groupId);
    const Post = await createPost(dataWithoutGroupPassword, groupId);

    res.status(201).send(Post);
};


// 게시글 조회
export const getMemorys = async (req, res) => {
    const { groupId } = req.params;
    const posts = await getAllPosts(groupId);
    res.send(posts);
}

// 게시글 수정
export const updateMemory = async (req, res) => {
    const { postId } = req.params;
    const data = req.body;
    // 비밀번호 체크
    const groupPassword = await getPostPasswordById(postId);
    const isPasswordCorrect = await bcrypt.compare(data.postPassword, groupPassword);

    if (!isPasswordCorrect) {
        return res.status(403).send({ message: "비밀번호가 틀렸습니다" });
    }

    const { postPassword, ...dataWithoutPassword } = data;

    const Post = await updatePost(postId, dataWithoutPassword);
    res.send(Post);
};

// 게시글 삭제
export const deleteMemory = async (req, res) => {
    const { postId } = req.params;
    const data = req.body;
    // 비밀번호 체크
    const groupPassword = await getPostPasswordById(postId);
    const isPasswordCorrect = await bcrypt.compare(data.postPassword, groupPassword);

    if (!isPasswordCorrect) {
        return res.status(403).send({ message: "비밀번호가 틀렸습니다" });
    }
    await deletePost(postId);
    res.status(200).send({ message: "게시글 삭제 성공" });
};

// 게시글 상세 정보 확인
export const getMemoryDetail = async (req, res) => {
    const { postId } = req.params;
    const post = await getPostById(postId);
    res.send(post);
};

// 게시글 조회 권한 확인
export const checkMemoryAccess = async (req, res) => {
    const { postId } = req.params;
    const { password } = req.body;
    const postPassword = await getPostPasswordById(postId);
    const isPasswordCorrect = await bcrypt.compare(password, postPassword)

    if (isPasswordCorrect) {
        return res.send({ message: "비밀번호가 확인되었습니다" });
    } else {
        return res.status(401).send({ message: "비밀번호가 틀렸습니다" });
    }
};

// 게시글 공감하기
export const likeMemory = async (req, res) => {
    const { postId } = req.params;
    await likePost(postId);

    res.send({ message: "게시글 공감하기 성공" });
};

// 게시글 공개 여부 확인
export const checkMemoryPublic = async (req, res) => {
    const { postId } = req.params;
    const postPublic = await checkPostPublic(postId);

    res.send(postPublic);
};