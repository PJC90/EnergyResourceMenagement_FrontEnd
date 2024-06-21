import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function AlarmPage(){
    const deviceInAlarm = useSelector((state)=>state.device.alertReadings)

    console.log(deviceInAlarm)

    return (
        <Container>

        </Container>
    )
}
export default AlarmPage