import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Meal from './meal.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IMeal } from './meal.interface';

/**
 * Query for meals
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryMeals = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const meals = await Meal.paginate(filter, options);
  return meals;
};

/**
 * Create a meal
 * @param {IMeal} mealBody
 * @returns {Promise<IMeal>}
 */
export const addMeal = async (mealBody: IMeal): Promise<IMeal> => {
  const meal = new Meal(mealBody);
  const createdMeal = await meal.save();
  return createdMeal;
};

/**
 * Get meal by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IMeal | null>}
 */
export const getMealById = async (id: mongoose.Types.ObjectId): Promise<IMeal | null> => Meal.findById(id);

/**
 * Update meal by id
 * @param {mongoose.Types.ObjectId} mealId
 * @param {IMeal} updateBody
 * @returns {Promise<IMeal | null>}
 */
export const updateMealById = async (mealId: mongoose.Types.ObjectId, updateBody: IMeal): Promise<IMeal | null> => {
  const meal = await getMealById(mealId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  Object.assign(meal, updateBody);
  await meal.save();
  return meal;
};

/**
 * Delete meal by id
 * @param {mongoose.Types.ObjectId} mealId
 * @returns {Promise<IMeal | null>}
 */
export const deleteMealById = async (mealId: mongoose.Types.ObjectId): Promise<IMeal | null> => {
  const meal = await getMealById(mealId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  await meal.deleteOne();
  return meal;
};
