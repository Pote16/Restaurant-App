"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putMenuItemByID = exports.postMenuItem = exports.deleteMenuItems = exports.deleteMenuItemByID = exports.getMenuItemByID = exports.getMenuItems = void 0;
const database_1 = require("../database");
const Logger_1 = require("../Logger");
const logger = Logger_1.dblogger;
async function generateMenuItemObject(menuItem) {
    let categories = await menuItem.getMenuCategories({ attributes: ['categoryID'] });
    let catArr = [];
    for (let cat of categories) {
        catArr.push(cat.categoryID);
    }
    let allergens = await menuItem.getAllergens({ attributes: ['allergenID'] });
    let allArr = [];
    for (let all of allergens) {
        allArr.push(all.allergenID);
    }
    let returnMenuItem = {
        itemId: menuItem.itemID,
        title: menuItem.title,
        desc: menuItem.desc,
        price: menuItem.price,
        status: menuItem.status,
        category: catArr,
        allergens: allArr
    };
    return returnMenuItem;
}
async function getMenuItems(req, res) {
    try {
        let menuItems = await database_1.MenuItem.findAll();
        let retArray = [];
        for (let menuItem of menuItems) {
            let returnMenuItem = await generateMenuItemObject(menuItem);
            retArray.push(returnMenuItem);
        }
        res.status(200).json(retArray);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getMenuItems = getMenuItems;
async function getMenuItemByID(req, res) {
    try {
        let menuItem = await database_1.MenuItem.findByPk(req.params.id);
        if (menuItem) {
            let returnMenuItem = await generateMenuItemObject(menuItem);
            res.status(200).json(returnMenuItem);
        }
        else {
            res.status(400).send("MenuItem with ID: " + req.params.id + " doesn't exist.");
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getMenuItemByID = getMenuItemByID;
async function deleteMenuItemByID(req, res) {
    try {
        let menuItem = await database_1.MenuItem.findByPk(req.params.id);
        if (menuItem) {
            menuItem.status = 2;
            menuItem.save();
        }
        res.status(200).send("Set menuItem Status to NotAvailable");
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.deleteMenuItemByID = deleteMenuItemByID;
async function deleteMenuItems(req, res) {
    try {
        let menuItems = await database_1.MenuItem.findAll();
        for (let menuItem of menuItems) {
            menuItem.status = 2;
            menuItem.save();
        }
        res.status(200).send("Set all menuItems Status to NotAvailable");
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.deleteMenuItems = deleteMenuItems;
async function postMenuItem(req, res) {
    try {
        let menuItem = req.body;
        let newMenuItem = await database_1.MenuItem.create({
            title: menuItem.title,
            desc: menuItem.desc,
            price: menuItem.price,
            status: menuItem.status,
        });
        if (menuItem.category) {
            let categoriesToBeAdded = await database_1.MenuCategory.findAll({
                where: {
                    categoryID: menuItem.category
                }
            });
            newMenuItem.addMenuCategories(categoriesToBeAdded);
        }
        if (menuItem.allergens) {
            let allergensToBeAdded = await database_1.Allergens.findAll({
                where: {
                    allergenID: menuItem.allergens
                }
            });
            newMenuItem.addAllergens(allergensToBeAdded);
        }
        newMenuItem.save();
        res.status(200).json(newMenuItem);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.postMenuItem = postMenuItem;
async function putMenuItemByID(req, res) {
    try {
        let newMenuItem = req.body;
        let menuItem = await database_1.MenuItem.findByPk(req.params.id);
        if (menuItem) {
            menuItem.title = newMenuItem.title ? newMenuItem.title : menuItem.title;
            menuItem.desc = newMenuItem.desc ? newMenuItem.desc : menuItem.desc;
            menuItem.status = newMenuItem.status ? newMenuItem.status : menuItem.status;
            menuItem.price = newMenuItem.price ? newMenuItem.price : menuItem.price;
            if (newMenuItem.category) {
                await menuItem.removeMenuCategories(await database_1.MenuCategory.findAll());
                let categoriesToBeAdded = await database_1.MenuCategory.findAll({
                    where: {
                        categoryID: newMenuItem.category
                    }
                });
                await menuItem.addMenuCategories(categoriesToBeAdded);
            }
            if (newMenuItem.allergens) {
                await menuItem.removeAllergens(await database_1.Allergens.findAll());
                let allergensToBeAdded = await database_1.Allergens.findAll({
                    where: {
                        allergenID: newMenuItem.allergens
                    }
                });
                await menuItem.addAllergens(allergensToBeAdded);
            }
        }
        await menuItem?.save();
        res.status(200).json(menuItem);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.putMenuItemByID = putMenuItemByID;
//# sourceMappingURL=menuItemAPI.js.map