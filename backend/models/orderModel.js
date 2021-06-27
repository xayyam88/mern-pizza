import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                productsAdditiveName: { type: Array, required: true },
                img: { type: String, required: true },
                id: { type: String, required: true },
                price: { type: Number, required: true },
                size: { type: Number, required: false },
                type: { type: Number, required: false }
            }
        ],
        shippingAddress: {
            city: { type: String, required: false },
            address: { type: String, required: true },
            phone: { type: String, required: true },
            currentPosition: { type: Object, required: true },
            paymentMethod: { type: String, required: true }
        },
        paymentMethod: { type: String, required: true },
        currentPosition: { type: Object, required: true },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String
        },

        countOneProduct: { type: Array, required: true },
        totalCount: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        couponProccentAdd: { type: String, required: false },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
        userName: { type: String, required: true },
        userId: {
            type: String,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
