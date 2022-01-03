import { Request, Response } from "express";
import {MenuItem} from "../database";
import { IMenuItemAPI } from "../interfaces"
import { dblogger } from "../Logger";

const logger = dblogger;

export async function getMenuItems(req: Request, res: Response) {
    try {
      let menuItems = await MenuItem.findAll();
      res.status(200).json(menuItems);
    } catch (error) {
      logger.error(error);
      res.status(400).send("failed");
    }
}

