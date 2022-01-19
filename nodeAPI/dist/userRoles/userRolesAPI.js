"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUserRoleByID = exports.postUserRole = exports.getUserRoleByID = exports.getUserRoles = void 0;
const database_1 = require("../database");
const Logger_1 = require("../Logger");
const logger = Logger_1.dblogger;
async function getUserRoles(req, res) {
    try {
        let userRoles = await database_1.UserRole.findAll();
        if (userRoles) {
            let userRolesRet = [];
            for (let userRole of userRoles) {
                userRolesRet.push({
                    roleID: userRole.roleID,
                    name: userRole.name
                });
            }
            res.status(200).json(userRolesRet);
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getUserRoles = getUserRoles;
async function getUserRoleByID(req, res) {
    try {
        let userRole = await database_1.UserRole.findByPk(req.params.id);
        if (userRole) {
            let userRolesRet = {
                roleID: userRole.roleID,
                name: userRole.name
            };
            res.status(200).json(userRolesRet);
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getUserRoleByID = getUserRoleByID;
async function postUserRole(req, res) {
    try {
        let userRole = req.body;
        let newUserRole = await database_1.UserRole.create({
            name: userRole.name
        });
        res.status(200).json(newUserRole);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.postUserRole = postUserRole;
async function putUserRoleByID(req, res) {
    try {
        let newUserRole = req.body;
        let userRole = await database_1.UserRole.findByPk(req.params.id);
        if (userRole) {
            userRole.name = newUserRole.name ? newUserRole.name : userRole.name;
        }
        res.status(200).json(await userRole?.save());
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.putUserRoleByID = putUserRoleByID;
//# sourceMappingURL=userRolesAPI.js.map