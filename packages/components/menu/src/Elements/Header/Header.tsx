import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Icon from '@synerise/ds-icon/dist/Icon';
import { InfoFillS } from '@synerise/ds-icon/dist/icons';
import * as S from './Header.styles';

export type SearchHeaderProps = {
  headerText: string;
  tooltip?: string;
};
const MenuHeader: React.FC<SearchHeaderProps> = ({ headerText, tooltip }: SearchHeaderProps) => {
  return (
    <S.MenuHeader>
      {headerText}
      {tooltip && (
        <Tooltip type="default" trigger="hover" title={tooltip || headerText}>
          <S.HeaderIconWrapper>
            <Icon component={<InfoFillS />} />
          </S.HeaderIconWrapper>
        </Tooltip>
      )}
    </S.MenuHeader>
  );
};

export default MenuHeader;
