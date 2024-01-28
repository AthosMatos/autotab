import { String, TabWrapper, TablatureContainer } from "./styled";
import { Tunn } from "./components";
import useTablature from "./useTablature";
import { getMarginLeft } from "./utils";

interface TablatureI {
    width: number
}
const Tablature = (props: TablatureI) => {

    const { funcs, states } = useTablature()
    const overHeight = 40

    return (
        <TablatureContainer
            width={props.width}
            ref={states.TabWrapperRef}>
            {
                states.layers.map((interval, index) => {
                    //console.log('interval', interval)
                    //console.log('aniIndex', aniIndex - interval.start)
                    return (
                        <TabWrapper
                            style={{
                                opacity: states.showTab ? 1 : 0,
                                transition: 'all 0.4s ease-in-out'
                            }}
                            key={index}
                            width={props.width}
                            ref={states.TabWrapperRef}>

                            {states.animIndex >= interval.start && states.animIndex < interval.end && states.TabWrapperHeight > 0 && <div style={{
                                position: 'absolute',
                                width: '15px',
                                height: `${states.TabWrapperHeight + overHeight}px`,
                                backgroundColor: '#d1d1d136',
                                translate: `0px -${overHeight / 2}px`,
                                borderRadius: '10px',
                                marginLeft: `${getMarginLeft(states.orders, states.animIndex - interval.start) + 15}px`,
                                zIndex: 100,
                                transition: 'all 0.12s ease-in-out'
                            }} />}

                            <String >
                                {index == 0 && <Tunn >e</Tunn>}
                                {funcs.translateDataToTab(index, 5)}
                            </String>

                            <String >
                                {index == 0 && <Tunn >B</Tunn>}
                                {funcs.translateDataToTab(index, 4)}
                            </String>
                            <String >
                                {index == 0 && <Tunn >G</Tunn>}
                                {funcs.translateDataToTab(index, 3)}
                            </String>
                            <String >
                                {index == 0 && <Tunn >D</Tunn>}
                                {funcs.translateDataToTab(index, 2)}
                            </String>
                            <String >
                                {index == 0 && <Tunn >A</Tunn>}
                                {funcs.translateDataToTab(index, 1)}
                            </String>
                            <String >
                                {index == 0 && <Tunn >E</Tunn>}
                                {funcs.translateDataToTab(index, 0)}
                            </String>
                        </TabWrapper>
                    )
                })
            }
        </TablatureContainer>
    )
}

export default Tablature;
