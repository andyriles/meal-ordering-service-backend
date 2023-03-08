import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { mealController, mealValidation } from '../../modules/meals';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageMeals'), validate(mealValidation.createMeal), mealController.addMeal)
  .get(auth('getMeals'), validate(mealValidation.getMeals), mealController.queryMeals);

router
  .route('/:mealId')
  .get(auth('getMeals'), validate(mealValidation.getMeal), mealController.getMeal)
  .patch(auth('manageMeals'), validate(mealValidation.updateMeal), mealController.updateMeal)
  .delete(auth('manageMeals'), validate(mealValidation.deleteMeal), mealController.deleteMeal);

export default router;
