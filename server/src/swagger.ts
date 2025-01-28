import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aave Liquidator API",
      version: "1.0.0",
      description:
        "API for fetching user addresses from Aave Liquidator service.",
    },
    servers: [
      {
        url: "https://aave-liquidator.onrender.com",
        description: "Production Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
