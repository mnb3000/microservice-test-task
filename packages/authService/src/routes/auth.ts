import { Router } from 'express';
import AuthController from '../controllers/auth';
import { createValidator } from 'express-joi-validation';
import { generateJwtSchema, validateJwtSchema } from '../validationSchemas/auth';

const router = Router();
const validator = createValidator();

router.post('/validateToken', validator.body(validateJwtSchema), AuthController.validateJwt);
router.post('/generateToken', validator.body(generateJwtSchema), AuthController.generateJwt);

export default router;
