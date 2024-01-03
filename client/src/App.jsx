import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AddRecipe, Favourites, HomePage, RecipeDetails, Search } from './components';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currPage, setPage] = useState(1);
  const [currRecipes, setCurrRecipes] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <HomePage />} />
        <Route path='/search'
          element={
            <Search setRecipes={(recipes) => setRecipes(recipes)}
              recipes={recipes} currPage={currPage}
              setPage={(page) => setPage(page)}
              currRecipes={currRecipes}
              setCurrRecipes={(recipes) => setCurrRecipes(recipes)} />
          }
        />
        <Route path='/search/:recipeId' element={<RecipeDetails />} />
        <Route path='/favourites'
          element={<Favourites />} />
        <Route path='/favourites/:recipeId' element={<RecipeDetails />} />
        <Route path='/add' element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
