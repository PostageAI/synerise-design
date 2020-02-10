import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';

import SubMenuContext from '../SubMenu/SubMenuContext/SubMenuContext';
import MenuContext from '../MenuContext/MenuContext';
import Icon from './Icon/Icon';
import * as S from './Item.styles';

type ItemProps = {
  subMenu?: React.ReactElement;
  id: string;
  name: string;
  className?: string;
};

const Item: React.FC<ItemProps> & { Icon: typeof Icon } = ({ children, subMenu, id, name, className }) => {
  const menuContext = React.useContext(MenuContext);

  if (!menuContext) {
    throw Error('Cannot use item outside MenuContext');
  }

  const isActive = menuContext.activeItem === id;
  const isActiveSubMenu = isActive && menuContext.isOpened;

  const handleOpen = (): void => {
    if (isActive) {
      menuContext.setOpened(!!subMenu && !menuContext.isOpened);
    } else {
      menuContext.setOpened(!!subMenu);
      menuContext.setActiveItem(id);
    }
  };

  return (
    <S.ItemWrapper className={className}>
      <Tooltip style={{ marginLeft: '5px' }} placement="right" title={isActive && menuContext.isOpened ? '' : name}>
        <S.ItemLink className={`menu__item ${isActive ? 'menu__item--active' : ''}`} onClick={handleOpen}>
          {children}
        </S.ItemLink>
      </Tooltip>
      {subMenu && id && (
        <SubMenuContext.Provider value={{ id, isActive: isActiveSubMenu, setOpened: menuContext.setOpened }}>
          {subMenu}
        </SubMenuContext.Provider>
      )}
    </S.ItemWrapper>
  );
};

Item.Icon = Icon;

export default Item;
