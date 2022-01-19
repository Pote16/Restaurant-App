"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putMenuCategoryByID = exports.postMenuCategory = exports.getMenuCategoryByID = exports.getMenuCategories = void 0;
const Logger_1 = require("../Logger");
const database_1 = require("../database");
const logger = Logger_1.dblogger;
async function getMenuCategories(req, res) {
    try {
        let menuCategories = await database_1.MenuCategory.findAll();
        let retArray = [];
        for (let menuCategory of menuCategories) {
            let ret = {
                categoryId: menuCategory.categoryID,
                title: menuCategory.title,
                desc: menuCategory.desc
            };
            retArray.push(ret);
        }
        res.status(200).json(retArray);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getMenuCategories = getMenuCategories;
async function getMenuCategoryByID(req, res) {
    try {
        let menuCategory = await database_1.MenuCategory.findByPk(req.params.id);
        if (menuCategory) {
            let ret = {
                categoryId: menuCategory.categoryID,
                title: menuCategory.title,
                desc: menuCategory.desc
            };
            res.status(200).json(ret);
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getMenuCategoryByID = getMenuCategoryByID;
async function postMenuCategory(req, res) {
    try {
        let menuCategory = req.body;
        let newMenuCategory = await database_1.MenuCategory.create({
            title: menuCategory.title,
            desc: menuCategory.desc
        });
        res.status(200).json(newMenuCategory);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.postMenuCategory = postMenuCategory;
async function putMenuCategoryByID(req, res) {
    try {
        let newMenuCategory = req.body;
        let menuCategory = await database_1.MenuCategory.findByPk(req.params.id);
        if (menuCategory) {
            menuCategory.title = newMenuCategory.title ? newMenuCategory.title : menuCategory.title;
            menuCategory.desc = newMenuCategory.desc ? newMenuCategory.desc : menuCategory.desc;
        }
        res.status(200).json(await menuCategory?.save());
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.putMenuCategoryByID = putMenuCategoryByID;
//# sourceMappingURL=categoryAPI.js.map