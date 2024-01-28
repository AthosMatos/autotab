import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { useWebSocket } from "../WebSocket";
import { useTabContext } from "../Tab";

interface MediaRecoderContextI {
    functions: {
        startRecording: () => void;
        stopRecording: () => void;
        updateTimer: ({ minutes, seconds, milliseconds }: { minutes: number, seconds: number, milliseconds: number }) => void
    };
    states: {
        isRecording: boolean;
        countDown: number;
        audioForServer?: Float32Array
        timeElapsed: {
            minutes: number;
            seconds: number;
            milliseconds: number;
        }
    };
}

const MediaRecoderContext = createContext<MediaRecoderContextI>({} as any);

export const MediaRecoderProvider = ({ children }: { children: ReactNode }) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorder = useRef<MediaRecorder>();
    const [audioForServer, setAudioForServer] = useState<Float32Array>()
    const [countDown, setCountDown] = useState<number>(0)
    const [timeElapsed, setTimeElapsed] = useState<{
        minutes: number;
        seconds: number;
        milliseconds: number;
    }>({ minutes: 0, seconds: 0, milliseconds: 0 })
    const stream = useRef<MediaStream>()
    const [startRecord, setStartRecord] = useState(false)
    const timerInterval = useRef<any>()


    const startRecording = async () => {
        //let timeElapsed = 0
        //console.log('start')
        setTimeElapsed({ minutes: 0, seconds: 0, milliseconds: 0 })
        let countDown = 4
        const interval = setInterval(() => {
            countDown--
            setCountDown(countDown)
            if (countDown <= 0) {
                setCountDown(0)
                clearInterval(interval)
                setStartRecord(true)
            }
        }, 1000)
    };

    useEffect(() => {
        if (isRecording && !timerInterval.current) {
            let seconds = timeElapsed.seconds
            let min = timeElapsed.minutes
            let milliseconds = timeElapsed.milliseconds

            timerInterval.current = setInterval(() => {
                milliseconds += 10
                if (milliseconds >= 1000) {
                    milliseconds = 0
                    seconds++
                }
                if (seconds >= 60) {
                    seconds = 0
                    min++
                }

                updateTimer({
                    minutes: min,
                    seconds: seconds,
                    milliseconds: milliseconds
                })

            }, 10)
        }
        else if (!isRecording && timerInterval.current) {
            clearInterval(timerInterval.current)
            timerInterval.current = null
        }

    }, [isRecording])

    useEffect(() => {
        async function record() {
            stream.current = await navigator.mediaDevices.getUserMedia({
                audio: {
                    autoGainControl: false,
                    noiseSuppression: false,

                },
            })

            mediaRecorder.current = new MediaRecorder(stream.current, {
                audioBitsPerSecond: 128000,
            });

            mediaRecorder.current.addEventListener("dataavailable", handleDataAvailable);

            mediaRecorder.current.start();
            setIsRecording(true);
        }
        if (startRecord) record()

    }, [startRecord])


    const stopRecording = () => {
        mediaRecorder.current?.stop();
        stream.current?.getAudioTracks().forEach(track => track.stop());
        setIsRecording(false);
        setStartRecord(false)

    };

    const handleDataAvailable = async (event: BlobEvent) => {
        if (event.data?.size > 0) {
            const arrayBuffer = await event.data.arrayBuffer();

            const audioContext = new AudioContext({
                latencyHint: 'interactive',
            });
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const audioLeft = audioBuffer.getChannelData(0)

            const seconds = audioLeft.length / audioBuffer.sampleRate
            const min = Math.floor(seconds / 60)
            const sec = Math.floor(seconds % 60)
            const milliseconds = Math.floor((seconds - Math.floor(seconds)) * 1000)

            updateTimer({
                minutes: min,
                seconds: sec,
                milliseconds: milliseconds
            })

            setAudioForServer(audioLeft)
        }
    };

    function updateTimer({ minutes, seconds, milliseconds }: { minutes: number, seconds: number, milliseconds: number }) {
        setTimeElapsed({ minutes, seconds, milliseconds })
    }



    return (
        <MediaRecoderContext.Provider value={{
            functions: {
                startRecording,
                stopRecording,
                updateTimer
            },
            states: {
                isRecording,
                countDown,
                audioForServer,
                timeElapsed
            }
        }}>
            {children}
        </MediaRecoderContext.Provider>
    );

}

export const useMediaRecoderContext = () => {
    const context = useContext(MediaRecoderContext);
    if (!context) {
        throw new Error(
            "useSpecificContext must be used within a SpecificProvider"
        );
    }
    return context;
}
