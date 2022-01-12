import React from "react";
import "./App.css";
import ProductsContainer from "./components/ProductsContainer";
import Navbar from "./components/Navbar";
import FilterPanel from "./components/FilterPanel";
import CartContainer from "./components/CartContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <FilterPanel />
          <ProductsContainer />
        </Route>
        <Route path='/cart'>
          <CartContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
