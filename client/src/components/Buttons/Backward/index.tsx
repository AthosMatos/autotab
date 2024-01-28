import styled from "styled-components";
import Colors from "../../../colors/Colors";
import { useState } from "react";
import smoothColors from "../../../colors/smoothColors";
import { FaForward } from "react-icons/fa";
import { usePlaybackContext } from "../../../contexts/Playback/usePlaybackContext";
import { ButtonWrapper } from "../styled";
import { grey } from "../../CustomInput";




const ButtonIcon = styled(FaForward)`
    //font-size: 1rem;
    color: #696969;
    rotate: 180deg;
    font-size: 1.2rem;
    
`;

interface ButtonProps {
    onClick?: () => void;
}

export const BackwardButton = ({ onClick }: ButtonProps) => {
    const { BackwardPredict } = usePlaybackContext()
    return (
        <ButtonWrapper
            activatedcolor={smoothColors.red}
            onClick={() => {
                BackwardPredict()
                onClick && onClick()
            }} isactivated={false}>
            <ButtonIcon />

        </ButtonWrapper>

    )
}