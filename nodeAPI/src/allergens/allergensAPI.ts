import { Request, Response } from "express";
import { Allergens } from "../database";
import { dblogger } from "../Logger";
import {IAllergensAPI} from "../interfaces";

const logger = dblogger;


export async function getAllergens(req: Request, res: Response) {
    try {

        let allergens : IAllergensAPI[] = await Allergens.findAll();

        if (allergens) {
            res.status(200).json(allergens);
        }
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function getAllergenByID(req: Request, res: Response) {
    try {

        let allergen = await Allergens.findByPk(req.params.id) as IAllergensAPI;

        if (allergen) {
            res.status(200).json(allergen);
        }
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}