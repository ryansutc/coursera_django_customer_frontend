import * as generated from "@/generatedtypes/django_generated";

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

// -- cart items
const CartItemWrite = generated.schemas.CartItem.omit({
  id: true,
});
const PatchedCartItem = generated.schemas.CartItem.omit({
  menuitem: true,
});

// --- MenuItem wrappers ---
const MenuItem = generated.schemas.MenuItem.extend({
  price: decimalStringToNumber,
  price_after_tax: decimalStringToNumber,
}).omit({ category_id: true });

const MenuItemWrite = generated.schemas.MenuItem.extend({
  price: decimalStringToNumber,
}).omit({
  category: true,
  price_after_tax: true,
  id: true,
});

// --- Order wrappers ---
const Order = generated.schemas.Order.extend({
  total: decimalStringToNumber,
});

const OrderWrite = generated.schemas.Order.omit({
  id: true,
  date: true,
});

const TokenObtainPair = generated.schemas.TokenObtainPair.omit({
  username: true,
  password: true,
});
const TokenObtainPairWrite = generated.schemas.TokenObtainPair.omit({
  access: true,
  refresh: true,
});

// --- PatchedMenuItem wrapper ---
const PatchedMenuItem = generated.schemas.PatchedMenuItem.extend({
  price: decimalStringToNumber.optional(),
}).omit({
  category: true,
  price_after_tax: true,
  id: true,
});

// Export all wrappers and types
export const schemas = {
  ...generated.schemas,
  CartItemWrite,
  MenuItem,
  MenuItemWrite,
  PatchedCartItem,
  PatchedMenuItem,
  Order,
  OrderWrite,
  TokenObtainPair,
  TokenObtainPairWrite,
};
