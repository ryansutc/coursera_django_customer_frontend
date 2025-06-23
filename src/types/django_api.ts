import * as generated from "../../generatedtypes/django_generated";

import { z } from "zod";

/**
 * When we use openapi-zodclient to generate our zod schemas and typescript types,
 * in some cases we need to wrap the generated schemas fixup custom validation or transformations.
 *
 * We do that here to override the default from django_api.ts.
 * For example:
 * - Convert decimal strings to numbers
 */
// Helper for decimal string -> number
const decimalStringToNumber = z
  .string()
  .pipe(z.coerce.number().transform(Number));

// --- MenuItem wrappers ---
export const MenuItem = generated.schemas.MenuItem.extend({
  price: decimalStringToNumber,
  price_after_tax: decimalStringToNumber,
}).omit({ category_id: true });

export const MenuItemWrite = generated.schemas.MenuItem.extend({
  price: decimalStringToNumber,
}).omit({
  category: true,
  price_after_tax: true,
  id: true,
});

// --- PatchedMenuItem wrapper ---
export const PatchedMenuItem = generated.schemas.PatchedMenuItem.extend({
  price: decimalStringToNumber.optional(),
}).omit({
  category: true,
  price_after_tax: true,
  stock: true,
  id: true,
});

// --- Order wrappers ---
export const Order = generated.schemas.Order.extend({
  total: decimalStringToNumber,
});

export const OrderWrite = generated.schemas.Order.omit({
  id: true,
  date: true,
});

// Export all wrappers and types
export const schemas = {
  ...generated.schemas,
  MenuItem,
  MenuItemWrite,
  PatchedMenuItem,
  Order,
  OrderWrite,
};
