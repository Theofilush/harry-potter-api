import { Hono } from "hono";
import { logger } from "hono/logger";
import { commonRoute } from "./modules/common/route";
import { characterRoute } from "./modules/characters/route";
import { serveStatic } from "hono/bun";
import { Scalar } from "@scalar/hono-api-reference";

const app = new Hono();

app.use(logger());
app.route("/", commonRoute);
app.route("/characters", characterRoute);

app.get("/docs", Scalar({ url: "/openapi.json" }));
app.get("/openapi.json", serveStatic({ path: "./src/modules/docs/openapi.json" }));

export default app;
