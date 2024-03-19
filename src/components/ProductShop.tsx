import ProductCard from "./ProductCard";

interface Props {
  products: any[];
  productAssets: ProductFolder[];
  onClick: (product: string) => void;
}

interface ProductImageData {
  publicUrl: string;
}

interface ProductFolder {
  folderName: string;
  images: ProductImageData[];
}

function ProductShop({ products, productAssets, onClick }: Props) {
  const getImageURL = (
    productName: string,
    image: number,
    productAssets: ProductFolder[]
  ) => {
    
    if (!productAssets) {
      console.log("PRODUCT ASSETS IS EMPTY");
      return "";
    }

    for (let productFolder of productAssets) {
      console.log(`Accessing ${productFolder.folderName}`);
      if (productName === productFolder.folderName) {
        return productFolder.images[image].publicUrl;
      }
    }

    console.log(`Could not retrieve ${productName}_${image} from folders`);
    return "";
  };

  console.log(`PRODUCT SHOP: PRODUCT ASSETSS`);
  console.log(productAssets);

  return (
    <>
      {products.length === 0 && <p>No Products Found.</p>}
      {/* Replace the li with Product Component */}
      {products.map((product) => (
        <ProductCard key={product.id} onClick={onClick} productId={product.id}>
          {<img src={getImageURL(`${product.id}`, 1, productAssets)}></img>}
          {product.title}
        </ProductCard>
      ))}
    </>
  );
}

export default ProductShop;
