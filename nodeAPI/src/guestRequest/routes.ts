import * as authenticator from "../auth/authenticator";
import {Router} from "express";
import * as categoryHandler from "./guestRequestAPI";

module.exports = (router: Router) => {
  router.get('/',authenticator.isAuthorized, categoryHandler.getGuestRequests);
  router.post('/',authenticator.isAuthorized, categoryHandler.postGuestRequests);

  router.get('/:id',authenticator.isAuthorized, categoryHandler.getGuestRequestsByID);
  router.put('/:id',authenticator.isAuthorized, categoryHandler.putGuestRequestsByID);

  return router;
}
