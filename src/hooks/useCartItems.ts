import type {
  CartItemRequestType,
  CartItemType,
  PatchedCartItemRequestType,
} from "@/types/django_api_types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { zodiosAPI } from "@/types/axiosClient";

export const CART_ITEMS_QUERY_KEY = ["cartItems"] as const;

export function useCartItems() {
  return useQuery({
    queryKey: CART_ITEMS_QUERY_KEY,
    queryFn: () => zodiosAPI.api_cart_items_list(),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: CartItemRequestType) =>
      zodiosAPI.api_cart_items_create(item),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: CART_ITEMS_QUERY_KEY });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: PatchedCartItemRequestType;
    }) => zodiosAPI.api_cart_items_partial_update(data, { params: { id } }),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: CART_ITEMS_QUERY_KEY });

      const previousCartItems =
        queryClient.getQueryData<CartItemType[]>(CART_ITEMS_QUERY_KEY);

      queryClient.setQueryData<CartItemType[]>(CART_ITEMS_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
      });

      return { previousCartItems };
    },
    onError: (err, variables, context) => {
      console.warn("Error updating cart item:", err);
      if (context?.previousCartItems) {
        queryClient.setQueryData(
          CART_ITEMS_QUERY_KEY,
          context.previousCartItems
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_ITEMS_QUERY_KEY });
    },
  });
}

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      zodiosAPI.api_cart_items_destroy(undefined, { params: { id } }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: CART_ITEMS_QUERY_KEY });

      const previousCartItems =
        queryClient.getQueryData<CartItemType[]>(CART_ITEMS_QUERY_KEY);

      queryClient.setQueryData<CartItemType[]>(CART_ITEMS_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.filter((item) => item.id !== id);
      });

      return { previousCartItems };
    },
    onError: (err, variables, context) => {
      console.warn("Error deleting cart item:", err);
      if (context?.previousCartItems) {
        queryClient.setQueryData(
          CART_ITEMS_QUERY_KEY,
          context.previousCartItems
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_ITEMS_QUERY_KEY });
    },
  });
}
