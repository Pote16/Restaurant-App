import { Request, Response } from "express";
import { Order, OrderedItem, IOrderDB, OrderStatus } from "../database";
import { IOrderAPI, IMenuCategoryAPI, IMenuItemAPI, IOrderedItemAPI, IUserAPI, } from "../interfaces"
import { dblogger } from "../Logger";

const logger = dblogger;


//@TODO Handle Orders
export async function getOrders(req: Request, res: Response) {
    try {
        let ordersAnswer: IOrderAPI[] = [];

        let orders = await Order.findAll();

        for (let order of orders) {
            let ordereditems = await order.getOrderedItems();

            let orderedItemsAnswer: IOrderedItemAPI[] = [];
            for (let orderitem of ordereditems) {
                orderedItemsAnswer.push({
                    itemId: orderitem.itemID,
                    number: orderitem.number,
                    status: orderitem.orderItemSatusID
                });
            }

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

        };

        console.log(ordersAnswer);

        res.status(200).json(ordersAnswer);
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function deleteOrders(req: Request, res: Response) {
    OrderStatus.destroy({
        where: {},
        truncate: true
    });
}

export async function postOrders(req: Request, res: Response) {
    try {
        let order = req.body as IOrderAPI;

        let neworder = await Order.create({
            orderStatusID: req.body.status,
            orderDate: order.orderDate | Date.now(),
            tableID: order.tableId,
            paymentReference: order.paymentReference,
            paymentToken: order.paymentToken,
            totalAmount: order.totalAmount
        });

        for (let item of order.orderedItems) {
            await OrderedItem.create({
                orderID: neworder.orderID,
                itemID: item.itemId,
                number: item.number,
                orderItemSatusID: item.status
            });
        }
        res.status(200).json(neworder);
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function getOrderByID(req: Request, res: Response) {
    let ordersAnswer: IOrderAPI;
    let orderedItemsAnswer: IOrderedItemAPI[] = [];

    try {
        let order = await Order.findByPk(req.params.id);
        if (order) {
            let ordereditems = await order.getOrderedItems();

            for (let orderitem of ordereditems) {
                orderedItemsAnswer.push({
                    itemId: orderitem.itemID,
                    number: orderitem.number,
                    status: orderitem.orderItemSatusID
                });
            }

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
    //let id = req.params.id;
    try {
        let newOrder = req.body; //as IOrderAPI;
        let order = await Order.findByPk(req.params.id);

        if (order) {
            order.orderStatusID = newOrder.status ? newOrder.status : order.orderStatusID;
            order.orderDate = newOrder.orderDate ? newOrder.orderDate : order.orderDate;
            order.tableID = newOrder.tableId ? newOrder.tableId : order.tableID;
            order.paymentReference = newOrder.paymentReference ? newOrder.paymentReference : order.paymentReference;
            order.paymentToken = newOrder.paymentToken ? newOrder.paymentToken : order.paymentToken;
            order.totalAmount = newOrder.totalAmount ? newOrder.totalAmount : order.totalAmount;
        }
        await order?.save();
        res.status(200).json(order);
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function deleteOrderByID(req: Request, res: Response) {
    try {
        let order = await Order.findByPk(req.params.id);
        if (order) {
            order.destroy();
        }
        res.status(200).send("deleted order");
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}


//Handle MenuItems



//Helper Functions
