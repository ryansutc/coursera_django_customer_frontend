import { useQuery } from "@tanstack/react-query";
import { zodiosAPI } from "@/api/axiosClient";

export const MENU_ITEMS_QUERY_KEY = ["menuItems"] as const;

export function useMenuItems() {
  return useQuery({
    queryKey: MENU_ITEMS_QUERY_KEY,
    queryFn: () => zodiosAPI.api_menu_items_list(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    //initialData: [],
  });
}
