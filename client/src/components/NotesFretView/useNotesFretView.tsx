import { useEffect, useState } from "react"
import { useNotesFretViewContext } from "../../contexts/NotesFretView/useTabViewContext"
import { usePlaybackContext } from "../../contexts/Playback/usePlaybackContext"
import { PosI } from "../../utils/path"


export const useNotesFretView = () => {
    const { activeAudioEvents, showNotes } = useNotesFretViewContext()
    const [timedActivatedChords, setTimedActivatedChords] = useState<PosI[]>([])
    const { aniIndex, } = usePlaybackContext()


    useEffect(() => {
        if (activeAudioEvents.length > 0) {
            showNotes ?
                setTimedActivatedChords(activeAudioEvents[aniIndex ? aniIndex - 1 : 0].indexes)
                :
                setTimedActivatedChords([])
        }
    }, [showNotes, activeAudioEvents])



    useEffect(() => {
        const activatedChord = activeAudioEvents[aniIndex]
        if (!activatedChord) return
        setTimedActivatedChords([])
        setTimeout(() => {
            setTimedActivatedChords(activatedChord.indexes)
        }, 100)

    }, [aniIndex])



    return {
        timedActivatedChords
    }
}