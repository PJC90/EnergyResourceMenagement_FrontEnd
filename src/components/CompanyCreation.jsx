import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Checkmark from "./utils/Checkmark";
import { useNavigate } from "react-router-dom";

function CompanyCreation(){
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [companyNumber, setCompanyNumber] = useState("")
    const [createCompanySuccess, setCreateCompanySuccess] = useState(false)
    
    const payload = {
        name: name,
        address: address,
        companyNumber: companyNumber
    }

    const createCompany = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/company`,{
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("tokenAdmin"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel creare Azienda")
            }
        })
        .then((data)=>{
            console.log(data)
            setCreateCompanySuccess(true)
            setTimeout(()=>{
                setCreateCompanySuccess(false)
                navigate("/dashboard")
            },3000)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return(
        <Container>
            <Row className="d-flex justify-content-center mt-5">
                <Col xs={6}>
                <div><h4><span className="border-bottom border-5 border-info pb-1">Crea Azienda</span></h4></div>
                <Form onSubmit={(e)=>{e.preventDefault(); createCompany()}} className="mt-5">
                    <Form.Group>
                        <Form.Label>Nome Azienda</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Inserisci il nome dell'azienda" 
                        value={name} 
                        onChange={(e)=>{setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Indirizzo</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Indirizzo massimo 60 caratteri" 
                        value={address} 
                        onChange={(e)=>{setAddress(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Partita IVA</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Inserisci la partita IVA" 
                        value={companyNumber} 
                        onChange={(e)=>{setCompanyNumber(e.target.value)}}/>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                    <Button type="submit" className="mt-3 text-white" variant="info">Conferma</Button>
                    {createCompanySuccess &&
                    <div className="pe-5">
                        <Checkmark/>
                    </div>}
                    </div>
                </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CompanyCreation