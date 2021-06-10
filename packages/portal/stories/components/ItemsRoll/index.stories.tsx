import * as React from 'react';
import { withState } from '@dump247/storybook-state';
import { boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ItemsRoll from '@synerise/ds-items-roll';
import { Add3M, WebhookM } from '@synerise/ds-icon/dist/icons';

import {
  ACTIONS,
  actionsSelectOptions,
  AfterClearInfo,
  DEFAULT_GROUPED_STATE,
  DEFAULT_STATE,
  getTexts,
  GROUPED_ITEMS,
  groupOptions,
  ITEMS_100,
  ITEMS_1000,
  onChangeSelectionOptions,
  SEARCH_PLACEHOLDER,
} from './dataset';
import Icon from '@synerise/ds-icon';

const decorator = storyFn => (
  <div style={{ width: '800px' }}>
    <div style={{ background: '#fff', width: '628px', padding: '20px' }}>{storyFn()}</div>
  </div>
);

const onSearchClear = store => {
  store.set({
    searchValue: '',
    items: ITEMS_100,
  });
};

const onSearch = (value, store) => {
  const lookupItems = ITEMS_100;

  if (store.state.searchValue !== value) {
    const filteredItems = lookupItems.filter(item => item.text.toLowerCase().includes(value.toLowerCase()));

    store.set({
      searchValue: value,
      items: filteredItems,
    });
  }

  if (value === '') {
    store.set({
      items: lookupItems,
    });
  }
};

const onClearAll = store => {
  store.set({
    searchValue: '',
    items: [],
    componentVisible: false,
  });
};

const generateProps = (store, { onClearAllOptions }) => ({
  actions: boolean(`Show Actions menu`, true) && ACTIONS,
  className: 'custom-class',
  customSidebarActions: <Icon component={<WebhookM />} /> ,
  items: store.state.items,
  maxToShowItems: number('maxToShowItems', 10),
  onChangeSelection: select('onChangeSelection', onChangeSelectionOptions, onChangeSelectionOptions.function),
  onClearAll: select('onClearAll', onClearAllOptions, onClearAllOptions.function),
  onItemClick: action('onItemClick'),
  onItemRemove: action('onItemRemove'),
  onSearch: value => onSearch(value, store),
  onSearchClear: () => onSearchClear(store),
  searchPlaceholder: SEARCH_PLACEHOLDER,
  searchValue: store.state.searchValue,
  showMoreStep: number('showMoreStep', 10),
  useFooter: boolean('useFooter', true),
  useVirtualizedList: boolean('useVirtualizedList', false),
  hideSearch: boolean('Hide search', false),
});

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };
    const props = generateProps(store, { onClearAllOptions });

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),

  withCustomChangeSelectIcon: withState(DEFAULT_STATE)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };
    const props = {
      ...generateProps(store, { onClearAllOptions }),
      changeSelectionIcon: Add3M,
    };

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),

  withCustomTexts: withState(DEFAULT_STATE)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };
    const props = {
      ...generateProps(store, { onClearAllOptions }),
      texts: getTexts() as any,
    };

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),

  withVirtualizedList: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [visible, setVisible] = React.useState(true);

    const filteredItems = React.useMemo(() => {
      return !searchValue
        ? ITEMS_1000
        : ITEMS_1000.filter(item => {
            return item.text.toLowerCase().includes(searchValue.toLowerCase());
          });
    }, [searchValue]);

    const props = {
      actions: select(`Actions menu`, actionsSelectOptions, actionsSelectOptions.actions),
      className: 'custom-class',
      items: filteredItems,
      onChangeSelection: select('onChangeSelection', onChangeSelectionOptions, onChangeSelectionOptions.function),
      onClearAll: () => setVisible(false),
      onItemClick: action('onItemClick'),
      onItemRemove: action('onItemRemove'),
      onSearchClear: () => setSearchValue(''),
      searchPlaceholder: SEARCH_PLACEHOLDER,
      searchValue: searchValue,
      useFooter: boolean('useFooter', true),
      maxToShowItems: number('maxToShowItems', 20),
      onSearch: value => setSearchValue(value),
      showMoreStep: number('showMoreStep', 100),
      useVirtualizedList: boolean('useVirtualizedList', true),
    };

    return visible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  },

  withGroups: withState(DEFAULT_GROUPED_STATE)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };

    const onSearchGrouped = (value, store) => {
      const lookupItems = GROUPED_ITEMS.items;

      if (store.state.searchValue !== value) {
        const filteredItems = lookupItems.filter(item => item.text.toLowerCase().includes(value.toLowerCase()));

        store.set({
          searchValue: value,
          items: filteredItems,
        });
      }

      if (value === '') {
        store.set({
          searchValue: '',
          items: lookupItems,
        });
      }
    };

    const onSearchClear = (store) => {
      store.set({
        searchValue: '',
        items: GROUPED_ITEMS.items,
      });
    };

    const props = {
      ...generateProps(store, { onClearAllOptions }),
      onSearchClear: () => onSearchClear(store),
      groups: select('withGroups', groupOptions, groupOptions.yes),
      onSearch: value => onSearchGrouped(value, store),
    };

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),
  withChangeSelectionDropdown: () => {
    const [visible, setVisible] = React.useState(false);

    const props = {
      actions: select(`Actions menu`, actionsSelectOptions, actionsSelectOptions.actions),
      className: 'custom-class',
      customSidebarActions: <Icon component={<WebhookM />} /> ,
      items: ITEMS_100.slice(0, 10),
      onClearAll: () => setVisible(false),
      onItemClick: action('onItemClick'),
      onItemRemove: action('onItemRemove'),
      onSearchClear: () => {},
      searchPlaceholder: SEARCH_PLACEHOLDER,
      searchValue: '',
      useFooter: boolean('useFooter', true),
      maxToShowItems: number('maxToShowItems', 20),
      onSearch: () => {},
      showMoreStep: number('showMoreStep', 100),
      useVirtualizedList: boolean('useVirtualizedList', true),
      onChangeSelection: () => {},
      changeSelectionDropdownProps: {
        overlay: (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
          </ul>
        ),
        trigger: ['click'],
        visible,
        onVisibleChange: () => setVisible(!visible)
      }
    };

    // @ts-ignore
    return <ItemsRoll {...props} />;
  },
};

export default {
  name: 'Components/ItemsRoll',
  decorator,
  stories,
  Component: ItemsRoll,
};
