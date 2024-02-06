import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ArrayQueue, ConstantBackoff, Websocket, WebsocketBuilder, WebsocketEvent } from "websocket-ts";
import { HotToastError, HotToastPromise } from "../../components/Toast";
import { NotePositionType } from "../../utils/path";
import { InputI, useTabContext } from "../Tab";


interface WebsocketProviderI {
	children: React.ReactNode;
}
interface WebsocketContextI {
	connect: (url: string) => void;
	getWebSocket: () => Websocket;
	send: (message: MsgT, TabStates: InputI, type: 'predict' | 'update' | 'repredict') => void;
	isConnected: boolean;
	kPaths: KpredI[]
	preds: any
}

interface MsgT {
	data?: any;
}

const WebsocketContext = createContext<WebsocketContextI>({} as any);

interface KpredI {
	weight: number;
	path: {
		note: string;
		pos: {
			string: string;
			fret: string;
		};
	}[][];
}


export const WebsocketProvider = ({ children }: WebsocketProviderI) => {
	const ws = useRef<Websocket>();
	const [isConnected, setIsConnected] = useState(false)
	const [kPaths, setkPaths] = useState<KpredI[]>([]);
	const [preds, setPreds] = useState<any>();



	useEffect(() => {
		if (!ws.current) {
			return;
		}

		ws.current.addEventListener(WebsocketEvent.message, (event, m) => {

			if (JSON.parse(m.data)["type"] === 'update') {
				setkPaths(JSON.parse(m.data)["paths"]);
			}
			else if (JSON.parse(m.data)["type"] === 'predict' || JSON.parse(m.data)["type"] === 'repredict') {
				setkPaths(JSON.parse(m.data)["paths"]);
				setPreds(JSON.parse(m.data)["preds"]);
			}
		});
	}, [ws.current]);


	const checkIfReceivedMessage = (webSocket: Websocket) =>
		new Promise(async (resolve: (res: string) => void, reject: (res: string) => void) => {
			webSocket.addEventListener(WebsocketEvent.message, (event, m) => {
				if (JSON.parse(m.data)["type"] != 'error') {
					resolve("success");
				}
				else {
					reject("error");
				}
			});
		});

	function connect(url: string) {

		const checkIfConnected = (webSocket: Websocket) =>
			new Promise(async (resolve: (res: string) => void, reject: (res: string) => void) => {
				webSocket.addEventListener(WebsocketEvent.open, () => {
					//webSocket.send("Hello World!");
					resolve("success");
					setIsConnected(true);
				});
			});

		//check if url is a valid url
		if (!url || !url.includes("ws://")) {
			HotToastError("Web socket URL inválida!")
			return;
		}

		ws.current = new WebsocketBuilder(url)
			.withBuffer(new ArrayQueue()) // buffer messages when disconnected
			.withBackoff(new ConstantBackoff(1000)) // retry every 1s
			.build()

		HotToastPromise("Conectando ao servidor de processamento...", "Conectado ao servidor!", "Erro ao conectar!", checkIfConnected(ws.current))

	}

	function getWebSocket() {
		if (!isConnected || !ws.current) {
			throw new Error("WebSocket is not connected");
		}
		return ws.current;
	}

	function send(message: MsgT, TabStates: InputI, type: 'predict' | 'update' | 'repredict') {
		if (!isConnected || !ws.current) {
			console.log(isConnected, ws)
			console.log("WebSocket is not connected");
			return;
		}
		console.log("TabStates", TabStates);

		if (type === 'predict') {
			const msg = JSON.stringify({
				type: type,
				audio: message.data,
				k: TabStates.k,
				fretConfort: TabStates.fretConfort,
				slideTolerance: TabStates.slideTolerance,
				model: TabStates.model,
			});
			ws.current.send(msg);
		}
		else if (type === 'update') {
			const msg = JSON.stringify({
				type: type,
				preds: preds,
				k: TabStates.k,
				fretConfort: TabStates.fretConfort,
				slideTolerance: TabStates.slideTolerance,
				model: TabStates.model,
			});
			ws.current.send(msg);
		}
		else if (type === 'repredict') {
			const msg = JSON.stringify({
				type: type,
				preds: preds,
				k: TabStates.k,
				fretConfort: TabStates.fretConfort,
				slideTolerance: TabStates.slideTolerance,
				model: TabStates.model,
			});
			ws.current.send(msg);
		}
		HotToastPromise("Gerando Tablatura...", "Tablatura gerada!", "Não foram encontradas notas.", checkIfReceivedMessage(ws.current))
	}

	return (
		<WebsocketContext.Provider value={{
			kPaths, connect, getWebSocket, isConnected: isConnected, send, preds
		}}>
			{children}
		</WebsocketContext.Provider>
	);
};

export const useWebSocket = () => {
	const context = useContext(WebsocketContext);
	if (!context) {
		throw new Error(
			"useSpecificContext must be used within a SpecificProvider"
		);
	}
	return context;
};

