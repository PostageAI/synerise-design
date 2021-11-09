import * as React from 'react';
import Icon, { CloseS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import * as S from '../InputMultivalue.styles';
import { Props } from './Value.types';

const Value: React.FC<Props> = ({ disabled, key, onRemoveClick, value, focused }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.ValueWrapper
      className="ds-input-value-wrapper"
      onMouseOver={(): void => {
        focused && setHovered(true);
      }}
      onMouseLeave={(): void => {
        setHovered(false);
      }}
      disabled={disabled}
      key={key}
      shrink={hovered}
    >
      <Tooltip align={{ offset: [8, 0] }} offset="small" title={value} visible={focused && hovered}>
        <S.ValueText shrink={hovered} disabled={disabled}>
          {value}
        </S.ValueText>
      </Tooltip>
      <S.IconWrapper onClick={onRemoveClick}>
        <Icon className="remove" component={<CloseS />} />
      </S.IconWrapper>
    </S.ValueWrapper>
  );
};
export default Value;
