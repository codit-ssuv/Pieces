import { createGroup, getAllGroups, updateGroup as updateGroupInDb, deleteGroup as deleteGroupFromDb, getGroupById, getGroupPasswordById } from '../models/groupModel.js';


// 그룹 등록
export const registerGroup = async (req, res) => {
    const data = req.body;
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

    const group = await updateGroupInDb(groupId, data);
    res.send(group);
};

// 그룹 삭제
export const deleteGroup = async (req, res) => {
    const { groupId } = req.params;
    await deleteGroupFromDb(groupId);
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

    res.send((password === groupPassword));
};