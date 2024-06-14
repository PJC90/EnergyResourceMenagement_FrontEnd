import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import Registration from './components/Registration'

function App() {
  return (
        <BrowserRouter>
        <div className="d-flex flex-column " style={{minHeight:"100vh"}} >
        <div className='mb-5'>
        <CustomNavbar/>
        </div>
        <div className="flex-grow-1 pt-5">
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
        </div>
        <Footer/>  
        </div>
        </BrowserRouter>
  )
}

export default App
