import mongoose from 'mongoose';
import { IOrder, IOrderModel } from './order.interface';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';

const orderSchema = new mongoose.Schema<IOrder, IOrderModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

const Order = mongoose.model<IOrder, IOrderModel>('Order', orderSchema);
export default Order;
