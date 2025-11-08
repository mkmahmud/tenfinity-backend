import express from 'express'
import { ordersController } from './orders.controller'



const router = express.Router()

// Create Order
router.post(
    '/create',
    ordersController.createOrder,
)

// Get Orders
router.get(
    '/',
    ordersController.getOrders,
)

// Get Single Order
router.get(
    '/:id',
    ordersController.getSingleOrder,
)

// Update Order Status
router.patch(
    '/:id/status',
    ordersController.updateOrderStatus,
)

export const OrdersRoutes = router
