import { Request, Response } from "express";
import { dblogger } from "../Logger";
import {GuestReguest, ITableDB, Table} from "../database";
import {IGuestRequestAPI} from "../interfaces";

const logger = dblogger;

export async function getGuestRequests(req: Request, res: Response) {
  try {
    let guestRequests: GuestReguest[] = await GuestReguest.findAll();
    let retArray = [];
    for (let guestReguest of guestRequests) {
      let ret : IGuestRequestAPI = {
        guestReguestID: guestReguest.guestReguestID,
        status: guestReguest.status,
        tableID: guestReguest.tableID
      }
      retArray.push(ret);
    }
    res.status(200).json(retArray);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function getGuestRequestsByID(req: Request, res: Response) {
  try {
    let guestReguest = await GuestReguest.findByPk(req.params.id);
    if(guestReguest) {
      let ret : IGuestRequestAPI = {
        guestReguestID: guestReguest.guestReguestID,
        status: guestReguest.status,
        tableID: guestReguest.tableID
      }
      res.status(200).json(ret);
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function postGuestRequests(req: Request, res: Response) {
  try {
    let guestReguest = req.body as IGuestRequestAPI;
    let newguestReguest = await GuestReguest.create({
      status: guestReguest.status,
      tableID: guestReguest.tableID
    });
    res.status(200).json(newguestReguest);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function putGuestRequestsByID(req: Request, res: Response) {
  try {
    let newguestReguest = req.body as IGuestRequestAPI;
    let guestReguest = await GuestReguest.findByPk(req.params.id);

    if (guestReguest) {
      guestReguest.status = newguestReguest.status ? newguestReguest.status : guestReguest.status;
      guestReguest.tableID = newguestReguest.tableID ? newguestReguest.tableID : guestReguest.tableID;
    }
    res.status(200).json(await guestReguest?.save());
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}
