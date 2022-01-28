import { USERS } from "../config/database.config";

export const permissionForUpdatingPassword = (req, res, next) => {
  const { uuid } = req.params;
  const auth = req.authenticatedUser;

  if (auth.uuid !== uuid) {
    return res
      .status(403)
      .json({ message: "Request only permited for the uuid's owner!" });
  }

  let authorizedUser = USERS.find((user) => (user.uuid = uuid));

  req.authorizedUser = authorizedUser;

  return next();
};
