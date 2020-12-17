import * as React from 'react';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as copy from 'copy-to-clipboard';
import { escapeRegEx } from '@synerise/ds-utils';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { CheckS, AngleRightS } from '@synerise/ds-icon/dist/icons';
import * as S from './Text.styles';
import { VisibilityTrigger } from '../../../Menu.types';
import { BasicItemProps } from './Text.types';

const Text: React.FC<BasicItemProps> = ({
  parent,
  disabled,
  prefixel,
  suffixel,
  danger,
  children,
  description,
  copyable,
  copyHint,
  copyValue,
  copyTooltip,
  highlight,
  style,
  prefixVisibilityTrigger,
  suffixVisibilityTrigger,
  indentLevel,
  ordered,
  checked,
  size = 'default',
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const canCopyToClipboard = copyable && copyHint && copyValue && !disabled;
  const showSuffixOnHover = suffixVisibilityTrigger === VisibilityTrigger.HOVER;
  const showPrefixOnHover = prefixVisibilityTrigger === VisibilityTrigger.HOVER;
  const shouldListenToHoverEvents = canCopyToClipboard || showSuffixOnHover || showPrefixOnHover;

  const renderChildren = (): React.ReactNode => {
    if (highlight && typeof children === 'string') {
      const index = children.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
      if (index === -1) {
        return children;
      }
      const escapedHighlight = escapeRegEx(highlight);
      const startOfQuery = children.toLowerCase().search(escapedHighlight.toLowerCase());
      const endOfQuery = startOfQuery + highlight.length;
      const resultArray = [
        children.substring(0, startOfQuery),
        <span key={children} className="search-highlight">
          {children.substring(startOfQuery, endOfQuery)}
        </span>,
        children.substring(endOfQuery, children.length),
      ];
      return resultArray;
    }
    return children;
  };
  const shouldRenderSuffix = React.useMemo((): boolean => {
    if (showSuffixOnHover) {
      return (!!suffixel || !!checked) && hovered;
    }
    return !!suffixel || !!checked;
  }, [showSuffixOnHover, suffixel, checked, hovered]);

  const shouldRenderPrefix = React.useMemo((): boolean => {
    if (showPrefixOnHover) {
      return !!prefixel && hovered;
    }
    return !!prefixel;
  }, [showPrefixOnHover, prefixel, hovered]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.Wrapper
      onMouseOver={(): void => {
        shouldListenToHoverEvents && setHovered(true);
      }}
      onMouseLeave={(): void => {
        shouldListenToHoverEvents && setHovered(false);
      }}
      onMouseDown={(): void => {
        setClicked(!clicked);
        canCopyToClipboard && copyValue && copy(copyValue);
      }}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      prefixel={prefixel}
      description={description}
      className="ds-menu-item"
      style={style}
      indentLevel={Number(indentLevel)}
      ordered={ordered}
      size={size}
      {...rest}
    >
      <Tooltip type="default" trigger="click" title={copyTooltip}>
        <S.Inner>
          <S.ContentWrapper className="ds-menu-content-wrapper">
            {shouldRenderPrefix && (
              <S.PrefixelWrapper className="ds-menu-prefix" visible={shouldRenderPrefix} disabled={disabled}>
                {prefixel}
              </S.PrefixelWrapper>
            )}
            <S.Content className="ds-menu-content" highlight={!!highlight}>
              {canCopyToClipboard && hovered ? copyHint : renderChildren()}
              {!!description && <S.Description>{description}</S.Description>}
            </S.Content>
            {parent && (
              <S.ArrowRight disabled={disabled}>
                <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
              </S.ArrowRight>
            )}
            <S.ContentDivider />
            {(!!suffixel || !!checked) && (
              <S.SuffixWraper visible={shouldRenderSuffix} disabled={disabled}>
                {!!checked && <Icon component={<CheckS />} color={theme.palette[`green-600`]} />}
                {suffixel}
              </S.SuffixWraper>
            )}
          </S.ContentWrapper>
        </S.Inner>
      </Tooltip>
    </S.Wrapper>
  );
};

export default Text;
