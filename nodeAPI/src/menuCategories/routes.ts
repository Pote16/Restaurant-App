import * as authenticator from "../auth/authenticator";
import {Router} from "express";
import * as categoryHandler from "./categoryAPI";

module.exports = (router: Router) => {
  router.get('/',authenticator.isAuthorized, categoryHandler.getMenuCategories);
  router.post('/',authenticator.isAuthorized, categoryHandler.postMenuCategory);

  router.get('/:id',authenticator.isAuthorized, categoryHandler.getMenuCategoryByID);
  router.put('/:id',authenticator.isAuthorized, categoryHandler.putMenuCategoryByID);

  return router;
}
