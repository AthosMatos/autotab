import { defineColor } from "../../colors/utils";
import { useNotesFretViewContext } from "../../contexts/NotesFretView/useTabViewContext";
import { usePlaybackContext } from "../../contexts/Playback/usePlaybackContext";
import { ButtonWrapper } from "../Buttons/styled";

const NotesView = () => {
    const { activeAudioEvents } = useNotesFretViewContext()
    const { aniIndex } = usePlaybackContext()
    return (
        <>
            {activeAudioEvents[aniIndex]?.notes.length ?
                activeAudioEvents[aniIndex]?.notes?.map((note, i) => {
                    const { nodeColor, textColor } = defineColor(note)
                    return (
                        <ButtonWrapper
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '2.8rem',
                                height: '2.8rem',
                            }}
                            key={i}
                            hover={false}
                            backgroundcolor={nodeColor}
                            clicable={false}
                        >
                            <p style={{
                                padding: 0,
                                margin: 0,
                                color: textColor,
                                fontWeight: 'bold',
                                //width: '20px'

                            }}>
                                {note}
                            </p>

                        </ButtonWrapper>
                    )
                })
                :
                <div style={{
                    backgroundColor: '#d1d1d1',
                    width: '22px',
                    height: '6px',
                    borderRadius: '5px',
                }} />
            }
        </>





    );
};

export default NotesView;
