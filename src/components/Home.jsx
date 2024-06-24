import { Button, Col, Container, Row } from "react-bootstrap"

function Home(){
    return(
        <Container >
            <Row className="d-flex mt-5 ms-lg-5 flex-column flex-lg-row align-items-center">
                <h1 className="mt-5"><span className="border-bottom border-5 border-info pb-">Energy Resource Menagement</span></h1>
                <Col >
            <p className="mt-3 m-xl-0">
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