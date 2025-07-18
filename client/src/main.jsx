
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or './main.css'
import { BrowserRouter as Router } from 'react-router';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
