import { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyCompany, getMyDevice } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import { ArrowRightCircleFill, LightningChargeFill } from "react-bootstrap-icons";




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
      
    console.log(allMyDevice)
    return(
        <Container className="mt-4" >
            {!company && 
            <Row className="text-center d-flex justify-content-center mx-2 mx-md-0 mt-5">
                <Col className="d-flex flex-column align-items-center  mt-5 bg-white p-5 rounded-4 shadow-sm" md={8} lg={4}>
                <h3 className="bg-info text-body-tertiary  bg-opacity-25 p-3 rounded-2">Nessuna azienda associata a questo utente</h3>
                <p className="mt-3">Registra la tua azienda </p>
                <p >Installa i dispositivi</p>
                <p className="mb-5">Monitora letture</p>
                <div className="d-flex w-100">
                <Button variant="info" className="text-white w-100" onClick={()=>{navigate("/companyCreation")}}>Crea Azienda</Button>
                </div>
                </Col>
            </Row>
            }
           {company && 
           (<>
           <Row>
            <Col className="d-flex  justify-content-around bg-white py-3 me-3 rounded-3 shadow-sm">
            <div className="">
            <p><span className="border-bottom border-3 fw-bold border-info">Responsabili {company.name}:</span></p>
            <div className="d-flex">
            <div>
                <img src={user && user.avatar} alt="image-user" className="rounded-pill" style={{width:'50px', height:'50px', objectFit:"cover"}}/>
            </div>
            <div className="ms-3">
                <p className="m-0">{user && user.name}</p>
                 <p className="m-0">{user && user.surname}</p>
            </div>     
            </div>  
            </div> 
            <div className="d-flex align-items-center">
            <Button variant="info" className="text-white" onClick={()=>{navigate("/saveNewDevice")}}>Installa Nuovo Dispositivo</Button>
            </div>
            </Col>
           
            <Col className="bg-white d-flex align-items-center justify-content-around py-3 ms-3 rounded-3 shadow-sm">
            <div >
            <p className="m-0"><span className="border-bottom border-3 fw-bold border-info">Azienda:</span></p>
            <p className="fs-3 m-0">{company.name}</p>
            </div>
            
            <img src={company.logo} alt="company-logo" className="rounded-2" style={{width:'100px', height:'100px', objectFit:"cover"}}/>
            </Col>
            
           </Row>
           
           <Row className="mt-5 bg-white p-3 rounded-3 shadow-sm ">

           <Col xs={3} className="me-5 d-none d-md-block">
            <PieChart animationEasing="ease-in" animationDuration={1500} animate={true} 
              lineWidth={25} data={chartData}/>
            </Col>

            <Col className="d-flex me-5 d-none d-md-block">
            <Row className="d-flex flex-column w-100">
                <Col className="d-flex flex-row justify-content-between mb-2 border-bottom align-items-center">
                <p style={{ width:"200px"}}>Colore</p>
                <p style={{ width:"150px"}} className="ms-4 ms-md-0">Tipologia Dispositivo</p>
                <p style={{ width:"80px"}}>Quantità</p>
                </Col>
                <Col className="d-flex flex-row justify-content-between mb-2 border-bottom align-items-center">
                <p style={{ backgroundColor:"deepskyblue", width:"200px", height:"50px"}} className="p-0 m-0 mb-2 rounded-3"></p>
                <p style={{ width:"150px"}} className="ms-4 ms-md-0">Domestico</p>
                <p style={{ width:"80px"}} className="text-center">{domestico.length}</p>
                </Col>
                <Col className="d-flex flex-row justify-content-between mb-2 border-bottom align-items-center">
                <p style={{ backgroundColor:"blue", width:"200px", height:"50px"}} className="p-0 m-0 mb-2 rounded-3"></p>
                <p style={{ width:"150px"}} className="ms-4 ms-md-0">Pubblico</p>
                <p style={{ width:"80px"}} className="text-center">{publico.length}</p>
                </Col>
                <Col className="d-flex flex-row justify-content-between mb-2 border-bottom align-items-center">
                <p style={{ backgroundColor:"lightskyblue", width:"200px", height:"50px"}} className="p-0 m-0 mb-2 rounded-3"></p>
                <p style={{ width:"150px"}} className="ms-4 ms-md-0">Industriale</p>
                <p style={{ width:"80px"}} className="text-center">{industriale.length}</p>
                </Col>
                <Col className="d-flex flex-row justify-content-between mb-2 border-bottom align-items-center">
                <p style={{ backgroundColor:"cyan", width:"200px", height:"50px"}} className="p-0 m-0 mb-2 rounded-3"></p>
                <p style={{ width:"150px"}} className="ms-4 ms-md-0">Commerciale</p>
                <p style={{ width:"80px"}} className="text-center">{commerciale.length}</p>
                </Col>            
            </Row>
            
            </Col>

            <Col xs={2} >
            <p className="fw-bold">Totale Dispositivi installati:</p>
            <p className="fw-bold fs-1">{allMyDevice && allMyDevice.totalElements}</p>
            <LightningChargeFill style={{color:"#0DCAF020", height:"150px", width:"150px"}}/>
            </Col>
                
           </Row>

           <p className="mt-4 text-black text-opacity-25 text-center mb-0">Elenco dispositivi:</p>
           
           <Row className="mt-3 mb-5 d-flex flex-column  bg-white p-0 rounded-3 shadow-sm">
            <Col className="d-flex flex-row justify-content-around border-bottom bg-info pt-3 px-3 text-white rounded-top-4">
                <Row className="d-flex justify-content-between w-100 ">
                    <Col>
                <p >Matricola</p>
                    </Col>
                    <Col className="d-none d-md-block">
                <p >Tipologia</p>
                    </Col>
                    <Col className="d-none d-md-block">
                <p >Data Installazione</p>
                    </Col>
                    <Col className="d-none d-md-block">
                <p >Consumo Attuale</p>
                    </Col>
                    <Col>
                <p >Dettagli</p>
                    </Col>
                </Row>
            
            </Col>
            {allMyDevice && allMyDevice.content && allMyDevice.content.map((dev)=>(
            <Col key={dev.deviceId} className="d-flex flex-row justify-content-around border-bottom ">
                <Row className="d-flex justify-content-between w-100 mt-3">
                    <Col>
                    <p >{dev.deviceNumber}</p>
                    </Col>
                    <Col className="d-none d-md-block">
                    <p >{dev.deviceType}</p>
                    </Col>
                    <Col className="d-none d-md-block">
                    <p >{dev.installation}</p>
                    </Col>
                    <Col className="d-none d-md-block">
                    <p >{dev.readings.length ? dev.readings[dev.readings.length -1].readingValue : 0} kWh</p>
                    </Col>
                    <Col>
                    <p className="text-info ms-4" style={{cursor: "pointer"}} 
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} 
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    onClick={()=>{navigate(`/device/${dev.deviceId}`)}}
                    > <ArrowRightCircleFill/></p>
                    </Col>
                </Row>
                    
                    </Col>
            ))}
           </Row>


           </>)}
        </Container>
    )
}
export default Dashboard