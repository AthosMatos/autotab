import numpy as np
from utils.rmsNorm import rmsNorm
import librosa


""" def wave_onsets(AUDIO, SR):
    S = np.abs(librosa.stft(y=AUDIO))

    onset_strenght = librosa.onset.onset_strength(S=S, sr=SR)
    onset_raw = librosa.onset.onset_detect(onset_envelope=onset_strenght, sr=SR)
    rms = librosa.feature.rms(S=S)
    onset_bt = librosa.onset.onset_backtrack(onset_raw, rms[0])

    ONSET_FRAMES = librosa.frames_to_time(onset_bt, sr=SR)

    return ONSET_FRAMES """


""" def onsets(AUDIO, SR):
    ad_peak = rmsNorm(AUDIO, -50)
    D = np.abs(librosa.cqt(y=ad_peak, sr=SR))
    D = librosa.amplitude_to_db(D, ref=np.max)
    o_env = librosa.onset.onset_strength(sr=SR, S=D)
    onset_detect = librosa.onset.onset_detect(onset_envelope=o_env, sr=SR)
    rms = librosa.feature.rms(S=librosa.stft(AUDIO))
    rms = rms[0]
    onset_backtrack = librosa.onset.onset_backtrack(onset_detect, rms)
    times = librosa.times_like(o_env, sr=SR)

    return times[onset_backtrack] """


def onsets(AUDIO, SR):
    ad_peak = rmsNorm(AUDIO, -50)
    n_fft = 1024
    hop_length = int(librosa.time_to_samples(1.0 / 200, sr=SR))
    lag = 2
    n_mels = 138
    fmin = 27.5
    fmax = 16000.0
    max_size = 3
    S = librosa.feature.melspectrogram(
        y=ad_peak,
        sr=SR,
        n_fft=n_fft,
        hop_length=hop_length,
        fmin=fmin,
        fmax=fmax,
        n_mels=n_mels,
    )
    odf_sf = librosa.onset.onset_strength(
        S=librosa.power_to_db(S, ref=np.max),
        sr=SR,
        hop_length=hop_length,
        lag=lag,
        max_size=max_size,
    )

    onset_sf = librosa.onset.onset_detect(
        onset_envelope=odf_sf,
        sr=SR,
        hop_length=hop_length,
        units="time",
        backtrack=True,
    )
    return onset_sf


""" def wave_onsets(AUDIO, SR):
    o_env = librosa.onset.onset_strength(
        y=AUDIO,
        sr=SR,
    )
    times = librosa.times_like(o_env, sr=SR)

    onset_frames_peaks = librosa.util.peak_pick(
        o_env, pre_max=3, post_max=3, pre_avg=3, post_avg=3, delta=1, wait=5
    )
    new_onset_frames_peaks = []
    for index in range(len(onset_frames_peaks) - 1):
        curr_onset_frame_peak = onset_frames_peaks[index]
        next_onset_frame_peak = onset_frames_peaks[index + 1]
        diff = next_onset_frame_peak - curr_onset_frame_peak
        diff_porc = int(diff * 0.3)
        # diff_porc cant be bigger than 6 and smaller than 0
        if diff_porc > 6:
            diff_porc = 6
        elif diff_porc < 0:
            diff_porc = 0
        if index == 0:
            new_onset_frames_peaks.append(curr_onset_frame_peak)
        new_onset_frames_peaks.append(next_onset_frame_peak - diff_porc)

    new_onset_frames_peaks = np.array(new_onset_frames_peaks)
    new_onset_frames_peaks = np.maximum(new_onset_frames_peaks, 0)

    print(new_onset_frames_peaks)
    print(onset_frames_peaks)

    return times[new_onset_frames_peaks] """


def get_onsets(AUDIO, SR, onset_frames=None):
    # AUDIO = rmsNorm(AUDIO, -50)
    if onset_frames is None:
        ONSET_FRAMES = onsets(AUDIO, SR)
    else:
        ONSET_FRAMES = onset_frames
    # ONSET_FRAMES = cqt_onsets(AUDIO, SR)
    ONSET_FRAMES_AS_SAMPLE_RATE = []
    MIN_AUDIO_WINDOW_SIZE = 0.1  # 0.1 seconds / 100ms

    ON_FRAMES = []
    for i in range(len(ONSET_FRAMES)):
        """print(
            f"ONSET_FRAMES[i + 1] - ONSET_FRAMES[i]: {ONSET_FRAMES[i + 1] - ONSET_FRAMES[i]}"
        )"""
        if i + 1 == len(ONSET_FRAMES):
            ON_FRAMES.append(ONSET_FRAMES[i])
            ONSET_FRAMES_AS_SAMPLE_RATE.append(int(ONSET_FRAMES[i] * SR))
            break
        if ONSET_FRAMES[i + 1] - ONSET_FRAMES[i] >= MIN_AUDIO_WINDOW_SIZE:
            ON_FRAMES.append(ONSET_FRAMES[i])
            ONSET_FRAMES_AS_SAMPLE_RATE.append(int(ONSET_FRAMES[i] * SR))

    ONSET_FRAMES_AS_SAMPLE_RATE = np.array(ONSET_FRAMES_AS_SAMPLE_RATE)
    ON_FRAMES = np.array(ON_FRAMES)

    return ON_FRAMES, ONSET_FRAMES_AS_SAMPLE_RATE
