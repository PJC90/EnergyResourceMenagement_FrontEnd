
import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AlarmPage(){
    const navigate = useNavigate()

   
    const allMyDevice = useSelector((state)=>state.device.content)
    const deviceInAllarm = allMyDevice && allMyDevice.content && allMyDevice.content.filter((n)=>n.allarmCount > 0)

    return (
        <Container>
            <Row className="d-flex flex-column justify-content-center" >
            <h4>Dispositivi con Allarmi superamento Soglia di Consumo</h4>
                <Col className=" mt-5 bg-white p-4" >
                <Row className="">
                <Col>Matricola</Col>
                <Col>N° Letture</Col>
                <Col>N° Allarmi</Col>
                <Col>Vedi dettagli</Col>
                </Row>
            {deviceInAllarm && deviceInAllarm.length > 0 ? ( deviceInAllarm.map((d)=>(
                <Row className="ms-1 mt-3" key={d.deviceId}>
                <Col>{ d.deviceNumber}</Col>
                <Col>{ d.readings.length}</Col>
                <Col>{ d.readings.filter((r)=>r.allarmConsumption === true).length}</Col>
                <Col><ArrowRightCircleFill onClick={()=>{navigate(`/device/${d.deviceId}`)}} style={{cursor:"pointer"}}/></Col>
                </Row>
        ))) : ( "Non ci sono Allarmi")}
    </Col>
    </Row>
        </Container>
    )
}
export default AlarmPage