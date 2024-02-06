import numpy as np
from utils.rmsNorm import rmsNorm
import librosa


def onsets(AUDIO, SR):
    ad_peak = rmsNorm(AUDIO, -50)
    D = np.abs(librosa.cqt(y=ad_peak, sr=SR))
    D = librosa.amplitude_to_db(D, ref=np.max)
    o_env = librosa.onset.onset_strength(sr=SR, S=D)
    onset_detect = librosa.onset.onset_detect(onset_envelope=o_env, sr=SR)
    rms = librosa.feature.rms(S=librosa.stft(ad_peak))
    rms = rms[0]
    onset_backtrack = librosa.onset.onset_backtrack(onset_detect, rms)
    times = librosa.times_like(o_env, sr=SR)

    return times[onset_backtrack]



def get_onsets(MUSICTESTPATH, onset_frames=None,SR=44100):
    # AUDIO = rmsNorm(AUDIO, -50)
    y, sr = librosa.load(MUSICTESTPATH, sr=16000)
    if onset_frames is None:
        ONSET_TIMES = onsets(y, sr)
    else:
        ONSET_TIMES = onset_frames

    #filter only unique values
    ONSET_TIMES = list(set(ONSET_TIMES))
    ONSET_FRAMES = []
    for onset in ONSET_TIMES:
        ONSET_FRAMES.append(int(onset * SR))

    return ONSET_TIMES, ONSET_FRAMES
