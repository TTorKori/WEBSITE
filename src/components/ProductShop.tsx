import ProductCard from "./ProductCard";

interface Props {
  products: any[],
  onClick: (product: string) => void
}

function ProductShop({ products, onClick}: Props) {

  return (
    <>
      {products.length === 0 && <p>No Products Found.</p>}
      {/* Replace the li with Product Component */}
      {products.map((product) => (

        <ProductCard key={product.id} onClick={onClick} productId={product.id}>

          {/* <img src={product.images[0]} alt="" /> */}
          {product.title}

        </ProductCard>
      ))}
    </>
  );
}

export default ProductShop;
