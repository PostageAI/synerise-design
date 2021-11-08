import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import Icon, { EditM } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import { NOOP } from '@synerise/ds-utils';

import Extras from '../Extras';
import { HeaderProps } from './Header.types';
import * as S from '../ItemsRoll.styles';

const Header: React.FC<HeaderProps> = ({
  actions,
  allTexts,
  changeSelectionIcon: ChangeSelectionIcon = EditM,
  changeSelectionDropdownProps,
  customSidebarActions,
  hideSearch,
  itemsCount,
  onChangeSelection,
  onSearch,
  searchValue,
  onSearchClear,
  searchPlaceholder,
}) => {
  const ChangeSelectionButton = React.useMemo(
    () => (
      <S.ChangeSelection type="ghost" mode="icon-label" onClick={onChangeSelection}>
        <Icon component={<ChangeSelectionIcon />} size={24} />
        {allTexts.changeSelectionLabel}
      </S.ChangeSelection>
    ),
    [onChangeSelection, allTexts.changeSelectionLabel]
  );

  return (
    <S.ContainerSpaceBetween>
      <S.HeaderLeft>
        {allTexts.itemsLabel}: <S.Bold>{itemsCount}</S.Bold>
      </S.HeaderLeft>
      <S.HeaderRight>
        {onChangeSelection &&
          (changeSelectionDropdownProps ? (
            <Dropdown {...changeSelectionDropdownProps}>{ChangeSelectionButton}</Dropdown>
          ) : (
            ChangeSelectionButton
          ))}
        {!hideSearch && (
          <S.SearchWrapper>
            <SearchInput
              clearTooltip={allTexts.searchClearTooltipLabel}
              onClear={onSearchClear || NOOP}
              onChange={onSearch || NOOP}
              placeholder={searchPlaceholder}
              value={searchValue || ''}
              closeOnClickOutside
            />
          </S.SearchWrapper>
        )}
        {customSidebarActions}
        {actions && <Extras actions={actions} />}
      </S.HeaderRight>
    </S.ContainerSpaceBetween>
  );
};

export default Header;
