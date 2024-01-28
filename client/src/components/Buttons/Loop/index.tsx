import styled from "styled-components";
import Colors from "../../../colors/Colors";
import { usePlaybackContext } from "../../../contexts/Playback/usePlaybackContext";
import { FaRepeat } from "react-icons/fa6";
import { ButtonWrapper } from "../styled";

const ButtonIcon = styled(FaRepeat)`
    //font-size: 1rem;
    color: ${Colors.backColor};
    font-size: 1.2rem;
`;

interface LoopButtonProps {
    onClick?: () => void;
}

export const LoopButton = ({ onClick }: LoopButtonProps) => {
    const { toggleLoop, loop } = usePlaybackContext()
    return (
        <ButtonWrapper
            activatedcolor="#5ce796"
            backgroundcolor="#e7715c78"
            onClick={() => {
                toggleLoop()
                onClick && onClick()
            }}
            isactivated={loop ? true : false}>
            <ButtonIcon />

        </ButtonWrapper>

    )
}