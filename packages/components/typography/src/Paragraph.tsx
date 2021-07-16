import * as React from 'react';
import { MediumParagraph, SmallParagraph, XSmallParagraph } from './CommonElements';

type TextProps = {
  size?: 'medium' | 'small' | 'xsmall';
};

const MapSizeToComponent = {
  medium: MediumParagraph,
  small: SmallParagraph,
  xsmall: XSmallParagraph,
};

export const Paragraph: React.FC<TextProps> = ({ size = 'medium', children }) => {
  const Component = MapSizeToComponent[size];
  return <Component className="ds-paragraph">{children}</Component>;
};
