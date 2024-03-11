import "./css/App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Storefront from "./pages/Storefront"
import LoginScreen from "./pages/LoginScreen"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginScreen} />
        <Route path='/store' Component={Storefront} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;