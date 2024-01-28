import styled from "styled-components";
import Colors from "../../../colors/Colors";
import smoothColors from "../../../colors/smoothColors";
import { ButtonWrapper } from "../styled";
import { useComponentViewContext } from "../../../contexts/ComponentView";

const SvgIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="261"
            height="220"
            viewBox="0 0 261 220"

            {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.82171 11.938V208.062C6.82171 210.888 9.11234 213.178 11.938 213.178H130.465H248.992C251.818 213.178 254.109 210.888 254.109 208.062V11.938C254.109 9.11234 251.818 6.82171 248.992 6.82171H11.938C9.11235 6.82171 6.82171 9.11234 6.82171 11.938ZM0 208.062C0 214.655 5.34482 220 11.938 220H248.992C255.585 220 260.93 214.655 260.93 208.062V11.938C260.93 5.34482 255.585 0 248.992 0H11.938C5.34482 0 0 5.34482 0 11.938V208.062Z" />
            <circle cx="47" cy="39" r="12" />
            <circle cx="80" cy="39" r="12" />
            <circle cx="113" cy="39" r="12" />
            <circle cx="146" cy="39" r="12" />
            <circle cx="179" cy="39" r="12" />
            <circle cx="212" cy="39" r="12" />
            <circle cx="47" cy="74" r="12" />
            <circle cx="80" cy="74" r="12" />
            <circle cx="113" cy="74" r="12" />
            <circle cx="146" cy="74" r="12" />
            <circle cx="179" cy="74" r="12" />
            <circle cx="212" cy="74" r="12" />
            <circle cx="47" cy="109" r="12" />
            <circle cx="80" cy="109" r="12" />
            <circle cx="113" cy="109" r="12" />
            <circle cx="146" cy="109" r="12" />
            <circle cx="179" cy="109" r="12" />
            <circle cx="212" cy="109" r="12" />
            <circle cx="47" cy="144" r="12" />
            <circle cx="80" cy="144" r="12" />
            <circle cx="113" cy="144" r="12" />
            <circle cx="146" cy="144" r="12" />
            <circle cx="179" cy="144" r="12" />
            <circle cx="212" cy="144" r="12" />
            <circle cx="47" cy="179" r="12" />
            <circle cx="80" cy="179" r="12" />
            <circle cx="113" cy="179" r="12" />
            <circle cx="146" cy="179" r="12" />
            <circle cx="179" cy="179" r="12" />
            <circle cx="212" cy="179" r="12" />
        </svg>
    )
}

const ButtonIcon = styled(SvgIcon)`
    //font-size: 1rem;
    fill: #696969;
    width: 2rem;
    height: 2rem;
    
    
`;
interface ButtonProps {
    onClick?: () => void;
}

export const ToogleNotesFretViewButton = ({ onClick }: ButtonProps) => {

    const { toggleShowNotesFretView, showNotesFretView } = useComponentViewContext()
    return (
        <ButtonWrapper
            scale={false}
            style={{
                borderRadius: "10px",
            }}
            activatedcolor={smoothColors.greenDiamond}
            onClick={() => {
                toggleShowNotesFretView()
                onClick && onClick()
            }} isactivated={showNotesFretView}>
            <ButtonIcon />

        </ButtonWrapper>

    )
}