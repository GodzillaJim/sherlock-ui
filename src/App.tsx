import React from "react";
import ApolloClientProvider from "./Apollo";
import MainRouter from "./MainRouter";
import CustomThemeProvider from "./theme";
import { MainContext } from "./Context/MainContext";

const App = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [activeItems, setActiveItems] = React.useState<number[]>([]);
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
      <ApolloClientProvider>
        <CustomThemeProvider>
          <MainRouter />
        </CustomThemeProvider>
      </ApolloClientProvider>
    </MainContext.Provider>
  );
};

export default App;
