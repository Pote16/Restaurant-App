"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const database_1 = require("../database");
const Logger_1 = require("../Logger");
const logger = Logger_1.dblogger;
async function getUser(username, password) {
    try {
        let user = await database_1.User.findOne({
            where: {
                name: username,
                password: password
            }
        });
        if (user) {
            return user;
        }
        else {
            return "No User with this combination";
        }
    }
    catch (error) {
        logger.error(error);
    }
}
exports.getUser = getUser;
//# sourceMappingURL=authAPI.js.map