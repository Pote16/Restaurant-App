import { Request, Response } from "express";
import { ITableDB, Table } from "../database";
import { dblogger } from "../Logger";

const logger = dblogger;


//@TODO Handle tables
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
            tischNummer: table.tischNummer,
            anzahlPlatz: table.anzahlPlatz,
            beschreibung: table.beschreibung
        });
        res.status(200).json(newtable);

    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function getTableByID(req: Request, res: Response) {
    try {
        let table = await Table.findByPk(req.params.id);
        if (table) {
            res.status(200).json(table);
        } else {
            res.status(400).send("No Table with this ID");
        }
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function putTableByID(req: Request, res: Response) {
    try {
        let newTable: ITableDB = req.body; //as ItableAPI;
        let table = await Table.findByPk(req.params.id);

        if (table) {
            table.tischNummer = newTable.tischNummer ? newTable.tischNummer : table.tischNummer;
            table.anzahlPlatz = newTable.anzahlPlatz ? newTable.anzahlPlatz : table.anzahlPlatz;
            table.beschreibung = newTable.beschreibung ? newTable.beschreibung : table.beschreibung;
        }
        res.status(200).json(await table?.save());
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}


export async function deleteTableByID(req: Request, res: Response) {
    try {
        let table = await Table.findByPk(req.params.id);
        if (table) {
            table.destroy();
            res.status(200).send("deleted table");
        } else {
            res.status(200).send("Table not found");
        }

    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}