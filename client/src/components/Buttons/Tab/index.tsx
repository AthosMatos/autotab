import styled from "styled-components";
import Colors from "../../../colors/Colors";
import smoothColors from "../../../colors/smoothColors";
import { ButtonWrapper } from "../styled";
import { useComponentViewContext } from "../../../contexts/ComponentView";

const SvgIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="261" height="220" viewBox="0 0 261 220"
            {...props}
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.82171 11.938V208.062C6.82171 210.888 9.11234 213.178 11.938 213.178H248.992C251.818 213.178 254.109 210.888 254.109 208.062V11.938C254.109 9.11234 251.818 6.82171 248.992 6.82171H11.938C9.11235 6.82171 6.82171 9.11234 6.82171 11.938ZM0 208.062C0 214.655 5.34482 220 11.938 220H248.992C255.585 220 260.93 214.655 260.93 208.062V11.938C260.93 5.34482 255.585 0 248.992 0H11.938C5.34482 0 0 5.34482 0 11.938V208.062Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M254.109 49.4574H15.3488V42.6357H254.109V49.4574ZM254.109 92.093H15.3488V85.2713H254.109V92.093ZM254.109 134.729H15.3488V127.907H254.109V134.729ZM254.109 177.364H15.3488V170.543H254.109V177.364Z" />
            <path d="M11.938 220C5.34482 220 0 214.655 0 208.062V11.938C0 5.34482 5.34482 0 11.938 0H26.4341V220H11.938Z" />
        </svg>
    )
}

const ButtonIcon = styled(SvgIcon)`
    //font-size: 1rem;
    width: 2rem;
    height: 2rem;
    //font-size: clamp(0.6rem, 1.4vw, 1.3rem)
    
`;
interface ButtonProps {
    onClick?: () => void;
}

export const ToogleTabButton = ({ onClick }: ButtonProps) => {
    const { toggleShowTab, showTab } = useComponentViewContext()

    return (
        <ButtonWrapper
            scale={false}
            style={{
                borderRadius: "10px",
            }}
            activatedcolor={smoothColors.greenDiamond}
            onClick={() => {
                toggleShowTab()
                onClick && onClick()
            }} isactivated={showTab}>
            <ButtonIcon fill={showTab ? Colors.backColor : "#696969"} />

        </ButtonWrapper>

    )
}