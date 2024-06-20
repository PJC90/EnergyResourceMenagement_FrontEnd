import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import Registration from './components/Registration'
import UserUpdate from './components/UserUpdate'
import Dashboard from './components/Dashboard'
import CompanyCreation from './components/CompanyCreation'
import CompanyUpdate from './components/CompanyUpdate'
import Device from './components/Device'
import DeviceInstallation from './components/DeviceInstallation'

function App() {
  return (
        <BrowserRouter>
        <div className="d-flex flex-column " style={{minHeight:"100vh"}} >
        <div className='mb-5'>
        <CustomNavbar/>
        </div>
        <div className="flex-grow-1 pt-5">
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/updateUser' element={<UserUpdate/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/device/:deviceId' element={<Device/>}/>
          <Route path="/companyCreation" element={<CompanyCreation/>}/>
          <Route path="/updateCompany" element={<CompanyUpdate/>}/>
          <Route path="/saveNewDevice" element={<DeviceInstallation/>}/>
        </Routes>
        </div>
        <Footer/>  
        </div>
        </BrowserRouter>
  )
}

export default App
