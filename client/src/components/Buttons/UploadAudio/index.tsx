
import { HotToastWarning } from "../../Toast";
import { ButtonWrapperasLabel } from "../styled";
import { useWebSocket } from "../../../contexts/WebSocket";
import { MdAudioFile } from "react-icons/md";
import { useTabContext } from "../../../contexts/Tab";

interface ButtonProps {
    onClick?: () => void;
}

export const UploadAudioButton = ({ onClick }: ButtonProps) => {
    const { isConnected, send } = useWebSocket()
    const { k, fretConfort, model, slideTolerance, notesPreds } = useTabContext()

    function onloadAudioFile(e: any) {
        if (!isConnected) {
            HotToastWarning("Você precisa estar conectado ao servidor para enviar um áudio")
            return
        }

        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = async function () {
            if (!reader.result || typeof reader.result === 'string') return
            const audioContext = new AudioContext;
            const audioBuffer = await audioContext.decodeAudioData(reader.result);
            const audioLeft = audioBuffer.getChannelData(0)

            if (audioBuffer.numberOfChannels === 1) {
                send({ data: Array.from(audioLeft) }, {
                    k,
                    fretConfort,
                    model,
                    slideTolerance,

                }, 'predict')
            }
            else {
                const audioRight = audioBuffer.getChannelData(1)
                //mixing the channels
                const mix = audioLeft.map((v, i) => (v + audioRight[i]) / 2)
                console.log(mix)
                send({ data: Array.from(mix) }, {
                    k,
                    fretConfort,
                    model,
                    slideTolerance,


                }, 'predict')


            }


        }
        reader.readAsArrayBuffer(file)
    }
    return (
        <ButtonWrapperasLabel htmlFor="file-upload"
            activatedcolor="#e7c75c" >

            <input type="file" id="file-upload" style={{ display: 'none' }} onChange={onloadAudioFile} />

            <MdAudioFile color={'#696969'} style={{
                fontSize: '1.4rem',
            }} />

        </ButtonWrapperasLabel>
    )
}