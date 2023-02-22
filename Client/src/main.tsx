import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

axios.defaults.baseURL = "http://localhost:8080"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ChakraProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </ChakraProvider>
  </Router>
)
