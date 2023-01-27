import React from "react";
import ApolloClientProvider from "./Apollo";
import MainRouter from "./MainRouter";
import CustomThemeProvider from "./theme";
import { MainContext } from "./Context/MainContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthManager from "./Context/AuthManager";

const App = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [activeItems, setActiveItems] = React.useState<number[]>([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthManager>
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
            </AuthManager>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
