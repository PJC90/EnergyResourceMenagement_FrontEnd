
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ArrowRight, ArrowRightCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyCompany, getMyDevice } from "../redux/actions";


function AlarmPage(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    const allMyDevice = useSelector((state)=>state.device.content)
    const deviceInAllarm = allMyDevice && allMyDevice.content && allMyDevice.content.filter((n)=>n.allarmCount > 0)
    const company = useSelector((state)=>state.company.content)

    useEffect(()=>{
        dispatch(getMyCompany())
        dispatch(getMyDevice())
    },[])
    
    return (
        <Container>
            <Row className="text-center d-flex justify-content-center mx-2 mx-md-0 mt-5">
        {!company &&
                <Col className="d-flex flex-column align-items-center  mt-5 bg-white p-5 rounded-4 shadow-sm" md={8} lg={4}>
                <h3 className="bg-info text-body-tertiary  bg-opacity-25 p-3 rounded-2">Nessuna azienda associata a questo utente</h3>
                <p className="mt-3">Registra la tua azienda </p>
                <p >Installa i dispositivi</p>
                <p className="mb-5">Monitora letture</p>
                <div className="d-flex w-100">
                <Button variant="info" className="text-white w-100" onClick={()=>{navigate("/companyCreation")}}>Crea Azienda</Button>
                </div>
                </Col>
                }
        </Row>
            {allMyDevice && allMyDevice.content.length > 0 && (
                <>
                <p className="mt-4 text-black text-opacity-50 text-center mb-0 fs-5"><span className="text-danger">{deviceInAllarm.length}</span> Dispositivi con Allarmi superamento Soglia di Consumo</p>
           
           <Row className="mt-3 mb-5 mx-2 mx-md-0 d-flex flex-column  bg-white p-0 rounded-3 shadow-sm">
                <Col className="d-flex flex-row justify-content-around border-bottom bg-info pt-3 px-3 text-white rounded-top-4">
                    <Row className="d-flex justify-content-between w-100 flex-nowrap">
                        <Col>
                    <p >Matricola</p>
                        </Col>
                        <Col className="d-none d-md-block">
                    <p >N° Letture</p>
                        </Col>
                        <Col className="">
                    <p >N° Allarmi</p>
                        </Col>
                        <Col>
                    <p >Dettagli</p>
                        </Col>
                    </Row>
                </Col>
                {deviceInAllarm && deviceInAllarm.length > 0 ? ( deviceInAllarm.map((d)=>(
            <Col key={d.deviceId} className="d-flex flex-row justify-content-around border-bottom ">
                <Row className="d-flex justify-content-between w-100 mt-3 flex-nowrap">
                    <Col>
                    <p >{ d.deviceNumber}</p>
                    </Col>
                    <Col className="d-none d-md-block">
                    <p >{ d.readings.length}</p>
                    </Col>
                    <Col className="">
                    <p >{ d.readings.filter((r)=>r.allarmConsumption === true).length}</p>
                    </Col>
                    <Col className="">
                    <p className="text-info"><ArrowRightCircleFill onClick={()=>{navigate(`/device/${d.deviceId}`)}} style={{cursor:"pointer"}}/></p>
                    </Col>
                </Row>
                    
                    </Col>))) : ( 
                        <Row className="text-center">
                            <Col><p className="mt-4 text-black text-opacity-25">Non ci sono allarmi</p></Col>
                        </Row>    
                    )}
            </Row>

    </>
    )}
    {company && allMyDevice && allMyDevice.content.length < 1 && (
        <Row className="text-center d-flex justify-content-center mx-2 mx-md-0 mt-5">
    
                <Col className="d-flex flex-column align-items-center  mt-5 bg-white p-5 rounded-4 shadow">
                <h3 className="w-100 bg-info text-body-tertiary  bg-opacity-25 p-3 rounded-2">Nessun dispositivo associato a questo utente</h3>
                <p className="mt-3">Installa i dispositivi <span className="mx-3"><ArrowRight/></span> monitora letture</p>
                </Col>
                
        </Row>
    )} 
        </Container>
    )
}
export default AlarmPage