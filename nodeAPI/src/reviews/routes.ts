import * as authenticator from "../auth/authenticator";
import { Router } from "express";
import * as reviewHandler from "./reviewsAPI";

module.exports = (router: Router) => {
  router.get('/', authenticator.isAuthorized, reviewHandler.getReviews);
  router.post('/', authenticator.isAuthorized, reviewHandler.postReview);

  router.get('/:id', authenticator.isAuthorized, reviewHandler.getReviewByID);
  router.put('/:id', authenticator.isAuthorized, reviewHandler.putReviewByID);

  return router;
}
