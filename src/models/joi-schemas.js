import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("user@example.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("user@example.com").required(),
    _id: IdSpec,
    __v: Joi.number(),
    isAdmin: Joi.boolean().default(false),
  })
  .label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PubSpec = Joi.object()
  .keys({
    name: Joi.string().example("Temple Bar Pub").required(),
    description: Joi.string().example("Some description.").required(),
    latitude: Joi.number().example(12).required(),
    longitude: Joi.number().example(21).required(),
    daytime: Joi.boolean().example(true).truthy("on").falsy("").default(false),
    nighttime: Joi.boolean().truthy("on").falsy("").default(false),
    liveMusic: Joi.boolean().truthy("on").falsy("").default(false),
    dj: Joi.boolean().truthy("on").falsy("").default(false),
  })
  .label("PubDetails");

export const PubSpecPlus = Joi.object()
  .keys({
    _id: IdSpec,
    userId: IdSpec,
    name: Joi.string().required(),
    description: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    categories: Joi.object({
      daytime: Joi.boolean().default(false),
      nighttime: Joi.boolean().default(false),
      liveMusic: Joi.boolean().default(false),
      dj: Joi.boolean().default(false),
    }).required(),
    img: Joi.string().allow("").default(""),
    isAuthor: Joi.boolean().default(false),
    __v: Joi.number(),
  })
  .label("PubDetailsPlus");

export const PubArray = Joi.array().items(PubSpecPlus).label("PubArray");

export const PubCategorySpec = Joi.string().valid("daytime", "nighttime", "liveMusic", "dj").optional();

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    _id: IdSpec,
    name: Joi.string().example("Homer Simpson"),
    firstName: Joi.string().example("Homer"),
    lastName: Joi.string().example("Simpson"),
    email: Joi.string().email().example("homer@simpson.com"),
    isAdmin: Joi.boolean().default(false),
  })
  .label("JwtAuth");
