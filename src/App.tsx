import "./css/App.css";
import Title from "./components/Title";
import ProductWindow from "./components/ProductWindow";
import products from "./assets";
import supabaseClient from "./config/supabase";
import LoginButton from "./components/LoginButton";
import { useState } from "react";

function App() {
  console.log(supabaseClient);

  const [showProductWindow, setShowProductWindow] = useState(false);

  return (
    <div className="app">
      <Title />
      <LoginButton onClick={()=>setShowProductWindow(!showProductWindow)}>
        {showProductWindow ? "LOG OUT" : "LOGIN"}
      </LoginButton>

      {showProductWindow && <ProductWindow products={products} />}
    </div>
  );
}

export default App;
