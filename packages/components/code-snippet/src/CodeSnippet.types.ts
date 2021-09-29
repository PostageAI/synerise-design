import * as React from 'react';
import { LanguageHighlight } from './Highlight/Highlight.types';

export enum FontSize {
  SMALL = 12,
  MEDIUM = 14,
}
export enum CodeSnippetType {
  INLINE = 'inline',
  SINGLE_LINE = 'single-line',
  MULTI_LINE = 'multi-line',
}
export interface CodeSnippetProps {
  type?: CodeSnippetType;
  colorSyntax?: boolean;
  className?: string;
  children?: string;
  expanded?: boolean;
  languages?: LanguageHighlight[];
  style?: React.CSSProperties;
  tooltipTitleHover?: string;
  tooltipTitleClick?: string;
  labelBeforeExpanded?: string;
  labelAfterExpanded?: string;
  fontSize?: FontSize;
  rows?: number;
  wrap?: boolean;
  onExpand?: () => void;
  onCopy?: () => void;
}
