import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Order from './order.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IOrder, UpdateOrderBody } from './order.interface';

/**
 * Create an order
 * @param {IOrder} orderBody
 * @returns {Promise<IOrder>}
 */
export const createOrder = async (orderBody: IOrder): Promise<IOrder> => {
  const order = new Order(orderBody);
  const createdOrder = await order.save();
  return createdOrder.populate(['meals', 'owner']);
};

/**
 * Query for Order
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryOrder = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const order = await Order.paginate(filter, options);
  return order;
};

export const getOrderById = async (id: mongoose.Types.ObjectId): Promise<IOrder | null> =>
  Order.findById(id).populate(['meals', 'owner']);

/**
 * Update Order by id
 * @param {mongoose.Types.ObjectId} orderId
 * @param {UpdateOrderBody} updateBody
 * @returns {Promise<IOrder | null>}
 */
export const updateOrderById = async (
  orderId: mongoose.Types.ObjectId,
  updateBody: UpdateOrderBody
): Promise<IOrder | null> => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete Order by id
 * @param {mongoose.Types.ObjectId} orderId
 * @returns {Promise<IOrder | null>}
 */
export const deleteOrderById = async (orderId: mongoose.Types.ObjectId): Promise<IOrder | null> => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.deleteOne();
  return order;
};
