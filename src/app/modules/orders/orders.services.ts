import { IOrder } from "./orders.interface"
import { Orders } from "./orders.modal"


// Create Order
const createOrder = async (data: IOrder): Promise<IOrder | null | object> => {
    try {

        // Create Order
        await Orders.create(data)

        return { message: 'Success' }
    } catch (error) {
        // Handle the error, e.g., log it or throw a custom error
        console.error('Error creating Order:', error)
        throw new Error('Error creating Order')
    }
}


// GEt Orders
const getOrders = async (): Promise<IOrder[] | null> => {
    try {
        // return most recently placed orders first
        const orders = await Orders.find().sort({ createdAt: -1, _id: -1 })
        return orders
    } catch (error) {
        console.error('Error fetching Orders:', error)
        throw new Error('Error fetching Orders')
    }
}

// Get Single Order
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
    try {
        const order = await Orders.findOne({ orderId: id })
        return order
    } catch (error) {
        console.error('Error fetching Single Order:', error)
        throw new Error('Error fetching Single Order')
    }
}

// Update Order Status
const updateOrderStatus = async (id: string, status: string): Promise<IOrder | null> => {
    try {
        const order = await Orders.findOneAndUpdate({ orderId: id }, { status }, { new: true })
        return order
    } catch (error) {
        console.error('Error updating Order Status:', error)
        throw new Error('Error updating Order Status')
    }
}

export const ordersService = {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
}
