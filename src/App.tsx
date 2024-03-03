import "./css/App.css";
import Title from "./components/Title";
import supabaseClient from "./config/supabase";
import LoginButton from "./components/LoginButton";
import { useEffect, useState } from "react";
import ProductShop from "./components/ProductShop";
import ProductWindow from "./components/ProductWindow";

function App() {

  const [fetchError, setFetchError] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showProductShop, setShowProductShop] = useState(false);
  const [showProductWindow, setShowProductWindow] = useState(false);
  const [currentProductInView, setCurrentProductInView] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const {data, error} = await supabaseClient
        .from("products")
        .select();

        if(error) {
          setFetchError("Could not find products in database");
          setProducts([]);
          console.log(error);
        }
    
        if(data){
          setProducts(data);
          setFetchError("");
        }

    }

    fetchProducts();
  }, []);

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

  console.log(products);
  return (
    <div className="app">
      {fetchError && <p>{`Could not find products ${fetchError}`}</p>}
      {products.length === 0 && <p>No products in the shop</p>}
      <Title />
      <LoginButton onClick={handleLogIn}>
        {isLoggedIn ? "LOG OUT" : "LOGIN"}
      </LoginButton>

      <div className="display">
        {showProductShop && isLoggedIn && (
          <ProductShop products={products} onClick={handleProductInteraction} />
        )}
        {showProductWindow && <ProductWindow product={currentProductInView} onReturn={handleReturn}/>}
      </div>
    </div>
  );
}

export default App;
