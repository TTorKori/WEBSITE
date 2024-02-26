import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

function ProductCard({children}: Props) {
  const [selectedProduct, setSelectedProduct] = useState(false);

  return (
    <li
      onMouseOver={() => setSelectedProduct(true)}
      onMouseOut={() => setSelectedProduct(false)}
      className={selectedProduct ? "list-item-selected" : ""}
    >
      {children}
    </li>
  );
}

export default ProductCard;
