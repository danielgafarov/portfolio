import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router";
import App from './App.tsx';

import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = document.getElementById("root")!;
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App></App>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);

