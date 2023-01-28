import React from "react";
import { User } from "../../generated";

export type MainContext = {
  layout: {
    drawerIsOpen: boolean;
    setDrawerIsOpen: CallableFunction;
    activeItems: number[];
    setActiveItems: (items: number[]) => void;
  };
  user: User | null;
};

export const MainContext = React.createContext<MainContext | null>(null);
