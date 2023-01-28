import React, { useEffect } from "react";
import MainRouter from "./MainRouter";
import CustomThemeProvider from "./theme";
import { MainContext } from "./Context/MainContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthManager from "./Context/AuthManager";
import { User, useLoggedInUserQuery } from "./generated";

const App = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [activeItems, setActiveItems] = React.useState<number[]>([]);
  const [user, setUser] = React.useState<User | null>(null);

  const { data, loading, error } = useLoggedInUserQuery();
  useEffect(() => {
    if (data && data.me) {
      setUser({ ...data.me, password: "" });
    }
  }, [data, loading, error]);

  useEffect(() => {
    console.log("Data: ", { data, loading, error });
  });

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
                  user,
                }}
              >
                <CustomThemeProvider>
                  <MainRouter />
                </CustomThemeProvider>
              </MainContext.Provider>
            </AuthManager>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
