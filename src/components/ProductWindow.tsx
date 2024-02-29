interface Props {
  product: string;
  onReturn: () => void
}
const ProductWindow = ({ product, onReturn }: Props) => {
  return (
    <>
      <div>This is the Product Window for {product}</div>
      <button type="button" onClick={onReturn}>Back</button>
    </>
  );
};

export default ProductWindow;
