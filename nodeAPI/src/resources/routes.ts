import * as authenticator from "../auth/authenticator";
import {Router} from "express";
import * as resourcesHandler from "./resourcesAPI";

module.exports = (router: Router) => {

  router.get('/ordereditemstatuslist',authenticator.isAuthorized, resourcesHandler.getOrderedItemStatusList);
  router.get('/orderstatuslist',authenticator.isAuthorized, resourcesHandler.getOrderStatusList);
  router.get('/menuitemstatuslist',authenticator.isAuthorized, resourcesHandler.getMenuItemStatusList);
  router.get('/guestrequeststatuslist',authenticator.isAuthorized, resourcesHandler.getGuestRequestStatusList);
  return router;

}
