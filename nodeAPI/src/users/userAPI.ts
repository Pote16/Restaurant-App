import { Request, Response } from "express";
import {ITableDB, IUserRoleDB, MenuCategory, Table, User, UserRole} from "../database";
import { dblogger } from "../Logger";
import {ISecretUserAPI, IUserAPI, IUserRoleAPI} from "../interfaces";

const logger = dblogger;

export async function getUsers(req: Request, res: Response) {
  try {

    let users = await User.findAll();

    let returnUsers: IUserAPI[] = [];
    if (users) {
      for (let user of users) {
        let roles = await user.getUserRoles({attributes: ['roleID']});
        let roleIds = [];
        for (let role of roles) {
          roleIds.push(role.roleID);
        }
        returnUsers.push({
          userID: user.userID,
          name: user.name,
          roles: roleIds
        })
      }
      res.status(200).json(returnUsers);
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    let user = await User.findByPk(req.params.id);

    if (user) {
        let roles = await user.getUserRoles({attributes: ['roleID']});
        let roleIds = [];
        for (let role of roles) {
          roleIds.push(role.roleID);
        }
        let returnUser : IUserAPI = {
          userID: user.userID,
          name: user.name,
          roles: roleIds
        };
      res.status(200).json(returnUser);
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function postUser(req: Request, res: Response) {
  try {
    let user = req.body as ISecretUserAPI;
    let newUser = await User.create({
      name: user.name,
      password: user.password
    });
    newUser.save();
    let rolesToBeAdded = await UserRole.findAll({
      where: {
        roleID: user.roles
      }
    });
    await newUser.addUserRoles(rolesToBeAdded);
    res.status(200).json(newUser);
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function deleteUserByID(req: Request, res: Response) {
  try {
    let user = await User.findByPk(req.params.id);
    if (user) {
      user.destroy();
    }
    res.status(200).send("deleted user");
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function putUserByID(req: Request, res: Response) {
  try {
    let newUser: ISecretUserAPI = req.body as ISecretUserAPI;
    let user = await User.findByPk(req.params.id);

    if (user) {
      user.name = newUser.name ? newUser.name : user.name;
      user.password = newUser.password ? newUser.password : user.password;

      await user.removeUserRoles(await UserRole.findAll());
      let rolesToBeAdded = await UserRole.findAll({
        where: {
          roleID: newUser.roles
        }
      });
      await user.addUserRoles(rolesToBeAdded);
    }
    res.status(200).json(await user?.save());
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}
