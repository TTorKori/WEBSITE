import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

function ProductCard({children}: Props) {
  const [selectedProduct, setSelectedProduct] = useState(false);

  return (
    <div
      onMouseOver={() => setSelectedProduct(true)}
      onMouseOut={() => setSelectedProduct(false)}
      className={(selectedProduct ? "list-item-selected" : "")+" product-card"} 
    >
      {children}
    </div>
  );
}

export default ProductCard;
