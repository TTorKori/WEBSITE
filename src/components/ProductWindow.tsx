import ProductCard from "./ProductCard";

interface Product {
  id: String,
  title: String,
  images: string[]
}

interface Props {
	products : Product[]
}


function ProductWindow({products} : Props) {

  for(let product of products){
    console.log(product);
  }

  console.log("The length of products = " + products.length);
  return (
    <>
      {products.length === 0 && <p>No Products Found.</p>}
      <ul>
        {/* Replace the li with Product Component */}
        {products.map((product) => (
			    <ProductCard>
            <img src={product.images[0]} alt="" />
            {product.title}
          </ProductCard>
        ))}
      </ul>
    </>
  );
}

export default ProductWindow;
