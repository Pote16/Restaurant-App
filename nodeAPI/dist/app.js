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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importStar(require("express"));
const database_1 = require("./database");
const Logger_1 = require("./Logger");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use(express_1.default.static("public"));
const authentication_routes = require("./auth/routes")(express_1.default.Router());
app.use("/authentication", authentication_routes);
const menuItemRoutes = require("./menuItems/routes")(express_1.default.Router());
app.use("/menuItems", menuItemRoutes);
const ordersRoutes = require("./orders/routes")(express_1.default.Router());
app.use("/orders", ordersRoutes);
const tablesRoutes = require("./tables/routes")(express_1.default.Router());
app.use("/tables", tablesRoutes);
const categoryRoutes = require("./menuCategories/routes")(express_1.default.Router());
app.use("/categories", categoryRoutes);
//TODO: Statuse Get und Post  :Dominik
const userRoutes = require("./users/routes")(express_1.default.Router());
app.use("/users", userRoutes);
const userRolesRoutes = require("./userRoles/routes")(express_1.default.Router());
app.use("/userroles", userRolesRoutes);
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || `localhost:${PORT}`;
if (!process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME) {
    throw new Error("Missing DB_USER or DB_PASSWORD or DB_NAME environment or AES_KEY variable.");
}
async function startDBCon() {
    await (0, database_1.init)();
}
startDBCon();
app.listen(PORT, () => Logger_1.applogger.info(`=== Starting Node-API on http://${DOMAIN}:${PORT}===`));
//# sourceMappingURL=app.js.map