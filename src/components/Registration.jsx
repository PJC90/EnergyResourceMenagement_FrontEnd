import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import Checkmark from "./utils/Checkmark";
import { useNavigate } from "react-router-dom";

function Registration(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [surname, setSurname] = useState("")
    const [username, setUsername] = useState("")
    const [birthday, setBirthday] = useState("")
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const payload = {
        email: email,
        name: name,
        password: password,
        surname: surname,
        username: username,
        birthday: birthday,
    }


    const registerUser = ()=>{
        fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(payload)
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nella registrazione")
            }
        })
        .then((data)=>{
            console.log(data)
            setRegisterSuccess(true)
            setTimeout(()=>{
                setRegisterSuccess(false)
                navigate("/login")
            },3000)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <Container >
            <Row className="d-flex justify-content-center ">
                <Col className="d-flex flex-column " xs={6}>
                <p className="text-body-tertiary text-center m-0 mt-5">Registrati compilando i seguenti campi</p>
                <Form className="mb-5 pb-5"
                onSubmit={(e)=>{
                    e.preventDefault()
                    registerUser()}}
                >
                    <Form.Group className="my-4" onChange={(e)=>{setEmail(e.target.value)}}>
                    <Form.Label>Indirizzo email</Form.Label>
                    <Form.Control type="email" placeholder="sample@mail.it" />
                    </Form.Group>

                    <Form.Group className="my-4" onChange={(e)=>{setName(e.target.value)}}>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Mario"/>
                    </Form.Group>

                    <Form.Group className="my-4" onChange={(e)=>{setSurname(e.target.value)}}>
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" placeholder="Rossi" />
                    </Form.Group>

                    <Form.Group className="my-4" onChange={(e)=>{setUsername(e.target.value)}}>
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control type="text" placeholder="SuperMario77" />
                    </Form.Group>

                    <Form.Group className="my-4" onChange={(e)=>{setBirthday(e.target.value)}}>
                        <Form.Label>Data di nascita</Form.Label>
                        <Form.Control type="date"  />
                    </Form.Group>

                    <Form.Group className="my-4" onChange={(e)=>{setPassword(e.target.value)}}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="*****" />
                    </Form.Group>

                    <Button type="submit" className="my-2 w-100 text-white " variant="info">
                        Registrati
                    </Button>
                    {registerSuccess &&
                    <div className="mb-5 mt-3 d-flex justify-content-center">
                    <Checkmark/>
                    </div>}
                </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default Registration