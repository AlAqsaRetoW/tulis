import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import ThemeContextProvider from './context/ThemeContext'
import AuthContextProvider from './context/AuthContext'
import { Provider } from 'react-redux';
import store from './app/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
