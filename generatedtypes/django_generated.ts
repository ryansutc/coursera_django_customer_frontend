import { makeApi } from "@zodios/core";
import { z } from "zod";

const AuthToken = z
  .object({ username: z.string(), password: z.string(), token: z.string() })
  .passthrough();
const CartItem = z
  .object({
    id: z.number().int(),
    menuitem: z.number().int(),
    quantity: z.number().int().gte(0).lte(40).optional(),
  })
  .passthrough();
const PatchedCartItem = z
  .object({
    id: z.number().int(),
    menuitem: z.number().int(),
    quantity: z.number().int().gte(0).lte(40),
  })
  .partial()
  .passthrough();
const CheckoutResponse = z
  .object({ detail: z.string(), order_id: z.number().int() })
  .passthrough();
const Category = z
  .object({
    id: z.number().int(),
    title: z.string().max(255),
    slug: z
      .string()
      .max(50)
      .regex(/^[-a-zA-Z0-9_]+$/),
  })
  .passthrough();
const PatchedCategory = z
  .object({
    id: z.number().int(),
    title: z.string().max(255),
    slug: z
      .string()
      .max(50)
      .regex(/^[-a-zA-Z0-9_]+$/),
  })
  .partial()
  .passthrough();
const MenuItem = z
  .object({
    id: z.number().int(),
    title: z.string().max(255),
    price: z.string().regex(/^-?\d{0,4}(?:\.\d{0,2})?$/),
    inventory: z.number().int().gte(0).lte(400).nullish(),
    price_after_tax: z.string(),
    category: Category,
    category_id: z.number().int(),
    featured: z.boolean().optional(),
  })
  .passthrough();
const PatchedMenuItem = z
  .object({
    id: z.number().int(),
    title: z.string().max(255),
    price: z.string().regex(/^-?\d{0,4}(?:\.\d{0,2})?$/),
    inventory: z.number().int().gte(0).lte(400).nullable(),
    price_after_tax: z.string(),
    category: Category,
    category_id: z.number().int(),
    featured: z.boolean(),
  })
  .partial()
  .passthrough();
const Order = z
  .object({
    id: z.number().int(),
    user: z.number().int(),
    delivery_crew: z.number().int().nullish(),
    status: z.boolean().optional(),
    total: z.string().regex(/^-?\d{0,4}(?:\.\d{0,2})?$/),
    date: z.string(),
  })
  .passthrough();
const TokenObtainPair = z
  .object({
    username: z.string(),
    password: z.string(),
    access: z.string(),
    refresh: z.string(),
  })
  .passthrough();
const TokenBlacklist = z.object({ refresh: z.string() }).passthrough();
const TokenRefresh = z
  .object({ access: z.string(), refresh: z.string() })
  .passthrough();
const TokenCreate = z
  .object({ password: z.string(), username: z.string() })
  .partial()
  .passthrough();
const User = z
  .object({
    email: z.string().max(254).email().optional(),
    username: z
      .string()
      .describe(
        "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
      ),
  })
  .passthrough();
const UserCreate = z
  .object({
    email: z.string().max(254).email().optional(),
    username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/)
      .describe(
        "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
      ),
    password: z.string(),
  })
  .passthrough();
const PatchedUser = z
  .object({
    email: z.string().max(254).email(),
    username: z
      .string()
      .describe(
        "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
      ),
  })
  .partial()
  .passthrough();
const Activation = z
  .object({ uid: z.string(), token: z.string() })
  .passthrough();
const SendEmailReset = z.object({ email: z.string().email() }).passthrough();
const PasswordResetConfirm = z
  .object({ uid: z.string(), token: z.string(), new_password: z.string() })
  .passthrough();
const UsernameResetConfirm = z
  .object({
    new_username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/)
      .describe(
        "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
      ),
  })
  .passthrough();
const SetPassword = z
  .object({ new_password: z.string(), current_password: z.string() })
  .passthrough();
const SetUsername = z
  .object({
    current_password: z.string(),
    new_username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/)
      .describe(
        "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
      ),
  })
  .passthrough();
const Rating = z
  .object({
    user: z.number().int().optional(),
    menuitem_id: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    rating: z.number().int().gte(0).lte(5),
  })
  .passthrough();

export const schemas = {
  AuthToken,
  CartItem,
  PatchedCartItem,
  CheckoutResponse,
  Category,
  PatchedCategory,
  MenuItem,
  PatchedMenuItem,
  Order,
  TokenObtainPair,
  TokenBlacklist,
  TokenRefresh,
  TokenCreate,
  User,
  UserCreate,
  PatchedUser,
  Activation,
  SendEmailReset,
  PasswordResetConfirm,
  UsernameResetConfirm,
  SetPassword,
  SetUsername,
  Rating,
};

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
        schema: AuthToken,
      },
    ],
    response: AuthToken,
  },
  {
    method: "get",
    path: "/api/cart-items/",
    alias: "api_cart_items_list",
    requestFormat: "json",
    response: z.array(CartItem),
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
        schema: CartItem,
      },
    ],
    response: CartItem,
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
    response: CartItem,
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
        schema: CartItem,
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
    response: CartItem,
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
        schema: PatchedCartItem,
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
    response: CartItem,
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
    response: CheckoutResponse,
    errors: [
      {
        status: 400,
        description: `Your cart is empty.`,
        schema: z.object({}).partial().passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/categories/",
    alias: "api_categories_list",
    requestFormat: "json",
    response: z.array(Category),
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
        schema: Category,
      },
    ],
    response: Category,
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
    response: Category,
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
        schema: Category,
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
    response: Category,
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
        schema: PatchedCategory,
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
    response: Category,
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
        schema: MenuItem,
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
        schema: MenuItem,
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
        schema: PatchedMenuItem,
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
        schema: MenuItem,
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
    response: z.array(CartItem),
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
        schema: CartItem,
      },
    ],
    response: CartItem,
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
    response: CartItem,
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
        schema: CartItem,
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
    response: CartItem,
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
        schema: PatchedCartItem,
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
    response: CartItem,
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
        schema: TokenObtainPair,
      },
    ],
    response: TokenObtainPair,
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
        schema: z.object({ refresh: z.string() }).passthrough(),
      },
    ],
    response: z.object({ refresh: z.string() }).passthrough(),
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
        schema: TokenRefresh,
      },
    ],
    response: TokenRefresh,
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
        schema: TokenCreate,
      },
    ],
    response: TokenCreate,
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
    response: z.array(User),
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
        schema: UserCreate,
      },
    ],
    response: UserCreate,
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
    response: User,
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
        schema: User,
      },
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: User,
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
        schema: PatchedUser,
      },
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: User,
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
        schema: Activation,
      },
    ],
    response: Activation,
  },
  {
    method: "get",
    path: "/auth/users/me/",
    alias: "auth_users_me_retrieve",
    requestFormat: "json",
    response: User,
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
        schema: User,
      },
    ],
    response: User,
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
        schema: PatchedUser,
      },
    ],
    response: User,
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
        schema: z.object({ email: z.string().email() }).passthrough(),
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
        schema: PasswordResetConfirm,
      },
    ],
    response: PasswordResetConfirm,
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
        schema: z.object({ email: z.string().email() }).passthrough(),
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
        schema: z.object({ email: z.string().email() }).passthrough(),
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
        schema: SetPassword,
      },
    ],
    response: SetPassword,
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
        schema: SetUsername,
      },
    ],
    response: SetUsername,
  },
  {
    method: "get",
    path: "/drf/ratings",
    alias: "drf_ratings_list",
    description: `View to handle listing and creating ratings.`,
    requestFormat: "json",
    response: z.array(Rating),
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
        schema: Rating,
      },
    ],
    response: Rating,
  },
]);
