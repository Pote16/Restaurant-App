import {Request, Response} from "express";
import { User} from "../database";
import { dblogger } from "../Logger";

const logger = dblogger;

export async function getUser(req: Request, res: Response) {
  try {
    let user = await User.findOne({
      where: {
        name: req.body.name,
        password: req.body.password
      }
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).send("No User with this combination");
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}
