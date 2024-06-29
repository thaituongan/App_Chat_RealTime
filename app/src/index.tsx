import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <React.StrictMode>
    <ErrorBoundary>
        <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
        </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
