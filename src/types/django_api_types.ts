import type { schemas } from "./django_api";
import type z from "zod";

type AllGeneratedSchemas = typeof schemas;
export type AuthTokenType = z.infer<AllGeneratedSchemas["AuthToken"]>;
export type CartItemType = z.infer<AllGeneratedSchemas["CartItem"]>;
export type PatchedCartItemType = z.infer<
  AllGeneratedSchemas["PatchedCartItem"]
>;
export type CheckoutResponseType = z.infer<
  AllGeneratedSchemas["CheckoutResponse"]
>;
export type CategoryType = z.infer<AllGeneratedSchemas["Category"]>;
export type PatchedCategoryType = z.infer<
  AllGeneratedSchemas["PatchedCategory"]
>;
export type MenuItemType = z.infer<AllGeneratedSchemas["MenuItem"]>;
export type MenuItemWriteType = z.infer<AllGeneratedSchemas["MenuItemWrite"]>;
export type PatchedMenuItemWriteType = z.infer<
  AllGeneratedSchemas["PatchedMenuItem"]
>;
export type OrderType = z.infer<AllGeneratedSchemas["Order"]>;
export type OrderWriteType = z.infer<AllGeneratedSchemas["OrderWrite"]>;
export type TokenObtainPairType = z.infer<
  AllGeneratedSchemas["TokenObtainPair"]
>;
export type TokenBlacklistType = z.infer<AllGeneratedSchemas["TokenBlacklist"]>;
export type TokenRefreshType = z.infer<AllGeneratedSchemas["TokenRefresh"]>;
export type TokenCreateType = z.infer<AllGeneratedSchemas["TokenCreate"]>;
export type UserType = z.infer<AllGeneratedSchemas["User"]>;
export type UserCreateType = z.infer<AllGeneratedSchemas["UserCreate"]>;
export type PatchedUserType = z.infer<AllGeneratedSchemas["PatchedUser"]>;
export type ActivationType = z.infer<AllGeneratedSchemas["Activation"]>;
export type SendEmailResetType = z.infer<AllGeneratedSchemas["SendEmailReset"]>;
export type PasswordResetConfirmType = z.infer<
  AllGeneratedSchemas["PasswordResetConfirm"]
>;
export type UsernameResetConfirmType = z.infer<
  AllGeneratedSchemas["UsernameResetConfirm"]
>;
export type SetPasswordType = z.infer<AllGeneratedSchemas["SetPassword"]>;
export type SetUsernameType = z.infer<AllGeneratedSchemas["SetUsername"]>;
export type RatingType = z.infer<AllGeneratedSchemas["Rating"]>;
