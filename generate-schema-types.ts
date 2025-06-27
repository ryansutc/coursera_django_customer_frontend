import { writeFileSync } from "fs";
import { zodToJsonSchema } from "zod-to-json-schema";
import { schemas } from "./src/generatedtypes/django_generated";

/**
 * This is a node/tsx script to convert Zod schemas to JSON Schema.
 * It can be called via pnpm run schema-to-json after you've generated the Zod schemas.
 *
 */
const definitions = Object.fromEntries(
  Object.entries(schemas).map(([key, schema]) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const jsonSchema = zodToJsonSchema(schema, key);
    // Extract the actual definition from the generated schema
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return [key, jsonSchema.definitions?.[key] || jsonSchema];
  })
);

const properties = Object.fromEntries(
  Object.keys(definitions).map((key) => [key, { $ref: `#/definitions/${key}` }])
);

const rootSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions,
  properties,
  title: "API Schemas",
  type: "object",
};

writeFileSync("./docs/schema.json", JSON.stringify(rootSchema, null, 2));
// eslint-disable-next-line no-console
console.log("✅ JSON Schema saved to /docs/schema.json");
