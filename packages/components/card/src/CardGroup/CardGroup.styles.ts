import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div<{ items: number }>`
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  grid-template-columns: ${(props): string => [...new Array(props.items)].map(() => '1fr').join(' ')};
  width: 100%;
`;
