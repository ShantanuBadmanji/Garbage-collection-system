const internalServerError = (error, req, res, next) => {
  res.status(error.status || 500).send({ ErrorMessage: error });
};

export { internalServerError };
