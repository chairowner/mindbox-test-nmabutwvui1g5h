import { getTodos } from '@/shared/lib';
import { TodoWidget } from '@/widgets';
import s from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1>todos</h1>
        <TodoWidget initialState={getTodos()} />
      </div>
    </div>
  );
};
