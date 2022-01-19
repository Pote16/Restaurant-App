"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const orderHandler = __importStar(require("./handlers/orderAPI"));
const menuItemHandler = __importStar(require("./handlers/menuItemAPI"));
exports.router = (0, express_1.Router)();
//Orders API
exports.router.get('/orders', orderHandler.getOrders);
exports.router.post('/orders', orderHandler.postOrders); //post a new order
exports.router.delete('/orders', orderHandler.deleteOrders); //delte all orders
exports.router.get('/orders/status', orderHandler.getOrderStatusList);
exports.router.get('/orders/:id', orderHandler.getOrderByID);
exports.router.put('/orders/:id', orderHandler.putOrderByID); //update single Order
exports.router.delete('/orders/:id', orderHandler.deleteOrderByID);
//TODO: Users API
//TODO: CategoryAPI
//TODO: MenuItemAPI
exports.router.get('/menuItems', menuItemHandler.getMenuItems);
//TODO: TableAPI
//TODO: TableAPI  :Dominik
//TODO: Statuse Get und Post  :Dominik
//# sourceMappingURL=router.js.map