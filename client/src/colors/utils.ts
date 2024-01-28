import smoothColors from "./smoothColors";

export function defineColor(note: string) {
  let nodeColor = "#fff";
  let textColor = "#fff";
  note = note.toString().charAt(0);

  switch (note) {
    case "E":
      nodeColor = smoothColors.blue;
      break;
    case "A":
      nodeColor = smoothColors.orange;
      break;
    case "D":
      nodeColor = smoothColors.purple;
      break;
    case "G":
      nodeColor = smoothColors.yellow;
      textColor = "#202020";
      break;
    case "B":
      nodeColor = smoothColors.grey;
      break;
    case "C":
      nodeColor = smoothColors.green;
      break;
    default:
      nodeColor = smoothColors.red;
      break;
  }

  return { nodeColor, textColor };
}
