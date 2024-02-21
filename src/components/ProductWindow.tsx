import Product from "./Product";

interface Props {
	products : String[]
}

function ProductWindow({products} : Props) {


  return (
    <>
      {products.length === 0 && <p>No Products Found.</p>}
      <ul>
        {/* Replace the li with Product Component */}
        {products.map((product) => (
			<Product name={product} />
        ))}
      </ul>
    </>
  );
}

export default ProductWindow;
