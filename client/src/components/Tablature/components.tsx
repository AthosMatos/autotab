import { useEffect, useRef } from "react"
import { NoteWrapper } from "./styled"
import { getMarginLeft } from "./utils"

interface NoteI {
    children?: React.ReactNode,
    space?: "close" | "far" | "normal" | number
}

export const Note = (props: NoteI) => {
    return (
        <NoteWrapper style={{
            marginLeft: props.space === "close" ? 4 : props.space === "far" ? 15 : props.space === "normal" ? 8 : typeof props.space === "number" ? `${props.space}px` : 15,
        }}>
            <p style={{
                fontSize: '14px',
                color: '#d1d1d1',
                fontWeight: 'bold'

            }}>
                {props.children}
            </p>
        </NoteWrapper>
    )
}

export const Tunn = (props: NoteI) => {
    return (
        <NoteWrapper style={{
            marginLeft: '-25px',
        }}>
            <p style={{
                fontSize: '14px',
                color: '#d1d1d1',
            }}>
                {props.children}
            </p>
        </NoteWrapper>
    )
}

interface OrderI {
    children?: React.ReactNode,
    order: number,
    animIndex: number,
    orders: number[],
    setOrders: React.Dispatch<React.SetStateAction<number[]>>
    isNew?: boolean
    style?: React.CSSProperties
    updateAniIndex: (index: number) => void
    layers: {
        start: number;
        end: number;
    }[];
    layer: number
}
export const Order = (props: OrderI) => {
    const sizeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sizeRef.current && !props.isNew) {
            const width = sizeRef.current.offsetWidth
            //console.log('props.order', props.order)
            props.setOrders((orders) => {
                const ordersCopy = [...orders]
                //console.log('ordersCopy.len', ordersCopy.length)
                //console.log('props.order', props.order)
                //if (ordersCopy.length > props.order) {
                ordersCopy[props.order] = width
                /*}  else {
                    for (let i = ordersCopy.length; i < props.order; i++) {
                        ordersCopy.push()
                    }
                    ordersCopy.push(width)
                } */

                return ordersCopy
            })
        }
    }, [sizeRef.current])



    return <div
        onClick={() => {
            /* console.log('props.order', props.order)
            console.log('props.animIndex', props.animIndex)
            console.log('props.layer', props.layers)
            console.log('props.layers[props.layer]', props.layers[props.layer]) */
            props.updateAniIndex(props.order + (props.layers[props.layer].start))

        }}
        ref={sizeRef}
        style={Object.assign({
            position: 'absolute',
            display: 'flex',
            transition: 'all 0.3s ease-in-out',
            marginLeft: getMarginLeft(props.orders, props.order),
            cursor: 'pointer',
        },
            props.style
        )}>
        {props.children}
    </div>
}

