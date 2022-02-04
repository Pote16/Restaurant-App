import { Request, Response } from "express";
import { GuestRequestStatus, MenuItemStatus, OrderItemStatus, OrderStatus } from "../database";
import { dblogger } from "../Logger";

const logger = dblogger;

export async function getOrderedItemStatusList(req: Request, res: Response) {
  try {
    let orderedItemStatusList = await OrderItemStatus.findAll();
    if (orderedItemStatusList) {
      res.status(200).json(orderedItemStatusList)
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function getOrderStatusList(req: Request, res: Response) {
  try {
    let orderStatusList = await OrderStatus.findAll();
    if (orderStatusList) {
      res.status(200).json(orderStatusList)
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function getMenuItemStatusList(req: Request, res: Response) {
  try {
    let menuItemStatusList = await MenuItemStatus.findAll();
    if (menuItemStatusList) {
      res.status(200).json(menuItemStatusList)
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function getGuestRequestStatusList(req: Request, res: Response) {
  try {
    let guestRequestStatusList = await GuestRequestStatus.findAll();
    if (guestRequestStatusList) {
      res.status(200).json(guestRequestStatusList)
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}