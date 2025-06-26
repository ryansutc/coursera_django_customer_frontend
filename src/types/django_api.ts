import * as generated from "@/generatedtypes/django_generated";

import { makeApi } from "@zodios/core";
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
const MenuItem = generated.schemas.MenuItem.extend({
  price: decimalStringToNumber,
  price_after_tax: decimalStringToNumber,
});

const MenuItemRequest = generated.schemas.MenuItemRequest.extend({
  price: decimalStringToNumber,
});

// --- Order wrappers ---
const Order = generated.schemas.Order.extend({
  total: decimalStringToNumber,
});

// Export all wrappers and types
export const schemas = {
  ...generated.schemas,
  MenuItem,
  MenuItemRequest,
  Order,
};

/**
 * For now, copy/paste endpoints from the generated types here.
 * Swap in generated schemas and types as needed.
 * TODO: This is a workaround until we can fix the generated types.
 */
export const endpoints = makeApi([
  {
    method: "post",
    path: "/api/api-token-auth/",
    alias: "api_api_token_auth_create",
    requestFormat: "form-url",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.AuthTokenRequest,
      },
    ],
    response: z.object({ token: z.string() }).passthrough(),
  },
  {
    method: "get",
    path: "/api/cart-items/",
    alias: "api_cart_items_list",
    requestFormat: "json",
    response: z.array(generated.schemas.CartItem),
  },
  {
    method: "post",
    path: "/api/cart-items/",
    alias: "api_cart_items_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.CartItemRequest,
      },
    ],
    response: generated.schemas.CartItem,
  },
  {
    method: "get",
    path: "/api/cart-items/:id/",
    alias: "api_cart_items_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this cart item."),
      },
    ],
    response: generated.schemas.CartItem,
  },
  {
    method: "put",
    path: "/api/cart-items/:id/",
    alias: "api_cart_items_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.CartItemRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this cart item."),
      },
    ],
    response: generated.schemas.CartItem,
  },
  {
    method: "patch",
    path: "/api/cart-items/:id/",
    alias: "api_cart_items_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.PatchedCartItemRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this cart item."),
      },
    ],
    response: generated.schemas.CartItem,
  },
  {
    method: "delete",
    path: "/api/cart-items/:id/",
    alias: "api_cart_items_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this cart item."),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/cart-items/checkout/",
    alias: "api_checkout",
    description: `View to checkout the cart items and create an order.`,
    requestFormat: "json",
    response: generated.schemas.CheckoutResponse,
    errors: [
      {
        status: 400,
        description: `Your cart is empty.`,
        schema: z.object({}).partial().passthrough(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/cart-items/delete/",
    alias: "api_cart_items_delete_destroy",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/categories/",
    alias: "api_categories_list",
    requestFormat: "json",
    response: z.array(generated.schemas.Category),
  },
  {
    method: "post",
    path: "/api/categories/",
    alias: "api_categories_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.CategoryRequest,
      },
    ],
    response: generated.schemas.Category,
  },
  {
    method: "get",
    path: "/api/categories/:id/",
    alias: "api_categories_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this category."),
      },
    ],
    response: generated.schemas.Category,
  },
  {
    method: "put",
    path: "/api/categories/:id/",
    alias: "api_categories_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.CategoryRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this category."),
      },
    ],
    response: generated.schemas.Category,
  },
  {
    method: "patch",
    path: "/api/categories/:id/",
    alias: "api_categories_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.PatchedCategoryRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this category."),
      },
    ],
    response: generated.schemas.Category,
  },
  {
    method: "delete",
    path: "/api/categories/:id/",
    alias: "api_categories_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this category."),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/groups/manager/users/",
    alias: "api_groups_manager_users_retrieve",
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Username is required.`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `Only staff users can add/delete managers.`,
        schema: z.void(),
      },
      {
        status: 405,
        description: `Method not allowed.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/groups/manager/users/",
    alias: "api_groups_manager_users_create",
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Username is required.`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `Only staff users can add/delete managers.`,
        schema: z.void(),
      },
      {
        status: 405,
        description: `Method not allowed.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/menu-items/",
    alias: "api_menu_items_list",
    description: `List or create menu items. POST is manager-only.`,
    requestFormat: "json",
    response: z.array(MenuItem),
  },
  {
    method: "post",
    path: "/api/menu-items/",
    alias: "api_menu_items_create",
    description: `List or create menu items. POST is manager-only.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MenuItemRequest,
      },
    ],
    response: z.array(MenuItem),
  },
  {
    method: "get",
    path: "/api/menu-items/:id/",
    alias: "api_menu_items_retrieve",
    description: `view or modify a single menu item.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: MenuItem,
  },
  {
    method: "put",
    path: "/api/menu-items/:id/",
    alias: "api_menu_items_update",
    description: `view or modify a single menu item.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MenuItemRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: MenuItem,
  },
  {
    method: "patch",
    path: "/api/menu-items/:id/",
    alias: "api_menu_items_partial_update",
    description: `view or modify a single menu item.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.PatchedMenuItemRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: MenuItem,
  },
  {
    method: "delete",
    path: "/api/menu-items/:id/",
    alias: "api_menu_items_destroy",
    description: `view or modify a single menu item.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: MenuItem,
  },
  {
    method: "get",
    path: "/api/menu-items/featured/",
    alias: "api_menu_items_featured_retrieve",
    description: `view/update featured menu item.`,
    requestFormat: "json",
    response: MenuItem,
    errors: [
      {
        status: 400,
        description: `Item ID is required.`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `Admin only.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `No special item for today.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/menu-items/featured/",
    alias: "api_menu_items_featured_create",
    description: `view/update featured menu item.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MenuItemRequest,
      },
    ],
    response: MenuItem,
    errors: [
      {
        status: 400,
        description: `Item ID is required.`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `Admin only.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `No special item for today.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/order-items/",
    alias: "api_order_items_list",
    requestFormat: "json",
    response: z.array(generated.schemas.CartItem),
  },
  {
    method: "post",
    path: "/api/order-items/",
    alias: "api_order_items_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.CartItemRequest,
      },
    ],
    response: generated.schemas.CartItem,
  },
  {
    method: "get",
    path: "/api/order-items/:id/",
    alias: "api_order_items_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this cart item."),
      },
    ],
    response: generated.schemas.CartItem,
  },
  {
    method: "put",
    path: "/api/order-items/:id/",
    alias: "api_order_items_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.CartItemRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this cart item."),
      },
    ],
    response: generated.schemas.CartItem,
  },
  {
    method: "patch",
    path: "/api/order-items/:id/",
    alias: "api_order_items_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.PatchedCartItemRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this cart item."),
      },
    ],
    response: generated.schemas.CartItem,
  },
  {
    method: "delete",
    path: "/api/order-items/:id/",
    alias: "api_order_items_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("A unique integer value identifying this cart item."),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/orders/",
    alias: "api_order_list",
    description: `View to see orders. Managers see all, users see their own orders and delivery crew see orders assigned to them.`,
    requestFormat: "json",
    response: z.array(Order),
  },
  {
    method: "get",
    path: "/api/orders/:id/",
    alias: "api_order_details_get",
    description: `Retrieve a specific order.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Order,
    errors: [
      {
        status: 403,
        description: `Forbidden`,
        schema: z.object({}).partial().passthrough(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/orders/:id/",
    alias: "api_order_details_patch",
    description: `Update a specific order.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Order,
    errors: [
      {
        status: 403,
        description: `Forbidden`,
        schema: z.object({}).partial().passthrough(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/orders/:id/",
    alias: "api_order_details_delete",
    description: `Delete a specific order.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden`,
        schema: z.object({}).partial().passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/throttle-check-auth/",
    alias: "api_throttle_check_auth_retrieve",
    description: `This is just for testing throttling.`,
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/token/",
    alias: "api_token_create",
    description: `Takes a set of user credentials and returns an access and refresh JSON web
token pair to prove the authentication of those credentials.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.TokenObtainPairRequest,
      },
    ],
    response: generated.schemas.TokenObtainPair,
  },
  {
    method: "post",
    path: "/api/token/blacklist/",
    alias: "api_token_blacklist_create",
    description: `Takes a token and blacklists it. Must be used with the
&#x60;rest_framework_simplejwt.token_blacklist&#x60; app installed.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ refresh: z.string().min(1) }).passthrough(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/token/refresh/",
    alias: "api_token_refresh_create",
    description: `Takes a refresh type JSON web token and returns an access type JSON web
token if the refresh token is valid.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ refresh: z.string().min(1) }).passthrough(),
      },
    ],
    response: z.object({ access: z.string() }).passthrough(),
  },
  {
    method: "post",
    path: "/auth/token/login/",
    alias: "auth_token_login_create",
    description: `Use this endpoint to obtain user authentication token.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.TokenCreateRequest,
      },
    ],
    response: generated.schemas.TokenCreate,
  },
  {
    method: "post",
    path: "/auth/token/logout/",
    alias: "auth_token_logout_create",
    description: `Use this endpoint to logout user (remove user authentication token).`,
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/auth/users/",
    alias: "auth_users_list",
    requestFormat: "json",
    response: z.array(generated.schemas.User),
  },
  {
    method: "post",
    path: "/auth/users/",
    alias: "auth_users_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.UserCreateRequest,
      },
    ],
    response: generated.schemas.UserCreate,
  },
  {
    method: "get",
    path: "/auth/users/:username/",
    alias: "auth_users_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: generated.schemas.User,
  },
  {
    method: "put",
    path: "/auth/users/:username/",
    alias: "auth_users_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({ email: z.string().max(254).email() })
          .partial()
          .passthrough(),
      },
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: generated.schemas.User,
  },
  {
    method: "patch",
    path: "/auth/users/:username/",
    alias: "auth_users_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({ email: z.string().max(254).email() })
          .partial()
          .passthrough(),
      },
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: generated.schemas.User,
  },
  {
    method: "delete",
    path: "/auth/users/:username/",
    alias: "auth_users_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/auth/users/activation/",
    alias: "auth_users_activation_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.ActivationRequest,
      },
    ],
    response: generated.schemas.Activation,
  },
  {
    method: "get",
    path: "/auth/users/me/",
    alias: "auth_users_me_retrieve",
    requestFormat: "json",
    response: generated.schemas.User,
  },
  {
    method: "put",
    path: "/auth/users/me/",
    alias: "auth_users_me_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({ email: z.string().max(254).email() })
          .partial()
          .passthrough(),
      },
    ],
    response: generated.schemas.User,
  },
  {
    method: "patch",
    path: "/auth/users/me/",
    alias: "auth_users_me_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({ email: z.string().max(254).email() })
          .partial()
          .passthrough(),
      },
    ],
    response: generated.schemas.User,
  },
  {
    method: "delete",
    path: "/auth/users/me/",
    alias: "auth_users_me_destroy",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/auth/users/resend_activation/",
    alias: "auth_users_resend_activation_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ email: z.string().min(1).email() }).passthrough(),
      },
    ],
    response: z.object({ email: z.string().email() }).passthrough(),
  },
  {
    method: "post",
    path: "/auth/users/reset_password_confirm/",
    alias: "auth_users_reset_password_confirm_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.PasswordResetConfirmRequest,
      },
    ],
    response: generated.schemas.PasswordResetConfirm,
  },
  {
    method: "post",
    path: "/auth/users/reset_password/",
    alias: "auth_users_reset_password_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ email: z.string().min(1).email() }).passthrough(),
      },
    ],
    response: z.object({ email: z.string().email() }).passthrough(),
  },
  {
    method: "post",
    path: "/auth/users/reset_username_confirm/",
    alias: "auth_users_reset_username_confirm_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({
            new_username: z
              .string()
              .min(1)
              .max(150)
              .regex(/^[\w.@+-]+$/)
              .describe(
                "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
              ),
          })
          .passthrough(),
      },
    ],
    response: z
      .object({
        new_username: z
          .string()
          .max(150)
          .regex(/^[\w.@+-]+$/)
          .describe(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
          ),
      })
      .passthrough(),
  },
  {
    method: "post",
    path: "/auth/users/reset_username/",
    alias: "auth_users_reset_username_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ email: z.string().min(1).email() }).passthrough(),
      },
    ],
    response: z.object({ email: z.string().email() }).passthrough(),
  },
  {
    method: "post",
    path: "/auth/users/set_password/",
    alias: "auth_users_set_password_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.SetPasswordRequest,
      },
    ],
    response: generated.schemas.SetPassword,
  },
  {
    method: "post",
    path: "/auth/users/set_username/",
    alias: "auth_users_set_username_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.SetUsernameRequest,
      },
    ],
    response: generated.schemas.SetUsername,
  },
  {
    method: "get",
    path: "/drf/ratings",
    alias: "drf_ratings_list",
    description: `View to handle listing and creating ratings.`,
    requestFormat: "json",
    response: z.array(generated.schemas.Rating),
  },
  {
    method: "post",
    path: "/drf/ratings",
    alias: "drf_ratings_create",
    description: `View to handle listing and creating ratings.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: generated.schemas.RatingRequest,
      },
    ],
    response: generated.schemas.Rating,
  },
]);
