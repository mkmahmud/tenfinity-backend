import { Model } from "mongoose";

export interface IOrder {
    orderId: string;
    timestamp: string;

    customerDetails: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state?: string;     // optional (sometimes may not have)
        zipCode?: string;   // optional
    };

    items: {
        productId: string;
        name: string;
        price: number;
        image?: string;     // optional (in case product image missing)
        color?: string;
        quantity: number;
    }[];

    subtotal: number;
    shipping?: number;
    discount?: number;
    total: number;

    paymentMethod: "cod" | "online" | string; // allow other types later
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | string;

    notes?: string; // optional field for extra order instructions
}



export type OrdersModel = Model<IOrder>