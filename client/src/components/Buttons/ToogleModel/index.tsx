import styled from "styled-components";
import { Label } from "../../../Pages/Main/styled";
import { useTabContext } from "../../../contexts/Tab";


const Container = styled.div`
        display: flex;
        gap: 10px;
        flex-direction: column;
    `

const ButtonWrapper = styled.div`
        display: flex;
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
    `

const ToogleModelButton = () => {
    const { updateInputs, model } = useTabContext()

    const modelOrder = ['mix', 'notes', 'chords']



    function updateModel() {
        updateInputs({ model: modelOrder[(modelOrder.indexOf(model) + 1) % modelOrder.length] })
    }
    return (
        <Container >
            <Label>Modelo</Label>
            <ButtonWrapper
                onClick={updateModel}>

                <p style={{

                    margin: 0,
                    padding: 0,
                    color: '#ffffff3e',
                    fontSize: '1rem',
                    fontWeight: 'bold'

                }}>{model}</p>
            </ButtonWrapper>

        </Container>

    )
}


export default ToogleModelButton;



