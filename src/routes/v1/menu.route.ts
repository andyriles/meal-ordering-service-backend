import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { menuController, menuValidation } from '../../modules/menu';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageMenu'), validate(menuValidation.createMenu), menuController.createMenu)
  .get(auth('getMenu'), validate(menuValidation.getMenu), menuController.queryMenu);

router
  .route('/:menuId')
  .get(auth('getMenu'), validate(menuValidation.getMenuById), menuController.getMenuById)
  .patch(auth('manageMenu'), validate(menuValidation.updateMenu), menuController.updateMenu)
  .delete(auth('manageMenu'), validate(menuValidation.deleteMenu), menuController.deleteMenu);

export default router;
