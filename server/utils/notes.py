import numpy as np
import librosa

# every note in a electric guitar with 22 frets
# Define the standard tuning notes for each string
STD_TUNNING = ["E2", "A2", "D3", "G3", "B3", "E4"]
NOTES = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
]  # 12 notes in a chromatic scale
# Define the number of frets
STD_FRETS = 22


def indexLabels(labels: list):
    return np.unique(labels, return_inverse=True)[1]


def genNotes(TUNNING=STD_TUNNING, FRETS=STD_FRETS, indexes=False):
    # Create a 2D array to store the notes with octaves
    notes = []
    string_notes = []
    for string in TUNNING:
        octave = int(string[-1])
        note = string[:-1]
        # print(note)
        note_index = NOTES.index(note)
        # print(note)
        # print(note_index)
        strs_notes = []
        for _ in range(FRETS):
            """print(NOTES[note_index])"""
            NOTE = NOTES[note_index]
            notes.append(NOTE + str(octave))
            strs_notes.append(NOTE + str(octave))
            note_index += 1
            # print(NOTE)
            if NOTE == "B":
                octave += 1
                note_index = 0
        string_notes.append(strs_notes)
    # notes.append("none")  # Add a rest note
    notes = list(np.unique(notes))

    if indexes:
        return notes, string_notes, indexLabels(notes)
    return notes, string_notes


def genNotes_v2(FROM: str, TO: str, hasNone=False):
    # Create a 2D array to store the notes with octaves
    currNote = FROM
    curr_note_index = NOTES.index(currNote[:-1])
    curr_octave = int(currNote[-1])
    notes = []
    notes.append(currNote)

    while currNote != TO:
        curr_note_index += 1

        if curr_note_index == len(NOTES):
            curr_octave += 1
            curr_note_index = 0

        currNote = NOTES[curr_note_index] + str(curr_octave)
        notes.append(currNote)

    if hasNone:
        notes.append("none")

    return notes


def shiftNote(note: str, shift: int, noteCeiling=None, noteFloor=None):
    """
    returns the note as string and the frequency as float"""
    note_index = NOTES.index(note[:-1])
    octave = int(note[-1])
    newNote = note
    maxShift = 0

    def returnShift(maxShift):
        """if maxShift == 0:
            return shift
        else:"""
        return maxShift

    for _ in range(abs(shift)):
        if noteCeiling is not None and isNoteHigher(
            NOTES[note_index] + str(octave), noteCeiling, orEqual=True
        ):
            return returnShift(maxShift)

        elif noteFloor is not None and isNoteLower(
            NOTES[note_index] + str(octave), noteFloor, orEqual=True
        ):
            return returnShift(maxShift)

        if shift < 0:
            note_index -= 1
            maxShift -= 1
        else:
            note_index += 1
            maxShift += 1

        if note_index == len(NOTES):
            octave += 1
            note_index = 0

        elif note_index < 0:
            octave -= 1
            note_index = len(NOTES) - 1

        # print(NOTES[note_index] + str(octave))

    if noteCeiling is not None or noteFloor is not None:
        return returnShift(maxShift)

    newNote = NOTES[note_index] + str(octave)
    freq = librosa.note_to_hz(NOTES[note_index] + str(octave))

    return newNote, freq


def getHighestLowestNote(notes: list[str]):
    highestNote = notes[0]
    lowestNote = notes[0]
    for note in notes:
        if isNoteHigher(note, highestNote):
            highestNote = note

        if isNoteLower(note, lowestNote):
            lowestNote = note

    return highestNote, lowestNote


def isNoteHigher(note1: str, note2: str, orEqual=False):
    note1NoOctave = note1[:-1]
    note1Octave = int(note1[-1])

    note2NoOctave = note2[:-1]
    note2Octave = int(note2[-1])
    if not orEqual:
        if (note1Octave > note2Octave) or (
            NOTES.index(note1NoOctave) > NOTES.index(note2NoOctave)
            and note1Octave >= note2Octave
        ):
            return True
    else:
        if (note1Octave > note2Octave) or (
            NOTES.index(note1NoOctave) >= NOTES.index(note2NoOctave)
            and note1Octave >= note2Octave
        ):
            return True
    return False


def isNoteLower(note1: str, note2: str, orEqual=False):
    note1NoOctave = note1[:-1]
    note1Octave = int(note1[-1])

    note2NoOctave = note2[:-1]
    note2Octave = int(note2[-1])

    if not orEqual:
        if (note1Octave < note2Octave) or (
            NOTES.index(note1NoOctave) < NOTES.index(note2NoOctave)
            and note1Octave <= note2Octave
        ):
            return True
    else:
        if (note1Octave < note2Octave) or (
            NOTES.index(note1NoOctave) <= NOTES.index(note2NoOctave)
            and note1Octave <= note2Octave
        ):
            return True
    return False
