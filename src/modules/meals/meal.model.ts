import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IMeal, IMealModel } from './meal.interface';

const mealSchema = new mongoose.Schema<IMeal, IMealModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

mealSchema.plugin(toJSON);
mealSchema.plugin(paginate);

const Meal = mongoose.model<IMeal, IMealModel>('Meal', mealSchema);
export default Meal;
