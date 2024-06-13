import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const bodyToUse = {
        email: email,
        password: password,
    }

    const serverLogin = () => {
        fetch("http://localhost:3010/auth/login",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(bodyToUse)
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel login")
            }
        })
        .then((data)=>{
            localStorage.setItem("tokenAdmin", "Bearer " + data.token)
            navigate("/home")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <Container >
            <Row className="d-flex justify-content-center mt-5">
                <Col className="d-flex flex-column text-center mt-5" xs={6}>
                <p className="fs-2">Accedi al tuo <span className="bg-info p-2 px-4 rounded-pill text-white"> Account</span></p>
                <p className="text-body-tertiary">Inserisci le tue credenziali</p>
                <Form 
                onSubmit={(e)=>{
                    e.preventDefault()
                    serverLogin()}}
                >
                    <Form.Group 
                    className="my-4"
                    controlId="formBasicEmail"
                    onChange={(e)=>{setEmail(e.target.value)}}
                    >
                    <Form.Control type="email" placeholder="Indirizzo Email" />
                    </Form.Group>
                    <Form.Group 
                    className="my-4"
                    controlId="formBasicPassword"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    >
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-4">
                        <p className="text-body-tertiary" >Password dimenticata?</p>
                        </div>
                    <Button type="submit" className="my-2 w-100 text-white " variant="info">
                        Login
                    </Button>
                </Form>
                <p className="mt-3">Sei nuovo? <span className="fw-bold" style={{cursor:"pointer"}}> Registrati</span></p>
                </Col>
            </Row>
        </Container>
    )
}
export default Login