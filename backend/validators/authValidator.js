const { body, validationResult } = require('express-validator');

exports.registerValidationRules = () => [
  body('name')
    .isLength({ min: 20, max: 60 })
    .withMessage('Name must be between 20 and 60 characters'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('Password must be 8-16 characters with at least one uppercase and one special character'),
  body('address')
    .optional()
    .isLength({ max: 400 })
    .withMessage('Address cannot exceed 400 characters')
];

exports.loginValidationRules = () => [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = {};
  errors.array().forEach(err => {
    extractedErrors[err.path] = err.msg;
  });

  return res.status(422).json({
    success: false,
    errors: extractedErrors
  });
};