import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; // <--- IMPORT

// Replace with your ACTUAL Client ID from Step 0
const GOOGLE_CLIENT_ID = "44114483480-qullmaqkm953nief34vhmmtik3g4d2e3.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>  {/* <--- WRAPPER */}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);