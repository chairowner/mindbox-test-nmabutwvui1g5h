import type { FC, ReactNode } from 'react';
import s from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  selected,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={selected}
      className={classNames(s.button, selected && s.selected, className)}
    >
      {children}
    </button>
  );
};
