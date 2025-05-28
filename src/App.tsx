import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProvider } from '@toolpad/core/AppProvider';
import { BrowserRouter } from 'react-router';
import { Router } from './layouts/Router';

import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ReactQueryDevtools />
          <BrowserRouter basename="/SupLibrary">
            <Router />
          </BrowserRouter>
        </AppProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
