import { useEffect, useReducer, useState } from "react";
import Tab from "./TabCanvas";
import { Container } from "./styled";
import { usePlaybackContext } from "../../contexts/Playback/usePlaybackContext";
import { useNotesFretViewContext } from "../../contexts/NotesFretView/useTabViewContext";
import { useNotesFretView } from "./useNotesFretView";


interface NotesFretViewI {
    width: number
}

const NotesFretView = (props: NotesFretViewI) => {
    const { width } = props
    const { timedActivatedChords } = useNotesFretView()

    return (
        <Container>
            <Tab
                width={width}
                findBy="index"
                activatedNotes={timedActivatedChords} />

        </Container>
    );
};

export default NotesFretView;
