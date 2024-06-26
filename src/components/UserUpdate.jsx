import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import Checkmark from "./utils/Checkmark"
import { useDispatch, useSelector } from "react-redux"
import { getMyProfileAction } from "../redux/actions"

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

    const dispatch = useDispatch()

    const profile = useSelector((state)=> state.user.content)

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
            dispatch(getMyProfileAction()) //aggiorna lo stato in redux
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
            dispatch(getMyProfileAction()) //aggiorna lo stato in redux
        }else{
            throw new Error("Errore nel caricare immagine profilo")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

useEffect(()=>{
    if(profile){
        setMyProfile(profile)
        setName(profile.name || "");
        setSurname(profile.surname || "");
        setUsername(profile.username || "");
        setEmail(profile.email || "");
        setBirthday(profile.birthday || "");
    }
},[profile])

    return(
        <Container>
            <Row className="d-flex  flex-column flex-md-row justify-content-center mt-5 mb-5 mb-lg-0">
                <Col lg={6}>
                <div><h4><span className="border-bottom border-5 border-info pb-1">Modifica profilo</span></h4></div>
                <Form onSubmit={(e)=>{e.preventDefault(); editProfile()}} className="mt-5">
                    <Form.Group>
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text"  value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Cognome:</Form.Label>
                        <Form.Control type="text"  value={surname} onChange={(e)=>{setSurname(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Nickname:</Form.Label>
                        <Form.Control type="text"  value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
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
                <Col lg={3} className="mt-5 mt-lg-0">
                {myprofile && 
                <img src={myprofile.avatar} alt="image-profile" className="rounded-3" style={{width:"300px", height:"300px", objectFit:"cover"}}/>
                }
                <Form onSubmit={(e)=>{e.preventDefault(); uploadImage(); setUpdateImage(true)}} style={{width:"300px"}}>
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