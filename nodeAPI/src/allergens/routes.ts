import * as authenticator from "../auth/authenticator";
import { Router } from "express";
import * as allergenHandler from "./allergensAPI";

module.exports = (router: Router) => {
    router.get('/', authenticator.isAuthorized, allergenHandler.getAllergens);

    router.get('/:id', authenticator.isAuthorized, allergenHandler.getAllergenByID);

    return router;
}
