import * as React from 'react';
import hljs from 'highlight.js/lib/core';
import * as S from './Highlight.styles';
import { HighlightProps } from './Highlight.types';

const Highlight: React.FC<HighlightProps> = ({ languages, style, children }) => {
  const elementRef = React.useRef<HTMLDivElement>(null);

  const manageHighlight = React.useCallback(() => {
    if (elementRef.current) {
      const elements = elementRef.current.querySelectorAll('pre code');
      languages.forEach(language => {
        // eslint-disable-next-line
        hljs.registerLanguage(language, require(`highlight.js/lib/languages/${language}`));
      });
      elements.forEach(element => {
        hljs.highlightElement(element as HTMLElement);
      });
    }
  }, [languages]);

  React.useEffect(() => {
    manageHighlight();
  }, [manageHighlight]);

  return (
    <S.Highlight ref={elementRef} style={style}>
      {children}
    </S.Highlight>
  );
};
export default Highlight;
