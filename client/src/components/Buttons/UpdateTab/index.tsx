import { useTabContext } from "../../../contexts/Tab";
import { useWebSocket } from "../../../contexts/WebSocket";
import { HotToastWarning } from "../../Toast";
import { SimpleButtonWrapper } from "../styled";



const UpdateTabButton = () => {
    const { k, fretConfort, model, slideTolerance } = useTabContext()
    const { send, isConnected } = useWebSocket()

    function handleClick() {
        if (!isConnected) {
            HotToastWarning('Sem conexão com o servidor')
            return
        }
        send({ data: null }, {
            k,
            fretConfort,
            model,
            slideTolerance,
        }, 'update')
    }
    return (
        <SimpleButtonWrapper
            onClick={handleClick}>
            <p style={{
                margin: 0,
                padding: 0,
                color: '#ffffff3e',
                fontSize: '1rem',
                fontWeight: 'bold'

            }}>Update</p>
        </SimpleButtonWrapper>
    )
}


export default UpdateTabButton;



