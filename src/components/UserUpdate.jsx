import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import Checkmark from "./utils/Checkmark"

function UserUpdate(){
    const [myprofile, setMyProfile] = useState(null)
    const [editProfileSuccess, setEditProfileSuccess] = useState(false)

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")

    const [image, setImage] = useState(null)
    const [updateImage, setUpdateImage] = useState(false)
    const [updateImageSuccess, setUpdateImageSuccess] = useState(false)

const getMyProfile = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/me`,{
        headers:{Authorization: localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Errore nel ricevere i dettagli dell' user loggato")
        }
    })
    .then((data)=>{
        console.log(data)
        setMyProfile(data)
        setName(data.name || "");
        setSurname(data.surname || "");
        setUsername(data.username || "");
        setEmail(data.email || "");
        setBirthday(data.birthday || "");
    })
    .catch((err)=>{
        console.log(err)
    })
}

const editProfile = () =>{

    const payload = {
        name: name,
        surname: surname,
        username: username,
        email: email,
        password: password,
        birthday: birthday
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/me`,{
        method:"PUT",
        headers:{
            Authorization:localStorage.getItem("tokenAdmin"),
            "Content-Type": "application/json"
                },
        body: JSON.stringify(payload)
    })
    .then((res)=>{
        if(res.ok){
            setEditProfileSuccess(true)
            setTimeout(()=>{
                setEditProfileSuccess(false)
            },3000)
            console.log("Profilo modificato: ")
            console.log( res)
        }else{
            throw new Error("Errore nel modificare i dati")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}
const data = new FormData()
if(image){
    data.append("image", image[0])
}

const uploadImage = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/me/upload`,{
        method:"PATCH",
        headers:{
            Authorization: localStorage.getItem("tokenAdmin"), 
            Accept: "application/json"
        },
        body:data,
    })
    .then((res)=>{
        if(res.ok){
            console.log("Immagine profilo caricata con successo")
            setUpdateImage(false)
            setUpdateImageSuccess(true)
            setTimeout(()=>{
                setUpdateImageSuccess(false)
            },3000)
        }else{
            throw new Error("Errore nel caricare immagine profilo")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

useEffect(()=>{
getMyProfile()
},[updateImageSuccess, editProfileSuccess])

    return(
        <Container>
            <Row className="d-flex justify-content-center">
                <Col xs={6}>
                <div><h4><span className="border-bottom border-5 border-info pb-1">Modifica profilo</span></h4></div>
                <Form onSubmit={(e)=>{e.preventDefault(); editProfile()}} className="mt-5">
                    <Form.Group>
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" placeholder={myprofile && myprofile.name} value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Cognome:</Form.Label>
                        <Form.Control type="text" placeholder={myprofile && myprofile.surname} value={surname} onChange={(e)=>{setSurname(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Nickname:</Form.Label>
                        <Form.Control type="text" placeholder={myprofile && myprofile.username} value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" placeholder={myprofile && myprofile.email} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="text" placeholder="*****" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Data di Nascita: {myprofile && myprofile.birthday}</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={(e)=>{setBirthday(e.target.value)}}/>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                    <Button type="submit" className="mt-3 text-white" variant="info">Modifica</Button>
                    {editProfileSuccess &&
                    <div className="pe-5">
                        <Checkmark/>
                    </div>}
                    </div>
                </Form>
                </Col>
                <Col xs={3}>
                {myprofile && 
                <img src={myprofile.avatar} alt="image-profile" className="w-100 rounded-3" />
                }
                <Form onSubmit={(e)=>{e.preventDefault(); uploadImage(); setUpdateImage(true)}}>
                    <Form.Control type="file" required size="sm"  className="mt-3 custom-file-input" 
                    onChange={(e)=>{setImage(e.target.files)}}/>
                    <div className="d-flex justify-content-center">
                    <Button variant="info text-white" type="submit" className="mt-3 ">
                    {updateImage ? 
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                    : "Upload" }
                    </Button>
                    </div>
                </Form>
                {updateImageSuccess &&
                    <div className="d-flex justify-content-center mt-3">
                        <Checkmark/>
                    </div>}
                </Col>
            </Row>
        </Container>
    )
}
export default UserUpdate