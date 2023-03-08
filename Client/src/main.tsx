import App from './App'
import axios from 'axios';
import React from 'react';
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom';

axios.defaults.baseURL = "https://doubtful-puce-macaw.cyclic.app/"
// axios.defaults.baseURL = "http://localhost:8080/"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ChakraProvider>
)
