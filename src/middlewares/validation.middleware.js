export const validateRequisition = (schema) => async (req, res, next) => {
  // como assim 'você não passa os valores da validação para o request'?
  const resource = req.body;
  try {
    await schema.validate(resource);

    return next();
    // next();
  } catch (e) {
    console.error(e);
    res.status(422).json({ error: e.errors.join(", ") });
  }
};
