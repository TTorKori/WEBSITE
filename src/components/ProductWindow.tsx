import Product from "./Product";
import { useState } from "react";

function ProductWindow() {
  let products: String[] = [];

  for (let i = 0; i < 5; i++) {
    products.push(`CLOTHING ${i}`);
  }

  const [selectedProduct, setSelectedProduct] = useState(-1);

  return (
    <>
      {products.length === 0 && <p>No Products Found.</p>}
      <ul>
        {/* Replace the li with Product Component */}
        {products.map((product, productIndex) => (
          <li
            className={
              selectedProduct === productIndex ? "list-item-selected" : ""
            }
            onMouseOver={() => setSelectedProduct(productIndex)}
            onMouseOut={() => setSelectedProduct(-1)}
          >
            {product}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductWindow;
