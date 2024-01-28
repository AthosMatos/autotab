import { contextsList } from "./contexts_list";

interface PropsI {
    children: React.ReactNode;
}

const GeneralContext = ({ children }: PropsI) => {
    return (
        <>
            {contextsList.reduceRight((acc, Context) => {
                return <Context>{acc}</Context>;
            }, children)}
        </>
    );
};

export default GeneralContext;