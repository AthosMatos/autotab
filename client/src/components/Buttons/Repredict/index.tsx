import styled from "styled-components";
import { useTabContext } from "../../../contexts/Tab";
import { useWebSocket } from "../../../contexts/WebSocket";
import { SimpleButtonWrapper } from "../styled";
import { HotToastWarning } from "../../Toast";




const RepredictTabButton = () => {
    const { k, model, slideTolerance, fretConfort } = useTabContext()
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
        }, 'repredict')
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

            }}>Repredict</p>
        </SimpleButtonWrapper>
    )
}


export default RepredictTabButton;



