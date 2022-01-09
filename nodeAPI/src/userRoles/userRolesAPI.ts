import {Request, Response} from "express";
import {ITableDB, Table, UserRole} from "../database";
import {IUserRoleAPI} from "../interfaces";
import {dblogger} from "../Logger";

const logger = dblogger;

export async function getUserRoles(req: Request, res: Response) {
  try {
    let userRoles = await UserRole.findAll();

    if(userRoles) {
      let userRolesRet : IUserRoleAPI[] = [];
      for (let userRole of userRoles) {
        userRolesRet.push({
          roleID: userRole.roleID,
          name: userRole.name
        });
      }
      res.status(200).json(userRolesRet);
    }

  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function getUserRoleByID(req: Request, res: Response) {
  try {
    let userRole = await UserRole.findByPk(req.params.id);

    if(userRole) {
      let userRolesRet: IUserRoleAPI = {
          roleID: userRole.roleID,
          name: userRole.name
        };
      res.status(200).json(userRolesRet);
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function postUserRole(req: Request, res: Response) {
  try {
    let userRole = req.body as IUserRoleAPI;
    let newUserRole = await UserRole.create({
      name: userRole.name
    });
    res.status(200).json(newUserRole);

  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}

export async function putUserRoleByID(req: Request, res: Response) {
  try {
    let newUserRole: IUserRoleAPI = req.body as IUserRoleAPI;
    let userRole = await UserRole.findByPk(req.params.id);

    if (userRole) {
      userRole.name = newUserRole.name ? newUserRole.name : userRole.name;
    }
    res.status(200).json(await userRole?.save());
  } catch (error) {
    logger.error(error);
    res.status(400).send("failed");
  }
}
