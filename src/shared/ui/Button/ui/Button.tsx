import type { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

const SButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
`;

export const Button: FC<HTMLAttributes<HTMLButtonElement>> = ({ children }) => {
  return <SButton>{children}</SButton>;
};
