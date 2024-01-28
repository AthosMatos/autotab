import Colors from "../../../colors/Colors";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { ButtonWrapper } from "../styled";
import { useNotesFretViewContext } from "../../../contexts/NotesFretView/useTabViewContext";
import smoothColors from "../../../colors/smoothColors";

interface ShowButtonProps {
    onClick?: () => void;

}

export const ShowButton = ({ onClick }: ShowButtonProps) => {
    const { showNotes, toggleShowNotes } = useNotesFretViewContext()
    return (
        <ButtonWrapper
            scale={false}
            activatedcolor={smoothColors.greenDiamond}
            onClick={() => {
                toggleShowNotes()
                onClick && onClick()
            }} isactivated={showNotes ? true : false} >
            {showNotes ?
                <IoEyeSharp color={Colors.backColor} style={{
                    margin: 0,
                    fontSize: '1.5rem',

                }} /> :
                <IoEyeOffSharp color={'#696969'} style={{
                    margin: 0,
                    fontSize: '1.5rem'
                }} />}
        </ButtonWrapper>

    )
}