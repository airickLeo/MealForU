import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, RecipeDetails, Search } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/search' Component={Search} />
        <Route path='/search/:recipeId' Component={RecipeDetails} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
