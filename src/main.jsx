import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Index from './pages/Index.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <>
    <BrowserRouter basename="/EduSuitApp/">
      <App />
    </BrowserRouter>
  </>
  // </React.StrictMode>
);
