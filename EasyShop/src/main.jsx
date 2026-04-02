
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Components/CartContext.jsx';
import { WishListProvider } from './Components/WishListContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <WishListProvider>
    <CartProvider>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </CartProvider>
  </WishListProvider>
</QueryClientProvider>
)
