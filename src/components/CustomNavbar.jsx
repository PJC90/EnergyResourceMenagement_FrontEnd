import { useEffect } from "react"
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMyProfileAction, resetCompany, resetProfile } from "../redux/actions"

function CustomNavbar(){
  const navigate = useNavigate()
  const token = localStorage.getItem("tokenAdmin")

  const dispatch = useDispatch()
  const profile = useSelector((state)=> state.user.content)

  useEffect(() => {  
      dispatch(getMyProfileAction());
      // aggiungendo token come dipendenza aggiorni lo stato di redux e quindi permetti di mostrare l'utente corretto
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin")
    dispatch(resetCompany())
    dispatch(resetProfile())
    if (!localStorage.getItem("tokenAdmin")) {
      navigate("/");
    } else {
      console.error("Error in removing the token");
    }
  }


return(
    <Navbar fixed="top" className="bg-info " style={{ boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.1), 0px 4px 8px 0px rgba(0,0,0,0.01)", height:'70px' }}>
      <Container>
        <Navbar.Brand href="#home" className="text-white " onClick={()=>{navigate("/")}}>Energy Resource Menagement</Navbar.Brand>
        <Nav.Link onClick={()=>{navigate("/dashboard")}}>Dashboard</Nav.Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {token ? (
          <Dropdown >
            <Dropdown.Toggle variant="white" className="text-white d-flex align-items-center">
             <img src={profile && profile.avatar} alt="image-profile" style={{width:'45px', height:'45px', objectFit:"cover"}} className="rounded-pill me-3 border border-3"/>
              <p className="me-3 m-0">{profile && profile.name} {profile && profile.surname} </p>
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
            <Button variant="white" className="text-white"
            onClick={()=>{navigate("/login")}}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
)
}

export default CustomNavbar