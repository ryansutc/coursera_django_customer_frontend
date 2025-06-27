import { API_BASE_URL } from "@/utils/environment";
import { Zodios } from "@zodios/core";
// Import makeAPI from its module or define it here
import { axiosInstance } from "@/api/axiosInstance";
import { endpoints } from "@/generatedtypes/django_generated";
// Import or define MapItems

/**
 * The endpoints generated via openapi-zodclient
 * aren't quite right. We have to manually patch it for
 * PATCH/POST and GET variants and our auto-transforms.
 */

export const zodiosAPI = new Zodios(API_BASE_URL, endpoints, {
  axiosInstance,
});
