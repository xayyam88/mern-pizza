import multer from 'multer';
import express from 'express';
// import { isAuth } from '../utils.js';
// import Product from '../models/productModel.js';
// import mkdirp from 'mkdirp';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `uploads/`);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    }
});

const upload = multer({ storage });

uploadRouter.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default uploadRouter;
