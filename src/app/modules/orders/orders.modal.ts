import { model, Schema } from "mongoose";
import { IOrder, OrdersModel } from "./orders.interface";

const orderSchema = new Schema<IOrder, OrdersModel>(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },

        timestamp: {
            type: String,
            required: true,
        },

        customerDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String },
            zipCode: { type: String },
        },

        items: [
            {
                productId: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                image: { type: String },
                color: { type: String },
                quantity: { type: Number, required: true },
            },
        ],

        subtotal: {
            type: Number,
            required: true,
        },

        shipping: {
            type: Number,
            default: 0,
        },

        discount: {
            type: Number,
            default: 0,
        },

        total: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            required: true,
            enum: ["cod", "online", "other"],
            default: "cod",
        },

        status: {
            type: String,
            required: true,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },

        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);


export const Orders = model<IOrder, OrdersModel>('orders', orderSchema)