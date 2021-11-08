import * as React from 'react';
import { v4 as uuid } from 'uuid';

import Icon, { AngleLeftS, AngleRightS, DoubleAngleLeftS, DoubleAngleRightS } from '@synerise/ds-icon';

import * as S from './Navbar.styles';
import { NavbarProps } from './Navbar.types';

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { title, onTitleClick, hidePrev, hideNext, onLongPrev, onLongNext, onShortPrev, onShortNext } = props;
  return (
    <S.Container className="ds-date-picker-nav">
      <S.ArrowContainer>
        {/* regenerating keys after every render to prevent from render lags on Chrome 84 */}
        {onLongPrev && !hidePrev ? (
          <S.NavButton key={uuid()} mode="single-icon" role="button" type="ghost" onClick={onLongPrev}>
            <Icon component={<DoubleAngleLeftS />} />
          </S.NavButton>
        ) : (
          <S.ArrowPlaceholder className="arrow-placeholder long-prev" />
        )}
        {onShortPrev && !hidePrev ? (
          <S.NavButton key={uuid()} mode="single-icon" role="button" type="ghost" onClick={onShortPrev}>
            <Icon component={<AngleLeftS />} />
          </S.NavButton>
        ) : (
          <S.ArrowPlaceholder className="arrow-placeholder short-prev" />
        )}
      </S.ArrowContainer>
      <S.Text>{onTitleClick ? <S.Link onClick={onTitleClick}>{title}</S.Link> : title}</S.Text>
      <S.ArrowContainer>
        {onShortNext && !hideNext ? (
          <S.NavButton key={uuid()} mode="single-icon" role="button" type="ghost" onClick={onShortNext}>
            <Icon component={<AngleRightS />} />
          </S.NavButton>
        ) : (
          <S.ArrowPlaceholder className="arrow-placeholder short-next" />
        )}
        {onLongNext && !hideNext ? (
          <S.NavButton key={uuid()} mode="single-icon" role="button" type="ghost" onClick={onLongNext}>
            <Icon component={<DoubleAngleRightS />} />
          </S.NavButton>
        ) : (
          <S.ArrowPlaceholder className="arrow-placeholder long-next" />
        )}
      </S.ArrowContainer>
    </S.Container>
  );
};
export default Navbar;
