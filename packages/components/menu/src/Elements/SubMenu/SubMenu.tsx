import * as React from 'react';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import '@synerise/ds-core/dist/js/style';
import * as S from '../../Menu.styles';

import MenuItem from '../Item/MenuItem';
import { MenuItemProps } from '../Item/MenuItem.types';
import { SubMenuItemProps, SubMenuProps, SubMenuState } from './SubMenu.types';
import SubmenuText from '../Item/SubmenuText/SubmenuText';

class SubMenuItem extends React.PureComponent<SubMenuProps & MenuItemProps, SubMenuState> {
  constructor(props: SubMenuProps & MenuItemProps) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      uuidKey: uuid(),
    };
  }

  render(): React.ReactNode {
    const {
      text,
      prefixel,
      suffixel,
      subMenu,
      disabled,
      danger,
      ordered,
      onTitleClick,
      menuItemKey,
      selectedKeys,
      suffixVisibilityTrigger,
      prefixVisibilityTrigger,
      size,
      description,
      clickable,
      ...rest
    } = this.props;
    const { uuidKey } = this.state;
    return (
      <S.SubMenuItem
        title={
          <SubmenuText
            key={`${menuItemKey || uuidKey}-title`}
            prefixel={prefixel}
            suffixel={suffixel}
            onClick={onTitleClick}
            disabled={disabled}
            clickable={clickable}
            suffixVisibilityTrigger={suffixVisibilityTrigger}
            prefixVisibilityTrigger={prefixVisibilityTrigger}
            size={size}
            description={description}
          >
            {text}
          </SubmenuText>
        }
        key={menuItemKey || uuidKey}
        onTitleClick={onTitleClick}
        danger={danger}
        ordered={ordered}
        disabled={disabled}
        tabIndex={!disabled ? 0 : -1}
        {...rest}
        className={classNames('ds-menu-item', {
          'ant-menu-item-selected': !!menuItemKey && !!selectedKeys && selectedKeys.includes(menuItemKey as string),
        })}
      >
        {Boolean(subMenu) &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore */
          subMenu.map((subItem: SubMenuItemProps, index: number) => (
            <MenuItem
              parent={subItem.parent}
              prefixel={subItem.prefixel}
              suffixel={subItem.suffixel}
              disabled={subItem.disabled}
              clickable={subItem.clickable}
              text={subItem.text}
              danger={subItem.danger}
              subMenu={subItem.subMenu}
              ordered={subItem.ordered === undefined ? ordered : subItem.ordered}
              description={subItem.description}
              suffixVisibilityTrigger={subItem.suffixVisibilityTrigger}
              prefixVisibilityTrigger={subItem.prefixVisibilityTrigger}
              // eslint-disable-next-line react/jsx-handler-names
              onClick={(): void => {
                subItem.onClick && subItem.onClick(subItem);
              }}
              key={subItem.key || `${uuidKey}-${index}`} // eslint-disable-line react/no-array-index-key
              menuItemKey={subItem.key || `${uuidKey}-${index}`}
              selectedKeys={selectedKeys}
              {...subItem}
            />
          ))}
      </S.SubMenuItem>
    );
  }
}

export default SubMenuItem;
