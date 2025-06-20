import { createContext } from "react";

export const StateContext = createContext({
  page: "menu",
  user: null,
  setPage: (page: string) => {},
  setUser: (user: any) => {},
});
