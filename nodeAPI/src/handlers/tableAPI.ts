import { Request, Response } from "express";
import { ITableDB, Table } from "../database";
import { dblogger } from "../Logger";

const logger = dblogger;


//@TODO Handle Orders
export async function getTables(req: Request, res: Response) {
    try {

        let tables = await Table.findAll();

        if (tables) {
            res.status(200).json(tables);
        }
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function postTable(req: Request, res: Response) {
    try {
        let table = req.body as ITableDB;
        let newtable = await Table.create({
            anzahlPlatz: table.anzahlPlatz,
            beschreibung: table.beschreibung
        });
        res.status(200).json(newtable);

    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}