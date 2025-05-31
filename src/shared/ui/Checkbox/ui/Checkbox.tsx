import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

const SCheckbox = styled.input`
  border-radius: 50%;
  border: #222222 1px solid;
  outline: none;
`;

interface CheckboxProps {
  children?: ReactNode;
  checked?: boolean;
  onChange?: () => void;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  return <SCheckbox type="checkbox" {...props} />;
};
