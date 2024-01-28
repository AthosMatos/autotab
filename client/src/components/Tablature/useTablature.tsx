import { useEffect, useRef, useState } from "react"
import { Note, Order } from "./components"

import { useTabContext } from "../../contexts/Tab"
import { usePlaybackContext } from "../../contexts/Playback/usePlaybackContext"



const useTablature = () => {
    const { notesPreds } = useTabContext()
    const [orders, setOrders] = useState<number[]>([])
    const [layers, setLayers] = useState<{ start: number, end: number }[]>([])
    const [NotesData, setNotesData] = useState<any[]>([])
    const [NotesDataNew, setNotesDataNew] = useState<any[]>([])
    const [showTab, setShowTab] = useState(false)
    const { aniIndex, updateAniIndex } = usePlaybackContext()

    const TabWrapperRef = useRef<HTMLDivElement>(null)
    const [TabWrapperHeight, setTabWrapperHeight] = useState(0)
    const [TabWrapperWidth, setTabWrapperWidth] = useState(0)
    //console.log(data)

    useEffect(() => {
        if (NotesDataNew) {
            setTimeout(() => {
                setShowTab(true)
            }, 400)
        }
    }, [NotesDataNew])

    useEffect(() => {
        if (orders.length && NotesData.length && NotesDataNew.length == 0) {
            const layersCopy = [...layers]
            const ntsDataNew: any[] = []
            let NotesWSum = 0
            let layerIndex = 1
            let currStart = 0
            //console.log('orders', orders)
            //console.log('orders.length', orders.length)
            //console.log('NotesData', NotesData)
            for (let i = 0; ; i++) {
                NotesWSum += orders[i]
                /* console.log('NotesWSum', NotesWSum)
                console.log('TabWrapperWidth * layerIndex', TabWrapperWidth * layerIndex)
                console.log('i', i) */

                if (i >= orders.length) {
                    if (!layersCopy[layerIndex - 1]) {
                        layersCopy[layerIndex - 1] = { start: 0, end: 0 }
                    }
                    layersCopy[layerIndex - 1].end = i + 3
                    layersCopy[layerIndex - 1].start = currStart

                    if (!ntsDataNew[layerIndex - 1]) {
                        ntsDataNew[layerIndex - 1] = []
                    }

                    const nData: any[] = []
                    for (let k = 0; k < NotesData[0].length; k++) {

                        const ntsCpy = [...NotesData[0][k]]
                        nData.push(ntsCpy.slice(currStart, i))
                    }
                    ntsDataNew[layerIndex - 1] = nData

                    break
                }

                //console.log('TabWrapperWidth * layerIndex', TabWrapperWidth * layerIndex)
                if (NotesWSum > TabWrapperWidth * layerIndex) {
                    if (!layersCopy[layerIndex - 1]) {
                        layersCopy[layerIndex - 1] = { start: 0, end: 0 }
                    }
                    layersCopy[layerIndex - 1].end = i
                    layersCopy[layerIndex - 1].start = currStart

                    if (!ntsDataNew[layerIndex - 1]) {
                        ntsDataNew[layerIndex - 1] = []
                    }

                    const nData: any[] = []
                    //console.log('currStart, i', currStart, i)
                    //console.log('NotesData[0]', NotesData[0])
                    for (let k = 0; k < NotesData[0].length; k++) {
                        const ntsCpy = [...NotesData[0][k]]
                        nData.push(ntsCpy.slice(currStart, i))
                    }

                    ntsDataNew[layerIndex - 1] = nData

                    currStart = i
                    layerIndex++
                }
                //
            }
            /* console.log('NotesWSum', NotesWSum)
            console.log('TabWrapperWidth', TabWrapperWidth)
            console.log('layersCopy', layersCopy)
            console.log('ntsDataNew', ntsDataNew)
            console.log('NotesData', NotesData)
            console.log('orders', orders) */

            setLayers(layersCopy)
            setNotesDataNew(ntsDataNew)
        }

    }, [orders, NotesData])


    useEffect(() => {
        if (TabWrapperRef.current) {
            //console.log(TabWrapperRef.current.offsetWidth)
            setTabWrapperHeight(TabWrapperRef.current.offsetHeight)
            setTabWrapperWidth(TabWrapperRef.current.offsetWidth)
        }
    }, [TabWrapperRef.current])

    useEffect(() => {
        if (notesPreds) {
            setNotesDataNew([])
            const data: any[] = []
            for (let i = 0; i < 6; i++) {
                data.push([])
            }
            //console.log(data)
            notesPreds.forEach((notes, order) => {
                notes.forEach((note) => {
                    if (!data[Number(note.pos.string)][order]) {
                        data[Number(note.pos.string)][order] = []
                    }
                    //console.log(note.pos.fret == undefined)
                    data[Number(note.pos.string)][order].push(note.pos.fret)
                })
            })
            //console.log('[data]', [data])


            setNotesData([data])
            let PrevsLen = 0
            setLayers([data].map((strings) => {
                //console.log('strings', strings)
                let maxLen = 0
                strings.forEach((notes) => {
                    if (notes.length > maxLen) maxLen = notes.length
                })
                //console.log('maxLen', maxLen)
                const retValue = PrevsLen + maxLen
                const interval = { start: PrevsLen, end: retValue }
                PrevsLen += maxLen
                return interval
            }))
        }
    }, [notesPreds])


    function translateDataToTab(layer: number, string: number) {
        const NotesD = NotesDataNew.length ? NotesDataNew : NotesData

        //console.log('NotesDataNew', NotesDataNew)
        //console.log('layer', layer)
        //console.log('string', string)
        //console.log('NotesD[layer][string]', NotesD[layer][string])


        if (NotesD[layer] && NotesD[layer][string]) {
            return NotesD[layer][string].map((notes: number[] | undefined, order: number) => {

                if (notes) {
                    return (<Order
                        layer={layer}
                        layers={layers}
                        animIndex={aniIndex}
                        updateAniIndex={updateAniIndex}
                        /* style={{
                            backgroundColor: 'red'
                        }} */
                        key={order}
                        order={order}
                        orders={orders}
                        setOrders={setOrders}
                        isNew={NotesDataNew.length ? true : false}  >
                        {
                            notes?.map((note: number, index) => {
                                return <Note key={index}>{note}</Note>
                            })
                        }
                    </Order>)
                }
            })
        }
    }

    return {
        funcs: {
            translateDataToTab
        },
        states: {
            TabWrapperHeight,
            TabWrapperRef,
            TabWrapperWidth,
            showTab,
            layers,
            animIndex: aniIndex,
            orders
        }
    }
}

export default useTablature