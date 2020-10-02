import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { IGetUserByIdSchema } from '../validationSchemas/users';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

class UserController {
  public static getAllUsers = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({});
    res.send(users);
  }

  public static getUserById = async (req: ValidatedRequest<IGetUserByIdSchema>, res: Response) => {
    const userRepository = getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ id });
    res.send(user);
  }
}

export default UserController;
