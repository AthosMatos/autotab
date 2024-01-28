import styled from "styled-components";
import Colors from "../../colors/Colors";
import smoothColors from "../../colors/smoothColors";


export const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Label = styled.label`
  color: ${Colors.grey};
  font-weight: bold;
`
export const Text = styled.p`
    font-size: 0.8rem;
    color: white;
    margin: 0;
    padding: 0;
`;

export const Input = styled.input`
    //width: 100%;
    height: 2rem;
    border-radius: 5px;
    border: none;
    background-color: ${Colors.darkGrey};
    color: white;
    padding: 0px 10px;
    font-size: 0.8rem;
    &:focus {
        outline: none;
    }
`;


export const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    //min-height: 100vh;
    gap: 50px;
`;