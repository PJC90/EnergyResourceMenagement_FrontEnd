import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyCompany } from "../redux/actions";
import Checkmark from "./utils/Checkmark";
import { useNavigate } from "react-router-dom";

function CompanyUpdate(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const company = useSelector((state)=>state.company.content)

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [companyNumber, setCompanyNumber] = useState("")

    const [logo, setLogo] = useState(null)

    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [updateImage, setUpdateImage] = useState(false)
    const [updateImageSuccess, setUpdateImageSuccess] = useState(false)


    const payload = {
        name:name,
        address:address,
        companyNumber:companyNumber,
    }

    const updateCompany = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/company`,{
                method:"PUT",
                headers:{
                    Authorization:localStorage.getItem("tokenAdmin"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if(response.ok){
                    console.log(response)
                    dispatch(getMyCompany())
                    setUpdateSuccess(true)
                    setTimeout(()=>{
                        setUpdateSuccess(false)
                    },3000)
                }else{
                    throw new Error("Errore nel modificare azienda")
                }
        }catch(err){
            console.log(err)
        }
    }

    const data = new FormData()
    if (logo){
        data.append("logo", logo[0])
    }
    const uploadLogo = async ()=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/company/upload`,{
                method:"PATCH",
                headers:{
                    Authorization:localStorage.getItem("tokenAdmin"),
                    Accept: "application/json"
                },
                body: data
            })
            if(response.ok){
                console.log(response)
                setUpdateImage(false)
                setUpdateImageSuccess(true)
                setTimeout(()=>{setUpdateImageSuccess(false)},3000)
            }else{
                throw new Error("Errore nel caricare il logo dell'azienda")
            }
        }catch(err){
            console.log(err)
        }
    }
    

    useEffect(()=>{
        dispatch(getMyCompany())
    },[updateImageSuccess])

    useEffect(()=>{
        if(company){
            setName(company.name || "")
            setAddress(company.address || "")
            setCompanyNumber(company.companyNumber || "")
        }
    },[company])

    useEffect(()=>{
        if(!company){
            navigate("/dashboard")
        }
    },[])

    return(
        <Container>
            <Row className="d-flex justify-content-center mt-5 ms-3 ms-md-0">
                <Col lg={6}>
                <div><h4><span className="border-bottom border-5 border-info pb-1">Modifica Azienda</span></h4></div>
                <Form onSubmit={(e)=>{e.preventDefault(); updateCompany()}} className="mt-5">
                    <Form.Group>
                        <Form.Label>Nome Azienda</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={company && name} 
                        onChange={(e)=>{setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Indirizzo</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={company && address} 
                        onChange={(e)=>{setAddress(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Partita IVA</Form.Label>
                        <Form.Control 
                        type="text"  
                        value={company && companyNumber} 
                        onChange={(e)=>{setCompanyNumber(e.target.value)}}/>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                    <Button type="submit" className="mt-3 text-white" variant="info">Conferma</Button>
                    {updateSuccess &&
                    <div className="pe-5">
                        <Checkmark/>
                    </div>}
                    </div>
                </Form>
                </Col>
                <Col  lg={3} className="mt-5 mb-5 mb-lg-0">
                {company &&
                <img src={company.logo} style={{width:"300px", height:"300px", objectFit:"cover"}}
                alt="image-company" className="rounded-3"/>
                }
                <Form onSubmit={(e)=>{e.preventDefault(); uploadLogo(); setUpdateImage(true)}} style={{width:"300px"}}>
                    <Form.Group>
                        <Form.Control 
                        type="file" required size="sm"  className="mt-3 custom-file-input"
                        onChange={(e)=>{setLogo(e.target.files)}}/>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                    <Button variant="info text-white" type="submit" className="mt-3 ">
                    {updateImage ? 
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                    : "Upload" }
                    </Button>
                    </div>
                    {updateImageSuccess &&
                    <div className="d-flex justify-content-center mt-3">
                        <Checkmark/>
                    </div>}
                </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default CompanyUpdate