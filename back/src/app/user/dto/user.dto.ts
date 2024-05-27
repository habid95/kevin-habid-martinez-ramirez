import * as Joi from 'joi';

export const userSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(10).required(),
    img_profile: Joi.string().optional(),
    Password: Joi.string().required(),
});

