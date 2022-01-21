import { Request, Response } from "express";
import { dblogger } from "../Logger";
import { Review, IReviewDB } from "../database";
import { IReviewsAPI } from "../interfaces";

const logger = dblogger;

export async function getReviews(req: Request, res: Response) {
  try {
    let reviews: Review[] = await Review.findAll();
    let retArray = [];
    for (let review of reviews) {
      let ret: IReviewsAPI = {
        id: review.id,
        itemID: review.itemID,
        stars: review.stars,
        usercomment: review.usercomment
      }
      retArray.push(ret);
    }
    res.status(200).json(retArray);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function getReviewByID(req: Request, res: Response) {
  try {
    let review = await Review.findByPk(req.params.id);
    if (review) {
      let ret: IReviewsAPI = {
        id: review.id,
        itemID: review.itemID,
        stars: review.stars,
        usercomment: review.usercomment
      }
      res.status(200).json(ret);
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function postReview(req: Request, res: Response) {
  try {
    let review = req.body as IReviewsAPI;
    let newreview = await Review.create({
      itemID: review.itemID,
      stars: review.stars,
      usercomment: review.usercomment
    });
    res.status(200).json(newreview);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function putReviewByID(req: Request, res: Response) {
  try {
    let newreview = req.body as IReviewsAPI;
    let review = await Review.findByPk(req.params.id);

    if (review) {
      review.stars = newreview.stars ? newreview.stars : review.stars;
      review.usercomment = newreview.usercomment ? newreview.usercomment : review.usercomment;
    }
    res.status(200).json(await review?.save());
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}
