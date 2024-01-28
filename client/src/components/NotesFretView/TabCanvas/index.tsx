import smoothColors from "../../../colors/smoothColors";
import { defineColor } from "../../../colors/utils";
import { useNotesFretViewContext } from "../../../contexts/NotesFretView/useTabViewContext";
import { PosI } from "../../../utils/path";
import { Fret, Node, NodeText, TabWrapper } from "./styled";


type TabCanvasIndexI = {
    findBy: 'index'
    activatedNotes?: PosI[]
}
type TabCanvasNameI = {
    findBy: 'name'
    activatedNotes?: string[]
}
interface TabI {
    width: number
}
type TabCanvasI = (TabCanvasIndexI | TabCanvasNameI) & TabI

const Tab = (props: TabCanvasI) => {

    const { width } = props
    const { allNotesFromFrets, frets, enlightNotes } = useNotesFretViewContext()

    const allNotesFromFretsConverted = allNotesFromFrets[0].map((col, i) => allNotesFromFrets.map(row => row[i]))


    const TabW = width
    const TabH = 0

    return (
        <TabWrapper
            height={TabH}
            width={TabW}
        >
            {allNotesFromFretsConverted.map((stringsOnFret, fretIndex) => {

                return (
                    <Fret
                        frets={frets}
                        TabW={TabW}
                        key={fretIndex}
                    >
                        <Node
                            activated={false}
                            Tabw={TabW}
                            frets={frets}
                            isbutton={false}

                            color={'transparent'}
                            key={fretIndex}>
                            <NodeText
                                increasetext={1.4}
                                Tabw={TabW}
                                color={'white'}>
                                {fretIndex}
                            </NodeText>
                        </Node>

                        {
                            stringsOnFret.map((note, stringIndex) => {
                                const { nodeColor, textColor } = defineColor(note)
                                //activate node if it is in the activatedNodes array
                                /* console.log('stringIndex', stringIndex)
                                console.log('fretIndex', fretIndex) */

                                let activated = false
                                switch (props.findBy) {
                                    case 'index':
                                        const foundNote = props.activatedNotes && props.activatedNotes.find((note: PosI) => Number(note.string) === stringIndex && Number(note.fret) === fretIndex)
                                        activated = foundNote ? true : false

                                        break
                                    case "name":
                                        activated = props.activatedNotes ? props.activatedNotes.includes(note) : false
                                        break
                                }


                                return (
                                    <Node
                                        color={nodeColor}
                                        activated={activated}
                                        filterOff={enlightNotes}
                                        Tabw={TabW}
                                        frets={frets}
                                        isbutton={false}
                                        key={stringIndex}
                                    >
                                        <NodeText
                                            Tabw={TabW}
                                            color={textColor}>
                                            {note}
                                        </NodeText>
                                    </Node>
                                )
                            })
                        }
                    </Fret>
                )
            })}
        </TabWrapper >
    );
};

export default Tab;
