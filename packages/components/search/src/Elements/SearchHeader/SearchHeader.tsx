import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Icon, { InfoFillS } from '@synerise/ds-icon';

import * as S from '../../Search.styles';
import { SearchHeaderProps } from './SearchHeader.types';

const SearchHeader: React.FC<SearchHeaderProps> = ({ headerText, tooltip }: SearchHeaderProps) => {
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

export default SearchHeader;
