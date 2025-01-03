import express, { NextFunction, Request, Response } from 'express';
import UserService from "../service/User.service";
import { LocationInput, PlannerInput, UserInput } from "../types";
import PlannerService from '../service/Planner.service';
import LocationService from '../service/Location.service';

const LocationRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /location/:
 *   post:
 *     summary: create a new location
 *     tags: 
 *          - admin
 *          - user
 *     description: create a new location based on json input.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       403:
 *         description: Unauthorized. Only admins or users can access this route.
 *       500:
 *         description: Internal server error.
 */

LocationRouter.post('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        if (req.auth.role != 'admin' && req.auth.role != 'user') throw new Error('logged in user may not be a guest');

        const locationInput = <LocationInput>req.body;
        const result = await LocationService.createLocation(locationInput);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { LocationRouter }