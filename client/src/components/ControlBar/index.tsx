import styled from "styled-components"
import { BackwardButton } from "../Buttons/Backward"
import { ForwardButton } from "../Buttons/Foward"
import { LoopButton } from "../Buttons/Loop"
import { ToogleNotesFretViewButton } from "../Buttons/NotesFretView"
import { PlayButton } from "../Buttons/PlayStop"
import { RecordButton } from "../Buttons/Record"
import { ToogleTabButton } from "../Buttons/Tab"
import { ButtonsContainer } from "../Buttons/styled"
import Colors from "../../colors/Colors"
import { ShowButton } from "../Buttons/Show"
import { EnlightNotesButton } from "../Buttons/EnlightNotes"
import IndexViewer from "../IndexViewer"
import { UpTabButton } from "../Buttons/UpTab"
import { DownTabButton } from "../Buttons/DownTab"
import { CustomInput } from "../CustomInput"
import NotesView from "../NotesView"
import ToogleModelButton from "../Buttons/ToogleModel"
import { useTabContext } from "../../contexts/Tab"
import { useNotesFretViewContext } from "../../contexts/NotesFretView/useTabViewContext"
import smoothColors from "../../colors/smoothColors"
import UpdateTabButton from "../Buttons/UpdateTab"
import RepredictTabButton from "../Buttons/Repredict"
import { UploadAudioButton } from "../Buttons/UploadAudio"
import Timer from "../Timer"


const ControlWrapper = styled.div`
    position: absolute;
    top: calc(50% - 45vh);
    right: 30px;
    display: flex;
    width: 400px;
    height: 85vh;
    overflow: auto;
    flex-direction: column;
    background-color: ${Colors.darkGrey};
    padding: 24px;
    border-radius: 10px;
    gap: 20px;

    &::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
    background: #272727; 
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
    background: #383838; 
    border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`;

const VerticalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const ControlBar = () => {
    const { index, weight, fretConfort, updateInputs, slideTolerance, k } = useTabContext()
    const { frets } = useNotesFretViewContext()

    return (
        <ControlWrapper >

            <Timer />
            <ButtonsContainer section="Playback">
                <BackwardButton />
                <PlayButton />
                <ForwardButton />
                <LoopButton />
                <RecordButton />
                <UploadAudioButton />
            </ButtonsContainer>

            <ButtonsContainer section="Visualização">
                <VerticalWrapper style={{ gap: '20px' }}>
                    <ToogleNotesFretViewButton />
                    <ToogleTabButton />
                </VerticalWrapper>
                <VerticalWrapper style={{ gap: '20px' }}>
                    <ShowButton />
                    <EnlightNotesButton />
                </VerticalWrapper>
                <VerticalWrapper style={{ gap: '20px' }}>
                    <IndexViewer index={index + 1} />
                    <IndexViewer weight index={weight} />
                </VerticalWrapper>
                <VerticalWrapper style={{ gap: '20px', backgroundColor: smoothColors.softGrey, borderRadius: '5px' }}>
                    <UpTabButton />
                    <DownTabButton />
                </VerticalWrapper>
            </ButtonsContainer>

            <ButtonsContainer section="Tablatura">

                <VerticalWrapper>
                    <CustomInput
                        value={fretConfort}
                        onChange={(e, v) => {
                            //console.log(v)
                            if (v == undefined) return
                            updateInputs({ fretConfort: v })
                        }}
                        label="Casa de Conforto"
                        max={frets}
                        min={0}
                    />
                    <CustomInput
                        value={slideTolerance}
                        onChange={(e, v) => {
                            if (v == undefined) return
                            updateInputs({ slideTolerance: v })
                        }}
                        label="Tolerância de Slide"
                        max={frets}
                        min={0}
                    />

                </VerticalWrapper>
                <VerticalWrapper>

                    <CustomInput
                        value={k}
                        onChange={(e, v) => {
                            if (v == undefined) return
                            updateInputs({ k: v })
                        }}
                        label="K"
                        max={frets}
                        min={1}
                    />
                    <ToogleModelButton />
                </VerticalWrapper>


            </ButtonsContainer>
            <ButtonsContainer section="Tab Funcs">
                <UpdateTabButton />
                <RepredictTabButton />
            </ButtonsContainer>
            <ButtonsContainer section="Notes" >
                <NotesView />
            </ButtonsContainer>


        </ControlWrapper>
    )
}