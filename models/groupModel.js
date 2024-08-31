import { PrismaClient } from '@prisma/client';
import * as s from 'superstruct';


const prisma = new PrismaClient();

// 그룹 생성 스키마 설정
const CreateGroup = s.object({
    name: s.size(s.string(), 1, 30),
    introduction: s.size(s.string(), 0, 250),
    isPublic: s.boolean(),
    password: s.string(),
});

// 그룹 수정 스키마 설정
const PatchGroup = s.partial(CreateGroup);

//////////////////////////////////////////////////
// 그룹 생성
export const createGroup = async (data) => {
    // 유효성 검사
    s.assert(data, CreateGroup);

    const group = await prisma.group.create({
        data,
    });

    return {
        id: group.id,
        name: group.name,
        // imageUrl: group.imageUrl,
        isPublic: group.isPublic,
        likeCount: group.likeCount,
        badges: [],
        postCount: 0,
        createdAt: group.createdAt,
        introduction: group.introduction,
    };
};

// 그룹 목록 조회
export const getAllGroups = async (page = 1, pageSize = 10) => {
    const skip = (page - 1) * pageSize;
    const totalItemCount = await prisma.group.count(); // 전체 아이템 수

    const groups = await prisma.group.findMany({
        skip,
        take: pageSize,
        select: {
            id: true,
            name: true,
            // imageUrl: true,
            isPublic: true,
            likeCount: true,
            badges: true,
            createdAt: true,
            introduction: true,
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });

    const data = groups.map(({ _count: { posts: postCount }, badges, ...group }) => ({
        ...group,
        postCount,
        badgeCount: badges.length,
    }));

    return {
        currentPage: page,
        totalPages: Math.ceil(totalItemCount / pageSize),
        totalItemCount,
        data,
    };
};


// 그룹 수정
export const updateGroup = async (id, data) => {
    s.assert(data, PatchGroup);

    const group = await prisma.group.update({
        where: { id },
        data,
        include: {
            badges: {
                select: {
                    badge: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });

    return {
        id: group.id,
        name: group.name,
        // imageUrl: group.imageUrl,
        isPublic: group.isPublic,
        likeCount: group.likeCount,
        badges: group.badges.map(b => b.badge.name),
        postCount: group._count.posts,
        createdAt: group.createdAt,
        introduction: group.introduction,
    };
};

// 그룹 삭제
export const deleteGroup = async (id) => {
    return prisma.group.delete({ where: { id } });
};

// 그룹 상세 정보 확인
export const getGroupById = async (id) => {
    const group = await prisma.group.findUnique({
        where: { id },
        include: {
            badges: {
                select: {
                    badge: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            _count: {
                select: {
                    posts: true // postCount 계산을 위해 사용
                }
            }
        }
    });

    return {
        id: group.id,
        name: group.name,
        // imageUrl: group.imageUrl,
        isPublic: group.isPublic,
        likeCount: group.likeCount,
        badges: group.badges.map(b => b.badge.name),
        postCount: group._count.posts,
        createdAt: group.createdAt,
        introduction: group.introduction
    };
};

// 그룹 조회 권한 확인
export const getGroupPasswordById = async (id) => {
    const group = await prisma.group.findUnique({
        where: { id },
        select: { password: true },
    });

    return group?.password;
};

// 그룹 공감하기
export const likeGroup = async (id) => {
    return prisma.group.update({
        where: { id: id },
        data: {
            likeCount: {
                increment: 1
            },
        },
    });
}

// 그룹 공개 여부 확인
export const checkGroupPublic = async (id) => {
    return prisma.group.findUnique({
        where: { id: id },
        select: {
            id: true,
            isPublic: true
        },
    });
}