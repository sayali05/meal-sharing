const Joi = require("joi");

const validateMeal = (meal) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    when: Joi.date().iso().required(),
    max_reservations: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0).required(),
  });

  return schema.validate(meal);
};
const validateReservation = (reservation) => {
  const schema = Joi.object({
    number_of_guests: Joi.number().required(),
    meal_id: Joi.number().required(),
    created_date: Joi.date().iso().required(),
    contact_phonenumber: Joi.string().required(),
    contact_name: Joi.string().required(),
    contact_email: Joi.string().email().required(),
  });

  return schema.validate(reservation);
};

const validateReview = (review) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    meal_id: Joi.number().required(),
    stars: Joi.number().required(),
    created_date: Joi.date().iso().required(),
  });
  return schema.validate(review);
};
module.exports = {
  validateMeal,
  validateReservation,
  validateReview,
};
