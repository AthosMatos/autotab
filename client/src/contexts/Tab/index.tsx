import { createContext, useContext, useEffect, useState } from "react";
import { NotePositionType } from "../../utils/path";
import { useWebSocket } from "../WebSocket";
import { useNotesFretViewContext } from "../NotesFretView/useTabViewContext";

export interface InputI {
    k?: number
    fretConfort?: number
    slideTolerance?: number
    model?: string
}

interface TabContextI {

    notesPreds: NotePositionType[][]
    weight: number
    index: number
    model: string
    k: number
    fretConfort: number
    slideTolerance: number


    MoveUpTab: () => void
    MoveDownTab: () => void
    updateInputs: (newInputs: InputI) => void

}



const TabContext = createContext<TabContextI>({} as any);

export const TabProvider = (props: any) => {
    const [notesPreds, setNotesPreds] = useState<NotePositionType[][]>([]);
    const [weight, setWeight] = useState<number>(-1)
    const [index, setIndex] = useState<number>(0)
    const { kPaths } = useWebSocket()
    const { updateActivatedChords } = useNotesFretViewContext()
    const [model, setModel] = useState<string>('mix')
    const [k, setK] = useState<number>(10)
    const [fretConfort, setFretConfort] = useState<number>(5)
    const [slideTolerance, setSlideTolerance] = useState<number>(0)

    useEffect(() => {
        if (kPaths && kPaths.length) {
            //console.log(kPaths)
            setNotesPreds(kPaths[index].path)
            setWeight(kPaths[index].weight)
        }
    }, [kPaths, index])


    useEffect(() => {
        if (notesPreds) {
            updateActivatedChords(notesPreds.map((posi) => {
                const notes = posi.map((posi) => {
                    return posi.note
                })
                return {
                    notes: notes,
                    indexes: posi.map((posi) => {
                        const pos = posi.pos
                        return {
                            string: pos.string,
                            fret: pos.fret
                        }
                    })
                }
            }))
        }
    }, [notesPreds])

    function MoveUpTab() {
        if (index < kPaths.length - 1) {
            setIndex(index + 1)
            setWeight(kPaths[index + 1].weight)

        }
        else {
            setIndex(0)
            setWeight(kPaths[0].weight)
        }
    }

    function MoveDownTab() {
        if (index > 0) {
            setIndex(index - 1)
            setWeight(kPaths[index - 1].weight)
        }
        else {
            setIndex(kPaths.length - 1)
            setWeight(kPaths[kPaths.length - 1].weight)
        }
    }

    function updateInputs(newInputs: InputI) {
        if (newInputs.k != undefined) {
            setK(newInputs.k)
        }
        if (newInputs.fretConfort != undefined) {
            setFretConfort(newInputs.fretConfort)
        }
        if (newInputs.slideTolerance != undefined) {
            setSlideTolerance(newInputs.slideTolerance)
        }
        if (newInputs.model != undefined) {
            setModel(newInputs.model)
        }

    }

    return (
        <TabContext.Provider value={{

            notesPreds,
            weight,
            index,
            model,
            k,
            fretConfort,
            slideTolerance
            ,

            MoveUpTab,
            MoveDownTab,
            updateInputs

        }}>
            {props.children}
        </TabContext.Provider>
    );
};

export const useTabContext = () => {

    const context = useContext(TabContext);
    if (!context) {
        throw new Error(
            "useSpecificContext must be used within a SpecificProvider"
        );
    }
    return context;
};
