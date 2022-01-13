import React from 'react'
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import AppRoot from './src/router/root'
import { Provider as PaperProvider } from 'react-native-paper'
import './src/translation'
import { QueryClient, QueryClientProvider } from 'react-query'
import Modals from 'components/Modals'
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Modals />
        <PaperProvider>
          <AppRoot />
        </PaperProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
