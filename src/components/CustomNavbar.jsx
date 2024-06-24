import { useEffect } from "react"
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {  getMyDevice, getMyProfileAction, resetCompany, resetDevice, resetProfile } from "../redux/actions"


function CustomNavbar(){
  const navigate = useNavigate()
  const token = localStorage.getItem("tokenAdmin")

  const dispatch = useDispatch()
  const profile = useSelector((state)=> state.user.content)
  const allMyDevice = useSelector((state)=>state.device.content)
 

  const deviceInAllarm = allMyDevice && allMyDevice.content && allMyDevice.content.filter((n)=>n.allarmCount > 0)
  

  useEffect(() => {  
    if(token){
      dispatch(getMyProfileAction());
      
      const interval = setInterval(()=>{
        dispatch(getMyDevice())
      },5000)
      
      return () => clearInterval(interval)
    }
  }, [token]);



  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin")
    dispatch(resetCompany())
    dispatch(resetProfile())
    dispatch(resetDevice())
    if (!localStorage.getItem("tokenAdmin")) {
      navigate("/");
    } else {
      console.error("Error in removing the token");
    }
  }


return(
    <Navbar fixed="top" expand="md" className="bg-white" style={{ boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.1), 0px 4px 8px 0px rgba(0,0,0,0.01)" }}>
      <Container fluid className="px-5">
        <Navbar.Brand href="#home"   className="text-info fw-bold fs-5" onClick={()=>{navigate("/")}}>
          <img src="/Logo.svg" alt="logo"  style={{width:"50px"}}/>
          Energy RM
          </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
          {token &&
        <Nav.Link onClick={()=>{navigate("/dashboard")}} className="me-5 text-body-tertiary fw-bold fs-5">Dashboard</Nav.Link>
          }
      {/*--------------------------------------------- LOGO ALLARMI ----------------------------------------------------*/}
      {token && 
      <div className='d-flex justify-content-center align-items-center me-4'>
            <div className='icon-effect'
                            style={{
                              // backgroundColor: "rgba(255, 255, 255)",
                              padding: "5px",
                              borderRadius: "50%", // Imposta il bordo a metà della larghezza e altezza
                              width: "50px", // Imposta la larghezza del cerchio
                              height: "50px", // Imposta l'altezza del cerchio
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor:"pointer",
                              position:"relative"
                            }}
                            onClick={()=>{navigate("/alarmPage");}}
                          >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                </svg>
                {deviceInAllarm && deviceInAllarm.length > 0 ? (
                <div style={{position:"absolute", bottom:"-3px", right:"-3px", width:"20px", height:"20px", fontSize:"0.8em", backgroundColor:"#0DCAF0"}} 
                className=' rounded-pill text-white d-flex justify-content-center align-items-center '>
                  {deviceInAllarm.length}
                  </div>
                 ) : ("")} 
          </div>
        </div>
}
      {/*------------------------------------------------FINE LOGO ALLARMI ----------------------------------------------------*/}
    

          {token && profile ? (
          <Dropdown >
            <Dropdown.Toggle variant="white" className=" d-flex align-items-center">
             <img src={profile && profile.avatar} alt="image-profile" style={{width:'45px', height:'45px', objectFit:"cover"}} className="rounded-pill me-3"/>
              <p className="me-3 m-0 ">{profile && profile.name} {profile && profile.surname} </p>
              </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>{navigate("/updateUser")}}>Gestione Account</Dropdown.Item>
              <Dropdown.Item onClick={()=>{navigate("/updateCompany")}}>Gestione Azienda</Dropdown.Item>
              <Dropdown.Item>Gestione Dispositivi</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          ) : (
            <Button variant="white"
            onClick={()=>{navigate("/login")}}>
              Login
            </Button>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
)
}

export default CustomNavbar