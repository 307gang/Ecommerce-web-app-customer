module.exports = {
  type: "object",
  properties: {
    "full-name": { type: "string", minLength: 1 },
    phone: { type: "string", minLength: 1 },
    address: { type: "string", minLength: 0 },
    email: { type: "string", minLength: 1 },
    password: { type: "string", minLength: 1 },
  },
  required: ["full-name", "email", "password"],
  additionalProperties: false,
};
