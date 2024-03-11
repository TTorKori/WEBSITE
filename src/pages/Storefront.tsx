import Title from "../components/Title";
import supabaseClient from "../config/supabase";
import { useEffect, useState } from "react";
import ProductShop from "../components/ProductShop";
import ProductWindow from "../components/ProductWindow";
import { useNavigate } from "react-router-dom";

function Storefront() {

  const [fetchError, setFetchError] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);


  const [showProductShop, setShowProductShop] = useState(true);
  const [showProductWindow, setShowProductWindow] = useState(false);
  const [currentProductInView, setCurrentProductInView] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const {data, error} = await supabaseClient
        .from("products")
        .select();

        if(error) {
          setFetchError("Could not find products in database");
          setProducts([]);
          console.log(error.message);
        }
        

        if(data){
          if(data.length === 0){
            setFetchError("There is no data");
            setProducts([]);
            return;
          }

          setProducts(data);
          setFetchError("");
        }

    }

    fetchProducts();
  }, []);


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

  const handleReturnToLogin = () => {
	navigate("/");
  };
  
  console.log(products);

  return (
    <div className="app">
      {fetchError && <p>{`Could not find products: ${fetchError}`}</p>}
      <Title />

      <div className="display">
        {showProductShop && (
          <ProductShop products={products} onClick={handleProductInteraction} />
        )}
        {showProductWindow && <ProductWindow product={currentProductInView} onReturn={handleReturn}/>}
      </div>
	   <button type="button" onClick={handleReturnToLogin}>Return to Log In</button>
    </div>
  );
}

export default Storefront;