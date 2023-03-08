import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createMealBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
};

export const createMeal = {
  body: Joi.object().keys(createMealBody),
};

export const getMeals = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getMeal = {
  params: Joi.object().keys({
    mealId: Joi.string().custom(objectId),
  }),
};

export const updateMeal = {
  params: Joi.object().keys({
    mealId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
    })
    .min(1),
};

export const deleteMeal = {
  params: Joi.object().keys({
    mealId: Joi.string().custom(objectId),
  }),
};
