import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { orderController, orderValidation } from '../../modules/orders';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageOrder'), validate(orderValidation.createOrder), orderController.createOrder)
  .get(auth('getOrder'), validate(orderValidation.getOrder), orderController.queryOrder);

router
  .route('/:orderId')
  .get(auth('getOrder'), validate(orderValidation.getOrderById), orderController.getOrderById)
  .patch(auth('manageOrder'), validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(auth('manageOrder'), validate(orderValidation.deleteOrder), orderController.deleteorder);

export default router;
