import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as menuService from './menu.service';

export const createMenu = catchAsync(async (req: Request, res: Response) => {
  const menu = await menuService.createMenu(req.body);
  res.status(httpStatus.CREATED).send(menu);
});

export const queryMenu = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'price']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await menuService.queryMenu(filter, options);
  res.send(result);
});

export const getMenuById = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['menuId'] === 'string') {
    const menu = await menuService.getMenuById(new mongoose.Types.ObjectId(req.params['menuId']));
    if (!menu) {
      throw new ApiError(httpStatus.NOT_FOUND, 'menu not found');
    }
    res.send(menu);
  }
});

export const updateMenu = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['menuId'] === 'string') {
    const menu = await menuService.updateMenuById(new mongoose.Types.ObjectId(req.params['menuId']), req.body);
    res.send(menu);
  }
});

export const deleteMenu = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['menuId'] === 'string') {
    await menuService.deleteMenuById(new mongoose.Types.ObjectId(req.params['menuId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
