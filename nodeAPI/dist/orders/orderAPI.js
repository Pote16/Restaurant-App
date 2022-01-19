"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStatusList = exports.deleteOrderByID = exports.putOrderByID = exports.getOrderByID = exports.postOrders = exports.deleteOrders = exports.getOrders = void 0;
const database_1 = require("../database");
const Logger_1 = require("../Logger");
const logger = Logger_1.dblogger;
//@TODO Handle Orders
async function getOrders(req, res) {
    try {
        let ordersAnswer = [];
        let orders = await database_1.Order.findAll();
        for (let order of orders) {
            let ordereditems = await order.getOrderedItems();
            let orderedItemsAnswer = [];
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
        }
        ;
        console.log(ordersAnswer);
        res.status(200).json(ordersAnswer);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getOrders = getOrders;
async function deleteOrders(req, res) {
    database_1.Order.destroy({
        where: {},
        truncate: true
    });
}
exports.deleteOrders = deleteOrders;
async function postOrders(req, res) {
    try {
        let order = req.body;
        let neworder = await database_1.Order.create({
            orderStatusID: req.body.status,
            orderDate: order.orderDate | Date.now(),
            tableID: order.tableId,
            paymentReference: order.paymentReference,
            paymentToken: order.paymentToken,
            totalAmount: order.totalAmount
        });
        for (let item of order.orderedItems) {
            await database_1.OrderedItem.create({
                orderID: neworder.orderID,
                itemID: item.itemId,
                number: item.number,
                orderItemSatusID: item.status
            });
        }
        res.status(200).json(neworder);
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.postOrders = postOrders;
async function getOrderByID(req, res) {
    let ordersAnswer;
    let orderedItemsAnswer = [];
    try {
        let order = await database_1.Order.findByPk(req.params.id);
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
        }
        else {
            res.status(200).send("Invalid Order Number");
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getOrderByID = getOrderByID;
async function putOrderByID(req, res) {
    //let id = req.params.id;
    try {
        let newOrder = req.body; //as IOrderAPI;
        let order = await database_1.Order.findByPk(req.params.id);
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
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.putOrderByID = putOrderByID;
async function deleteOrderByID(req, res) {
    try {
        let order = await database_1.Order.findByPk(req.params.id);
        if (order) {
            order.destroy();
        }
        res.status(200).send("deleted order");
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.deleteOrderByID = deleteOrderByID;
async function getOrderStatusList(req, res) {
    try {
        let orderStatusList = await database_1.OrderStatus.findAll();
        if (orderStatusList) {
            res.status(200).json(orderStatusList);
        }
    }
    catch (error) {
        logger.error(error);
        res.status(400).send("failed");
    }
}
exports.getOrderStatusList = getOrderStatusList;
//# sourceMappingURL=orderAPI.js.map