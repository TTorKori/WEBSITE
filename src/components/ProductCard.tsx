import { ReactNode, useState } from "react";

interface Props {
  productId: string,
  children: ReactNode,
  onClick: (product: string) => void
}

function ProductCard({productId, children, onClick}: Props) {
  const [selectedProduct, setSelectedProduct] = useState(false);


  return (
    <div
      onMouseOver={() => setSelectedProduct(true)}
      onMouseOut={() => setSelectedProduct(false)}
      onClick={() => onClick(productId)}
      className={(selectedProduct ? "list-item-selected" : "")+" product-card"} 
    >
      {children}
    </div>
  );
}

export default ProductCard;
