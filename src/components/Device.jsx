import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Spinner, Table } from "react-bootstrap";
import Chart from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDeviceDetail, getLastConsumptionThreshold } from "../redux/actions";
import Checkmark from "./utils/Checkmark";


function Device(){
    const [consumptionThreshold, setConsumptionThreshold] = useState("")
    const [updateConsumSuccess, setUpdateConsumSuccess] = useState(false)
    const dispatch = useDispatch()
    const {deviceId} = useParams()
    const deviceDetail = useSelector((state)=>state.device.deviceById)
    const lastConsumptionThreshold = useSelector((state)=>state.reading.content)

    const chartData = deviceDetail && deviceDetail.readings ? [
        ["Data", "Consumo kWh", "Soglia di Allarme"],
        ...deviceDetail.readings.map((dev, index) => {
            // Calcolo del valore meno il valore precedente per dev.readingValue per avere il consumo attuale
            const previousValue = index > 0 ? deviceDetail.readings[index - 1].readingValue : 0;
            const consumption = dev.readingValue - previousValue;
            const theshold = dev.consumptionThreshold
            return [formatDate(dev.date) + ' ' + formatTime(dev.date), consumption, theshold];
        })
    ] : [
        ["Data", "Consumo kWh", "Soglia di Allarme"]
    ];

      
       const options = {
        // title: "Grafico Consumi Giornalieri",
        // isStacked: "relative",
        legend: { position: "top" },
        vAxis: { title:"Kwh", minValue: 0 },
        chartArea: { width: "70%", height: "70%" },
        series: {
            0: { color: '#0DCAF0' }, 
            1: { color: 'red' }  
        }
      };

      function getTempAvg() {
        if(deviceDetail && deviceDetail.readings && deviceDetail.readings.length > 0){
            const sum = deviceDetail.readings.reduce((acc, reading)=> acc + reading.temperature, 0)
            const avg = sum / deviceDetail.readings.length
            return avg
        } 
            return 0
      }
      
      const chartData2 = [ 
          ["Label", "Value"],
          ["°C", getTempAvg()],     
      ]
      
     const options2 = {
        // width: 400,
        height: 200,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5,
      };

      function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('it-IT', options);
      }
      function formatTime(timeString){
        const time = new Date(timeString);
        const options = {hour: "2-digit", minute: "2-digit"};
        return time.toLocaleString("it-IT", options)
      }

      const payload = {
        consumptionThreshold: consumptionThreshold,
        deviceId: deviceId
      }

      const updateConsumptionThreshold = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reading/changeThreshold`,{
                method: "POST",
                headers: {Authorization: localStorage.getItem("tokenAdmin"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if(response.ok){
                console.log(response)
                setUpdateConsumSuccess(true)
                setTimeout(()=>{setUpdateConsumSuccess(false)},3000)
            }else{
                throw new Error("Errore nel cambiare la soglia di consumo")
            }

        } catch(err){
            console.log(err)
        }
      }

    useEffect(()=>{
        const interval = setInterval(()=>{
            dispatch(getDeviceDetail(deviceId))
            dispatch(getLastConsumptionThreshold(deviceId))

        },5000)

        return () => clearInterval(interval)
        
    },[ ])

    useEffect(()=>{
            dispatch(getDeviceDetail(deviceId))
            dispatch(getLastConsumptionThreshold(deviceId))
    },[deviceId, updateConsumSuccess, dispatch ])




    return(
        <Container fluid className="px-5">
            {deviceDetail ? (
            <Row>
                <Col xxl={7} >
                    <Row className="mt-4 d-flex flex-column flex-md-row">
                        <Col className="ps-0">
                            <div className="p-2 bg-white rounded-3 shadow-sm">
                                <Form onSubmit={(e)=>{e.preventDefault(); updateConsumptionThreshold()}}
                                    className="d-flex flex-column flex-lg-row mt-3">
                                        <InputGroup className="mx-5" style={{width:"200px"}}>
                                            <Form.Control
                                            type="number" 
                                            onChange={(e)=>{e.preventDefault(); setConsumptionThreshold(e.target.value)}}
                                            />
                                            <InputGroup.Text>kWh</InputGroup.Text>
                                        </InputGroup>
                                       
                                            <Button className="text-white text-nowrap me-5 ms-5 ms-lg-0 mt-3 mt-lg-0" variant="info" type="submit" style={{width:"200px"}}>Imposta nuova soglia</Button>                                       
                                    </Form> 
                                    <div className="d-flex justify-content-between">                  
                                    <div className="d-flex align-items-center flex-column flex-md-row my-4">
                                        <p className="m-0"><span className="fw-bold border-bottom border-3 border-info pb-1 ms-5 text-nowrap">Soglia Attuale di Consumo:</span></p>
                                        <p className="ps-4 mb-0 fs-2 text-nowrap">{lastConsumptionThreshold && lastConsumptionThreshold} <span className="text-body-tertiary">kWh</span></p>
                                        </div>
                                        {updateConsumSuccess &&                               
                                        <div className="pe-5 mt-4">
                                        <Checkmark/>
                                         </div>
                                        }
                                    </div> 
                             </div>
                        </Col>
                        <Col className="ms-0 ms-md-5 mt-3 mt-md-0 py-3 py-md-0 bg-white rounded-3 shadow-sm" >
                            <div className="d-flex h-100 flex-column align-items-center justify-content-evenly ">
                                <p className=" fs-4">Totale Letture: <span className=" fw-bold border-bottom border-3 border-info">{deviceDetail && deviceDetail.readings && deviceDetail.readings.length}</span></p>
                                
                                <Button variant="outline-info" >Mostra dal più recente</Button>
                            </div>
                        </Col>
                    </Row>

                {deviceDetail &&
                <>
                <Row className="mt-3 mb-5  d-flex flex-column  bg-white p-0 rounded-3 shadow-sm">
                <Col className="d-flex flex-row justify-content-around border-bottom bg-info pt-3  text-white rounded-top-4">
                    <Row className="d-flex justify-content-between w-100 flex-nowrap">
                        <Col className="d-none d-md-block">
                    <p >Data</p>
                        </Col>
                        <Col className="d-none d-md-block">
                    <p >Ora</p>
                        </Col>
                        <Col className="">
                    <p >Temp</p>
                        </Col>
                        <Col>
                    <p >Totale</p>
                        </Col>
                        <Col>
                    <p >Consumo</p>
                        </Col>
                        <Col>
                    <p >Soglia</p>
                        </Col>
                        <Col md={1}>
                    <p >Alert</p>
                        </Col>
                    </Row>
                </Col>
                {deviceDetail.readings && deviceDetail.readings.map((dev)=>(
            <Col key={dev.readingId} className="d-flex flex-row justify-content-around border-bottom ">
                <Row className="d-flex justify-content-between w-100 mt-3 flex-nowrap">
                    <Col className="d-none d-md-block">
                    <p >{formatDate(dev.date)}</p>
                    </Col>
                    <Col className="d-none d-md-block">
                    <p >{formatTime(dev.date)}</p>
                    </Col>
                    <Col className="">
                    <p >{dev.temperature}°C</p>
                    </Col>
                    <Col className="">
                    <p >{dev.readingValue} <span className="text-body-tertiary">kWh</span></p>
                    </Col>
                    <Col className="">
                    <p >{dev.consumptionValue} <span className="text-body-tertiary">kWh</span></p>
                    </Col>
                    <Col className="">
                    <p >{dev.consumptionThreshold} <span className="text-body-tertiary">kWh</span></p>
                    </Col>
                    <Col xs={1}>
                    <p >{dev.consumptionValue > dev.consumptionThreshold ? "⚠️" : ""}</p>
                    </Col>
                    
                </Row>
                    
                    </Col>))}
            </Row>
                    
                    </>}
                </Col>

        <Col className="" xxl={5}>
        
                {deviceDetail && 
            <Row className=" mb-4 ms-5 d-flex justify-content-center ">
                <Col className="d-flex flex-column  bg-white rounded-3 shadow-sm p-4 pb-2 mx-3 mt-4 " lg={4}>
                
                    <p><span className="border-bottom border-2 border-info text-body-secondary">Tipo:</span> {deviceDetail.deviceType}</p>
                    <p><span className="border-bottom border-2 border-info text-body-secondary">Matricola:</span> {deviceDetail.deviceNumber}</p>
                    <p><span className="border-bottom border-2 border-info text-body-secondary">Installazione:</span> {deviceDetail.installation} </p>
                    <p><span className="border-bottom border-2 border-info text-body-secondary">Indirizzo impianto:</span> {deviceDetail.plantAddress}</p>
                
                </Col>
                
                {deviceDetail && deviceDetail.readings && deviceDetail.readings.length > 0 &&
                <Col className="d-flex flex-column align-items-center bg-white rounded-3 shadow-sm p-4 pb-2 mx-3 mt-4" lg={4}>
                <p><span className="bg-info px-2 py-1 text-white rounded-3 text-nowrap">Temperatura media:</span></p>
                <Chart
                chartType="Gauge"
                // width="100%"
                // height="400px"
                data={chartData2}
                options={options2}
                />
                </Col>
                }
                
            </Row>
                }
                {deviceDetail && deviceDetail.readings && deviceDetail.readings.length > 0 &&  
            <Row className="w-100">
                    <Col className="ms-5">
                    <p className="text-center"><span className="border-bottom border-2 border-info  fw-bold fs-4">Grafico Consumi Giornalieri</span></p>
                <div className="p-2 bg-white rounded-4 shadow-sm ">
                <Chart
                chartType="LineChart"
                // width="100%"
                height="500px"
                data={chartData}
                options={options}
                />
                </div>
                </Col>
                </Row>}
                
        </Col>
            </Row>  
            ) : (
                <div className="text-center mt-5">
                <Spinner variant="info"/>
                </div>
            )}        
        </Container>
    )
}
export default Device