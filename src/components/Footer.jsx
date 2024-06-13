import { Col, Container, Row } from "react-bootstrap"
import { Facebook, Instagram, Linkedin, TwitterX } from "react-bootstrap-icons"

function Footer(){
    return(
      <Container fluid className="text-center bg-info border-top" style={{boxShadow: "0px -4px 10px 0px rgba(0,0,0,0.05), 0px 3px 20px 0px rgba(0,0,0,0.1)"}}>
          <Row className="mt-5 mb-5">
              <Col>
                  <Linkedin className="mx-2 text-white"/>
                  <Instagram className="mx-2 text-white"/>
                  <TwitterX className="mx-2 text-white"/>
                  <Facebook className="mx-2 text-white"/>
              </Col>
          </Row>
          <div className="pb-3 text-white ">© {new Date().getFullYear()} Energy RM</div>
  </Container>
    )
}
export default Footer