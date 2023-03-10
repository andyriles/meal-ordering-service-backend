import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IMenu extends Document {
  name: string;
  description: string;
  price: string;
  meals: string[];
}

export interface IMenuModel extends Model<IMenu> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
