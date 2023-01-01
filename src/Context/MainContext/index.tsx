import React from "react";

export type MainContext = {
  layout: {
    drawerIsOpen: boolean;
    setDrawerIsOpen: CallableFunction;
    activeItems: number[];
    setActiveItems: (items: number[]) => void;
  };
};

export const MainContext = React.createContext<MainContext | null>(null);
