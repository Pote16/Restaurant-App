import { User} from "../database";
import { dblogger } from "../Logger";

const logger = dblogger;

export async function getUser(username: string, password: string) {
  try {
    let user = await User.findOne({
      where: {
        name: username,
        password: password
      }
    });
    if (user) {
      return user;
    } else {
      return "No User with this combination";
    }
  } catch (error) {
    logger.error(error);
  }
}
