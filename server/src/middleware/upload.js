import multer from "multer";

const ALLOWED_MIME_TYPES = [
    'application/pdf',                                                         // .pdf
    'text/plain',                                                              // .txt
    'text/markdown',                                                           // .md
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'image/png',                                                               // .png
    'image/jpeg',                                                              // .jpg / .jpeg
    'image/webp'                                                               // .webp
];

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('File type not allowed'), false)
    }
};

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 20 }, // 10 MB
    fileFilter,
});
