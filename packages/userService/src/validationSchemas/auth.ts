import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export interface ISignUpSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof signUpSchema>;
}

export interface ILoginSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof loginSchema>;
}
