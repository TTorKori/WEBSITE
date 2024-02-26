import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  images: string[];
}

interface Props {
  products: Product[];
}

function ProductWindow({ products }: Props) {

  return (
    <div className="product-window">
      {products.length === 0 && <p>No Products Found.</p>}
      {/* Replace the li with Product Component */}
      {products.map((product) => (
        <ProductCard key={product.id}>
          <img src={product.images[0]} alt="" />
          {product.title}
        </ProductCard>
      ))}
    </div>
  );
}

export default ProductWindow;
