export function interpolate(y1: number, y2: number, x1: number, x2: number, x: number) {
	return y1 + (y2 - y1) * ((x - x1) / (x2 - x1));
}
