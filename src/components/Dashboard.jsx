import { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyCompany, getMyDevice } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";




function Dashboard(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const company = useSelector((state)=>state.company.content)
    const allMyDevice = useSelector((state)=>state.device.content)
    const user = useSelector((state)=> state.user.content)

    const filterByType = (type) => {
        return allMyDevice && allMyDevice.content ? allMyDevice.content.filter((d)=>d.deviceType === type) : []
    }

    const domestico = filterByType("DOMESTIC")
    const industriale = filterByType("INDUSTRIAL")
    const commerciale = filterByType("COMMERCIAL")
    const publico = filterByType("PUBLIC")
    
    const chartData = [
        { title: 'One', value: domestico.length, color: 'deepskyblue' },
        { title: 'Two', value: industriale.length, color: 'lightskyblue' },
        { title: 'Three', value: commerciale.length, color: 'cyan' },
        { title: 'Three', value: publico.length, color: 'blue' },
      ]

    useEffect(()=>{
        dispatch(getMyCompany())
        dispatch(getMyDevice())
    },[])
      
    return(
        <Container className="mt-4">
            {!company && 
            <Row className="text-center mt-5">
                <Col className="d-flex flex-column align-items-center ">
                <h3>Nessuna azienda associata a questo utente</h3>
                <p>Registra la tua azienda e installa i dispositivi per vedere le letture</p>
                <Button variant="info" className="text-white" onClick={()=>{navigate("/companyCreation")}}>Crea Azienda</Button>
                </Col>
            </Row>
            }
           {company && 
           (<>
           <Row>
            <Col className="d-flex flex-column justify-content-center">
            <p>Responsabili {company.name}:</p>
            <div className="d-flex">
            <div>
                <img src={user && user.avatar} alt="image-user" className="rounded-2" style={{width:'50px', height:'50px'}}/>
            </div>
            <div className="ms-3">
                <p className="m-0">{user && user.name}</p>
                 <p className="m-0">{user && user.surname}</p>
            </div>     
            </div>   
            </Col>
            <Col>
            <Button variant="dark" className="text-white" onClick={()=>{navigate("/saveNewDevice")}}>Installa Nuovo Dispositivo</Button>
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
            <p>Azienda: {company.name}</p>
            
            
            <img src={company.logo} alt="" className="rounded-2" style={{width:'100px', height:'100px'}}/>
            </Col>
            
           </Row>
           
           <Row className="mt-5">
            <Col className="d-flex me-5 ">
            <Table  bordered hover >
                <thead>
                    <tr>
                    <th >Colore</th>
                    <th>Tipologia Dispositivo</th>
                    <th>Quantità</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td style={{ backgroundColor:"deepskyblue"}}></td>
                    <td>Domestico</td>
                    <td>{domestico.length}</td>
                    </tr>
                    <tr>
                    <td style={{ backgroundColor:"blue"}}></td>
                    <td>Pubblico</td>
                    <td>{publico.length}</td>
                    </tr>
                    <tr>
                    <td style={{ backgroundColor:"lightskyblue"}}></td>
                    <td>Industriale</td>
                    <td>{industriale.length}</td>
                    </tr>
                    <tr>
                    <td style={{ backgroundColor:"cyan"}}></td>
                    <td>Commerciale</td>
                    <td>{commerciale.length}</td>
                    </tr>
                    
                    <tr>
                    <td colSpan={2} className="fw-bold">Totale Dispositivi installati</td>
                    <td className="fw-bold">{allMyDevice && allMyDevice.totalElements}</td>
                    </tr>
                </tbody>
                </Table>
            </Col>
                
           <Col xs={3} className="ms-5">
            <PieChart animationEasing="ease-in" animationDuration={1500} animate={true} 
              lineWidth={50} data={chartData}/>
            </Col>
           </Row>
           
           <Row>
            <Col className=" mt-5 d-flex justify-content-between">   
           <Button variant="info" className="text-white">Mostra altri</Button>
           <Button variant="info" className="text-white">Dal più recente</Button>
           </Col>
           </Row>
           
           <Table striped bordered hover className="my-5">
                <thead>
                    <tr>
                    <th>Matricola</th>
                    <th>Tipologia</th>
                    <th>Installazione</th>
                    <th>Indirizzo</th>
                    <th>Consumo Attuale</th>
                    </tr>
                </thead>
                <tbody>
            { allMyDevice.content && allMyDevice.content.map((dev)=>(
            <tr key={dev.deviceId}>
                    <td>{dev.deviceNumber}</td>
                    <td>{dev.deviceType}</td>
                    <td>{dev.installation}</td>
                    <td>{dev.plantAddress}</td>
                    <td>{dev.readings.length ? dev.readings[dev.readings.length -1].readingValue : 0} kWh</td>
                    <td className="text-info text-center" style={{cursor: "pointer"}} 
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} 
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    onClick={()=>{navigate(`/device/${dev.deviceId}`)}}
                    >Vedi Dettagli</td>
                    </tr>
            ))}
            </tbody>
           </Table>

           </>)}
        </Container>
    )
}
export default Dashboard