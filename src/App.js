import React, { useState } from "react";
import { Route } from "react-router-dom";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
import {useLocalStorage} from "./hooks/useLocalStorage";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage('item', []);

  const addItem = item => {
    // add the given item to the cart
    setCart([...cart, {...item,  id:Date.now()}]);
    console.log(cart);
	};
	
	const removeItem = item => {
		setCart(cart.filter(cartItem => cartItem.id !== item.id))
	}

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={ {cart, removeItem} }>
          <Navigation cart={cart} />
          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route path="/cart" component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
