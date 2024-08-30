import { PrismaClient } from '@prisma/client';
import * as s from 'superstruct';


const prisma = new PrismaClient();

// 메모리 생성 스키마 설정
const CreateMemory = s.object({
    nickname: s.size(s.string(), 1, 10),
    title: s.size(s.string(), 1, 30),
    content: s.string(),
    tags: s.array(s.string()),
    location: s.string(),
    isPublic: s.boolean(),
    password: s.string(),
  });

// 게시글 수정 스키마 설정
const PatchMemory = s.partial(CreateMemory);

//////////////////////////////////////////////////
// 게시글 생성
export const createMemory = async (data, memoryId) => {
    // 유효성 검사
    s.assert(data, CreateMemory);

    return prisma.memory.create({
        data: {
            ...data,
            memoryId: memoryId,
        },
    });
};

// 게시글 목록 조회
export const getAllMemorys = async (memoryId) => {
    return prisma.memory.findMany({
        where: {
            memoryId: memoryId,
        },
    });
};

// 게시글 수정
export const updateMemory = async (id, data) => {
    s.assert(data, PatchMemory);

    return prisma.memory.update({
        where: { id },
        data,
    });
};

// 게시글 삭제
export const deleteMemory = async (id) => {
    return prisma.memory.delete({ where: { id } });
};


// 게시글 상세 정보 확인
export const getMemoryById = async (id) => {
    return prisma.memory.findUnique({
        where: { id },
    });
};

// 게시글 조회 권한 확인
export const getmeMoryPasswordById = async (id) => {
    const memory = await prisma.memory.findUnique({
        where: { id },
        select: { password: true },
    });

    return memory?.password;
};

// 게시글 공감하기
export const likeMemory = async (id) => {
    return prisma.memory.update({
        where: { id: id },
        data: {
            likes: {
                increment: 1
            },
        },
    });
}

// 게시글 공개 여부 확인
export const checkMemoryPublic = async (id) => {
    const memory = await prisma.memory.findUnique({
        where: { id: id },
        select: { isPublic: true },
    });

    return memory?.isPublic;
}