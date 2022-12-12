module.exports = {
  type: "object",
  properties: {
    'full-name': { type: "string", minLength: 1 },
    username: { type: "string", minLength: 2},
    password: { type: "string", minLength: 6 },
  },
  required: ["full-name", "username", "password"],
  additionalProperties: false,
};
