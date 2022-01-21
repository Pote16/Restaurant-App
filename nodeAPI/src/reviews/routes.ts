import * as authenticator from "../auth/authenticator";
import {Router} from "express";
import * as categoryHandler from "./reviewsAPI";

module.exports = (router: Router) => {
  router.get('/',authenticator.isAuthorized, categoryHandler.getReviews);
  router.post('/',authenticator.isAuthorized, categoryHandler.postReview);

  router.get('/:id',authenticator.isAuthorized, categoryHandler.getReviewByID);
  router.put('/:id',authenticator.isAuthorized, categoryHandler.putReviewByID);

  return router;
}
