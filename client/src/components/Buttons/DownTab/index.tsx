import { CleanButtonWrapper } from "../styled";
import { FaAngleDoubleDown } from "react-icons/fa";
import smoothColors from "../../../colors/smoothColors";
import { useTabContext } from "../../../contexts/Tab";
import { useWebSocket } from "../../../contexts/WebSocket";
import { HotToastMessage, HotToastWarning } from "../../Toast";



export const DownTabButton = () => {
    const { MoveUpTab } = useTabContext()
    const { kPaths } = useWebSocket()

    return (
        <CleanButtonWrapper
            noBack={false}
            style={{
                width: '48px',
                height: '48px'
            }}
            onClick={() => {
                if (kPaths.length) MoveUpTab()
                else HotToastWarning('Sem tablatura para navegar')
            }} >
            <FaAngleDoubleDown color={smoothColors.softWhite} size={'1.5rem'} />
        </CleanButtonWrapper>
    )
}