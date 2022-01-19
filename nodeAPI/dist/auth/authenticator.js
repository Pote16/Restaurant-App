"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.login = void 0;
const userHandler = __importStar(require("./authAPI"));
const jwt = require('jsonwebtoken');
async function login(req, res) {
    let username = req.body.user;
    let password = req.body.pass;
    let user = userHandler.getUser(username, password);
    if (user instanceof Object) {
        const token = jwt.sign({
            username: username,
            password: password,
        }, process.env.JWT_KEY, {
            expiresIn: process.env.EXPIRATION
        });
        res.status(200).json({
            message: "login successful",
            login: username,
            token: token
        });
    }
    else {
        res.status(403).json({
            message: "Not logged in. Wrong username/password combination!"
        });
    }
}
exports.login = login;
function isAuthorized(req, res, next) {
    try {
        const jwtToken = req.headers.authorization;
        jwt.verify(jwtToken, process.env.JWT_KEY);
        next();
    }
    catch (e) {
        return res.status(401).json({ message: "Authentication failed" });
    }
}
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=authenticator.js.map