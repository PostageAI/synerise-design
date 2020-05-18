import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import * as S from './Menu.styles';

import SubMenuItem from './Elements/SubMenu/SubMenu';
import { AntdMenuProps } from './Menu.types';
import MenuItem from './Elements/Item/MenuItem';
import { MenuItemProps } from './Elements/Item/MenuItem.types';
import Breadcrumb from './Elements/Breadcrumb/Breadcrumb';
import Header from './Elements/Header/Header';

class Menu extends React.Component<AntdMenuProps> {
  static Item: typeof MenuItem = MenuItem;
  static Breadcrumb: typeof Breadcrumb = Breadcrumb;
  static Header: typeof Header = Header;
  static ItemGroup = S.AntdMenu.ItemGroup;
  static SubMenu = S.AntdMenu.SubMenu;

  render(): React.ReactNode {
    const { dataSource, ordered, children, ...rest } = this.props;
    return (
      <S.AntdMenu ordered={ordered} mode="inline" inlineIndent={24} {...rest}>
        {children ||
          dataSource?.map((item: MenuItemProps, index: number) =>
            item.subMenu ? (
              <SubMenuItem
                parent={item.parent}
                danger={item.danger}
                prefixel={item.prefixel}
                suffixel={item.suffixel}
                disabled={item.disabled}
                index={item.index}
                text={item.text}
                description={item.description}
                subMenu={item.subMenu}
                ordered={ordered}
                copyable={item.copyable}
                copyHint={item.copyHint}
                copyValue={item.copyValue}
                suffixVisibilityTrigger={item.suffixVisibilityTrigger}
                prefixVisibilityTrigger={item.prefixVisibilityTrigger}
                key={`${item.text}${index}`} // eslint-disable-line react/no-array-index-key
                {...rest}
              />
            ) : (
              <MenuItem
                parent={item.parent}
                prefixel={item.prefixel}
                suffixel={item.suffixel}
                disabled={item.disabled}
                index={item.index}
                text={item.text}
                description={item.description}
                subMenu={item.subMenu}
                ordered={ordered}
                copyable={item.copyable}
                copyHint={item.copyHint}
                copyValue={item.copyValue}
                highlight={item.highlight}
                suffixVisibilityTrigger={item.suffixVisibilityTrigger}
                prefixVisibilityTrigger={item.prefixVisibilityTrigger}
                indentLevel={item.indentLevel || 0}
                type={item.type}
                key={`${item.text}${index}`} // eslint-disable-line react/no-array-index-key
                {...rest}
              />
            )
          )}
      </S.AntdMenu>
    );
  }
}

export default Menu;
