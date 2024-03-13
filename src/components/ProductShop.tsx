import ProductCard from "./ProductCard";

interface Props {
  products: any[],
  productAssets: any[]
  onClick: (product: string) => void
}

interface ProductData {
  publicUrl: string
}


function ProductShop({ products, productAssets, onClick}: Props) {

  const getURL = (assets: ProductData[], name: string) => {
    for (let asset of assets) {
      let isInURL = asset.publicUrl.includes(`${name}_1`);
      if(isInURL){
        return asset.publicUrl;
      }
    }
  }

  return (
    <>
      {products.length === 0 && <p>No Products Found.</p>}
      {/* Replace the li with Product Component */}
      {products.map((product) => (

        <ProductCard key={product.id} onClick={onClick} productId={product.id}>

          {<img src={getURL(productAssets, product.id)}></img>}
          {product.title}

        </ProductCard>
      ))}
    </>
  );
}

export default ProductShop;
