"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUserByID = exports.deleteUserByID = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
const Logger_1 = require("../Logger");
const logger = Logger_1.dblogger;
async function getUsers(req, res) {
    try {
        let users = await database_1.User.findAll();
        let returnUsers = [];
        if (users) {
            for (let user of users) {
                let roles = await user.getUserRoles({ attributes: ['roleID'] });
                let roleIds = [];
                for (let role of roles) {
                    roleIds.push(role.roleID);
                }
                returnUsers.push({
                    userID: user.userID,
                    name: user.name,
                    roles: roleIds
                });
            }
            res.status(200).json(returnUsers);
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getUsers = getUsers;
async function getUserById(req, res) {
    try {
        let user = await database_1.User.findByPk(req.params.id);
        if (user) {
            let roles = await user.getUserRoles({ attributes: ['roleID'] });
            let roleIds = [];
            for (let role of roles) {
                roleIds.push(role.roleID);
            }
            let returnUser = {
                userID: user.userID,
                name: user.name,
                roles: roleIds
            };
            res.status(200).json(returnUser);
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getUserById = getUserById;
async function postUser(req, res) {
    try {
        let user = req.body;
        let newUser = await database_1.User.create({
            name: user.name,
            password: user.password
        });
        newUser.save();
        let rolesToBeAdded = await database_1.UserRole.findAll({
            where: {
                roleID: user.roles
            }
        });
        await newUser.addUserRoles(rolesToBeAdded);
        res.status(200).json(newUser);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.postUser = postUser;
async function deleteUserByID(req, res) {
    try {
        let user = await database_1.User.findByPk(req.params.id);
        if (user) {
            user.destroy();
        }
        res.status(200).send("deleted user");
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.deleteUserByID = deleteUserByID;
async function putUserByID(req, res) {
    try {
        let newUser = req.body;
        let user = await database_1.User.findByPk(req.params.id);
        if (user) {
            user.name = newUser.name ? newUser.name : user.name;
            user.password = newUser.password ? newUser.password : user.password;
            await user.removeUserRoles(await database_1.UserRole.findAll());
            let rolesToBeAdded = await database_1.UserRole.findAll({
                where: {
                    roleID: newUser.roles
                }
            });
            await user.addUserRoles(rolesToBeAdded);
        }
        res.status(200).json(await user?.save());
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.putUserByID = putUserByID;
//# sourceMappingURL=userAPI.js.map