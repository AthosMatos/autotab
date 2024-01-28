import styled from "styled-components";
import Colors from "../../colors/Colors";

const DimAmount = 0.3;

export const String = styled.div`
    width: 100%;
    height: 1px;
    background-color:rgba(255, 255, 255, ${DimAmount});
    border-radius: 50px;
    display: flex;
    //gap: 6px;
`;

export const TabWrapper = styled.div<{ width: number | string }>`
    display: flex;
    flex-direction: column;
    //align-items: center;
    gap: 20px;
    //width: 800px;
    width: ${({ width }) => typeof width === 'number' ? `${width}px` : width};
    border-left: 1px solid rgba(255, 255, 255,${DimAmount});
    border-right: 1px solid rgba(255, 255, 255, ${DimAmount});
`;
export const TablatureContainer = styled.div<{ width: number | string }>`
    display: flex;
    flex-direction: column;
    //align-items: center;
    gap: 40px;
`


export const NoteWrapper = styled.div`
    width: 15px;
    height: 20px;
    background-color: ${Colors.backColor};
    translate: 0px -10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;