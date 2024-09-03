import express from 'express';
import multer from 'multer';
import { storage, ref, uploadBytes, getDownloadURL } from '../fbase.js';
import path from 'path';

const router = express.Router();

// Set up multer for file upload
const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage to keep file in memory
});

function asyncHandler(handler) {
    return async function (req, res, next) {
        try {
            await handler(req, res, next);
        } catch (e) {
            // Handle different types of errors
            if (e.name === 'ValidationError' || e instanceof SyntaxError) {
                // Handle validation errors or syntax errors
                res.status(400).json({ message: '잘못된 요청입니다' });
            } else if (e.statusCode === 404) {
                // Handle not found errors
                res.sendStatus(404);
            } else {
                // Handle other types of errors
                console.error('Internal server error:', e); // Log the error for debugging
                res.status(500).json({ message: '서버 오류가 발생했습니다' });
            }
        }
    };
}


// 이미지 핸들러
router.post('/', upload.single('image'), asyncHandler(async (req, res) => {

    // Create a reference to the Firebase Storage
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const fileName = Date.now() + path.extname(file.originalname); // Unique file name
    const fileRef = ref(storage, `images/${fileName}`);

    // Upload the file to Firebase Storage
    await uploadBytes(fileRef, file.buffer, {
        contentType: file.mimetype,
    });

    // Get the public URL of the uploaded file
    const url = await getDownloadURL(fileRef);

    // Respond with the image URL
    res.json({ imageUrl: url });

}));

export default router;