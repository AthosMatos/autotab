import { CleanWrapper } from "../Buttons/styled";
import smoothColors from "../../colors/smoothColors";
import { FaSignsPost, FaWeightHanging } from "react-icons/fa6";
import Colors from "../../colors/Colors";

interface ButtonProps {
    index: number;
    weight?: boolean;
    children?: React.ReactNode;
}

const IndexViewer = ({ index, weight, children }: ButtonProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.darkGrey,
            gap: 10,
            //outline: '1px solid rgba(77, 77, 77, 0.308)',
            height: '48px',
            padding: '0rem 0.5rem',
            borderRadius: '5px',
            justifyContent: 'space-between',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,

            }}>

                {weight ? <FaWeightHanging color={'#ffffff3d'} size={'1.5rem'} /> : <FaSignsPost color={'#ffffff3d'} size={'1.5rem'} />}

                <CleanWrapper
                    style={{
                        display: 'flex',
                        color: Colors.grey,
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        width: '40px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    {index}
                </CleanWrapper>
            </div>
            {children}
        </div>
    )
}


export default IndexViewer;



