import * as React from 'react';

export enum LoaderSize {
  'S' = 12,
  'M' = 20,
  'L' = 40,
}
export enum FontSize {
  'small' = 14,
  'medium' = 18,
}

export type LoaderProps = {
  size?: 'S' | 'M' | 'L';
  fontSize?: 'small' | 'medium';
  text?: string | React.ReactNode;
  label?: string | React.ReactNode;
  labelPosition?: 'bottom' | 'right';
  mode?: 'absolute';
  percent?: number | React.ReactNode;
  percentFormatter?: (percent?: number | React.ReactNode) => React.ReactNode;
  color?:
    | string
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
};
