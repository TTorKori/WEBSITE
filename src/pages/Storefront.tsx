import Title from "../components/Title";
import supabaseClient from "../config/supabase";
import { useEffect, useState } from "react";
import ProductShop from "../components/ProductShop";
import ProductWindow from "../components/ProductWindow";
import { useNavigate } from "react-router-dom";

function Storefront() {
  const [fetchError, setFetchError] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  const [productAssets, setProductAssets] = useState<any[]>([]);

  const [showProductShop, setShowProductShop] = useState(true);
  const [showProductWindow, setShowProductWindow] = useState(false);
  const [currentProductInView, setCurrentProductInView] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabaseClient.from("products").select();

      if (error) {
        setFetchError("Could not find products in database");
        setProducts([]);
        console.log(error.message);
      }

      if (data) {
        if (data.length === 0) {
          setFetchError("There is no data");
          setProducts([]);
          return;
        }

        setProducts(data);
        setFetchError("");
      }
    };

    const fetchProductAssets = async () => {
      // Checking if bucket exists
      const { data: bucketData, error: bucketFetchError } =
        await supabaseClient.storage.getBucket("products");

      if (bucketFetchError) {
        setFetchError(
          "Could not access storage buckets: " + bucketFetchError.message
        );
        setProductAssets([]);
        return;
      }

      if (bucketData) console.log("This is the storage bucket: products");
      console.log(bucketData);

      const { data: listOfProductFolders, error: listOfProductFoldersError } =
        await supabaseClient.storage.from("products").list(undefined, {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (listOfProductFoldersError) {
        setFetchError(
          "Could not access list of products from buckets: " +
            listOfProductFoldersError.message
        );
        setProductAssets([]);
        return;
      }

      if (listOfProductFolders)
        console.log("This is the list of folders in bucket: products");
      console.log(listOfProductFolders);

      //TODO: FIX THIS

      let listOfProductsInFolders: any[] = [];

      for (let productFolderInfo of listOfProductFolders) {
        const getURLInPromise = async () => {
          console.log(`Getting files from ${productFolderInfo.name} folder...`);

          const { data: listOfProducts, error: listOfProductsError } =
            await supabaseClient.storage
              .from("products")
              .list(`${productFolderInfo.name}`, {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" },
              });

          if (listOfProductsError) {
            setFetchError(
              "Could not access list of products from product folders: " +
                listOfProductsError.message
            );
            setProductAssets([]);
            return [];
          }

          console.log(`This is the list of URLS in product folder: ${productFolderInfo.name}`);
          console.log(listOfProducts);
          return listOfProducts;

        };

        getURLInPromise()
          .then((productFolder) => {
            let imagesInFoler = [];

            for (let productInfo of productFolder) {
              console.log("Entering folder: ");
              console.log(productFolder);

              console.log(
                `Product Folder: ${productInfo.name} is going into the images folder object`
              );
              const { data } = supabaseClient.storage
                .from("products")
                .getPublicUrl(`${productFolderInfo.name}/${productInfo.name}`);

              if (!data) {
                throw new Error(
                  "Error: Could not retrieve image: " + productInfo.name
                );
              }

              imagesInFoler.push(data);
            }

            let folderObj = {
              folderName: `${productFolderInfo.name}`,
              images: imagesInFoler,
            };

            listOfProductsInFolders.push(folderObj);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("This is the list of products in their folders");
            console.log(listOfProductsInFolders);
          });
      }

      setProductAssets(listOfProductsInFolders);
    };

    fetchProductAssets();
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
  };

  const handleReturnToLogin = () => {
    navigate("/");
  };

  console.log("This is a list of products");
  console.log(products);

  console.log("This is a list of products assets");
  console.log(productAssets);

  return (
    <div className="app">
      {fetchError && <p>{`Could not find products: ${fetchError}`}</p>}
      <Title />

      <div className="display">
        {showProductShop && (
          <ProductShop
            products={products}
            productAssets={productAssets}
            onClick={handleProductInteraction}
          />
        )}
        {showProductWindow && (
          <ProductWindow
            product={currentProductInView}
            onReturn={handleReturn}
          />
        )}
      </div>
      <button type="button" onClick={handleReturnToLogin}>
        Return to Log In
      </button>
    </div>
  );
}

export default Storefront;
