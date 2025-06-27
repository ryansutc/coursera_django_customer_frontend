/**
 * This is just an entry point wherein all environment variables are defined
 * and exported as constants.
 * This allows for easy access to environment variables throughout the application.
 * It also provides a single source of truth for environment variables,
 * making it easier to manage and update them.
 */

export const API_BASE_URL: string =
  String(import.meta.env.VITE_API_BASE_URL) || "http://localhost:8000/api";
export const API_TIMEOUT = parseInt(
  String(import.meta.env.VITE_API_TIMEOUT) || "5000",
  10
); // Default to 5000ms if not set

export const IS_PRODUCTION = import.meta.env.VITE_ENV === "production";
export const IS_DEVELOPMENT = import.meta.env.VITE_ENV === "development";
