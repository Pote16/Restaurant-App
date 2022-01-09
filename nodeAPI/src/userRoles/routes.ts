import * as authenticator from "../auth/authenticator";
import {Router} from "express";
import * as userRolesHandler from "./userRolesAPI";

module.exports = (router: Router) => {
  router.get('/', authenticator.isAuthorized, userRolesHandler.getUserRoles);
  router.post('/', authenticator.isAuthorized, userRolesHandler.postUserRole);

  router.put('/:id', authenticator.isAuthorized, userRolesHandler.putUserRoleByID);
  router.get('/:id', authenticator.isAuthorized, userRolesHandler.getUserRoleByID);
  return router;
}
