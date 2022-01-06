import { Router } from "express";
import * as orderHandler from "./handlers/restaurantAPI";
import * as menuItemHandler from "./handlers/menuItemAPI";
export const router = Router();


//Orders API
router.get('/orders', orderHandler.getOrders);
router.post('/orders', orderHandler.postOrders); //post a new order
router.delete('/orders', orderHandler.deleteOrders); //delte all orders

router.get('/orders/:id', orderHandler.getOrderByID);
router.put('/orders/:id', orderHandler.putOrderByID); //update single Order
router.delete('/orders/:id', orderHandler.deleteOrderByID);

//TODO: Users API

//TODO: CategoryAPI

//TODO: MenuItemAPI
router.get('/menuItems', menuItemHandler.getMenuItems);
//TODO: TableAPI


//TODO: TableAPI  :Dominik
//TODO: Statuse Get und Post  :Dominik


