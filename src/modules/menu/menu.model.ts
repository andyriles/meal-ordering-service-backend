import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IMenu, IMenuModel } from './menu.interface';

const menuSchema = new mongoose.Schema<IMenu, IMenuModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true }],
  },
  {
    timestamps: true,
  }
);

menuSchema.plugin(toJSON);
menuSchema.plugin(paginate);

const Menu = mongoose.model<IMenu, IMenuModel>('Menu', menuSchema);
export default Menu;
