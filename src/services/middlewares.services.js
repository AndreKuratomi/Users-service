export const authenticating = (req, res) => {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({ message: "Headers unabled!" });
  }

  let token = req.headers.authorization.split(" ")[1];

  if (token === undefined) {
    return res.status(401).json({ message: "No token used!" });
  }

  return token;
};
