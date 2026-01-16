import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

type Character = {
  id: number;
  name: string;
  email: string;
};

try {
  const result = await client.query("SELECT * FROM characters");
  const characters: Character[] = result.rows;
  console.log({ characters: characters });
} catch (error) {
  console.error("Failed to connect to the database", error);
} finally {
  await client.end();
}
