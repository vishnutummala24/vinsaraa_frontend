import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; // <--- IMPORT

// Replace with your ACTUAL Client ID from Step 0
const GOOGLE_CLIENT_ID = "958832349798-rhb1np3nmtvm11a7edcrulor7aci1cs7.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>  {/* <--- WRAPPER */}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
