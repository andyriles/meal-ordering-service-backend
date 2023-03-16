import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createOrderBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  meals: Joi.array().items(Joi.string().custom(objectId)),
  owner: Joi.string().custom(objectId),
};

export const createOrder = {
  body: Joi.object().keys(createOrderBody),
};

export const getOrder = {
  query: Joi.object().keys({
    name: Joi.string(),
    owner: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

export const getOrderById = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

export const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      meals: Joi.array().items(Joi.string().custom(objectId)),
      owner: Joi.string().custom(objectId),
    })
    .min(1),
};

export const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};
