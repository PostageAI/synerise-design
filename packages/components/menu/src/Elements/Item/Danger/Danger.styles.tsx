import styled from 'styled-components';
import * as React from 'react';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';
import Text from '../Text/Text';
import { ContentWrapper, PrefixelWrapper } from '../Text/Text.styles';

// eslint-disable-next-line import/prefer-default-export
export const DangerItem = styled(({ children, disabled, clickable, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Text disabled={disabled} clickable={clickable} {...rest}>
    {children}
  </Text>
))`
  &&& {
    &.ant-menu-submenu-disabled {
      color: ${(props): string => props.theme.palette['red-600']};
      svg {
        fill: ${(props): string => props.theme.palette['red-600']};
      }
    }
    color: ${(props): string => props.theme.palette['red-600']};
    ${ContentWrapper} {
      color: ${(props): string => props.theme.palette['red-600']};
    }
    ${PrefixelWrapper} {
      .ds-icon > svg {
        ${(props): string =>
          `
          fill: ${props.theme.palette['red-600']};
        `}
      }
    }
    &:hover {
      ${(props): string | false =>
        !props.disabled &&
        `
        ${PrefixelWrapper} > ${IconContainer} > svg {
          fill: ${props.theme.palette['red-600']} !important;
        }
        background: ${props.theme.palette['red-050']};
      `}
    }
    &:focus {
      ${(props): string | false =>
        !props.disabled &&
        `
        ${PrefixelWrapper} > ${IconContainer} > svg {
          fill: ${props.theme.palette['red-600']} !important;
        }
        ${props.clickable && `background: ${props.theme.palette['red-050']} !important;`}
      `}
    }
    &:focus:active {
      ${(props): string | false =>
        !props.disabled &&
        props.clickable &&
        `
        background: ${props.theme.palette['red-100']} !important;
      `}
    }
  }
`;
