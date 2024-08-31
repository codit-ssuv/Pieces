import { PrismaClient } from '@prisma/client';
import * as s from 'superstruct';


const prisma = new PrismaClient();

// 메모리 생성 스키마 설정
const CreatePost = s.object({
    nickname: s.size(s.string(), 1, 10),
    title: s.size(s.string(), 1, 30),
    content: s.string(),
    tags: s.array(s.string()),
    location: s.string(),
    moment: s.string(),
    isPublic: s.boolean(),
    password: s.string()
});

// 게시글 수정 스키마 설정
const PatchPost = s.partial(CreatePost);

//////////////////////////////////////////////////
// 게시글 생성
export const createPost = async (data, groupId) => {
    // 유효성 검사
    s.assert(data, CreatePost);

    console.log(data, groupId);
    const post = await prisma.post.create({
        data: {
            ...data,
            groupId: groupId,
        },
    });

    return {
        id: post.id,
        groupId: post.groupId,
        nickname: post.nickname,
        title: post.title,
        content: post.content,
        // imageUrl: post.imageUrl || '',
        tags: post.tags,
        location: post.location,
        moment: post.moment,
        isPublic: post.isPublic,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
    };
};


// 게시글 목록 조회
export const getAllPosts = async (groupId, page = 1, pageSize = 10) => {
    // 페이지와 페이지 크기 유효성 검사
    const currentPage = Math.max(parseInt(page, 10), 1);
    const itemsPerPage = Math.max(parseInt(pageSize, 10), 1);
    const skip = (currentPage - 1) * itemsPerPage;

    // 전체 게시글 수 카운트
    const totalItemCount = await prisma.post.count({
        where: { groupId: groupId },
    });

    // 게시글 목록 조회
    const posts = await prisma.post.findMany({
        where: {
            groupId: groupId,
        },
        skip: skip,
        take: itemsPerPage,
        select: {
            id: true,
            nickname: true,
            title: true,
            tags: true,
            location: true,
            moment: true,
            isPublic: true,
            likeCount: true,
            commentCount: true,
            createdAt: true,
        },
    });

    const formattedPosts = posts.map(post => ({
        id: post.id,
        nickname: post.nickname,
        title: post.title,
        // imageUrl: post.imageUrl || '',
        tags: post.tags,
        location: post.location,
        moment: post.moment,
        isPublic: post.isPublic,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
    }));

    return {
        currentPage,
        totalPages: Math.ceil(totalItemCount / itemsPerPage),
        totalItemCount,
        data: formattedPosts,
    };
};
// 게시글 수정
export const updatePost = async (id, data) => {
    s.assert(data, PatchPost);

    // 게시글 업데이트
    const updatedPost = await prisma.post.update({
        where: { id },
        data,
    });

    return {
        id: updatedPost.id,
        groupId: updatedPost.groupId,
        nickname: updatedPost.nickname,
        title: updatedPost.title,
        content: updatedPost.content,
        // imageUrl: updatedPost.imageUrl || '',
        tags: updatedPost.tags,
        location: updatedPost.location,
        moment: updatedPost.moment,
        isPublic: updatedPost.isPublic,
        likeCount: updatedPost.likeCount,
        commentCount: updatedPost.commentCount,
        createdAt: updatedPost.createdAt,
    };

};

// 게시글 삭제
export const deletePost = async (id) => {
    return prisma.post.delete({ where: { id } });
};


// 게시글 상세 정보 확인
export const getPostById = async (id) => {
    const post = await prisma.post.findUnique({
        where: { id },
    });

    return {
        id: post.id,
        groupId: post.groupId,
        nickname: post.nickname,
        title: post.title,
        content: post.content,
        // imageUrl: post.imageUrl || '',
        tags: post.tags,
        location: post.location,
        moment: post.moment,
        isPublic: post.isPublic,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
    };
};

// 게시글 조회 권한 확인
export const getPostPasswordById = async (id) => {
    const post = await prisma.post.findUnique({
        where: { id },
        select: { password: true },
    });

    return post?.password;
};

// 게시글 공감하기
export const likePost = async (id) => {
    return prisma.post.update({
        where: { id },
        data: {
            likeCount: {
                increment: 1
            },
        },
    });
}

// 게시글 공개 여부 확인
export const checkPostPublic = async (id) => {
    return prisma.post.findUnique({
        where: { id: id },
        select: {
            id: true,
            isPublic: true
        },
    });
}