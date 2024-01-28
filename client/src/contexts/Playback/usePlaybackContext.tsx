import { createContext, useContext, useEffect, useState } from "react";
import { useNotesFretViewContext } from "../NotesFretView/useTabViewContext";


interface PlaybackContextI {

    playing: boolean;
    loop: boolean;
    forward: boolean;
    backward: boolean;
    updateSpeed: number;
    aniIndex: number;


    playPredict: () => void;
    togglePredict: () => void;
    toggleLoop: () => void;
    stopPredict: () => void;
    updatePredictSpeed: (speed: number) => void;
    FowardPredict: (done?: boolean) => void;
    BackwardPredict: (done?: boolean) => void;
    updateAniIndex: (index: number) => void;

}
const NotesFretViewContext = createContext<PlaybackContextI>({} as any);

export const PlaybackProvider = (props: any) => {
    const [playing, setPlaying] = useState(false)
    const [loop, setLoop] = useState(false)
    const [forward, setForward] = useState(false)
    const [backward, setBackward] = useState(false)
    const [updateSpeed, setUpdateSpeed] = useState(1000)
    const [aniIndex, setAniIndex] = useState(0)
    const { activeAudioEvents } = useNotesFretViewContext()


    useEffect(() => {
        if (playing) {
            let animationIndex = aniIndex
            if (aniIndex == activeAudioEvents.length) {
                updateAniIndex(0)
                animationIndex = 0
            }

            setTimeout(() => {
                if (animationIndex === activeAudioEvents.length - 1) {

                    if (loop) updateAniIndex(0)
                    else {
                        stopPredict()
                    }
                }


                updateAniIndex(animationIndex + 1)
            }, updateSpeed);
        }
    }, [playing, aniIndex])


    function updateAniIndex(index: number) {
        setAniIndex(index)
    }

    function playPredict() {
        setPlaying(true)
    }
    function stopPredict() {
        setPlaying(false)
    }
    function togglePredict() {
        setPlaying(!playing)
    }

    function toggleLoop() {
        setLoop(!loop)
    }
    function updatePredictSpeed(speed: number) {
        setUpdateSpeed(speed)
    }
    function FowardPredict() {
        setForward(true)
        let animationIndex = aniIndex + 1
        if (animationIndex > activeAudioEvents.length - 1) animationIndex = 0

        updateAniIndex(animationIndex)
        setForward(false)
    }
    function BackwardPredict() {
        setBackward(true)
        let animationIndex = aniIndex - 1
        if (animationIndex < 0) animationIndex = activeAudioEvents.length - 1

        updateAniIndex(animationIndex)
        setForward(false)
    }

    return (
        <NotesFretViewContext.Provider value={{

            playing,
            loop,
            forward,
            backward,
            updateSpeed,
            aniIndex,


            playPredict,
            togglePredict,
            toggleLoop,
            stopPredict,
            updatePredictSpeed,
            FowardPredict,
            BackwardPredict,
            updateAniIndex


        }}>
            {props.children}
        </NotesFretViewContext.Provider>
    );
};

export const usePlaybackContext = () => {

    const context = useContext(NotesFretViewContext);
    if (!context) {
        throw new Error(
            "useSpecificContext must be used within a SpecificProvider"
        );
    }
    return context;
};
