import { Col, Container, Row } from "react-bootstrap"
import { Facebook, Instagram, Linkedin, TwitterX } from "react-bootstrap-icons"

function Footer(){
    return(
      <Container fluid className="bg-info " style={{boxShadow: "0px -4px 10px 0px rgba(0,0,0,0.05), 0px 3px 20px 0px rgba(0,0,0,0.1)"}}>
        <Container>
          <Row className="mt-4 mb-3 pt-2">
              <Col>
          <div className="pb-3 text-white ">© {new Date().getFullYear()} Energy RM - All rights reserved.</div>
              </Col>
              <Col className="d-flex justify-content-end pt-2">
                  <Linkedin className="mx-2 text-white"/>
                  <Instagram className="mx-2 text-white"/>
                  <TwitterX className="mx-2 text-white"/>
                  <Facebook className="mx-2 text-white"/>
              </Col>
          </Row>
          </Container>
  </Container>
    )
}
export default Footer