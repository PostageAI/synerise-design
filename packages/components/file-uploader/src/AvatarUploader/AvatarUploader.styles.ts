import styled, { SimpleInterpolation, css } from 'styled-components';
import Typography, { Label as TypographyLabel } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon';
import { hexToRgba } from '@synerise/ds-utils';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;
export const UploaderContainer = styled.div`
  align-items: center;
  padding-right: 14px;
`;
export const Description = styled(Typography.Text)<{ hasError?: boolean }>`
  && {
    margin: ${(props): SimpleInterpolation => (props.hasError ? '4px 0 8px' : '16px 0 8px')};
    display: block;
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const DropAreaContainer = styled.div<{ canUploadMore: boolean }>`
  width: 100%;
  margin: ${(props): string => (props.canUploadMore ? '12px 0 8px' : '0')};
`;

export const DropAreaLabel = styled(Typography.Text)`
  color: ${(props): string => props.theme.palette['grey-700']};
  font-weight: 500;
`;

export const LargeDropAreaLabel = styled(TypographyLabel)`
  && {
    font-size: 14px;
    margin: 4px 0 0;
    display: block;
    color: ${(props): string => props.theme.palette['grey-700']};
  }
`;

export const LargeDropAreaDescription = styled(Typography.Text)`
  && {
    margin: 4px 0 0;
    display: block;
    color: ${(props): string => props.theme.palette['grey-700']};
  }
`;

export const DropAreaButton = styled.button<{
  isDropping?: boolean;
  hasError?: boolean;
  mode: string;
  pressed: boolean;
  filesLength: number;
}>`
  align-items: center;
  border: 1px dashed ${(props): string => props.theme.palette['grey-400']};
  padding: 11px 12px;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  width: 80px;
  height: 80px;
  transition: height 0.3s;

  ${(props): SimpleInterpolation =>
    props.mode === 'multi-large' &&
    props.filesLength === 0 &&
    `
      height: 108px;
      flex-direction: column;
      text-align: center;
      justify-content: center;
  `};

  ${IconContainer} {
    fill: ${(props): string => props.theme.palette['grey-800']};
  }

  span {
    display: inline-block;
    margin: 0 0 0 12px;
  }

  ${(props): SimpleInterpolation =>
    props.hasError &&
    `
      background-color: ${props.theme.palette['red-050']};
      border-color: ${props.theme.palette['red-600']};
    `}
  ${(props): SimpleInterpolation =>
    props.pressed &&
    !props.disabled &&
    css`
      &&&:active,
      &&& {
        background-color: ${hexToRgba(props.theme.palette['grey-200'], 0.4)};
      }
    `}


  &:hover:not(:disabled) {
    background-color: ${(props): string => hexToRgba(props.theme.palette['grey-200'], 0.2)};
    border-color: ${(props): string => props.theme.palette['grey-400']};

    ${DropAreaLabel}, ${LargeDropAreaLabel} {
      color: ${(props): string => props.theme.palette['grey-700']};
    }

    ${IconContainer} {
      fill: ${(props): string => props.theme.palette['grey-700']};
      color: ${(props): string => props.theme.palette['grey-700']};
    }
  }

  &:disabled {
    background-color: ${(props): string => props.theme.palette['grey-050']};
    ${LargeDropAreaLabel} {
      color: ${(props): string => props.theme.palette['grey-400']};
    }
  }

  &&:active {
    color: ${(props): string => props.theme.palette['red-400']};
    border-color: ${(props): string => props.theme.palette['grey-400']};
    background-color: ${(props): string => props.theme.palette['grey-050']};
  }

  &:focus:not(:active):not(:disabled) {
    border-color: ${(props): string => props.theme.palette['blue-600']};
    background-color: ${(props): string => props.theme.palette['blue-050']};
  }

  &:disabled {
    span,
    ${IconContainer} {
      opacity: 0.4;
    }
  }

  ${(props): SimpleInterpolation =>
    props.isDropping &&
    !props.disabled &&
    `
      height: ${props.mode === 'multi-large' ? '200px' : '80px'};
      background-color: ${props.theme.palette['blue-050']} !important;
      border-color: ${props.theme.palette['blue-300']} !important;

      span, ${DropAreaLabel}, ${LargeDropAreaLabel}, ${LargeDropAreaDescription} {
        color: ${props.theme.palette['blue-500']} !important;
      }

      ${IconContainer} {
        fill: ${props.theme.palette['blue-500']} !important;
      }
    `}
`;

export const ErrorMessage = styled(Typography.Text)`
  && {
    margin: 8px 0 0;
    display: block;
    color: ${(props): string => props.theme.palette['red-600']};
  }
`;

export const Label = styled(TypographyLabel)`
  && {
    cursor: initial;
    margin: 0 0 8px;
    display: flex;
    align-items: center;

    ${IconContainer} {
      fill: ${(props): string => props.theme.palette['grey-400']};
    }
  }
`;
