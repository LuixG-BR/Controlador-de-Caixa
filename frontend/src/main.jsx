import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css';
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/buttons.css";
import "./styles/form.css";
import "./styles/cards.css";

import App from './App.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

      <App />

      <ToastContainer />

    </AuthProvider>
  </StrictMode>
)