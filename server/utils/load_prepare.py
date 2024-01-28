import librosa
import numpy as np
import sys


if not sys.warnoptions:
    import warnings

    warnings.simplefilter("ignore")


def Prepare(audio, sample_rate, resize=True):
    audio = librosa.effects.harmonic(y=audio, margin=3)  # best so far for chords
    """D = np.abs(
        mfcc(
            signal=audio,
            samplerate=sample_rate,
            # n_mfcc=128,
            # fmin=librosa.note_to_hz("C2"),
            # n_bins=128,
        )
    )"""
    D = np.abs(
        librosa.cqt(
            y=audio,
            sr=sample_rate,
            # n_mfcc=128,
            fmin=librosa.note_to_hz("C2"),
            # n_bins=128,
        )
    )

    if D.shape[1] < 173:
        D = np.pad(D, ((0, 0), (0, 173 - D.shape[1])))
    elif D.shape[1] > 173:
        D = D[:, :173]

    # D = minmax_scale(D)
    # D = pad_sequences(D, maxlen=128, padding="post", dtype="float32").T
    # D = librosa.amplitude_to_db(D, ref=np.max)

    D = np.expand_dims(D, -1)

    return D


def load(path, seconds_limit=(None, None), sample_rate=None):
    sec_start, sec_end = seconds_limit

    if sec_start and sec_end:
        sec_end = sec_end - sec_start

    audio, sample_rate = librosa.load(
        path,
        mono=True,
        sr=sample_rate,
        offset=sec_start,
        duration=sec_end,
    )

    return audio, sample_rate


def loadAndPrepare(
    path,
    audio_limit_sec=(None, None),
    sample_rate=None,
    resize=True,
):
    audio, sample_rate = load(path, audio_limit_sec, sample_rate)

    S = Prepare(
        audio,
        sample_rate,
        resize=resize,
    )

    return S, sample_rate
