import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';



const root = ReactDOM.createRoot(document.getElementById('root'));

const RootComponent =()=>{
  
  return (
    <>
     
      <App  />
    </>
  );
};

root.render(
  <React.StrictMode>
    <RootComponent/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
