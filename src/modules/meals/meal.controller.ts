import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as mealService from './meal.service';

export const addMeal = catchAsync(async (req: Request, res: Response) => {
  const meal = await mealService.addMeal(req.body);
  res.status(httpStatus.CREATED).send(meal);
});

export const queryMeals = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mealService.queryMeals(filter, options);
  res.send(result);
});

export const getMeal = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['mealId'] === 'string') {
    const meal = await mealService.getMealById(new mongoose.Types.ObjectId(req.params['mealId']));
    if (!meal) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
    }
    res.send(meal);
  }
});

export const updateMeal = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['mealId'] === 'string') {
    const meal = await mealService.updateMealById(new mongoose.Types.ObjectId(req.params['mealId']), req.body);
    res.send(meal);
  }
});

export const deleteMeal = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['mealId'] === 'string') {
    await mealService.deleteMealById(new mongoose.Types.ObjectId(req.params['mealId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
