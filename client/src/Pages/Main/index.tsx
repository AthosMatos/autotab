import { useEffect } from "react"
import { useWebSocket } from "../../contexts/WebSocket"
import { usePlaybackContext } from "../../contexts/Playback/usePlaybackContext"
import Tablature from "../../components/Tablature"
import { ComponentWrapper, MainContainer } from "./styled"
import NotesFretView from "../../components/NotesFretView"
import { useComponentViewContext } from "../../contexts/ComponentView"
import { useTabContext } from "../../contexts/Tab"
import { ControlBar } from "../../components/ControlBar"
import { useMediaRecoderContext } from "../../contexts/Recorder/useMediaRecorder"
import styled from "styled-components"
import { AppLogo } from "../../components/Logo"


const MainPage = () => {
    const { showNotesFretView, showTab } = useComponentViewContext()
    const { updatePredictSpeed } = usePlaybackContext()
    const { connect, send } = useWebSocket()
    const { states } = useMediaRecoderContext()
    const { k, fretConfort, model, slideTolerance } = useTabContext()

    useEffect(() => {
        if (states.audioForServer) {
            send({ data: Array.from(states.audioForServer) }, {
                k, fretConfort, model, slideTolerance
            }, 'predict')


        }
    }, [states.audioForServer])

    useEffect(() => {
        connect('ws://localhost:8080')
        updatePredictSpeed(500)
    }, [])

    return (
        <MainContainer>
            <AppLogo />
            <ComponentWrapper>

                {showNotesFretView && <NotesFretView width={1350} />}
                {showTab && <Tablature width={1350} />}
            </ComponentWrapper>
            <ControlBar />
        </MainContainer>

    )
}

export default MainPage
