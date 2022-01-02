import { Request, Response } from "express";
import { IOrderAPI, IMenuCategoryAPI, IMenuItemAPI, IOrderedItemAPI, IUserAPI } from "./interfaces"




//Handle Orders
export async function getOrders(req: Request, res: Response) {

}
export async function deleteOrders(req: Request, res: Response) {

}

export async function postOrders(req: Request, res: Response) {
    let id = req.params.id;
}

export async function getOrderByID(req: Request, res: Response) {
    let id = req.params.id;
    res.status(200).send("test");
}

export async function putOrderByID(req: Request, res: Response) {
    let id = req.params.id;
}

export async function deleteOrderByID(req: Request, res: Response) {
    let id = req.params.id;
}


//Handle MenuItems

