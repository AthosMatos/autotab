import numpy as np
import soundfile as sf


def onsets_to_audio(AUDIO, ONSETS, SR):
    outputaudio = []

    for i in range(len(ONSETS)):
        if i + 1 == len(ONSETS):
            outputaudio.extend(AUDIO[ONSETS[i] :])
            break

        outputaudio.extend(AUDIO[ONSETS[i] : ONSETS[i + 1]])
        # add 0.2 seconds of silence
        if i < len(ONSETS) - 1:
            outputaudio.extend(np.zeros(int(0.5 * SR)))

    sf.write("onset_to_audio.wav", np.array(outputaudio), SR)


""" def predicts_to_audio(PREDS, SR):
    outputaudio = []

    for pred in PREDS: """
