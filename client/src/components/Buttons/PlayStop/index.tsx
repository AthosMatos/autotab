import { usePlaybackContext } from "../../../contexts/Playback/usePlaybackContext";
import { FaPause, FaPlay } from "react-icons/fa6";
import { HotToastWarning } from "../../Toast";
import { useNotesFretViewContext } from "../../../contexts/NotesFretView/useTabViewContext";
import { ButtonWrapper } from "../styled";
import Colors from "../../../colors/Colors";


interface PlayButtonProps {
    onClick?: () => void;
}

export const PlayButton = ({ onClick }: PlayButtonProps) => {
    const { togglePredict, playing } = usePlaybackContext()
    const { activeAudioEvents } = useNotesFretViewContext()

    return (
        <ButtonWrapper
            activatedcolor="#e7c75c"
            onClick={() => {
                if (activeAudioEvents.length <= 0) {
                    HotToastWarning("Nenhuma nota foi adicionada!")
                    return
                }
                togglePredict()
                onClick && onClick()
            }} isactivated={playing ? true : false}>
            {playing ?
                <FaPause color={'#696969'} style={{
                    fontSize: '1.2rem',
                }} /> :
                <FaPlay color={'#696969'} style={{
                    fontSize: '1.2rem',
                }} />}
        </ButtonWrapper>
    )
}