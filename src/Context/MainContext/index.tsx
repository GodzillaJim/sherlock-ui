import React from "react";

type MainContext = {
  layout: {
    drawerStatus: boolean;
    setDrawerStatus: CallableFunction;
  };
};

export const MainContext = React.createContext<MainContext | null>(null);
