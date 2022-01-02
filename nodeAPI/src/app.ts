import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import { init } from "./database";
import { router } from "./router";
import { applogger } from "./Logger";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(router);
app.use(express.static("public"));


const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || `localhost:${PORT}`;

if (
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME ||
    !process.env.AES_KEY
) {
    throw new Error(
        "Missing DB_USER or DB_PASSWORD or DB_NAME environment or AES_KEY variable."
    );
}

console.log("Test");

async function startDBCon() {
    await init();
}

startDBCon();

app.listen(PORT, () =>
    applogger.info(`=== Starting Node-API on http://${DOMAIN}:${PORT}===`)
);