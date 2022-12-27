module.exports = {
  type: "object",
  properties: {
    // TODO: add environment variable for min length
    "full-name": { type: "string", minLength: 0 },
    phone: { type: "string", minLength: 0 },
    address: { type: "string", minLength: 0 },
    email: { type: "string", minLength: 1 },
    password: { type: "string", minLength: 1 },
  },
  required: ["full-name", "email", "password"],
  additionalProperties: false,
};
