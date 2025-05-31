import { TodoWidget } from '@/widgets';
import styled from 'styled-components';

const SWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: #e9dad9;
    font-size: 72px;
    font-weight: 100;
    text-align: center;
  }
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MainPage = () => {
  return (
    <SWrapper>
      <SContainer>
        <h1>todos</h1>
        <TodoWidget
          initialState={[
            { id: 'aaFw315', state: false, text: 'Тестовое задание' },
            { id: 'aaFw312', state: true, text: 'Прекрасный код' },
            { id: 'aaFw316', state: false, text: 'Покрытие тестами' },
          ]}
        />
      </SContainer>
    </SWrapper>
  );
};
