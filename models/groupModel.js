import { PrismaClient } from '@prisma/client';
import * as s from 'superstruct';


const prisma = new PrismaClient();

// 그룹 생성 스키마 설정
const CreateGroup = s.object({
  name: s.size(s.string(), 1, 30),
  description: s.size(s.string(), 0, 250),
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
    
    return prisma.group.create({
        data,
    });
};

// 그룹 목록 조회
export const getAllGroups = async () => {
    return prisma.group.findMany();
};

// 그룹 수정
export const updateGroup = async (id, data) => {
    s.assert(data, PatchGroup);
    
    return prisma.group.update({
        where: { id },
        data,
    });
};

// 그룹 삭제
export const deleteGroup = async (id) => {
    return prisma.group.delete({ where: { id } });
};