import * as React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './BottomAction.styles';
import { Props } from './BottomAction.types';

const BottomAction: React.FC<Props> = ({ onClickAction, children,style,icon,...rest }) => (
  <S.BottomAction style={style} onClick={onClickAction} {...rest}>
    {icon && (
      <S.IconWrapper>
        <Icon component={icon} />
      </S.IconWrapper>
    )}
    <S.TextWrapper>{children}</S.TextWrapper>
  </S.BottomAction>
);

export default BottomAction;
