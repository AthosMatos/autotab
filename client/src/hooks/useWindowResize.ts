import { useEffect, useState } from "react";

const useWindowResize = (resize?: number) => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth * (resize ? resize : 1),
		height: window.innerHeight * (resize ? resize : 1),
	});

	useEffect(() => {
		const updateWindowSize = () => {
			const res = resize ? resize : 1;

			setWindowSize({
				width: window.innerWidth * res,
				height: window.innerHeight * res,
			});
		};

		window.addEventListener("resize", updateWindowSize);

		return () => window.removeEventListener("resize", updateWindowSize);
	}, []);

	return windowSize;
};

export default useWindowResize;
