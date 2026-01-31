// import { Hono } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { commonRoute } from "./modules/common/route";
import { characterRoute } from "./modules/characters/route";
import { Scalar } from "@scalar/hono-api-reference";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

app.use(logger());
app.route("/commont-route", commonRoute);
app.route("/characters", characterRoute);

app.doc("/openapi.json", {
  openapi: "3.0.4",
  info: {
    version: "1.0.0",
    title: "Harry Potter API",
    description: "A RESTful API providing structured data from the Harry Potter universe, including characters, Hogwarts houses, spells, potions, and magical artifacts.",
    contact: {
      name: "API Support Team",
      url: "https://github.com/Theofilush/harry-potter-api",
      email: "support@harrypotterapi.example.com",
    },
    license: {
      name: "MIT License",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "https://harry-potter-api-production-53c6.up.railway.app/",
      description: "Production server",
    },
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
});

app.get("/", Scalar({ url: "/openapi.json" }));
app.get("/swagger-ui", swaggerUI({ url: "/openapi.json" }));

export default app;
