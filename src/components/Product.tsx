import { useState } from "react";

interface Props {
  name: String;
}

function Product({ name}: Props) {
  const [selectedProduct, setSelectedProduct] = useState(false);

  return (
    <li
      onMouseOver={() => setSelectedProduct(true)}
      onMouseOut={() => setSelectedProduct(false)}
      className={selectedProduct ? "list-item-selected" : ""}
    >
      PRODUCT {name}
    </li>
  );
}

export default Product;
