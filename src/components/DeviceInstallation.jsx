import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import Checkmark from "./utils/Checkmark";
import { useNavigate } from "react-router-dom";

function DeviceInstallation(){
    const navigate = useNavigate()
    const [deviceNumber, setDeviceNumber] = useState("")
    const [deviceType, setDeviceType] = useState("")
    const [plantAddress, setPlantAddress] = useState("")
    const [updateSuccess, setUpdateSuccess] = useState(false)

    const payload = {
        deviceNumber: deviceNumber,
        deviceType: deviceType,
        plantAddress: plantAddress,
    }

    const saveNewDevice = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/device`,{
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("tokenAdmin"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if(response.ok){
                setUpdateSuccess(true)
                setTimeout(()=>{
                    setUpdateSuccess(false)
                    navigate("/dashboard")
                },3000)
                return response.json()
            }else{
                    let errorMessage = `Errore HTTP ${response.status}: ${response.statusText}`;
                    try {
                        const errorResponse = await response.json();
                        if (errorResponse.message) {
                            errorMessage = errorResponse.message;
                        }
                    } catch (parseError) {
                        console.log("Impossibile analizzare la risposta JSON dell'errore:", parseError);
                    }
                    throw new Error(errorMessage);
                    }
        }catch(err){
            console.log(err)
        }
    }

    return(
        <Container>
            <Row className="d-flex justify-content-center ">
                <Col xs={6} className="mt-5">
                <div><h4><span className="border-bottom border-4 border-info pb-1">Installa un nuovo dispositivo</span></h4></div>
                <Form onSubmit={(e)=>{e.preventDefault(); saveNewDevice()}}>
                    <Form.Group>
                        <Form.Label className="mt-4">Matricola</Form.Label>
                        <Form.Control value={deviceNumber} onChange={(e)=>{setDeviceNumber(e.target.value)}} placeholder="Inserisci il codice univoco del dispositivo" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-4">Indirizzo</Form.Label>
                        <Form.Control value={plantAddress} onChange={(e)=>{setPlantAddress(e.target.value)}} placeholder="Inserisci l'indirizzo dell'impianto"/>
                    </Form.Group>
                    <Form.Group >
                            <Form.Label className="mt-4">Tipologia Dispositivo</Form.Label>
                            <DropdownButton 
                            as={ButtonGroup}
                            align={{ lg: 'end' }}
                            title={deviceType ? deviceType : "Seleziona"}    
                            className="w-100 mt-2 bg-white"     
                            variant="outline-info"
                            onSelect={(eventKey)=>setDeviceType(eventKey)}           
                            >
                            <Dropdown.Item eventKey="DOMESTIC">Domestico</Dropdown.Item>
                            <Dropdown.Item eventKey="INDUSTRIAL">Industriale</Dropdown.Item>
                            <Dropdown.Item eventKey="COMMERCIAL">Commerciale</Dropdown.Item>
                            <Dropdown.Item eventKey="PUBLIC">Pubblico</Dropdown.Item>
                            </DropdownButton>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                    <Button type="submit" className="mt-2 text-white" variant="info">Conferma</Button>
                    {updateSuccess &&
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
export default DeviceInstallation