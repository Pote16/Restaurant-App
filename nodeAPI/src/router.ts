import { Router } from "express";
import * as orderHandler from "./handlers/orderAPI";
import * as menuItemHandler from "./handlers/menuItemAPI";
import * as tableHandler from "./handlers/tableAPI";
export const router = Router();


//Orders API
router.get('/orders', orderHandler.getOrders);
router.post('/orders', orderHandler.postOrders); //post a new order
router.delete('/orders', orderHandler.deleteOrders); //delte all orders
router.get('/orders/status', orderHandler.getOrderStatusList);

router.get('/orders/:id', orderHandler.getOrderByID);
router.put('/orders/:id', orderHandler.putOrderByID); //update single Order
router.delete('/orders/:id', orderHandler.deleteOrderByID);


//TODO: Users API

//TODO: CategoryAPI

//TODO: MenuItemAPI
router.get('/menuItems', menuItemHandler.getMenuItems);



//TODO: TableAPI  :Dominik
router.get('/tables', tableHandler.getTables);
router.post('/tables', tableHandler.postTable);
router.get('/tables/:id', tableHandler.getTableByID);
router.put('/tables/:id', tableHandler.putTableByID);
router.delete('/tables/:id', tableHandler.deleteTableByID);

//TODO: Statuse Get und Post  :Dominik


