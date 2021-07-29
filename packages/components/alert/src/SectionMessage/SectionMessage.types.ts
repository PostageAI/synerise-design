import { AlertProps } from 'antd/lib/alert';
import * as React from 'react';
import { AlertType } from '../ColorSemantic/AlertSemanticColor.types';

export type AlertTypes = Exclude<AlertType,'informative'>
export type CustomColorType =
  | 'blue'
  | 'grey'
  | 'red'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';
export type ColorType = 'grey' | 'red' | 'green' | 'yellow' | 'violet' | 'purple' | 'cyan';
export type ModeType = 'background' | 'background-outline' | 'outline' | 'clear';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  message?: React.ReactNode;
  type: string | AlertTypes;
  customColor?: CustomColorType;
  customColorIcon?: CustomColorType;
  color?: ColorType;
  mode?: ModeType;
  showMoreLabel?: React.ReactNode;
  onShowMore?: () => void;
  newClient?: boolean | React.ReactNode;
  moreButtons?: boolean | React.ReactNode;
  withEmphasis?: React.ReactNode;
  withLink?: React.ReactNode;
  unorderedList?: React.ReactNode;
  withClose?: React.ReactNode;
  customIcon?: React.ReactElement;
  textButton?: string;
}
