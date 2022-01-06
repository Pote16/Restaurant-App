import { Request, Response } from "express";
import {MenuItem, MenuCategory, Order, OrderedItem, Allergens} from "../database";
import {IMenuItemAPI, IOrderAPI} from "../interfaces"
import { dblogger } from "../Logger";
import {where} from "sequelize";

const logger = dblogger;

async function generateMenuItemObject(menuItem: MenuItem) {
  let categories = await menuItem.getMenuCategories({attributes: ['categoryID']});
  let catArr = [];
  for (let cat of categories) {
    catArr.push(cat.categoryID);
  }
  let allergens = await menuItem.getAllergens({attributes: ['allergenID']});
  let allArr = [];
  for (let all of allergens) {
    allArr.push(all.allergenID);
  }
  let returnMenuItem: IMenuItemAPI = {
    itemId: menuItem.itemID,
    title: menuItem.title,
    desc: menuItem.desc,
    price: menuItem.price,
    status: menuItem.status,
    category: catArr,
    allergens: allArr
  }
  return returnMenuItem;
}

export async function getMenuItems(req: Request, res: Response) {
    try {
      let menuItems: MenuItem[] = await MenuItem.findAll();
      let retArray = [];
      for (let menuItem of menuItems) {
        let returnMenuItem = await generateMenuItemObject(menuItem);
        retArray.push(returnMenuItem);
      }
      res.status(200).json(retArray);
    } catch (error) {
      logger.error(error);
      res.status(400).send("failed");
    }
}

export async function getMenuItemByID(req: Request, res: Response) {
  try {
    let menuItem: MenuItem | null = await MenuItem.findByPk(req.params.id);
    if (menuItem) {
      let returnMenuItem = await generateMenuItemObject(menuItem);
      res.status(200).json(returnMenuItem);
    } else {
      res.status(400).send("MenuItem with ID: " + req.params.id + " doesn't exist.");
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function deleteMenuItemByID(req: Request, res: Response) {
  try {
    let menuItem = await MenuItem.findByPk(req.params.id);
    if (menuItem) {
      menuItem.status = 2;
      menuItem.save();
    }
    res.status(200).send("Set menuItem Status to NotAvailable");
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function deleteMenuItems(req: Request, res: Response) {
  try {
    let menuItems = await MenuItem.findAll();
    for (let menuItem of menuItems) {
      menuItem.status = 2;
      menuItem.save();
    }
    res.status(200).send("Set all menuItems Status to NotAvailable");
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}


export async function postMenuItem(req: Request, res: Response) {
  try {
    let menuItem = req.body as IMenuItemAPI;

    let newMenuItem = await MenuItem.create({
      title: menuItem.title,
      desc: menuItem.desc,
      price: menuItem.price,
      status: menuItem.status,
    });
    if(menuItem.category) {
      let categoriesToBeAdded = await MenuCategory.findAll({
        where: {
          categoryID: menuItem.category
        }
      });
      newMenuItem.addMenuCategories(categoriesToBeAdded);
    }
    if(menuItem.allergens) {
      let allergensToBeAdded = await Allergens.findAll({
        where: {
          allergenID: menuItem.allergens
        }
      });
      newMenuItem.addAllergens(allergensToBeAdded);
    }
    newMenuItem.save();

    res.status(200).json(newMenuItem);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function putMenuItemByID(req: Request, res: Response) {
  try {
    let newMenuItem = req.body as IMenuItemAPI;
    let menuItem = await MenuItem.findByPk(req.params.id);

    if (menuItem) {
      menuItem.title = newMenuItem.title ? newMenuItem.title : menuItem.title;
      menuItem.desc = newMenuItem.desc ? newMenuItem.desc : menuItem.desc;
      menuItem.status = newMenuItem.status ? newMenuItem.status : menuItem.status;
      menuItem.price = newMenuItem.price ? newMenuItem.price : menuItem.price;
      if(newMenuItem.category) {
        await menuItem.removeMenuCategories(await MenuCategory.findAll());

        let categoriesToBeAdded = await MenuCategory.findAll({
          where: {
            categoryID: newMenuItem.category
          }
        });
        await menuItem.addMenuCategories(categoriesToBeAdded);
      }
      if(newMenuItem.allergens) {
        await menuItem.removeAllergens(await Allergens.findAll());
        let allergensToBeAdded = await Allergens.findAll({
          where: {
            allergenID: newMenuItem.allergens
          }
        });
        await menuItem.addAllergens(allergensToBeAdded);
      }
    }
    await menuItem?.save();
    res.status(200).json(menuItem);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}
