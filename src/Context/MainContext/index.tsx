import React, { useContext } from "react";

export type MainContext = {
  layout: {
    drawerIsOpen: boolean;
    setDrawerIsOpen: CallableFunction;
    activeItems: number[];
    setActiveItems: (items: number[]) => void;
  };
};
type ContextProps = {
  children: React.ReactNode;
};
export const Context = ({ children }: ContextProps) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [activeItems, setActiveItems] = React.useState<number[]>([1]);

  return (
    <MainContext.Provider
      value={{
        layout: {
          drawerIsOpen: openDrawer,
          setDrawerIsOpen: setOpenDrawer,
          activeItems,
          setActiveItems: (items: number[]) => {
            setActiveItems(items);
          },
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
export const MainContext = React.createContext<MainContext | null>(null);

export const useMainContext = () => useContext(MainContext)