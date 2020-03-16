import * as React from 'react';
import ManageableList from '../ManageableList';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import FileM from '@synerise/ds-icon/dist/icons/FileM';

const DEFAULT_ITEMS: any = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Default",
    canUpdate: false,
    canDelete: false,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Basic",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "My folder",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "My folder 2",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  },
]

const ITEMS: any = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Default",
    canUpdate: false,
    canDelete: false,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Basic",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "My folder",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "My folder 2",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    name: "My folder 3",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    name: "My folder 4",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    name: "My folder 5",
    canUpdate: true,
    canDelete: true,
    icon: <FileM />
  }
];

const texts = {
  addItemLabel: 'Add folder',
  showMoreLabel: 'Show all',
  showLessLabel: 'Show less',
  more: 'more',
  less: 'less',
  activateItemTitle: 'By activating this filter, you will cancel your unsaved filter settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Detele filter',
  deleteConfirmationDescription: 'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.',
  deleteLabel: 'Delete',
};

describe('ManageableList', () => {
  it('should render with no items', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={[]}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        type='default'
        texts={texts}
      />);

    // ASSERT
    expect(getByTestId('add-item-with-name-button')).toBeTruthy();
    expect(queryByTestId('show-more-button')).toBeNull();
    expect(queryByTestId('list-item-name')).toBeNull();
  });

  it('should render with 4 items', () => {
    const { queryByTestId, queryAllByTestId, getByTestId } = renderWithProvider(
      // ARRANGE
      <ManageableList
        items={DEFAULT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        type='default'
        texts={texts}
      />);

    // ASSERT
    expect(getByTestId('add-item-with-name-button')).toBeTruthy();
    expect(queryByTestId('show-more-button')).toBeNull();
    expect(queryAllByTestId('list-item-name').length).toBe(4);
    expect(queryAllByTestId('list-item-edit').length).toBe(3);
    expect(queryAllByTestId('list-item-remove').length).toBe(3);
  });

  it('should render with hidden items and show-more button', () => {
    // ARRANGE
    const { queryAllByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        type='default'
        texts={texts}
      />);
    const showMore = getByTestId('show-more-button');

    // ASSERT
    expect(getByTestId('add-item-with-name-button')).toBeTruthy();
    expect(showMore).toBeTruthy();
    expect(queryAllByTestId('list-item-name').length).toBe(5);
    expect(showMore.textContent).toBe('+ 2 more Show all');
  });

  it('should show all items after show more button clicked', () => {
    // ARRANGE
    const { queryAllByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        type='default'
        texts={texts}
      />);
    const showMore = getByTestId('show-more-button');

    // ASSERT
    expect(showMore.textContent).toBe('+ 2 more Show all');
    expect(queryAllByTestId('list-item-name').length).toBe(5);
    fireEvent.click(showMore);
    expect(showMore.textContent).toBe('- 2 less Show less');
    expect(queryAllByTestId('list-item-name').length).toBe(7);
  });

  it('should fire onItemSelect method on item click', () => {
    // ARRANGE
    const onItemSelect = jest.fn();
    const { queryAllByTestId } = renderWithProvider(
      <ManageableList
        items={ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={onItemSelect}
        onItemRemove={() => {}}
        type='default'
        texts={texts}
      />);

    //ACT
    const firstListItem = queryAllByTestId('list-item-name')[0];
    fireEvent.click(firstListItem);

    // ASSERT
    expect(onItemSelect).toHaveBeenCalledWith({id: '00000000-0000-0000-0000-000000000000'});
  });

  it('should fire remove item', () => {
    // ARRANGE
    const onItemRemove = jest.fn();
    const { queryAllByTestId } = renderWithProvider(
      <ManageableList
        items={ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={onItemRemove}
        type='default'
        texts={texts}
      />);
    const firstRemoveButton = queryAllByTestId('list-item-remove')[0];
    const removeItemIcon = firstRemoveButton.querySelector('svg');
    // ASSERT
    expect(removeItemIcon).toBeTruthy();
    if(removeItemIcon){
      fireEvent.click(removeItemIcon);
    }
    expect(onItemRemove).toHaveBeenCalled();
  });

  it('should fire onItemAdd', () => {
    // ARRANGE
    const onItemAdd = jest.fn();
    const { getByTestId } = renderWithProvider(
      <ManageableList
        items={DEFAULT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={onItemAdd}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        type='default'
        texts={texts}
      />);
    const NEW_FOLDER_NAME = 'New folder';
    const addItemButton = getByTestId('add-item-with-name-button').getElementsByTagName('button')[0];

    // ASSERT
    expect(addItemButton).toBeTruthy();
    // SHOW ADD ITEM INPUT
    fireEvent.click(addItemButton);
    const addItemInput = getByTestId('add-item-input');
    expect(addItemInput).toBeTruthy();
    // SET ADD ITEM INPUT VALUE
    fireEvent.change(addItemInput, {target: {value: NEW_FOLDER_NAME}});
    expect((addItemInput as HTMLInputElement).value).toBe(NEW_FOLDER_NAME);
    // SUBMIT NEW ITEM
    fireEvent.keyDown(addItemInput, {key: 'Enter', keyCode: 13});
    expect(onItemAdd).toHaveBeenCalledWith({name: NEW_FOLDER_NAME});
  });
});
