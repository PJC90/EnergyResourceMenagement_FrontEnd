import { Container, Dropdown, Navbar } from "react-bootstrap"
import { Person } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"

function CustomNavbar(){
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin")
    if (!localStorage.getItem("tokenAdmin")) {
      navigate("/");
    } else {
      console.error("Error in removing the token");
    }
  }


return(
    <Navbar fixed="top" className="bg-info " style={{ boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.1), 0px 4px 8px 0px rgba(0,0,0,0.01)" }}>
      <Container>
        <Navbar.Brand href="#home" className="text-white " onClick={()=>{navigate("/")}}>Energy Resource Menagement</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          
          <Dropdown >
            <Dropdown.Toggle variant="white" className="text-white">
              <Person style={{width:'30px', height:'30px'}} className="me-3"/>
              Nome Cognome
              </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>{navigate("/updateUser")}}>Gestione Account</Dropdown.Item>
              <Dropdown.Item>Gestione Azienda</Dropdown.Item>
              <Dropdown.Item>Gestione Dispositivi</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Navbar.Collapse>
      </Container>
    </Navbar>
)
}

export default CustomNavbar