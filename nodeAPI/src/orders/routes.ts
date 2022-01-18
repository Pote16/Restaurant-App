import * as authenticator from "../auth/authenticator";
import {Router} from "express";
import * as orderHandler from "./orderAPI";

module.exports = (router: Router) => {
  router.get('/',authenticator.isAuthorized, orderHandler.getOrders);
  router.post('/',authenticator.isAuthorized, orderHandler.postOrders); //post a new order
  router.delete('/',authenticator.isAuthorized, orderHandler.deleteOrders); //delte all orders
  router.get('/status',authenticator.isAuthorized, orderHandler.getOrderStatusList);

  router.get('/:id',authenticator.isAuthorized, orderHandler.getOrderByID);
  router.put('/:id',authenticator.isAuthorized, orderHandler.putOrderByID); //update single Order
  router.delete('/:id',authenticator.isAuthorized, orderHandler.deleteOrderByID);

  router.get('/:id/items',authenticator.isAuthorized, orderHandler.getOrderedItems);
  router.post('/:id/items',authenticator.isAuthorized, orderHandler.postOrderedItems);
  router.get('/:id/items/:itemId',authenticator.isAuthorized, orderHandler.getOrderedItemByID);
  router.put('/:id/items/:itemId',authenticator.isAuthorized, orderHandler.putOrderedItemByID);
  router.delete('/:id/items/:itemId',authenticator.isAuthorized, orderHandler.deleteOrderedItemByID);

  router.get('/items/status',authenticator.isAuthorized, orderHandler.getOrderedItemStatusList);
  return router;
}
