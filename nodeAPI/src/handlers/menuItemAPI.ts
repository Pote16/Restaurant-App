import { Request, Response } from "express";
import {MenuItem, MenuCategory} from "../database";
import { IMenuItemAPI } from "../interfaces"
import { dblogger } from "../Logger";

const logger = dblogger;

export async function getMenuItems(req: Request, res: Response) {
    try {
      let menuItems: MenuItem[] = await MenuItem.findAll();
      let retArray = [];
      for (let menuItem of menuItems) {
        let categories = await menuItem.getMenuCategories();
        let allergens = await menuItem.getAllergens();
        retArray.push({
          "item": menuItem,
          "categories": categories,
          "allergens": allergens
        });
      }
      res.status(200).json(retArray);
    } catch (error) {
      logger.error(error);
      res.status(400).send("failed");
    }
}

