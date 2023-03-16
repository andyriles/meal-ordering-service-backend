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

/**
 * @swagger
 * tags:
 *   name: menu
 *   description: menu management and retrieval
 */

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create a menu
 *     description: Only verified chefs can create a menu.
 *     tags: [menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - meals
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *               meals:
 *                  type: array
 *                  description: An array of mongodb IDs of meals that have already been created.
 *             example:
 *              name: Breakfast
 *              description: Food to give energy
 *              price: 50000
 *              meals:
 *                - 640c5837b29c28da6b4a2583
 *                - 640c5847b29c28da6b4a2585
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Menu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all menus
 *     description: Only chefs can retrieve all menus.
 *     tags: [menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: menu name
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *         description: menu price
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *         description: replaces id of meals with the details of the meals
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of menus
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Menu'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Get a menu
 *     description: Logged in chefs and chefs can query a menu.
 *     tags: [menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: menu id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Menu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a menu
 *     description: Logged in chefs can only update their own menu.
 *     tags: [menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: menu id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *               meals:
 *                  type: array
 *                  description: An array of mongodb IDs of meals that have already been created.
 *             example:
 *              name: Breakfast
 *              description: Food to give energy
 *              price: 50000
 *              meals:
 *                - 640c5837b29c28da6b4a2583
 *                - 640c5847b29c28da6b4a2585
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Menu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a menu
 *     description: Logged in chefs can delete only their menus.
 *     tags: [menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: menu id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
