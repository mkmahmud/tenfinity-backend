import { IOrder } from "./orders.interface";
import { Orders } from "./orders.modal";
import mongoose from "mongoose";

// Global cached Mongoose connection for serverless

// Global cached Mongoose connection for serverless
type MongooseCached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
let cached = (globalThis as any).mongoose as MongooseCached;

if (!cached) {
    cached = (globalThis as any).mongoose = { conn: null, promise: null } as MongooseCached;
}


async function connectDB() {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        cached!.promise = mongoose
            .connect(process.env.SERVER_URL as string, {
                // optional options
                bufferCommands: false,
            })
            .then((mongoose) => mongoose);
    }

    cached!.conn = await cached!.promise;
    return cached!.conn;
}
// Create Order
const createOrder = async (data: IOrder): Promise<IOrder | object> => {
    try {
        await connectDB();
        await Orders.create(data);
        return { message: "Success" };
    } catch (error) {
        console.error("Error creating Order:", error);
        throw new Error("Error creating Order");
    }
};

// Get Orders
const getOrders = async (): Promise<IOrder[]> => {
    try {
        await connectDB();
        const orders = await Orders.find().sort({ createdAt: -1, _id: -1 });
        return orders;
    } catch (error) {
        console.error("Error fetching Orders:", error);
        throw new Error("Error fetching Orders");
    }
};

// Get Single Order
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
    try {
        await connectDB();
        const order = await Orders.findOne({ orderId: id });
        return order;
    } catch (error) {
        console.error("Error fetching Single Order:", error);
        throw new Error("Error fetching Single Order");
    }
};

// Update Order Status
const updateOrderStatus = async (id: string, status: string): Promise<IOrder | null> => {
    try {
        await connectDB();
        const order = await Orders.findOneAndUpdate(
            { orderId: id },
            { status },
            { new: true }
        );
        return order;
    } catch (error) {
        console.error("Error updating Order Status:", error);
        throw new Error("Error updating Order Status");
    }
};

export const ordersService = {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
};
