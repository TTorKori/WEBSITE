import './css/App.css'
import Title from './components/Title'
import ProductWindow from './components/ProductWindow'
import products from './assets'

function App() {

  return (
    <div className='app'>
      <Title />
      <ProductWindow products={products}/>
    </div>
  )
}

export default App
