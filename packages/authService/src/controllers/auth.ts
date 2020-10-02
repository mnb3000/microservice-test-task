import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { ValidatedRequest } from 'express-joi-validation';
import { IGenerateJwtSchema, IValidateJwtSchema } from '../validationSchemas/auth';

class AuthController {
  public static generateJwt = async (req: ValidatedRequest<IGenerateJwtSchema>, res: Response) => {
    const token = jwt.sign(
      { userId: req.body.userId },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1h' },
    );

    res.send({ token });
  }

  public static validateJwt = async (req: ValidatedRequest<IValidateJwtSchema>, res: Response) => {
    try {
      const payload = jwt.verify(req.body.token, process.env.JWT_SECRET ?? '');
      res.send({ payload })
    } catch (e) {
      res.status(401).send({ error: "Invalid token!" });
    }
  }
}

export default AuthController;
