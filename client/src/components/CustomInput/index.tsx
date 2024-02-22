import * as React from 'react';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { style, styled as styledMui } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { Label } from '../../Pages/Main/styled';




const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,

      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

interface CustomInputI {
  onChange: (e: any, v: number | undefined) => void
  label: string;
  min: number;
  max: number;
  value?: number;
}


const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: center;
  gap: 10px;
`
export const CustomInput = (props: CustomInputI) => {
  const { onChange, label, max, min, value } = props
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <NumberInput
        value={value}
        onChange={onChange as any} aria-label={label} min={min} max={max} />
    </InputWrapper>
  )
}


const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

export const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styledMui('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${grey[300]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styledMui('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${grey[300]};
  background: #3f3f3f50;
  border: 1px solid #3f3f3f50;
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: #ffffff3d;
  }

  &:focus {
    border-color: #ffffff3d;
    box-shadow: 0 0 0 3px #4b4b4b;
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styledMui('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: #3f3f3f50;
  background: #3f3f3f50;
  color:  #696969;
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    //background: ${blue[700]};
    border-color: #ffffff3d;
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);
