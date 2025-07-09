import MenuCard from "./menuCard";
import { useMenuItems } from "@/hooks/useMenuItems";

export default function MenuList() {
  const { data: menuItems = [], isLoading, error } = useMenuItems();

  if (isLoading) {
    return <div>Loading menu items...</div>;
  }

  if (error) {
    return <div>Error loading menu items</div>;
  }

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
          price={parseFloat(item.price)}
          id={item.id}
          inventory={10} // Assuming a static inventory for now
          category="Main Course" // Assuming a static category for now
        />
      ))}
    </div>
  );
}
