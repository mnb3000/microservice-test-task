import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import generateJwt from '../utils/generateJwt';
import { ILoginSchema, ISignUpSchema } from '../validationSchemas/auth';
import { User } from '../entities/User';

class AuthController {
  public static signUp = async (req: ValidatedRequest<ISignUpSchema>, res: Response) => {
    const userRepository = getRepository(User);
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;

    const validationErrors = await validate(user);
    if (validationErrors.length) {
      res.status(400).send({ errors: validationErrors });
      return;
    }

    try {
      await userRepository.insert(user);
    } catch (e) {
      res.status(400).send({ errors: [{ message: "Failed DB access" }] });
      return;
    }

    try {
      const token = await generateJwt(user.id);
      res.send({ token });
    } catch (e) {
      res.status(400).send({ errors: [e] });
      return;
    }
  }

  public static login = async (req: ValidatedRequest<ILoginSchema>, res: Response) => {
    const userRepository = getRepository(User);
    const { email, password } = req.body;

    const user = await userRepository.findOne({ email });
    if (!user?.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const token = await generateJwt(user.id);

    res.send({ token });
  }
}

export default AuthController;
