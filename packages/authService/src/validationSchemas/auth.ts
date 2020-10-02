import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const generateJwtSchema = Joi.object({
  userId: Joi.string().uuid().required(),
})

export const validateJwtSchema = Joi.object({
  token: Joi.string().required(),
});

export interface IGenerateJwtSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof generateJwtSchema>;
}

export interface IValidateJwtSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof validateJwtSchema>;
}
