module.exports = {
  type: "object",
  properties: {
    oldPassword: { type: "string", minLength: 1 },
    newPassword: { type: "string", minLength: 1 },
    confirmNewPassword: { type: "string", minLength: 1 },
  },
  required: ["oldPassword", "newPassword", "confirmNewPassword"],
  additionalProperties: false,
};
