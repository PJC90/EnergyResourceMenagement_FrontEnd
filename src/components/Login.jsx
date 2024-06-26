import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState(null)
    const navigate = useNavigate();

    const payload = {
        email: email,
        password: password,
    }

    const serverLogin = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`,{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then((err)=>{
                    throw new Error(err.message)
                })
            }
        })
        .then((data)=>{
            localStorage.setItem("tokenAdmin", "Bearer " + data.token)
            navigate("/dashboard")
        })
        .catch((err)=>{
            console.log(err.message)
            setErrorLogin(err.message)
        })
    }

    return(
        <Container >
            <Row className="d-flex justify-content-center mt-5 ">
                <Col className="d-flex flex-column text-center  p-5 mt-5 bg-white rounded-4 shadow-sm" lg={6}>
                <p className="fs-2 text-nowrap">Accedi al tuo <span className="bg-info p-2 px-4 rounded-pill text-white"> Account</span></p>
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

                    <div className="mt-3">{errorLogin && 
                    <Alert variant="info" className="py-1 px-3">{errorLogin}</Alert>
                    }</div>

                    <Button type="submit" className="my-2 w-100 text-white " variant="info">
                        Login
                    </Button>
                </Form>
                <p className="mt-3">Sei nuovo? 
                    <span className="fw-bold ps-2" style={{cursor:"pointer"}} 
                    onClick={()=>{navigate("/registration")}}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} 
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >Registrati</span></p>
                </Col>
            </Row>
        </Container>
    )
}
export default Login