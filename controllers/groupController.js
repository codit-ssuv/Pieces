import { createGroup, getAllGroups, updateGroup as updateGroupInDb, deleteGroup as deleteGroupFromDb } from '../models/groupModel.js';


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