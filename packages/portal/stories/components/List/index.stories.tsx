import * as React from 'react';
import { action } from '@storybook/addon-actions';

import Icon, { FileM } from '@synerise/ds-icon';

import List from '@synerise/ds-list';
import Checkbox from '@synerise/ds-checkbox';
import Radio from '@synerise/ds-radio';
import Switch from '@synerise/ds-switch';

const decorator = (storyFn) => (
  <div style={{ width: '200px' }}>
    <div style={{ background: '#fff', width: '300px' }}>
      {storyFn()}
    </div>
  </div>
);

const dataMultiple = [
  [
    { text: 'Item 11111111122222222223333333333333333333', disabled: true },
    { text: 'Item 2', disabled: false },
    { text: 'Item 3', disabled: true },
    { text: 'Item 4', disabled: false, danger: true },
  ],
  [{ text: 'Item 5', disabled: false }],
];

const dataSingle = [
  [
    { text: 'Item 1', disabled: true },
    { text: 'Item 2', disabled: false },
    { text: 'Item 3', disabled: true },
    { text: 'Item 4', disabled: false, danger: true },
  ],
];

const dataCheckboxes = [
  [{ label: 'Country', value: 'country' }, { label: 'City', value: 'city' }, { label: 'Address', value: 'address' }],
];

const actions = () => (
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <div style={{ marginRight: '8px' }} onClick={action('edit')}>
    Edit
  </div>
  <div onClick={action('delete')}>Delete</div>
</div>
);

const stories = {
  default: {
    header: 'Folders',
    dataSource: dataSingle,
    renderItem: (item => (
      <List.Item
        onSelect={action('onSelect')}
        icon={<Icon component={<FileM />} />}
        disabled={item.disabled}
        danger={item.danger}
        size={'medium'}
      >
        {item.text}
      </List.Item>
    )),
  },
  complexList: {
    header: 'Folders',
    dataSource: dataMultiple,
    dashed: false,
    renderItem: (item => (
      <List.Item
        onSelect={action('onSelect')}
        icon={<Icon component={<FileM />} />}
        disabled={item.disabled}
        danger={item.danger}
        actions={actions()}
        size={'medium'}
      >
        {item.text}
      </List.Item>
    )),
  },
  withCheckboxes: {
    header: 'Select option',
    dataSource: dataCheckboxes,
    renderItem: (item => (
      <List.ItemWrapper>
        <Checkbox
          value={item.value}
        >
          {item.label}
        </Checkbox>
      </List.ItemWrapper>
    )),
  },
  mixed: () => (
    <React.Fragment>
      <List dataSource={dataCheckboxes} renderItem={item => (
        <List.ItemWrapper>
          <Checkbox
            value={item.value}
          >
            {item.label}
          </Checkbox>
        </List.ItemWrapper>
      )}
      />
      <List.Divider />
      <List
        dataSource={dataSingle}
        renderItem={item => (
          <List.Item
            onSelect={action('onSelect')}
            icon={<Icon component={<FileM />} />}
            disabled={item.disabled}
            danger={item.danger}
            actions={actions}
            size={'medium'}
          >
            {item.text}
          </List.Item>
        )}
      />
    </React.Fragment>
  ),
  withRadios: {
    header: 'Select option',
    dataSource: dataCheckboxes,
    radio: true,
    options: { defaultValue: 'A' },
    renderItem: (item => (
      <List.ItemWrapper>
        <Radio
          value={item.value}
        >
          {item.label}
        </Radio>
      </List.ItemWrapper>
    )),
  },
  withSwitches: () => {
    const [state, setState] = React.useState([
      [
        { label: 'Option A', checked: false },
        { label: 'Option B', checked: true },
        { label: 'Option C', checked: false },
        { label: 'Option D', checked: false, errorText: 'This option in recommended' },
      ],
    ]);

    const handleChange = (label: string) => {
      setState(
        state.map(innerArray => {
          return innerArray.map(item => {
            const newCheckedValue = !item.checked;

            if (item.label === 'Option D' && item.label === label) {
              return {
                ...item,
                checked: newCheckedValue,
                ...(newCheckedValue ? { errorText: '' } : { errorText: 'This option in recommended' }),
              };
            }

            if (item.label === label) {
              return { ...item, checked: !item.checked };
            }
            return item;
          });
        })
      );
    };

    return (
      <List
        dataSource={state}
        renderItem={item => {
          return (
            <List.ItemWrapper>
              <Switch
                label={item.label}
                errorText={item.errorText}
                checked={item.checked}
                onChange={() => handleChange(item.label)}
              />
            </List.ItemWrapper>
          );
        }}
      />
    );
  },
};

export default {
name: 'Components/List',
  decorator,
  stories,
  Component: List,
};
