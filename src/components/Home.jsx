import { Button, Col, Container, Row } from "react-bootstrap"

function Home(){
    return(
        <Container >
            <Row className="d-flex mt-5 ms-lg-5 flex-column flex-lg-row align-items-center mx-2 ">
                <p className="mt-5 fs-3 fw-semibold"><span className="border-bottom border-4 border-info pb-">Energy Resource Menagement</span></p>
                <Col >
            <p className="mt-3 m-xl-0 fw-lighter">Benvenuti in Energy RM!</p>
            <p className="mt-3 m-xl-0 fw-lighter">     
                Energy RM è una piattaforma per monitorare i consumi di elettricità misurati da dispositivi elettronici.
                I Dispositivi forniscono letture indicando consumo energetico e temperatura.
                </p>  
            <p className="mt-3 m-xl-0 fw-lighter">     
                Per accedere alla dashboard, è necessario registrarsi e effettuare il login.
                </p>  
                <p className="mt-3 m-xl-0 fw-lighter">    
                Successivamente, è necessario Registrare un'azienda fittizia e Registrare diversi dispositivi fittizi, per monitorare le letture ricevute.
                È possibile inserire una soglia di allarme e ricevere notifiche direttamente sulla navbar. 
                La soglia di allarme è impostata di default a 3000 kWh, al superamento di essa si riceverà un Alert.
                </p>
                <p className="mt-3 m-xl-0 fw-lighter">
                Per simulare l'invio di letture in tempo reale, è stata implementata una schedulazione che invia una lettura ogni 4 secondi, 
                fino ad un massimo di 20 letture. 
                Questi parametri possono essere modificati nel backend all'interno del servizio ConsumptionReadingService.

                È inoltre possibile modificare il profilo utente e i dati dell'azienda, inclusa l'aggiunta di un'immagine. Per farlo, è necessario 
                fornire nel backend le chiavi di Cloudinary nel file env.properties, vedi env.example
                
            </p>
            <Button variant="outline-info" className=" mt-4">Mostra altro </Button>
                </Col>
                <Col className="mt-5 ms-lg-5 text-center mb-5" style={{backgroundImage: 'url(Line.png)', backgroundSize: 'cover',}}>
                
                <img src="Image (1).png" alt="image-company" />
                    
                </Col>
            </Row>
            
        </Container>
    )
}
export default Home