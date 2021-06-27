import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import uploadsizeRouter from './routers/uploadsizeRouter.js';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', uploadRouter);
app.use('/api/uploadsize', uploadsizeRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'build', 'index.html')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use((error, req, res, next) => {
    res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;

async function start() {
    try {
        mongoose.connect(
            process.env.MONGODB_URL ||
                'mongodb+srv://khayyamPizzaDB:xeyyam1718@cluster0.grat8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        app.listen(port, () =>
            console.log(`App has been started on port ${port}...`)
        );
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
