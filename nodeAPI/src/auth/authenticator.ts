import {Request, Response} from "express";
import * as userHandler from "./authAPI";
import {User} from "../database";

const jwt = require('jsonwebtoken');

export async function login(req: Request, res: Response) {
  let username = req.body.user;
  let password = req.body.pass;
  let user = userHandler.getUser(username, password);
  if(user instanceof Object) {
    const token = jwt.sign(
      {
        username: username,
        password: password,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.EXPIRATION
      });
    res.status(200).json({
      message: "login successful",
      login: username,
      token: token
    });
  } else {
    res.status(403).json({
      message: "Not logged in. Wrong username/password combination!"
    });
  }
}

export function isAuthorized(req: Request, res: Response, next: Function) {
  try {
    const jwtToken = req.headers.authorization;
    jwt.verify(jwtToken, process.env.JWT_KEY);
    next();
  } catch (e) {
    return res.status(401).json({message: "Authentication failed"});
  }
}
