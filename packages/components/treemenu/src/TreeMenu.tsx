import React, { useState, useEffect, useMemo } from 'react';

import { FolderAddM } from '@synerise/ds-icon/dist/icons';
import TreeModel from 'tree-model';
import { v4 as uuid } from 'uuid';
import AddModal from './AddModal';
import Tree from './Tree';

import TreeMenuContext, { defaultValue } from './TreeMenuContext';
import Header from './Header';
import Folder from './Elements/Item/Items/Folder';
import Toolbar from './Toolbar';
import useTexts from './useTexts';

import { TreeMenuTexts, TreeMenuProps, TreeNode, TreeData } from './TreeMenu.types';
import * as S from './TreeMenu.styles';
import { generateTree, getCount } from './utils';

// Remove this it should be deeper
export const defaultItemTypes = {
  folder: {
    name: 'Folder',
    component: Folder,
    icon: FolderAddM,
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const initNewItem = () => {
  const id = uuid();
  return {
    id,
    key: id,
    hidden: false,
  };
};

const updateChildrenKeys = (children: TreeData[] | undefined): TreeData[] => {
  return children
    ? children.map(child => {
        const id = uuid();
        return {
          ...child,
          id,
          key: id,
          children: updateChildrenKeys(child.children),
        };
      })
    : [];
};

const TreeMenu: React.FC<TreeMenuProps> = ({
  dataSource = [],
  showToolbar = true,
  showHeader = true,
  draggable = true,
  texts: propTexts,
  addItemList = defaultItemTypes,
  onChange,
  ...restProps
}) => {
  const texts: TreeMenuTexts = useTexts(propTexts);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
  const [clipboard, setClipboard] = React.useState<TreeNode | undefined>(undefined);
  const [copyCount, setCopyCount] = React.useState<number>(0);
  const count = useMemo(() => getCount(dataSource), [dataSource]);

  // This needs to be done because scrollbar
  useEffect(() => {
    setLoaded(true);
  }, []);

  const getRoot = React.useMemo(() => {
    return generateTree(dataSource);
  }, [dataSource]);

  const handleAdd = React.useCallback(
    (item, context) => {
      const newItem = new TreeModel().parse({ ...initNewItem(), name: item.name, type: item.type });
      context.addChild(newItem);
      onChange([...context.getPath().shift().model.children]);
    },
    [onChange]
  );

  const handleCopy = React.useCallback(
    item => {
      setClipboard({ ...item.model });
    },
    [setClipboard]
  );

  const handleDelete = React.useCallback(
    item => {
      const root = item.getPath().shift();
      item.drop();
      onChange([...root.model.children]);
    },
    [onChange]
  );

  const handleCut = React.useCallback(
    item => {
      setClipboard({ ...item.model });
      handleDelete(item);
    },
    [handleDelete]
  );

  const handlePaste = React.useCallback(
    item => {
      if (clipboard !== undefined) {
        const { name } = clipboard;
        const id = uuid();
        const duplicateItem = new TreeModel().parse({
          ...clipboard,
          id,
          key: id,
          name: `${name.replace(/ \([0-9+]\)$/, '')} (${copyCount})`,
          children: updateChildrenKeys(clipboard.children),
        });
        item.addChild(duplicateItem);

        setCopyCount(copyCount + 1);
        onChange([...item.getPath().shift()?.model.children]);
      }
    },
    [clipboard, copyCount, onChange]
  );

  const handleDuplicate = React.useCallback(
    (item): void => {
      const { name } = item.model;
      const id = uuid();
      const duplicateItem = new TreeModel().parse({
        ...item.model,
        id,
        key: id,
        name: `${name.replace(/ \([0-9+]\)$/, '')} (${copyCount})`,
      });

      item.parent.addChildAtIndex(duplicateItem, item.getIndex() + 1);

      setCopyCount(copyCount + 1);
      onChange([...item.getPath().shift()?.model.children]);
    },
    [copyCount, onChange]
  );

  const handleRename = React.useCallback(
    (item, newName, newItems) => {
      newItems && onChange(newItems);
    },
    [onChange]
  );

  const handleVisibilityChange = React.useCallback(
    (item, newItems) => {
      onChange(newItems);
    },
    [onChange]
  );

  const handleDragEnd = React.useCallback(
    newItems => {
      onChange(newItems);
    },
    [onChange]
  );

  if (!loaded) return null;

  const contextValue = {
    ...defaultValue,
    ...restProps,
    texts,
    searchQuery,
    setSearchQuery,
    searchOpen,
    setSearchOpen,
  };

  return (
    <S.TreeMenuContainer>
      <TreeMenuContext.Provider value={contextValue}>
        {showToolbar && (
          <Toolbar>
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <AddModal texts={texts} itemTypes={addItemList} onItemAdd={handleAdd} context={getRoot} />
          </Toolbar>
        )}
        {showHeader && searchQuery.length === 0 && <Header texts={texts} count={count} />}
        <Tree
          items={dataSource}
          addItemList={addItemList}
          searchQuery={searchQuery}
          draggable={draggable}
          texts={texts}
          {...restProps}
          hasClipboard={clipboard !== undefined}
          onItemCopy={handleCopy}
          onItemCut={handleCut}
          onItemPaste={handlePaste}
          onItemAdd={handleAdd}
          onItemDuplicate={handleDuplicate}
          onItemDelete={handleDelete}
          onItemEditChange={handleRename}
          onItemVisibilityChange={handleVisibilityChange}
          onItemDragEnd={handleDragEnd}
        />
      </TreeMenuContext.Provider>
    </S.TreeMenuContainer>
  );
};

export default TreeMenu;
