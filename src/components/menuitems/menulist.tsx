import { useEffect, useState } from "react";

import MenuCard from "./menuCard";
import { schemas } from "@/types/django_api";
import { z } from "zod";
import { zodiosAPI } from "@/types/axiosClient";

type MenuItemType = z.infer<typeof schemas.MenuItem>;

export default function MenuList() {
  const [menuItems, setMenuItems] = useState<MenuItemType[] | []>([]);

  useEffect(() => {
    // This is where you would fetch the menu items from an API or context
    const fetchMenuItems = async () => {
      // @ts-expect-error method does not exist.
      const menuItems = await zodiosAPI.api_menu_items_list();

      setMenuItems(menuItems);
    };
    fetchMenuItems();
  }, []);

  return (
    <div
      id="wrapperMenuList"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {menuItems.map((item) => (
        <MenuCard
          key={item.id}
          title={item.title}
          price={item.price}
          id={item.id}
          inventory={10} // Assuming a static inventory for now
          category="Main Course" // Assuming a static category for now
        />
      ))}
    </div>
  );
}
