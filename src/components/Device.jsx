import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import Chart from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDeviceDetail, getLastConsumptionThreshold } from "../redux/actions";


function Device(){
    const [consumptionThreshold, setConsumptionThreshold] = useState("")
    const dispatch = useDispatch()
    const {deviceId} = useParams()
    const deviceDetail = useSelector((state)=>state.device.deviceById)
    const lastConsumptionThreshold = useSelector((state)=>state.reading.content)

    const chartData = deviceDetail && deviceDetail.readings ? [
        ["Data", "Consumo kWh", "Soglia consumo"],
        ...deviceDetail.readings.map((dev, index) => {
            // Calcolo del valore meno il valore precedente per dev.readingValue per avere il consumo attuale
            const previousValue = index > 0 ? deviceDetail.readings[index - 1].readingValue : 0;
            const consumption = dev.readingValue - previousValue;
            const theshold = dev.consumptionThreshold
            return [formatDate(dev.date) + ' ' + formatTime(dev.date), consumption, theshold];
        })
    ] : [
        ["Data", "Consumo kWh", "Soglia consumo"]
    ];

      
       const options = {
        title: "Grafico Consumi Giornalieri",
        vAxis: { title:"Kwh", minValue: 0 },
        chartArea: { width: "70%", height: "70%" },
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
        // height: 120,
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
            }else{
                throw new Error("Errore nel cambiare la soglia di consumo")
            }

        } catch(err){
            console.log(err)
        }
      }

    useEffect(()=>{
        dispatch(getDeviceDetail(deviceId))
        dispatch(getLastConsumptionThreshold(deviceId))
    },[ ])


    return(
        <Container fluid className="px-5">
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <div className="p-2 bg-white rounded-3">
                                <Form onSubmit={(e)=>{e.preventDefault(); updateConsumptionThreshold()}}
                                    className="d-flex mt-3">
                                        <InputGroup className="mx-5">
                                            <Form.Control
                                            type="number" 
                                            onChange={(e)=>{e.preventDefault(); setConsumptionThreshold(e.target.value)}}
                                            />
                                            <InputGroup.Text>kWh</InputGroup.Text>
                                        </InputGroup>
                                       
                                            <Button className="text-white text-nowrap me-5" variant="info" type="submit">Imposta nuova soglia</Button>                                       
                                    </Form>                    
                               <div className="d-flex align-items-center justify-content-center mt-2">
                                <p className="m-0"><span className="fw-bold border-bottom border-3 border-info pb-1">Soglia Attuale di Consumo:</span></p>
                                <p className="ps-4 mb-0 fs-2">{lastConsumptionThreshold}</p>
                                </div>
                             </div>
                        </Col>
                        <Col className="ms-5 bg-white rounded-3" xs={4}>
                            <div className="d-flex h-100 flex-column align-items-center justify-content-evenly">
                                <h3>Totale Letture: {deviceDetail && deviceDetail.readings && deviceDetail.readings.length}</h3>
                                
                                <Button variant="outline-info" >Mostra dal più recente</Button>
                            </div>
                        </Col>
                    </Row>

                {deviceDetail &&
                    <Table striped bordered hover className="my-5 mt-3 text-center">
                           <thead>
                                <tr>
                                <th>Data</th>
                                <th>Ora</th>
                                <th>Totale Consumo</th>
                                <th>Consumo</th>
                                <th>Superamento Soglia</th>
                                <th>Temperatura</th>
                                </tr>
                            </thead>
                             <tbody>
                                { deviceDetail.readings && deviceDetail.readings.map((dev)=>(
                                <tr key={dev.readingId}>
                                        <td>{formatDate(dev.date)}</td>
                                        <td>{formatTime(dev.date)}</td>
                                        <td>{dev.readingValue} <span className="text-body-tertiary">kWh</span></td>
                                        <td>{dev.consumptionValue} <span className="text-body-tertiary">kWh</span></td>
                                        <td>{dev.consumptionValue > dev.consumptionThreshold ? "⚠️" : "✅"}</td>
                                        <td>{dev.temperature}°C</td>
                                        </tr>
                                ))}
                                </tbody>
                    </Table>}
                </Col>

                <Col>
                {deviceDetail && 
            <Row className="mt-5">
                <Col>
                <div className="d-flex flex-column justify-content-center">
                    <h3>Tipologia dispositivo: {deviceDetail.deviceType}</h3>
                    <h4>Matricola: {deviceDetail.deviceNumber}</h4>
                    <p>Data Installazione: {deviceDetail.installation} </p>
                    <p>Indirizzo impianto: {deviceDetail.plantAddress}</p>
                </div>
                </Col>
                
                {deviceDetail && deviceDetail.readings && deviceDetail.readings.length > 0 &&
                <Col>
                <p>Temperatura media:</p>
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
            <Chart
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={chartData}
            options={options}
            />
                }
                </Col>
            </Row>          
        </Container>
    )
}
export default Device