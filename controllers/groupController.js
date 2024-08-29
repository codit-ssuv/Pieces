import { createGroup, getAllGroups, updateGroup as updateGroupInDB, deleteGroup as deleteGroupInDB, getGroupById, getGroupPasswordById, likeGroup as likeGroupInDB, checkGroupPublic as checkGroupPublicInDB } from '../models/groupModel.js';
import bcrypt from 'bcrypt';


// 그룹 등록
export const registerGroup = async (req, res) => {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const group = await createGroup(data);
    res.status(201).send(group);
};
    

// 그룹 목록 조회
export const getGroups = async (req, res) => {
    const groups = await getAllGroups();
    res.send(groups);
};

// 그룹 수정
export const updateGroup = async (req, res) => {
    const { groupId } = req.params;
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    const group = await updateGroupInDB(groupId, data);
    res.send(group);
};

// 그룹 삭제
export const deleteGroup = async (req, res) => {
    const { groupId } = req.params;
    await deleteGroupInDB(groupId);
    res.sendStatus(204);
};

// 그룹 상세 정보 확인
export const getGroupDetail = async (req, res) => {
    const { groupId } = req.params;
    const group = await getGroupById(groupId);
    res.send(group);
};

// 그룹 조회 권한 확인
export const checkGroupAccess = async (req, res) => {
    const { groupId } = req.params;
    const { password } = req.body;
    const groupPassword = await getGroupPasswordById(groupId);

    res.send((await bcrypt.compare(password, groupPassword)));
};

// 그룹 공감하기
export const likeGroup = async (req, res) => {
    const { groupId } = req.params;
    const group = await likeGroupInDB(groupId);

    res.send(group);
};

// 그룹 공개 여부 확인
export const checkGroupPublic = async (req, res) => {
    const { groupId } = req.params;
    const groupPublic = await checkGroupPublicInDB(groupId);
    
    res.send(groupPublic);
};