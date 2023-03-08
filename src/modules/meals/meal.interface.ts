import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IMeal extends Document {
  name: String;
  description: String;
}

export interface IMealModel extends Model<IMeal> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
