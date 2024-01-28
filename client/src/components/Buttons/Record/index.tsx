import styled from "styled-components";
import Colors from "../../../colors/Colors";
import { PiRecordFill } from "react-icons/pi";
import smoothColors from "../../../colors/smoothColors";
import { useWebSocket } from "../../../contexts/WebSocket";
import { HotToastWarning } from "../../Toast";
import { ButtonWrapper } from "../styled";
import { AiFillAudio } from "react-icons/ai";
import { useMediaRecoderContext } from "../../../contexts/Recorder/useMediaRecorder";

const CountDown = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    
    font-weight: bold;
    width: 20px;
    height: 20px;

`;

const ButtonIcon = styled(AiFillAudio)`
    //font-size: 1rem;
    color: #696969;
    font-size: 1.2rem;
`;

interface ButtonProps {
    onClick?: () => void;
}

export const RecordButton = ({ onClick }: ButtonProps) => {
    const { states, functions } = useMediaRecoderContext()
    const { isConnected } = useWebSocket()

    return (
        <ButtonWrapper
            activatedcolor={smoothColors.red}
            onClick={() => {
                if (!isConnected) {
                    HotToastWarning("Você precisa estar conectado ao servidor para gravar")
                    return
                }
                if (states.isRecording) functions.stopRecording()
                else functions.startRecording()
                onClick && onClick()
            }} isactivated={states.isRecording}>
            {states.countDown > 0 ?
                <CountDown > {states.countDown}</CountDown> :
                <ButtonIcon color={states.isRecording ? Colors.backColor : '#696969'} />
            }
        </ButtonWrapper>

    )
}