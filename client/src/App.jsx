import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, Search } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/search' Component={Search} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
