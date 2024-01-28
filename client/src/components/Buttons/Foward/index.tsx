import styled from "styled-components";
import Colors from "../../../colors/Colors";
import smoothColors from "../../../colors/smoothColors";
import { FaForward } from "react-icons/fa";
import { usePlaybackContext } from "../../../contexts/Playback/usePlaybackContext";
import { ButtonWrapper } from "../styled";


const ButtonIcon = styled(FaForward)`
    //font-size: 1rem;
    color: #696969;
    font-size: 1.2rem;
`;

interface ButtonProps {
    onClick?: () => void;
}
export const ForwardButton = ({ onClick }: ButtonProps) => {
    const { FowardPredict } = usePlaybackContext()
    return (
        <ButtonWrapper
            activatedcolor={smoothColors.red}
            onClick={() => {
                FowardPredict()
                onClick && onClick()
            }} isactivated={false}>
            <ButtonIcon />

        </ButtonWrapper>

    )
}