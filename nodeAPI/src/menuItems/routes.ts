import * as authenticator from "../auth/authenticator";
import * as menuItemHandler from "./menuItemAPI";
import {Router} from "express";

module.exports = (router: Router) => {
  router.get('/', authenticator.isAuthorized, menuItemHandler.getMenuItems);
  router.delete('/', authenticator.isAuthorized, menuItemHandler.deleteMenuItems);
  router.post('/', authenticator.isAuthorized, menuItemHandler.postMenuItem);

  router.get('/:id', authenticator.isAuthorized, menuItemHandler.getMenuItemByID);
  router.delete('/:id', authenticator.isAuthorized, menuItemHandler.deleteMenuItemByID);
  router.put('/:id', authenticator.isAuthorized, menuItemHandler.putMenuItemByID);
  return router;
}
