import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const saveOrderHandler = async (orderData) => {
    console.log(orderData);
    const response = await fetch("http://localhost:3010/api/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    console.log(data);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onCloseCart={hideCartHandler} onSaveOrder={saveOrderHandler} />
      )}
      <Header onShownCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
