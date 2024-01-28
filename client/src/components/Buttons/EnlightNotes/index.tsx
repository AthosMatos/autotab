import { FaLightbulb } from "react-icons/fa";
import styled from "styled-components";
import Colors from "../../../colors/Colors";
import smoothColors from "../../../colors/smoothColors";
import { ButtonWrapper } from "../styled";
import { useNotesFretViewContext } from "../../../contexts/NotesFretView/useTabViewContext";



const ButtonIcon = styled(FaLightbulb)`
    //font-size: 1rem;
    color:  #696969;
    font-size: 1.2rem;
    
`;

interface ButtonProps {
    onClick?: () => void;
}
export const EnlightNotesButton = ({ onClick }: ButtonProps) => {

    const { enlightNotes, toogleEnlightNotes } = useNotesFretViewContext()
    return (
        <ButtonWrapper
            scale={false}
            activatedcolor={smoothColors.yellow}
            onClick={() => {
                toogleEnlightNotes()
                onClick && onClick()
            }} isactivated={enlightNotes}>
            <ButtonIcon />

        </ButtonWrapper>

    )
}