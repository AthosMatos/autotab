import styled from "styled-components";
import Colors from "../../colors/Colors";

interface ButtonsContainerProps {
    gap?: number;
    children: React.ReactNode;
    section: string
    style?: React.CSSProperties
}
const BC = styled.div<{ gap?: number }>`
    display: flex;
    //justify-content: center;
    align-items: center;
    //width: fit-content;
    //height: 52px;
    //height: fit-content;
    //max-height: 76px;
    gap: ${(props) => props.gap ?? 15}px;
    padding: 1.2vh 0.7vw;
    //margin: 25px 0px;
    //border: 1px solid black;
    //background-color: #3f3f3f50;
    border-radius: 10px;
`

export const ButtonsContainer = (props: ButtonsContainerProps) => {
    const { gap } = props


    return (<div style={Object.assign({
        gap: 10,
        display: 'flex',
        flexDirection: 'column',
    }, props.style)}>
        <p style={{
            margin: 0,
            padding: 0,
            color: Colors.white,
            fontSize: '1.2rem',
            fontWeight: 'bold'
        }}>{props.section}</p>
        <BC gap={gap}>
            {props.children}
        </BC>
    </div>)
}


export interface ButtonWrapperProps {
    isactivated?: boolean;
    scale?: boolean;
    activatedcolor?: string;
    backgroundcolor?: string;
    hover?: boolean;
    clicable?: boolean;
    color?: string;
    noBack?: boolean
}
export const CleanWrapper = styled.div<ButtonWrapperProps>`
    
    user-select: none;
    //margin: 10px;
    //box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    transition: scale 0.2s ease, background-color 0.4s ease;
    color: ${({ color }) => color ?? '#ffffffd1;'};
`;

export const CleanButtonWrapper = styled.div<ButtonWrapperProps>`
    display: flex;
    background-color: ${({ backgroundcolor, isactivated, activatedcolor, noBack }) => isactivated ? activatedcolor : backgroundcolor ?? noBack == false ? 'none' : '#5353533a'};
    border-radius:5px;
    //padding: 0.9rem;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    user-select: none;
    //margin: 10px;
    cursor: pointer;

    transition: scale 0.2s ease, background-color 0.4s ease;
    

    ${({ hover }) => (hover == undefined || hover == true) && `
    &:hover {
        background-color: #2e2e2eab;
        outline: 1px solid #ffffff3d;
    }
    `}
    scale: ${({ isactivated: isActivated }) => isActivated && 1.1};
    //trigger is activated
    
    ${({ clicable }) => (clicable == true || clicable == undefined) && `
    &:active {
        scale: 0.9;
    }
    `}
`;

export const SimpleButtonWrapper = styled.div`
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        background-color: #3f3f3f50;
        height: 41.5px;
        color: #ffffffd1;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;

        transition: scale 0.2s ease, background-color 0.4s ease; //outline 0.2s ease;

        &:hover {
            outline: 1px solid #ffffff3d;
            scale: 1.05;
        }

        &:active {
            scale: 0.9;
        }
`

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    display: flex;
    background-color: ${({ backgroundcolor, isactivated, activatedcolor }) => isactivated ? activatedcolor : backgroundcolor ?? '#2f2f2f'};
    border-radius:50%;
    //padding: 0.9rem;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    user-select: none;
    //margin: 10px;
    cursor: pointer;
    //box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    transition: scale 0.2s ease, background-color 0.4s ease;
    color: ${({ color }) => color ?? '#ffffffd1;'};

    ${({ hover }) => (hover == undefined || hover == true) && `
    &:hover {
        scale: 1.1;
        outline: 1px solid #616161;
    }
    `}
    scale: ${({ isactivated: isActivated, scale }) => isActivated && scale != false && 1.1};
    //trigger is activated
    
    ${({ clicable }) => (clicable == true || clicable == undefined) && `
    &:active {
        scale: 0.9;
    }
    `}
`;

export const ButtonWrapperasLabel = styled.label<ButtonWrapperProps>`
    display: flex;
    background-color: ${({ backgroundcolor, isactivated, activatedcolor }) => isactivated ? activatedcolor : backgroundcolor ?? '#2f2f2f'};
    border-radius:50%;
    //padding: 0.9rem;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    user-select: none;
    //margin: 10px;
    cursor: pointer;
    //box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    transition: scale 0.2s ease, background-color 0.4s ease;
    color: ${({ color }) => color ?? '#ffffffd1;'};

    ${({ hover }) => (hover == undefined || hover == true) && `
    &:hover {
        scale: 1.1;
        outline: 1px solid #616161;
    }
    `}
    scale: ${({ isactivated: isActivated, scale }) => isActivated && scale != false && 1.1};
    //trigger is activated
    
    ${({ clicable }) => (clicable == true || clicable == undefined) && `
    &:active {
        scale: 0.9;
    }
    `}
`;

