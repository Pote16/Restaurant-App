import { Request, Response } from "express";
import { dblogger } from "../Logger";
import { ITableDB, MenuCategory, Table } from "../database";
import { IMenuCategoryAPI } from "../interfaces";

const logger = dblogger;

export async function getMenuCategories(req: Request, res: Response) {
  try {
    let menuCategories: MenuCategory[] = await MenuCategory.findAll();
    let retArray = [];
    for (let menuCategory of menuCategories) {
      let ret: IMenuCategoryAPI = {
        categoryId: menuCategory.categoryID,
        title: menuCategory.title,
        desc: menuCategory.desc
      }
      retArray.push(ret);
    }
    res.status(200).json(retArray);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function getMenuCategoryByID(req: Request, res: Response) {
  try {
    let menuCategory = await MenuCategory.findByPk(req.params.id);
    if (menuCategory) {
      let ret: IMenuCategoryAPI = {
        categoryId: menuCategory.categoryID,
        title: menuCategory.title,
        desc: menuCategory.desc
      }
      res.status(200).json(ret);
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function postMenuCategory(req: Request, res: Response) {
  try {
    let menuCategory = req.body as IMenuCategoryAPI;
    let newMenuCategory = await MenuCategory.create({
      title: menuCategory.title,
      desc: menuCategory.desc
    });
    res.status(200).json(newMenuCategory);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function putMenuCategoryByID(req: Request, res: Response) {
  try {
    let newMenuCategory = req.body as IMenuCategoryAPI;
    let menuCategory = await MenuCategory.findByPk(req.params.id);

    if (menuCategory) {
      menuCategory.title = newMenuCategory.title ? newMenuCategory.title : menuCategory.title;
      menuCategory.desc = newMenuCategory.desc ? newMenuCategory.desc : menuCategory.desc;
    }
    res.status(200).json(await menuCategory?.save());
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function deleteMenuCategoryByID(req: Request, res: Response) {
  try {
    let menuCategory = await MenuCategory.findByPk(req.params.id);

    if (menuCategory) {
      menuCategory.destroy();
      res.status(200).send("Category deleted");
    } else {
      res.status(400).send("Category not found");
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}
