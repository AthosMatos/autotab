import asyncio
import websockets
import numpy as np
from utils.load_prepare import load
from historic.getOnsets import get_onsets
from historic.AudioWindow import AWA
from historic.onsetToAudios import onsets_to_audio
import json
from scipy.io import wavfile
from TabGenV2 import gen_paths


def handle_audio(dataJson):
    audio = dataJson["audio"]

    # Convert received binary data to numpy array
    # audio = np.frombuffer(dataJson["audio"], dtype=np.float32)
    audio = np.array(audio, dtype=np.float32)
    # print(audio)

    # audio_acc = np.append(audio_acc, audio)

    """ if len(audio_acc) < 48000 * 5:
        print(len(audio_acc))
        print("not enough audio")
        continue """
    # time.sleep(0.1)
    # Save the audio as a WAV file
    wavfile.write("output.wav", 48000, audio)


def predict(dataJson):
    MUSICTESTPATH = "output.wav"
    SR = 44100
    AUDIO, _ = load(MUSICTESTPATH, sample_rate=SR)
    ONSETS = get_onsets(AUDIO)
    onsets_to_audio(AUDIO, ONSETS[0], SR)

    preds = AWA(
        AUDIO,
        SR,
        ONSETS,
        MaxSteps=None,
        model=dataJson["model"],
    )

    return preds


def get_paths(preds, dataJson):
    paths = gen_paths(
        preds,
        k=dataJson["k"],
        parametros={
            "casa_conforto": dataJson["fretConfort"],
        },
    )

    return paths


async def handle_websocket(websocket, path):
    audio_acc = np.array([], dtype=np.float32)
    # preds_acc = []

    try:
        while True:
            data = await websocket.recv()
            if data:
                dataJson = json.loads(data)
                print(dataJson["k"])
                print(dataJson["fretConfort"])
                print(dataJson["slideTolerance"])
                print(dataJson["model"])

                if dataJson["type"] == "predict":
                    handle_audio(dataJson)
                    preds = predict(dataJson)
                    if len(preds) == 0:
                        res = '{ "type": "error", "message": "Não foram encontradas notas." }'
                        await websocket.send(res)
                        continue
                    paths = get_paths(preds, dataJson)

                    res = (
                        '{ "type": "predict",'
                        + '"paths": '
                        + json.dumps(paths)
                        + ', "preds": '
                        + json.dumps(preds)
                        + "}"
                    )
                    await websocket.send(res)
                elif dataJson["type"] == "update":
                    paths = get_paths(dataJson["preds"], dataJson)

                    res = '{ "type": "update", "paths": ' + json.dumps(paths) + "}"
                    await websocket.send(res)
                elif dataJson["type"] == "repredict":
                    preds = predict(dataJson)
                    if len(preds) == 0:
                        res = '{ "type": "error", "message": "Não foram encontradas notas." }'
                        await websocket.send(res)
                        continue
                    paths = get_paths(preds, dataJson)

                    res = (
                        '{ "type": "repredict",'
                        + '"paths": '
                        + json.dumps(paths)
                        + ', "preds": '
                        + json.dumps(preds)
                        + "}"
                    )
                    await websocket.send(res)

    except websockets.exceptions.ConnectionClosedError:
        print("WebSocket connection closed.")


#start_server = websockets.serve(handle_websocket, "0.0.0.0", 80, max_size=None)
start_server = websockets.serve(handle_websocket, "0.0.0.0", 8080, max_size=None)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
