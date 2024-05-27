import * as Joi from 'joi';

export const authSchema = Joi.object({
    name: Joi.string().required(),
    Password: Joi.string().required(),
});

