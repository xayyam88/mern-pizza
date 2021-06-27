import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
    '/mine',
    expressAsyncHandler(async (req, res) => {
        // const orders = await Order.find();

        if (req.headers.isadmin === 'true') {
            const orders = await Order.find();
            res.send(orders);
        } else {
            const orders = await Order.find({ userId: req.headers.userid });
            res.send(orders);
        }

        name;
    })
);

orderRouter.post(
    '/',
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                countOneProduct: req.body.countOneProduct,
                paymentMethod: req.body.shippingAddress.paymentMethod,
                currentPosition: req.body.shippingAddress.currentPosition,
                totalCount: req.body.totalCount,
                totalPrice: req.body.totalPrice,
                couponProccentAdd: req.body.couponProccentAdd,
                userName: req.body.userName,
                userId: req.body.userId,
                created: req.body.created
            });

            const createdOrder = await order.save();
            res.status(201).send({
                message: 'New Order Created',
                order: createdOrder
            });
        }
    })
);

orderRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);

orderRouter.put(
    '/:id/pay',
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            };
            const updatedOrder = await order.save();
            res.send({ message: 'Order Paid', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);

export default orderRouter;
