import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

import httpStatus from 'http-status'
import { ordersService } from './orders.services'

// Create Order
const createOrder = catchAsync(async (req: Request, res: Response) => {
    const body = req.body
    const result = await ordersService.createOrder(body)

    // Send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order created Successfully',
        data: result,
    })
})

// Get Orders
const getOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await ordersService.getOrders()

    // Send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Orders fetched Successfully',
        data: result,
    })
})

// Get Single Order
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ordersService.getSingleOrder(id)

    // Send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order fetched Successfully',
        data: result,
    })
})

// Update Order Status
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const { status } = req.body
    const result = await ordersService.updateOrderStatus(id, status)
    // Send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order status updated Successfully',
        data: result,
    })
})

export const ordersController = {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
}
