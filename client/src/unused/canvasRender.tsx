import React, { useRef, useEffect, useState } from "react";
import smoothColors from "../colors/smoothColors";

const strings = 6

const useRefs = ({ tabwidth }: { tabwidth: number }) => {
    const nodeSizeValue = tabwidth / 38
    const fontSizeValue = (9 * tabwidth) / 950

    const fontSizeRef = useRef(fontSizeValue)
    const NodeSizeRef = useRef(nodeSizeValue)
    const mousePosRef = useRef({ x: 0, y: 0 })
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const SelectedNode = useRef({
        string: 4 - 1,
        fret: 10,
    })
    const gapBetweenNotes = 0.4
    const nodeSizeWGaps = useRef(NodeSizeRef.current * (1 + gapBetweenNotes))
    const fretspacing = useRef(nodeSizeWGaps.current / 2)



    const [nodeSizeState, setNodeSize] = useState(NodeSizeRef.current)
    const [canvasReady, setCanvasReady] = useState(false)
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>()

    useEffect(() => {
        setNodeSize(nodeSizeValue)
        fontSizeRef.current = fontSizeValue
        NodeSizeRef.current = nodeSizeValue
        nodeSizeWGaps.current = NodeSizeRef.current * (1 + gapBetweenNotes)
        fretspacing.current = nodeSizeWGaps.current / 2
    }, [tabwidth])

    useEffect(() => {
        if (!canvasRef) return
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        //draw(context);
        setCanvasContext(context)
    }, [canvasRef]);

    useEffect(() => {
        setCanvasReady(true)
    }, [canvasContext])



    return {
        canvasRef,
        mousePosRef,
        canvasReady,
        nodeSizeState,
        fontSizeRef,
        canvasContext,
        NodeSizeRef,
        SelectedNode,
        gapBetweenNotes,
        nodeSizeWGaps,
        fretspacing
    };

}

interface TabCanvasI extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
    tabwidth: number
    frets: number
    allnotesfromfrets: string[][]
}

const TabCanvas = (props: TabCanvasI) => {
    const { tabwidth, frets: frts, allnotesfromfrets: allNotesFromFrets } = props
    const frets = frts + 1
    const { canvasRef,
        mousePosRef,
        canvasContext,
        canvasReady,
        NodeSizeRef,
        fontSizeRef,
        SelectedNode,
        nodeSizeState,
        fretspacing,
        gapBetweenNotes,
        nodeSizeWGaps
    } = useRefs({ tabwidth })


    useEffect(() => {
        requestAnimationFrame(() => draw());
    }, [canvasReady, nodeSizeState, frts])


    function draw() {

        // console.log("draw")

        function clearCanvas() {
            if (!canvasContext) return
            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        }

        function drawFretLine(frt: number) {
            let fretSpace = 0
            if (!canvasContext) return fretSpace
            canvasContext.globalAlpha = 0.5

            if (frt !== 0) fretSpace = fretspacing.current //in the first fret we dont need to add the fret spacing
            //draw the fret line
            if (frt > 0 && frt !== frets) {

                canvasContext.lineWidth = frt == 1 ? 4 : 2
                canvasContext.strokeStyle = "#5b6872"
                canvasContext.beginPath();
                canvasContext.moveTo(frt * nodeSizeWGaps.current + fretSpace, 0);
                canvasContext.lineTo(frt * nodeSizeWGaps.current + fretSpace, (strings + 1) * nodeSizeWGaps.current);
                canvasContext.stroke();
            }
            if (frt !== 0) fretSpace = fretspacing.current //in the first fret we dont need to add the fret spacing

            return fretSpace
            /* if (frt !== 0) fretSpace = fretspacing.current * 2 */
        }

        function getXY(string: number, fret: number, fretSpace: number) {
            //get the x and y from the string and fret
            const x = fret * nodeSizeWGaps.current + nodeSizeWGaps.current / 2 + fretSpace
            const y = string * nodeSizeWGaps.current + nodeSizeWGaps.current / 2
            return { x, y }
        }

        function isMouseOverNode(x: number, y: number) {
            //check if the mouse is over the node
            if (mousePosRef.current.x > x - nodeSizeWGaps.current / 2 && mousePosRef.current.x < x + nodeSizeWGaps.current / 2 && mousePosRef.current.y > y - nodeSizeWGaps.current / 2 && mousePosRef.current.y < y + nodeSizeWGaps.current / 2) {
                return true
            }
            return false
        }

        function isMouseFret(fret: number, fretSpace?: number) {
            fretSpace = fretSpace ? fretSpace : 0
            //check if the mouse is over the node
            fret == 0 && (fretSpace = 0)
            if (mousePosRef.current.x > (fret * nodeSizeWGaps.current + fretSpace) && mousePosRef.current.x < fret * nodeSizeWGaps.current + fretSpace + nodeSizeWGaps.current) {
                return true
            }
            return false
        }

        function isMouseOverString(string: number) {
            //check if the mouse is over the node
            if (mousePosRef.current.y > string * nodeSizeWGaps.current && mousePosRef.current.y < string * nodeSizeWGaps.current + nodeSizeWGaps.current) {
                return true
            }
            return false
        }

        function isSelectedNode(string: number, fret: number) {
            //
            if (SelectedNode.current.string === string && SelectedNode.current.fret === fret) {
                return true
            }
            return false
        }

        function drawNode(x: number, y: number, bold?: boolean, increasedSize?: number) {
            if (!canvasContext) return
            increasedSize = increasedSize ? increasedSize : 0
            canvasContext.beginPath();
            const increase = increasedSize * NodeSizeRef.current / 650
            canvasContext.arc(x, y, NodeSizeRef.current / 2 + increase, 0, 2 * Math.PI);
            const fontInterp = 1 + ((1.1 - 1) / (60)) * (increasedSize)
            canvasContext.font = `${bold ? 'bold' : 'normal'} ${fontSizeRef.current * fontInterp}px Arial`;
        }

        function getFontWidth(string: string) {
            if (!canvasContext) return 0
            return canvasContext.measureText(string).width
        }

        function getSingularLetter(string: string, index: number) {
            return string.toString().charAt(index)
        }

        function assignColorToNode(firstLetter: string, secondLetter: string, lastLetter: string) {
            if (!canvasContext) return

            //assign the color based on the first letter of eachStringWeight[st][frt]
            let textColor = '#fff'


            switch (firstLetter) {
                case "E":
                    canvasContext.fillStyle = smoothColors.blue

                    break;
                case "A":
                    canvasContext.fillStyle = smoothColors.orange
                    break;
                case "D":
                    canvasContext.fillStyle = smoothColors.purple
                    break;
                case "G":
                    canvasContext.fillStyle = smoothColors.yellow
                    textColor = '#000000';
                    break;
                case "B":
                    canvasContext.fillStyle = smoothColors.grey
                    break;
                case "C":
                    canvasContext.fillStyle = smoothColors.green
                    break;
                default:
                    canvasContext.fillStyle = smoothColors.red
                    break;
            }



            /*  switch (firstLetter) {
                 case "E":
                     canvasContext.fillStyle = secondLetter == '#' ? smoothColors.blue_er : smoothColors.blue
 
                     break;
                 case "A":
                     canvasContext.fillStyle = secondLetter == '#' ? smoothColors.orange_er : smoothColors.orange
                     break;
                 case "D":
                     canvasContext.fillStyle = secondLetter == '#' ? smoothColors.purple_er : smoothColors.purple
                     break;
                 case "G":
                     canvasContext.fillStyle = secondLetter == '#' ? smoothColors.yellow_er : smoothColors.yellow
                     textColor = '#000000';
                     break;
                 case "B":
                     canvasContext.fillStyle = secondLetter == '#' ? smoothColors.gray_er : smoothColors.gray
                     break;
                 case "C":
                     canvasContext.fillStyle = secondLetter == '#' ? smoothColors.green_er : smoothColors.green
                     break;
                 default:
                     canvasContext.fillStyle = secondLetter == '#' ? smoothColors.red_er : smoothColors.red
                     break;
             }
 
  */

            canvasContext.fill();
            canvasContext.fillStyle = textColor
            //sat = interpalte where the hue is based on the 3rd letter of eachStringWeight[st][frt
            //and the higher the note smaller the hue

            /* const interp = ((100) / (6)) * (parseInt(lastLetter))
            //darken the color based on the fret
            const color = darken(canvasContext.fillStyle, interp)
            canvasContext.fillStyle = color ?? canvasContext.fillStyle */
        }

        function drawNoteName(nodeName: string, frt: number, st: number, fretSpace: number, fontWidth: number) {
            if (!canvasContext) return

            //based on the 3rd letter of eachStringWeight[st][frt] make the node more saturated or less saturated
            // DIM the node if it is not selected
            //canvasContext.fillText(allNotesFromFrets[st][frt], frt * squareSize.current + squareSize.current / 2 - (fontWidth / 2), st * squareSize.currnt + squareSize.current / 2 + fontSize / 2);
            canvasContext.fillText(`${nodeName}`, frt * nodeSizeWGaps.current + nodeSizeWGaps.current / 2 - (fontWidth / 2) + fretSpace, st * nodeSizeWGaps.current + nodeSizeWGaps.current / 2 + fontSizeRef.current / 2);
        }

        function drawText(frt: number, fretSpace: number, bold?: boolean,) {
            if (!canvasContext) return
            //draw the fret number

            canvasContext.fillStyle = "#fff"
            canvasContext.font = `${bold ? 'bold' : 'normal'} ${fontSizeRef.current * 1.4}px Arial`;

            const fontW = getFontWidth(`${frt}`)

            canvasContext.fillText(`${frt}`, frt * nodeSizeWGaps.current + nodeSizeWGaps.current / 2 - (fontW / 2) + fretSpace, nodeSizeWGaps.current / 2 + fontSizeRef.current / 2);
        }

        function fillFret(frt: number, fretSpace: number) {
            if (!canvasContext) return

            canvasContext.globalAlpha = 1
            canvasContext.fillStyle = "rgba(255, 255, 255, 0.08)"
            if (frt === 0) canvasContext.fillRect(frt * nodeSizeWGaps.current + fretSpace, 0, nodeSizeWGaps.current + fretspacing.current, (strings + 1) * nodeSizeWGaps.current)
            else canvasContext.fillRect(frt * nodeSizeWGaps.current + fretSpace, 0, nodeSizeWGaps.current, (strings + 1) * nodeSizeWGaps.current)
            canvasContext.globalAlpha = 1
        }

        if (!canvasContext) return
        //console.log("draw")
        clearCanvas()

        //for each fret
        for (let frt = 0; frt < frets; frt++) {
            const fretSpace = drawFretLine(frt)

            //if is over fret light up the fret
            if (isMouseFret(frt, frt == 0 ? fretspacing.current : fretSpace)) {
                fillFret(frt, fretSpace)
            }

            //draw the fret number
            drawText(frt, fretSpace, true)

            //for each string
            for (let st = 0; st < strings; st++) {
                const { x, y } = getXY(st + 1, frt, fretSpace)
                const nodeName = allNotesFromFrets[st][frt]
                canvasContext.globalAlpha = 0.5

                if (isMouseOverNode(x, y)) {
                    SelectedNode.current = { string: st, fret: frt }
                    canvasContext.globalAlpha = 1
                    drawNode(x, y, true, 60)

                }
                else {
                    drawNode(x, y, false)

                }

                const fontWidth = getFontWidth(nodeName)
                const firstLetter = getSingularLetter(nodeName, 0)
                const lastIndex = nodeName.toString().length - 1
                const secondLetter = getSingularLetter(nodeName, 1)
                const lastLetter = getSingularLetter(nodeName, lastIndex)

                assignColorToNode(firstLetter, secondLetter, lastLetter)
                drawNoteName(nodeName, frt, st + 1, fretSpace, fontWidth)
            }
        }

        //canvasContext && requestAnimationFrame(() => draw(canvasContext));
    }


    return (
        <canvas
            //width={tabwidth}
            width={frets * (nodeSizeState * (1 + gapBetweenNotes)) + fretspacing.current}
            //height={(strings + 1) * nodeSizeState}
            height={(strings + 1) * (nodeSizeState * (1 + gapBetweenNotes))}
            style={{
                border: "2px solid #5b6872",
                borderRadius: "0.4rem"
            }}
            onMouseMove={(e) => {
                mousePosRef.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
                requestAnimationFrame(() => draw());
            }}

            ref={canvasRef}
            {...props}
        />
    );
};

export default TabCanvas;
