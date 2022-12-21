import React from 'react'
import ApolloClientProvider from './Apollo'
import MainRouter from './MainRouter'
import CustomThemeProvider from './theme'

const App = (): JSX.Element => {
  return (
      <ApolloClientProvider>
          <CustomThemeProvider>
              <MainRouter />
          </CustomThemeProvider>
      </ApolloClientProvider>
  )
}

export default App
