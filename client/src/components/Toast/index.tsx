import { CSSProperties } from "react";
import toast from "react-hot-toast";
import Colors from "../../colors/Colors";

const stdStyle: CSSProperties = {
    borderRadius: '3px',
    color: '#fff',
}

export function HotToastSucess(text: string) {
    toast(text, {

        style: {
            ...stdStyle,
            background: '#478572',
        },
    })
}

export function HotToastMessage(text: string) {
    toast(text, {
        style: {
            ...stdStyle,
            background: '#333',
        }
    })
}
export function HotToastError(text: string) {
    toast(text, {
        style: {
            ...stdStyle,
            background: '#f76b6b49',
        }
    })
}
export function HotToastWarning(text: string) {
    toast(text, {
        style: {
            ...stdStyle,
            background: '#ffde5847',
        }
    })
}
export function HotToastPromise(loadingText: string, successText: string, errorText: string, promise: Promise<any>) {
    toast.promise(promise, {
        loading: loadingText,
        success: successText,
        error: errorText,
    }, {
        style: {
            ...stdStyle,
            background: '#e0e0e047',
        }
    })
}