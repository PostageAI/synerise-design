import styled from 'styled-components';
import { IconContainer } from '@synerise/ds-icon';

// eslint-disable-next-line import/prefer-default-export
export const ItemActionsWrapper = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  span {
    margin: 0 0 0 8px;
  }
  ${IconContainer}:hover {
    svg {
      fill: ${({ theme }): string => theme.palette['blue-600']};
    }
  }
`;
