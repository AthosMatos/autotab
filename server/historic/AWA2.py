from utils.load_prepare import Prepare
import numpy as np
from keras.models import load_model
from midi2audio import FluidSynth
from midiutil import MIDIFile
import os
import tensorflow as tf
from keras.utils import custom_object_scope

@tf.function
def macro_f1(y, y_hat, thresh=0.5):
    """Compute the macro F1-score on a batch of observations (average F1 across labels)

    Args:
        y (int32 Tensor): labels array of shape (BATCH_SIZE, N_LABELS)
        y_hat (float32 Tensor): probability matrix from forward propagation of shape (BATCH_SIZE, N_LABELS)
        thresh: probability value above which we predict positive

    Returns:
        macro_f1 (scalar Tensor): value of macro F1 for the batch
    """
    y_pred = tf.cast(tf.greater(y_hat, thresh), tf.float32)
    tp = tf.cast(tf.math.count_nonzero(y_pred * y, axis=0), tf.float32)
    fp = tf.cast(tf.math.count_nonzero(y_pred * (1 - y), axis=0), tf.float32)
    fn = tf.cast(tf.math.count_nonzero((1 - y_pred) * y, axis=0), tf.float32)
    f1 = 2 * tp / (2 * tp + fn + fp + 1e-16)
    macro_f1 = tf.reduce_mean(f1)
    return macro_f1

# Load the model with custom loss function
with custom_object_scope({ "macro_f1": macro_f1}):
    model_chords = load_model("Models/model_chords2.h5")
    model_notes = load_model("Models/model_notes2.h5")
    model_mix = load_model("Models/model_mix2.h5")

LABELS = np.load("all_labels.npy")

def predict_notes(audio_window, model):
    def predict(predct):
        notes_preds = []
        sum_of_confidence = 0
        for i, pred in enumerate(predct):
            confidence = np.round(pred, 2)
            if confidence > 0.5:
                note = LABELS[i]
                "save the notes"
                notes_preds.append((note, confidence * 100))
                sum_of_confidence += confidence * 100

        len_of_preds = len(notes_preds)
        if len_of_preds == 0:
            len_of_preds = 1
        "get the sum of all confiedences"
        sum_of_confidence = (sum_of_confidence * 100) / (6 * 100)
        return notes_preds, sum_of_confidence

    AUDIO = audio_window.reshape(1, audio_window.shape[0], audio_window.shape[1], 1)
    predict_notes = model.predict(AUDIO, verbose=0)
    notes_preds, general_confidence = predict(predict_notes[0])

    return notes_preds, general_confidence


def AWA(
    AUDIO,
    SR,
    ONSET_TIMES,
    MaxSteps=None,
    model="chords" or "notes" or "mix",
    callback=None,
    
):
    model_to_use = model_chords
    if model == "notes":
        model_to_use = model_notes
    elif model == "mix":
        model_to_use = model_mix
    
    print(len(ONSET_TIMES))
    preds = []
    for i in range(len(ONSET_TIMES)):
        #print(ONSET_TIMES[i])
        onset_start = int(ONSET_TIMES[i] * SR)
        if i + 1 == len(ONSET_TIMES):
            onset_end = len(AUDIO)
        else:
            onset_end = int(ONSET_TIMES[i+1] * SR)
        
        ad = AUDIO[onset_start:onset_end]

        audio_window = Prepare(
            ad,
            sample_rate=SR,
        )

        notes_preds, general_confidence = predict_notes(audio_window, model_to_use)
        notes = [for_note[0] for for_note in notes_preds]
        if len(notes) == 0:
            continue
        preds.append(notes)
        
    return preds    
        
    # if temp folder does not exist, create it
    if not os.path.exists("Temp"):
        os.makedirs("Temp")

