const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: result.error.issues[0].message,
      });
    }
    req.body = result.data;
    next();
  };
};

export default validateRequest;
