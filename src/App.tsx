import React from "react";
import ApolloClientProvider from "./Apollo";
import MainRouter from "./MainRouter";
import CustomThemeProvider from "./theme";
import { MainContext } from "./Context/MainContext";

const App = (): JSX.Element => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <MainContext.Provider
      value={{
        layout: { drawerStatus: openDrawer, setDrawerStatus: setOpenDrawer },
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
