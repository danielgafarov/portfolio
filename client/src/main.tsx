import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from './App.tsx';

import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = document.getElementById("root")!;
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryClientProvider client={queryClient}>
          {/* The rest of your application */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <App></App>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);

