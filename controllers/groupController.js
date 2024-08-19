// 그룹 등록
export const registerGroup = (req, res) => {
    res.send('Hello, World! post');
};

// 그룹 목록 조회
export const getGroups = (req, res) => {
    res.send('Hello, World! get');
};

// 그룹 수정
export const updateGroup = (req, res) => {
    const id = req.params.groupId;
    res.send(`Hello, World! put ${id}`);
};

// 그룹 삭제
export const deleteGroup = (req, res) => {
    const id = req.params.groupId;
    res.send(`Hello, World! delete ${id}`);
};