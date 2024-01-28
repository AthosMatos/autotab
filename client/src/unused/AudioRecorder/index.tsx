import { useEffect, useRef, useState } from "react";
import { Recorder } from "../../recorder";


const useAudioRecoder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioForServer, setAudioForServer] = useState<Float32Array>()
    const [sampleRate, setSampleRate] = useState<number>()

    const audioContext = useRef<AudioContext>()
    const input = useRef<MediaStreamAudioSourceNode>()
    const gumStream = useRef<MediaStream>()
    const rec = useRef<Recorder>()

    /* useEffect(() => {
        
    }, []);
 */
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            audioContext.current = new AudioContext({
                //sampleRate: 192000,
                //latencyHint: 'interactive',
            });
            setSampleRate(audioContext.current.sampleRate)
            gumStream.current = stream;
            input.current = audioContext.current.createMediaStreamSource(stream);
            rec.current = new Recorder(input.current, {
                //numChannels: 2,
                //bufferLen: 8192,
            })
            rec.current.record();
            setIsRecording(true);
        })


    };

    const pauseRecording = () => {
        if (rec.current) {
            rec.current.stop();
            setIsRecording(false);
        }
    }


    const stopRecording = ({ sendToServer, exportWav }: { sendToServer?: boolean, exportWav?: boolean }) => {
        if (rec.current) {
            rec.current.stop();
            setIsRecording(false);
            gumStream.current?.getAudioTracks()[0].stop();

            rec.current.exportWAV((blob: Blob) => {

                if (exportWav) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'output.wav';
                    link.click();
                }
                const arrayBuffer = blob.arrayBuffer();
                arrayBuffer.then((arrayBuffer) => {
                    const audioBuffer = audioContext.current?.decodeAudioData(arrayBuffer);
                    audioBuffer?.then((audioBuffer) => {
                        const audioBufferLeft = audioBuffer.getChannelData(0)
                        const audioBufferRight = audioBuffer.getChannelData(1)
                        const audioBuffer2 = new Float32Array(audioBufferLeft.length + audioBufferRight.length);
                        sendToServer && setAudioForServer(audioBuffer2)

                    })
                })
            })
        }
    };

    return {
        functions:
        {
            startRecording,
            stopRecording,
            pauseRecording,
        },
        states: {
            isRecording,
            audioForServer,
            sampleRate
        }
    };
}

export default useAudioRecoder;

