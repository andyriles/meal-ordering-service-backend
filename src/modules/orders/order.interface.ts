import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IOrder extends Document {
  name: string;
  description: string;
  price: string;
  meals: string[];
  owner: mongoose.ObjectId;
}

export interface IOrderModel extends Model<IOrder> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
