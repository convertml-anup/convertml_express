import { Router } from 'express';
import { exampleController } from '../controllers/exampleController';

const router = Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     description: Get an example response
 *     responses:
 *       200:
 *         description: Example response
 */
router.get('/example', exampleController);

export default router;
