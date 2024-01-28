import styled, { keyframes, css } from "styled-components";

export const Node = styled.div<{
  color: string;
  isbutton: boolean;
  frets: number;
  Tabw: number;
  activated: boolean;
  filterOff?: boolean;
  forceShadow?: boolean;
}>`
  width: ${(props) => (props.Tabw / props.frets) * 0.68}px;
  height: ${(props) => (props.Tabw / props.frets) * 0.68}px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) =>
    props.forceShadow ? "5px 0px 10px 0px rgba(0,0,0,0.75)" : "none"};
  transition: 0.2s ease, scale 0.1s ease;
  user-select: none;
  filter: ${(props) =>
    props.filterOff == undefined || props.filterOff == false
      ? "brightness(0.4)"
      : "brightness(1)"};
  cursor: ${(props) => (props.isbutton ? "pointer" : "default")};
  animation-name: opacity;
  animation-duration: 0.8s;
  animation-timing-function: ease;

  ${(props) =>
    props.activated
      ? `
			filter: brightness(1);
			box-shadow: 5px 0px 10px 0px rgba(0,0,0,0.75);
			scale: 1.15;
		`
      : props.isbutton &&
        `&:hover {
				//brighten the color with effects
				filter: brightness(1);
				box-shadow: 5px 0px 10px 0px rgba(0,0,0,0.75);
				scale: 1.15;
			}
		`}
  ${(props) =>
    props.isbutton &&
    `&:active {
			scale: 0.9;
			}
		`}
		

	@keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const NodeText = styled.p<{
  color: string;
  Tabw: number;
  increasetext?: number;
}>`
  font-size: ${(props) =>
    (props.Tabw / 100) * (props.increasetext ? props.increasetext : 1)}px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

export const Fret = styled.div<{ frets: number; TabW: number }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.TabW / props.frets}px;
  justify-content: space-around;
  align-items: center;
  //background-color: blue;
  border: 1px solid #5b6872;
  transition: border-color 0.2s ease, background-color 0.1s ease;
  &:hover {
    //border-color: #ffcb05;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const TabWrapper = styled.div<{
  width: number;
  height: number;
}>`
  display: flex;
  flex-direction: row;
  border: 2px solid #5b6872;
  width: ${(props) => props.width}px;
  height: ${(props) =>
    props.width / props.height > 4 ? props.width / 4 : props.height}px;
  border-radius: ${(props) =>
    (props.width / (props.height ? props.height : props.width / 4)) * 2}px;
  overflow: hidden;
  //background-color: red;

  animation-fill-mode: forwards;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-play-state: running;
  animation-name: width;

  @keyframes width {
    from {
      width: 0px;
    }
    to {
      width: ${(props) => props.width}px;
    }
  }
`;
