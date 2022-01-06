import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import { init } from "./database";
import { applogger } from "./Logger";

const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

const authentication_routes = require("./auth/routes")(express.Router());
app.use("/authentication", authentication_routes);

const menuItemRoutes = require("./menuItems/routes")(express.Router());
app.use("/menuItems", menuItemRoutes);

const ordersRoutes = require("./orders/routes")(express.Router());
app.use("/orders", ordersRoutes);

const tablesRoutes = require("./tables/routes")(express.Router());
app.use("/tables", tablesRoutes);

//TODO: CategoryAPI
const categoryRoutes = require("./menuCategories/routes")(express.Router());
app.use("/categories", categoryRoutes);

//TODO: Statuse Get und Post  :Dominik
//TODO: Users API



const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || `localhost:${PORT}`;

if (
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME
) {
    throw new Error("Missing DB_USER or DB_PASSWORD or DB_NAME environment or AES_KEY variable.");
}

async function startDBCon() {
    await init();
}

startDBCon();

app.listen(PORT, () =>
    applogger.info(`=== Starting Node-API on http://${DOMAIN}:${PORT}===`)
);
