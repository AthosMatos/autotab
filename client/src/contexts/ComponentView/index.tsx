import { createContext, useContext, useEffect, useState } from "react";


interface ComponentViewContextI {
    showNotesFretView: boolean
    showTab: boolean
    toggleShowNotesFretView: () => void
    toggleShowTab: () => void
}
const ComponentViewContext = createContext<ComponentViewContextI>({} as any);

export const ComponentViewProvider = (props: any) => {
    const [showNotesFretView, setShowNotesFretView] = useState(false)
    const [showTab, setShowTab] = useState(false)


    function toggleShowNotesFretView() {
        setShowNotesFretView(!showNotesFretView)
    }
    function toggleShowTab() {
        setShowTab(!showTab)
    }

    return (
        <ComponentViewContext.Provider value={{
            showNotesFretView,
            showTab,
            toggleShowNotesFretView,
            toggleShowTab
        }}>
            {props.children}
        </ComponentViewContext.Provider>
    );
};

export const useComponentViewContext = () => {

    const context = useContext(ComponentViewContext);
    if (!context) {
        throw new Error(
            "useSpecificContext must be used within a SpecificProvider"
        );
    }
    return context;
};
