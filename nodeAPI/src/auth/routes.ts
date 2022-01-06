import {Router} from "express";
import * as authenticator from "./authenticator";

module.exports = (router: Router) => {
  router.post("/login", authenticator.login);
  return router;
};
