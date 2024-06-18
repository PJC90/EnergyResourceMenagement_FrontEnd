import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Device(){
    const {deviceId} = useParams()
    const [device, setDevice] = useState(null)
    
    const getDevice = async ()=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/device/${deviceId}`,{
                headers: {
                    Authorization: localStorage.getItem("tokenAdmin")
                }
            })
            if(response.ok){
                const data = await response.json()
                setDevice(data)
            }else{
                throw new Error("Errore nel recuperare i dettagli del dispositivo")
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getDevice()
    },[deviceId])

    return(
        <Container>
            {device && device.deviceNumber}
        </Container>
    )
}
export default Device