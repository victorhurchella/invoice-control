export default {
  jwt: {
    SECRET_KEY: process.env.SECRET_KEY_JWT || "sshhh",
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  },
};
