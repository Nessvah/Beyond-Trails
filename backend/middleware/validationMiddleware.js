/**
 * HOF that takes a callback function into an argument and this function is expected
 * to be a validation function that returns a new middleware function.
 * @param validator - callback function to validate the req-body which contains the data sent
 * from the form.
 * @returns {(function(*, *, *): (*|undefined))|*} - if there are no errors the middleware calls next(),
 * otherwise returns 400 code and error details.
 */

const validateSanitizeFormMiddleware = (validator) => {
  // this will return a middleware function
  return (req, res, next) => {

    // check for errors
    const { error } = validator(req.body);

    // if some data fails to validate
    if (error) {
      // error 422 - the server understands the request, but can not process it
      // due to input data being semantically incorrect - validation errors
      res.status(422).json({error: error.details[0].message});
      return;
    }

    // sanitize data before sending it
    for (const key in req.body){
      if(typeof req.body[key] === 'string'){
        // remove space at the end and begin, and also
        // make everything lowercase
        req.body[key] = req.body[key].trim().toLowerCase();
      }
    }

    // if everything is fine, it can proceed to the next route handler
    next();
  };
};



module.exports = { validateSanitizeFormMiddleware };
