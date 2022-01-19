"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTableByID = exports.putTableByID = exports.getTableByID = exports.postTable = exports.getTables = void 0;
const database_1 = require("../database");
const Logger_1 = require("../Logger");
const logger = Logger_1.dblogger;
//@TODO Handle tables
async function getTables(req, res) {
    try {
        let tables = await database_1.Table.findAll();
        if (tables) {
            res.status(200).json(tables);
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getTables = getTables;
async function postTable(req, res) {
    try {
        let table = req.body;
        let newtable = await database_1.Table.create({
            anzahlPlatz: table.anzahlPlatz,
            beschreibung: table.beschreibung
        });
        res.status(200).json(newtable);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.postTable = postTable;
async function getTableByID(req, res) {
    try {
        let table = await database_1.Table.findByPk(req.params.id);
        if (table) {
            res.status(200).json(table);
        }
        else {
            res.status(400).send("No Table with this ID");
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getTableByID = getTableByID;
async function putTableByID(req, res) {
    try {
        let newTable = req.body; //as ItableAPI;
        let table = await database_1.Table.findByPk(req.params.id);
        if (table) {
            table.anzahlPlatz = newTable.anzahlPlatz ? newTable.anzahlPlatz : table.anzahlPlatz;
            table.beschreibung = newTable.beschreibung ? newTable.beschreibung : table.beschreibung;
        }
        res.status(200).json(await table?.save());
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.putTableByID = putTableByID;
async function deleteTableByID(req, res) {
    try {
        let table = await database_1.Table.findByPk(req.params.id);
        if (table) {
            table.destroy();
        }
        res.status(200).send("deleted table");
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.deleteTableByID = deleteTableByID;
//# sourceMappingURL=tableAPI.js.map