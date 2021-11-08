import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import * as copy from 'copy-to-clipboard';
import Icon, { DuplicateS, ArrowDownCircleM } from '@synerise/ds-icon';
import Scrollbar from '@synerise/ds-scrollbar';

import { CodeSnippetProps } from '../../CodeSnippet.types';
import Highlight from '../../Highlight/Highlight';
import * as S from './MultiCode.styles';
import { LINE_HEIGHT_DEFAULT, ICON_CLASSNAME } from '../SingleCode/SingleCode.styles';

import CopyAction from '../../CopyAction/CopyAction';

const ANIMATE_HEIGHT_TIME = 300;

const MultiCode: React.FC<CodeSnippetProps> = ({
  languages = ['javascript', 'typescript', 'json'],
  children = '',
  className,
  colorSyntax = false,
  tooltipTitleHover,
  tooltipTitleClick,
  labelBeforeExpanded,
  labelAfterExpanded,
  wrap = false,
  rows = 6,
  onExpand,
  onCopy,
}) => {
  const [expandedState, setExpandedState] = React.useState(false);
  const [scrollable, setScrollable] = React.useState(false);
  const [allRows, setAllRows] = React.useState(1);
  const codeRef = React.useRef<HTMLElement>(null);

  const buttonProps = React.useMemo(
    () => ({
      type: 'ghost',
      mode: 'icon-label',
      className: 'btn-expander',
      expanded: expandedState,
    }),
    [expandedState]
  );

  const initialContentHeight = React.useMemo((): number => {
    const numberRows = allRows > rows ? rows : allRows;
    return (numberRows + 1) * LINE_HEIGHT_DEFAULT;
  }, [rows, allRows]);

  const onMounting = React.useCallback(() => {
    if (!!codeRef && !!codeRef?.current) {
      setAllRows(Math.round(codeRef.current.offsetHeight / LINE_HEIGHT_DEFAULT));
    }
  }, [codeRef]);

  React.useLayoutEffect(() => {
    onMounting();
  }, [onMounting, children, rows, wrap]);

  const handleButton = React.useCallback(
    (isScroll: boolean): void => {
      setExpandedState(prevState => !prevState);
      if (isScroll) setTimeout(() => setScrollable(prevState => !prevState), ANIMATE_HEIGHT_TIME);
      else setScrollable(prevState => !prevState);
      onExpand && onExpand();
    },
    [onExpand]
  );

  const isButtonVisible = React.useMemo((): boolean => allRows > rows + 1, [rows, allRows]);
  const extraHeightOption = React.useMemo((): number | string => (isButtonVisible ? initialContentHeight : 'auto'), [
    isButtonVisible,
    initialContentHeight,
  ]);

  const multilineStructureContent = React.useMemo(
    () => (
      <S.PreBlock wrap={wrap} expanded={expandedState} isButtonVisible={isButtonVisible}>
        <AnimateHeight
          className="content-animation"
          duration={ANIMATE_HEIGHT_TIME}
          height={!expandedState ? extraHeightOption : 'auto'}
          style={{ minHeight: LINE_HEIGHT_DEFAULT }}
        >
          <Scrollbar
            maxHeight={!scrollable ? (rows + 1) * LINE_HEIGHT_DEFAULT : '100%'}
            style={{
              marginRight: '17px',
            }}
          >
            <S.BlockCodeWrapperMulti ref={codeRef} isButtonVisible={isButtonVisible}>
              {children}
            </S.BlockCodeWrapperMulti>
          </Scrollbar>
        </AnimateHeight>
      </S.PreBlock>
    ),
    [wrap, rows, expandedState, isButtonVisible, scrollable, codeRef, extraHeightOption, children]
  );
  const iconElement = React.useMemo(
    () => (
      <CopyAction
        tooltipTitleHover={tooltipTitleHover}
        tooltipTitleClick={tooltipTitleClick}
        className={ICON_CLASSNAME}
        onClick={(): void => {
          copy(children);
          onCopy && onCopy();
        }}
        icon={<DuplicateS />}
      />
    ),
    [children, tooltipTitleHover, tooltipTitleClick, onCopy]
  );

  return (
    <S.CodeSnippetWrapperMulti expanded={expandedState} isButtonVisible={isButtonVisible} className={className}>
      <S.ContentIconWrapper>
        {colorSyntax && languages ? (
          <Highlight languages={languages}>{multilineStructureContent}</Highlight>
        ) : (
          multilineStructureContent
        )}
        {iconElement}
      </S.ContentIconWrapper>
      {rows && isButtonVisible && (
        <S.ExpanderButton {...buttonProps} onClick={(): void => handleButton(expandedState)}>
          <Icon component={<ArrowDownCircleM />} />
          {expandedState ? labelAfterExpanded : labelBeforeExpanded}
        </S.ExpanderButton>
      )}
    </S.CodeSnippetWrapperMulti>
  );
};

export default MultiCode;
