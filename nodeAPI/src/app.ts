import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import { init } from "./database";
import { applogger } from "./Logger";

const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

const router = express.Router({ strict: false })

const authentication_routes = require("./auth/routes")(express.Router());
app.use("/authentication", authentication_routes);

const menuItemRoutes = require("./menuItems/routes")(express.Router());
app.use("/menuItems", menuItemRoutes);

const ordersRoutes = require("./orders/routes")(express.Router());
app.use("/orders", ordersRoutes);

const tablesRoutes = require("./tables/routes")(express.Router());
app.use("/tables", tablesRoutes);

const categoryRoutes = require("./menuCategories/routes")(express.Router());
app.use("/categories", categoryRoutes);

const userRoutes = require("./users/routes")(express.Router());
app.use("/users", userRoutes);

const userRolesRoutes = require("./userRoles/routes")(express.Router());
app.use("/userroles", userRolesRoutes);

const guestRequestsRoutes = require("./guestRequest/routes")(express.Router());
app.use("/guestrequest", guestRequestsRoutes);

const reviewsRoutes = require("./reviews/routes")(express.Router());
app.use("/reviews", reviewsRoutes);

const allergensRoutes = require("./allergens/routes")(express.Router());
app.use("/allergens", allergensRoutes);

const resourcesRoutes = require("./resources/routes")(express.Router());
app.use("/resources", resourcesRoutes);


app.set('view engine', 'pug');
app.use(express.static('../public/admin'));
app.use(express.static('../public/kitchen'));
app.use(express.static('../public/guest'));


app.get('/admin', (req, res) => {
    res.sendFile('index.html', { root: "/public/admin" });
});

app.get('/kitchen', (req, res) => {
    res.sendFile('index.html', { root: "/public/kitchen" });
});

app.get('/guest', (req, res) => {
    res.sendFile('index.html', { root: "/public/guest" });
});



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
