import { Hono } from "hono";
import { logger } from "hono/logger";
import { commonRoute } from "./modules/common/route";
import { characterRoute } from "./modules/characters/route";

const app = new Hono();

app.use(logger());
app.route("/", commonRoute);
app.route("/characters", characterRoute);
export default app;
