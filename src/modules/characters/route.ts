import { Hono } from "hono";
import { dataCharacters } from "./data";

export const characterRoute = new Hono();

characterRoute.get("/", (c) => {
  return c.json(dataCharacters);
});

characterRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const foundCharacter = dataCharacters.find((character) => character.slug === slug);

  if (!foundCharacter) {
    return c.notFound();
  }

  return c.json(foundCharacter);
});

characterRoute.delete("/:slug", (c) => {
  const slug = c.req.param("slug");

  const originalLength = dataCharacters.length;

  const newItems = dataCharacters.filter((item) => item.slug !== slug);
  dataCharacters.length = 0;
  dataCharacters.push(...newItems);

  if (dataCharacters.length === originalLength) {
    return c.notFound();
  }

  return c.json({
    responseCode: "Success",
    responseMessage: "Deleted success",
  });
});
