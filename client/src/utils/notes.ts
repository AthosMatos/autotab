const STD_TUNNING = ["E2", "A2", "D3", "G3", "B3", "E4"];
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]; // 12 notes in a chromatic scale
// Define the number of frets
const STD_FRETS = 22;

function indexLabels(labels: string[]): number[] {
  const uniqueLabels: string[] = [...new Set(labels)];
  return labels.map((label) => uniqueLabels.indexOf(label));
}

interface GenNotesI {
  TUNING?: string[];
  FRETS?: number;
  indexes?: boolean;
}

export function genNotes(
  props: GenNotesI
): [string[], string[][]] | [string[], string[][], number[]] {
  const { TUNING = STD_TUNNING, FRETS = STD_FRETS, indexes = false } = props;

  const frets = FRETS + 1;

  const notes: string[] = [];
  const stringNotes: string[][] = [];

  for (const string of TUNING) {
    let octave = parseInt(string[string.length - 1]);
    const note = string.slice(0, -1);

    let noteIndex = NOTES.indexOf(note);
    const strsNotes: string[] = [];

    for (let i = 0; i < frets; i++) {
      const NOTE = NOTES[noteIndex];
      notes.push(NOTE + octave);
      strsNotes.push(NOTE + octave);

      noteIndex = (noteIndex + 1) % NOTES.length;

      if (NOTE === "B") {
        octave += 1;
        noteIndex = 0;
      }
    }

    stringNotes.push(strsNotes);
  }

  notes.push("none");
  const uniqueNotes = Array.from(new Set(notes));

  if (indexes) {
    return [uniqueNotes, stringNotes, indexLabels(notes)];
  }

  return [uniqueNotes, stringNotes];
}
