export type PosI = {
  fret: number | string;
  string: number | string;
};

export type Node = {
  fret: number; //x
  string: number; //y
  note: string; //name
};

/* const Seq = [
    ["C4", "D4", "E4", "F4"],
    ["G4", "A4", "B4"],
    ["C4", "D4", "E4", "F4","A4", "B4"],
    ["G4", "A4", "B4"],
] */

export type NotePositionType = {
  note: string;
  pos: PosI;
};
