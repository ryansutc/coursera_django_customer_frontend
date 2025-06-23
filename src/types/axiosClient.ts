import { API_BASE_URL } from "@/utils/environment";
import { Zodios } from "@zodios/core";
// Import makeAPI from its module or define it here
import { axiosInstance } from "@/api/axiosInstance";
import { endpoints as endpoints_generated } from "@/generatedtypes/django_generated";
// Import or define MapItems
import { makeApi } from "@zodios/core";
import { schemas } from "./django_api";
import z from "zod";

/**
 * The endpoints generated via openapi-zodclient
 * aren't quite right. We have to manually patch it for
 * PATCH/POST and GET variants and our auto-transforms.
 */

// Map over the generated endpoints and replace the PATCH schema for menu-items
const endpoints = makeApi(
  endpoints_generated.map((ep) => {
    if (ep.method === "get" && ep.path === "/api/menu-items/") {
      // Replace the schema for the PATCH body
      return {
        ...ep,
        response: z.array(schemas.MenuItem),
      };
    }

    // override the token generate one, which is wrong from openapi-zodclient
    if (ep.method === "post" && ep.path === "/api/token/") {
      const newParams = ep.parameters.map((p) => ({
        ...p,
        schema: schemas.TokenObtainPairWrite,
      }));
      return {
        ...ep,
        parameters: newParams,
        response: schemas.TokenObtainPair,
      };
    }

    // fix cart items
    if (ep.method === "post" && ep.path === "/api/cart-items/") {
      const newParams = ep.parameters.map((p) => ({
        ...p,
        schema: schemas.CartItemWrite,
      }));

      return {
        ...ep,
        parameters: newParams,
      };
    }

    return ep;
  })
);

export const zodiosAPI = new Zodios(API_BASE_URL, endpoints, {
  axiosInstance,
});
