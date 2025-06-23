import { API_BASE_URL } from "@/utils/environment";
import { Zodios } from "@zodios/core";
// Import or define MapItems
import { endpoints as endpoints_generated } from "../../generatedtypes/django_generated";
// Import makeAPI from its module or define it here
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
    return ep;
  })
);

// export const zodiosAPI = new Zodios(API_BASE_URL, endpoints, {
//   transform: false,
//   validate: false,
// });

export const zodiosAPI = new Zodios(API_BASE_URL, endpoints);
