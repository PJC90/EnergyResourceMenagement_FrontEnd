import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyCompany } from "../redux/actions";
import { useNavigate } from "react-router-dom";

function Dashboard(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const company = useSelector((state)=>state.company.content)

    

    useEffect(()=>{
        dispatch(getMyCompany())
        console.log("company")
        console.log(company)
    },[])
    
      
    return(
        <Container >
            {!company && 
            <Row className="text-center mt-5">
                <Col className="d-flex flex-column align-items-center ">
                <h3>Nessuna azienda associata a questo utente</h3>
                <p>Registra la tua azienda e installa i dispositivi per vedere le letture</p>
                <Button variant="info" className="text-white" onClick={()=>{navigate("/companyCreation")}}>Crea Azienda</Button>
                </Col>
            </Row>
            }
           {company && 
           <Row>
            <Col xs={2}>
            <img src={company.logo} alt="" className="w-100 rounded-3"/>
            </Col>
            <Col className="d-flex flex-column justify-content-center">
            <p>Azienda: {company.name}</p>
            <p>Indirizzo: {company.address}</p>
            <p>Partita IVA: {company.companyNumber}</p>
            </Col>
            <Col className="d-flex flex-column justify-content-center">
            <p>Dispositivi associati:</p>
            </Col>
           </Row>
           }
        </Container>
    )
}
export default Dashboard