const EXISTED_USERS = [
  {
    email: "test@gmail.com",
    password: "password",
  },
];

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = EXISTED_USERS.find((user) => user.email === email);

  return user;
});
