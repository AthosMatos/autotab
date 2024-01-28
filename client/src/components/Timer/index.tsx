import Colors from "../../colors/Colors"
import { useMediaRecoderContext } from "../../contexts/Recorder/useMediaRecorder"


const Timer = () => {
    const { states } = useMediaRecoderContext()

    function formatMilliseconds() {
        const milliseconds = states.timeElapsed.milliseconds

        if (milliseconds < 10) {
            return `00${milliseconds}`
        } else if (milliseconds < 100) {
            return `0${milliseconds}`
        } else {
            return milliseconds
        }
    }

    return (
        <div>
            <p style={{
                margin: 0,
                padding: 0,
                color: Colors.white,
                fontSize: '1.6rem',
                fontWeight: 'bold'
            }}>
                {states.timeElapsed.minutes < 10 ? `0${states.timeElapsed.minutes}` : states.timeElapsed.minutes}:
                {states.timeElapsed.seconds < 10 ? `0${states.timeElapsed.seconds}` : states.timeElapsed.seconds}:
                {formatMilliseconds()}
            </p>
        </div>
    )
}

export default Timer