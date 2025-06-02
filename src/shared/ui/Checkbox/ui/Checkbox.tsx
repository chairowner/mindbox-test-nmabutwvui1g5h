import type { FC, ReactNode } from 'react';
import s from './CheckBox.module.scss';

interface CheckboxProps {
  children?: ReactNode;
  checked?: boolean;
  onChange?: () => void;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <label className={s.checkbox}>
      <input type="checkbox" {...props} />
      <span className={s.mark} />
    </label>
  );
};
