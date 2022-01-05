import { Router } from "express";
import * as handler from "./restaurantAPI";
export const router = Router();


//Orders API
router.get('/orders', handler.getOrders);
router.post('/orders', handler.postOrders); //post a new order
router.delete('/orders', handler.deleteOrders); //delte all orders

router.get('/orders/:id', handler.getOrderByID);
router.put('/orders/:id', handler.putOrderByID); //update single Order
router.delete('/orders/:id', handler.deleteOrderByID);

//TODO: Users API

//TODO: CategoryAPI

//TODO: MenuItemAPI


//TODO: TableAPI  :Dominik
//TODO: Statuse Get und Post  :Dominik


