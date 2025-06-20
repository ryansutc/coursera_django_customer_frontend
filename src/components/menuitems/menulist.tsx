import {
  useEffect,
  useState,
} from "react";

import MenuCard from "./menuCard";

export default function MenuList() {
  const [menuItems, setMenuItems] = useState<
    { id: number; name: string; price: number }[] | []
  >([]);
  useEffect(() => {
    // This is where you would fetch the menu items from an API or context
    const fetchMenuItems = async () => {
      // Simulating an API call
      const items = [
        { id: 1, name: "Pizza", price: 9.99 },
        { id: 2, name: "Burger", price: 7.99 },
        { id: 3, name: "Pasta", price: 8.99 },
      ];
      setMenuItems(items);
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
          title={item.name}
          price={item.price}
          id={item.id}
          inventory={10} // Assuming a static inventory for now
          category="Main Course" // Assuming a static category for now
        />
      ))}
    </div>
  );
}
