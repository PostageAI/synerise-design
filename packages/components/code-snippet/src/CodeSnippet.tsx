import * as React from 'react';

import InlineCode from './CodeTypes/InlineCode/InlineCode';
import SingleCode from './CodeTypes/SingleCode/SingleCode';
import MultiCode from './CodeTypes/MultiCode/MultiCode';
import { CodeSnippetProps, CodeSnippetType, FontSize } from './CodeSnippet.types';

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  type = CodeSnippetType.INLINE,
  languages = ['javascript', 'typescript', 'json'],
  children = '',
  colorSyntax = false,
  fontSize = FontSize.SMALL,
  tooltipTitleHover = 'Copy',
  tooltipTitleClick = 'Copied!',
  labelBeforeExpanded = 'Show more',
  labelAfterExpanded = 'Show less',
  wrap = false,
  rows = 6,
  className,
  onExpand,
  onCopy,
}) => {
  switch (type) {
    case CodeSnippetType.SINGLE_LINE:
      return (
        <SingleCode
          fontSize={fontSize}
          tooltipTitleHover={tooltipTitleHover}
          tooltipTitleClick={tooltipTitleClick}
          className={className}
          onCopy={onCopy}
        >
          {children}
        </SingleCode>
      );
    case CodeSnippetType.MULTI_LINE:
      return (
        <MultiCode
          languages={languages}
          colorSyntax={colorSyntax}
          fontSize={fontSize}
          tooltipTitleHover={tooltipTitleHover}
          tooltipTitleClick={tooltipTitleClick}
          labelBeforeExpanded={labelBeforeExpanded}
          labelAfterExpanded={labelAfterExpanded}
          className={className}
          wrap={wrap}
          rows={rows}
          onExpand={onExpand}
          onCopy={onCopy}
        >
          {children}
        </MultiCode>
      );
    default:
      return <InlineCode className={className}>{children}</InlineCode>;
  }
};

export default CodeSnippet;
