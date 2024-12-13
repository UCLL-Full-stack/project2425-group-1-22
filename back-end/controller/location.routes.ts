import express, { NextFunction, Request, Response } from 'express';
import UserService from "../service/User.service";
import { LocationInput, PlannerInput, UserInput } from "../types";
import PlannerService from '../service/Planner.service';
import LocationService from '../service/Location.service';

const LocationRouter = express.Router();


LocationRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locationInput = <LocationInput>req.body;
        const result = await LocationService.createLocation(locationInput);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { LocationRouter }