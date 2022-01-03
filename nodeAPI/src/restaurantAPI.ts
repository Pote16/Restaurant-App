import { Request, Response } from "express";
import { Order, OrderedItem, IOrderDB } from "./database";
import { IOrderAPI, IMenuCategoryAPI, IMenuItemAPI, IOrderedItemAPI, IUserAPI } from "./interfaces"
import { dblogger } from "./Logger";

const logger = dblogger;


//Handle Orders
export async function getOrders(req: Request, res: Response) {
    try {
        let ordersAnswer = [{}];
        let orders: IOrderDB[] = await Order.findAll();

        orders.forEach(async (order) => {
            let orderditems: OrderedItem[] = await OrderedItem.findAll({
                where: {
                    orderID: order.orderID
                }
            });

            let orderedItemsAnswer = [{}];

            orderditems.forEach(orderitem => {
                orderedItemsAnswer.push({
                    itemId: orderitem.itemID,
                    number: orderitem.number,
                    status: orderitem.orderItemSatusID
                });
            });

            ordersAnswer.push({
                orderId: order.orderID,
                status: order.orderStatusID,
                orderDate: order.orderDate,
                tableId: order.tableID,
                paymentReference: order.paymentReference,
                paymentToken: order.paymentToken,
                totalAmount: order.totalAmount,
                orderedItems: orderedItemsAnswer,
            });
        });

        res.status(200).json(ordersAnswer);
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function deleteOrders(req: Request, res: Response) {

}

export async function postOrders(req: Request, res: Response) {
    try {
        let order = req.body as IOrderAPI;

        let newOrderDB = {
            orderStatusID: order.status,
            orderDate: order.orderDate,
            tableID: order.tableId,
            paymentReference: order.paymentReference,
            paymentToken: order.paymentToken,
            totalAmount: order.totalAmount,
        }

        await Order.create({
            orderID: 1,
            orderStatusID: order.status,
            orderDate: order.orderDate | Date.now(),
            tableID: order.tableId,
            paymentReference: order.paymentReference,
            paymentToken: order.paymentToken,
            totalAmount: order.totalAmount
        });

        order.orderedItems.forEach(async (orderitem) => {
            await OrderedItem.create({
                orderID: order.orderId,
                itemID: orderitem.itemId,
                number: orderitem.number,
                orderItemSatusID: orderitem.status
            });
        });

        res.status(200).send("created new Order");

    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function getOrderByID(req: Request, res: Response) {
    let ordersAnswer = {};
    let orderedItemsAnswer = [{}];

    try {
        let order = await Order.findOne({
            where: {
                orderID: req.params.id
            }
        });

        if (order) {
            let ordereditems = await OrderedItem.findAll({
                where: {
                    orderID: req.params.id
                }
            });

            ordereditems.forEach(orderitem => {
                orderedItemsAnswer.push({
                    itemId: orderitem.itemID,
                    number: orderitem.number,
                    status: orderitem.orderItemSatusID
                });
            });

            ordersAnswer = {
                orderId: order.orderID,
                status: order.orderStatusID,
                orderDate: order.orderDate,
                tableId: order.tableID,
                paymentReference: order.paymentReference,
                paymentToken: order.paymentToken,
                totalAmount: order.totalAmount,
                orderedItems: orderedItemsAnswer,
            };
            res.status(200).json(ordersAnswer);
        } else {
            res.status(200).send("Invalid Order Number");
        }
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function putOrderByID(req: Request, res: Response) {
    let id = req.params.id;
}

export async function deleteOrderByID(req: Request, res: Response) {
    let id = req.params.id;
}


//Handle MenuItems




//Helper Functions
