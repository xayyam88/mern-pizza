import multer from 'multer';
import express from 'express';

const uploadsizeRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') +
                '-' +
                file.originalname
        );
    }
});

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

uploadsizeRouter.post('/', upload.array('images'), (req, res) => {
    const arr = req.files;

    res.send(arr.map((file) => `/${file.path}`));
});

export default uploadsizeRouter;
