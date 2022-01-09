import * as authenticator from "../auth/authenticator";
import {Router} from "express";
import * as userHandler from "./userAPI";

module.exports = (router: Router) => {
  router.get('/', authenticator.isAuthorized, userHandler.getUsers);
  router.post('/', authenticator.isAuthorized, userHandler.postUser);

  router.get('/:id', authenticator.isAuthorized, userHandler.getUserById);
  router.put('/:id', authenticator.isAuthorized, userHandler.putUserByID);
  router.delete('/:id', authenticator.isAuthorized, userHandler.deleteUserByID);

  return router;
}
