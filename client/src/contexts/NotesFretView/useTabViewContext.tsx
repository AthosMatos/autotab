import { createContext, useContext, useEffect, useState } from "react";
import { genNotes } from "../../utils/notes";
import { PosI } from "../../utils/path";

type ActiveAudioEventsT = {
    notes: string[];
    indexes: PosI[];
};

interface NotesFretViewContextI {

    frets: number
    allNotesFromFrets: string[][]
    activeAudioEvents: ActiveAudioEventsT[]
    enlightNotes: boolean
    showNotes: boolean,


    updateActivatedChords: (newActivatedChords: ActiveAudioEventsT[]) => void
    toogleEnlightNotes: () => void
    toggleShowNotes: () => void


}

const NotesFretViewContext = createContext<NotesFretViewContextI>({} as any);


export const NotesFretViewProvider = (props: any) => {
    const [frets, setFrets] = useState(24)
    const [allNotesFromFrets, setAllNotesFromFrets] = useState(genNotes({
        FRETS: 24,
    })[1])
    const [activeAudioEvents, setActiveAudioEvents] = useState<ActiveAudioEventsT[]>([])
    const [enlightNotes, setEnlightNotes] = useState(false)
    const [showNotes, setShow] = useState(true)




    function updateActivatedChords(newActivatedChords: ActiveAudioEventsT[]) {
        setActiveAudioEvents(newActivatedChords)
    }
    function toogleEnlightNotes() {
        setEnlightNotes(!enlightNotes)
    }
    function toggleShowNotes() {
        setShow(!showNotes)
    }
    return (
        <NotesFretViewContext.Provider value={{
            frets,
            allNotesFromFrets,
            activeAudioEvents,
            enlightNotes,
            showNotes,

            updateActivatedChords,
            toogleEnlightNotes,
            toggleShowNotes
        }}>
            {props.children}
        </NotesFretViewContext.Provider>
    );
};

export const useNotesFretViewContext = () => {

    const context = useContext(NotesFretViewContext);
    if (!context) {
        throw new Error(
            "useSpecificContext must be used within a SpecificProvider"
        );
    }
    return context;
};
