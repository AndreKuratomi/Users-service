export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
