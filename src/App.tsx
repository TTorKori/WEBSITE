import "./css/App.css";
import Title from "./components/Title";
import products from "./assets";
import supabaseClient from "./config/supabase";
import LoginButton from "./components/LoginButton";
import { useState } from "react";
import ProductShop from "./components/ProductShop";
import ProductWindow from "./components/ProductWindow";
import Display from "./components/Display";

function App() {
  console.log(supabaseClient);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showProductShop, setShowProductShop] = useState(false);
  const [showProductWindow, setShowProductWindow] = useState(false);
  const [currentProductInView, setCurrentProductInView] = useState("");

  const handleLogIn = () => {
    setIsLoggedIn(!isLoggedIn);
    setShowProductShop(!showProductShop);
  };

  const handleProductInteraction = (product: string) => {
    console.log(product);

    setShowProductShop(false);
    setShowProductWindow(true);

    setCurrentProductInView(product);
  };

  const handleReturn = () => {
    setShowProductShop(true);
    setShowProductWindow(false);
  }

  return (
    <div className="app">
      <Title />
      <LoginButton onClick={handleLogIn}>
        {isLoggedIn ? "LOG OUT" : "LOGIN"}
      </LoginButton>

      <Display>
        {showProductShop && isLoggedIn && (
          <ProductShop products={products} onClick={handleProductInteraction} />
        )}
        {showProductWindow && <ProductWindow product={currentProductInView} onReturn={handleReturn}/>}
      </Display>
    </div>
  );
}

export default App;
