import { CleanButtonWrapper } from "../styled";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useTabContext } from "../../../contexts/Tab";
import { useWebSocket } from "../../../contexts/WebSocket";
import { HotToastMessage, HotToastWarning } from "../../Toast";


export const UpTabButton = () => {
    const { MoveDownTab } = useTabContext()
    const { kPaths } = useWebSocket()
    return (
        <CleanButtonWrapper
            noBack={false}
            style={{
                width: '48px',
                height: '48px'
            }}
            onClick={() => {
                if (kPaths.length) MoveDownTab()
                else HotToastWarning('Sem tablatura para navegar')
            }} >
            <FaAngleDoubleUp color={'#ffffff37'} size={'1.5rem'} />
        </CleanButtonWrapper>
    )
}