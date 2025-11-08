import { Model } from "mongoose";

export interface IOrder {
    orderId: string;
    timestamp: string;

    customerDetails: {
        name: string;
        email?: string; // optional
        phone: string;
        address: string;
    };

    items: {
        productId: string;
        name: string;
        price: number;
        image?: string;
        color?: string;
        quantity: number;
    }[];

    subtotal: number;
    shipping?: number;
    total: number;

    paymentMethod: "cod" | "online" | string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | string;

    deliveryArea: "inside" | "outside" | string; // new field
    size: "M" | "L" | "XL" | "2XL" | string;     // new field
    couponApplied?: string;                      // new field for coupon code

    notes?: string;
}

export type OrdersModel = Model<IOrder>;
