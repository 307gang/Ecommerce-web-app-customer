module.exports = {
    type: "object",
    properties: {
      "full-name": { type: "string", minLength: 1 },
      phone: { type: "string", minLength: 1 },
      email: { type: "string", minLength: 1},
      address: { type: "string", minLength: 0 },
        
    },  
    required: ["full-name"],
    additionalProperties: false,
  };
  