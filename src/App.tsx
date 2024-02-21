import './css/App.css'
import Title from './components/Title'
import ProductWindow from './components/ProductWindow'
import productsFile from "./assets/products.json"

function App() {

  return (
    <div>
      <Title />
      <ProductWindow products={productsFile.products.map(product => product.name)}/>
    </div>
  )
}

export default App
