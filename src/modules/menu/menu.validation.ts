import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createMenuBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  meals: Joi.array().items(Joi.string().custom(objectId)),
};

export const createMenu = {
  body: Joi.object().keys(createMenuBody),
};

export const getMenu = {
  query: Joi.object().keys({
    name: Joi.string(),
    price: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

export const getMenuById = {
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
};

export const updateMenu = {
  params: Joi.object().keys({
    menuId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      meals: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

export const deleteMenu = {
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
};
