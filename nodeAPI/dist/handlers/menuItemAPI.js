"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuItems = void 0;
const database_1 = require("../database");
const Logger_1 = require("../Logger");
const logger = Logger_1.dblogger;
async function getMenuItems(req, res) {
    try {
        let menuItems = await database_1.MenuItem.findAll();
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
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getMenuItems = getMenuItems;
//# sourceMappingURL=menuItemAPI.js.map