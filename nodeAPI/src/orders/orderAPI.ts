import { Request, Response } from "express";
import { isForInStatement } from "typescript";
import { Order, OrderedItem, IOrderDB, OrderStatus, OrderItemStatus } from "../database";
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
                    status: orderitem.orderItemSatusID,
                    text: orderitem.text
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
    Order.destroy({
        where: {},
        truncate: true
    });
}

export async function postOrders(req: Request, res: Response) {
    try {
        let order = req.body as IOrderAPI;

        if (!order.orderDate) {
            order.orderDate = Date.now();
        }

        let neworder = await Order.create({
            orderStatusID: req.body.status,
            orderDate: order.orderDate,
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
                orderItemSatusID: item.status,
                text: item.text
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
                    status: orderitem.orderItemSatusID,
                    text: orderitem.text
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

export async function getOrderedItems(req: Request, res: Response) {
    try {
        let orderedItemsAnswer: IOrderedItemAPI[] = [];

        let order = await Order.findByPk(req.params.id)

        if (order) {
            let ordereditems = await order.getOrderedItems();

            for (let orderitem of ordereditems) {
                orderedItemsAnswer.push({
                    itemId: orderitem.itemID,
                    number: orderitem.number,
                    status: orderitem.orderItemSatusID,
                    text: orderitem.text
                });
            }
            res.status(200).json(orderedItemsAnswer);
        } else {
            res.status(400).send("Order not found!");
        }


    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function postOrderedItems(req: Request, res: Response) {
    try {
        let item = req.body as IOrderedItemAPI;

        await OrderedItem.create({
            orderID: Number(req.params.id),
            itemID: item.itemId,
            number: item.number,
            orderItemSatusID: item.status,
            text: item.text
        });

        res.status(200).json(item);
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}


export async function getOrderedItemByID(req: Request, res: Response) {
    try {
        let orderedItem = await OrderedItem.findOne({
            where: {
                orderID: req.params.id,
                itemID: req.params.itemId
            }
        });

        if (orderedItem) {
            res.status(200).json(orderedItem);
        } else {
            res.status(400).send("OrderedItem not found!");
        }

    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function putOrderedItemByID(req: Request, res: Response) {
    //let id = req.params.id;
    try {
        let newItem = req.body; //as IOrderedItemAPI;
        let orderedItem = await OrderedItem.findOne({
            where: {
                orderID: req.params.id,
                itemID: req.params.itemId
            }
        });
        if (orderedItem) {
            orderedItem.orderID = newItem.orderID ? newItem.orderID : orderedItem.orderID;
            orderedItem.itemID = newItem.itemID ? newItem.itemID : orderedItem.itemID;
            orderedItem.number = newItem.number ? newItem.number : orderedItem.number;
            orderedItem.orderItemSatusID = newItem.orderItemSatusID ? newItem.orderItemSatusID : orderedItem.orderItemSatusID;
            orderedItem.text = newItem.text ? newItem.text : orderedItem.text;

        }
        await orderedItem?.save();
        res.status(200).json(orderedItem);
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}

export async function deleteOrderedItemByID(req: Request, res: Response) {
    //let id = req.params.id;
    try {
        let orderedItem = await OrderedItem.findOne({
            where: {
                orderID: req.params.id,
                itemID: req.params.itemId
            }
        });
        if (orderedItem) {
            orderedItem.destroy;
        }
        res.status(200).send("deleted");
    } catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}



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





