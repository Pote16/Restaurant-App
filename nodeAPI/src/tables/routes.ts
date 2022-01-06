import * as authenticator from "../auth/authenticator";
import {Router} from "express";
import * as tableHandler from "./tableAPI";

module.exports = (router: Router) => {
  router.get('/',authenticator.isAuthorized, tableHandler.getTables);
  router.post('/',authenticator.isAuthorized, tableHandler.postTable);
  router.get('/:id',authenticator.isAuthorized, tableHandler.getTableByID);
  router.put('/:id',authenticator.isAuthorized, tableHandler.putTableByID);
  router.delete('/:id',authenticator.isAuthorized, tableHandler.deleteTableByID);

  return router;
}
