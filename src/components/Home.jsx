import { Button, Col, Container, Row } from "react-bootstrap"

function Home(){
    return(
        <Container >
            <Row className="d-flex mt-5 ms-lg-5 flex-column flex-lg-row align-items-center mx-2 ">
                <p className="mt-5 fs-3 fw-semibold"><span className="border-bottom border-4 border-info pb-">Energy Resource Menagement</span></p>
                <Col >
            <p className="mt-3 m-xl-0 fw-lighter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod consectetur minus incidunt minima iure repellat 
                officiis eaque delectus eos inventore error tenetur, dolorum repellendus excepturi quas unde aperiam vel.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod consectetur minus incidunt minima iure repellat 
                officiis eaque delectus eos inventore error tenetur, dolorum repellendus excepturi quas unde aperiam vel.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod consectetur minus incidunt minima iure repellat 
                officiis eaque delectus eos inventore error tenetur, dolorum repellendus excepturi quas unde aperiam vel.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod consectetur minus incidunt minima iure repellat 
                officiis eaque delectus eos inventore error tenetur, dolorum repellendus excepturi quas unde aperiam vel.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod consectetur minus incidunt minima iure repellat 
                officiis eaque delectus eos inventore error tenetur, dolorum repellendus excepturi quas unde aperiam vel.
            </p>
            <Button variant="outline-info" className=" mt-4">Mostra altro </Button>
                </Col>
                <Col className="mt-5 ms-lg-5 text-center mb-5" style={{backgroundImage: 'url(Line.png)', backgroundSize: 'cover',}}>
                
                <img src="Image (1).png" alt="image-company" />
                    
                </Col>
            </Row>
            
        </Container>
    )
}
export default Home