import { Request, Response } from "express";
import { Order, OrderedItem } from "./database";
import { IOrderAPI, IMenuCategoryAPI, IMenuItemAPI, IOrderedItemAPI, IUserAPI } from "./interfaces"
import { dblogger } from "./Logger";

const logger = dblogger;


//Handle Orders
export async function getOrders(req: Request, res: Response) {

}
export async function deleteOrders(req: Request, res: Response) {

}

export async function postOrders(req: Request, res: Response) {
    let id = req.params.id;
}

export async function getOrderByID(req: Request, res: Response) {
    try {
        let order = await Order.findOne({
            where: {
                orderID: req.params.id
            }
        });
        let ordereditems = await OrderedItem.findAll({
            where: {
                orderID: req.params.id
            }
        });
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
    let answer = {};
    res.status(200).json(answer);
}

export async function putOrderByID(req: Request, res: Response) {
    let id = req.params.id;
}

export async function deleteOrderByID(req: Request, res: Response) {
    let id = req.params.id;
}


//Handle MenuItems

