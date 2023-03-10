import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Menu from './menu.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IMenu } from './menu.interface';

/**
 * Create a menu
 * @param {IMenu} menuBody
 * @returns {Promise<IMenu>}
 */
export const createMenu = async (menuBody: IMenu): Promise<IMenu> => {
  const menu = new Menu(menuBody);
  const createdMenu = await menu.save();
  return createdMenu;
};

/**
 * Query for menu
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryMenu = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const menu = await Menu.paginate(filter, options);
  return menu;
};

export const getMenuById = async (id: mongoose.Types.ObjectId): Promise<IMenu | null> => Menu.findById(id);

/**
 * Update meal by id
 * @param {mongoose.Types.ObjectId} mealId
 * @param {IMeal} updateBody
 * @returns {Promise<IMeal | null>}
 */
export const updateMenuById = async (menuId: mongoose.Types.ObjectId, updateBody: IMenu): Promise<IMenu | null> => {
  const menu = await getMenuById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  Object.assign(menu, updateBody);
  await menu.save();
  return menu;
};

/**
 * Delete user by id
 * @param {mongoose.Types.ObjectId} menuId
 * @returns {Promise<IMenu | null>}
 */
export const deleteMenuById = async (menuId: mongoose.Types.ObjectId): Promise<IMenu | null> => {
  const menu = await getMenuById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not found');
  }
  await menu.remove();
  return menu;
};
