import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';
import { AddM, MailM, VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import { TagShape } from '@synerise/ds-tags';
import {
  COLUMNS,
  COLUMNS_WITH_AVATARS,
  COLUMNS_WITH_ICONS,
  COLUMNS_WITH_LABELS,
  COLUMNS_WITH_SKELETON,
  COLUMNS_WITH_STATUSES,
  COLUMNS_WITH_TRIGGERS,
  RELATIONS,
} from './content/withAllCellTypes.data';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { Column, renderWithIconInHeaders } from './helpers/helpers';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const dataSource = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  active: faker.random.boolean(),
  country: faker.random.arrayElement(['us', 'pl', 'de', 'it', 'es', 'ru']),
  age: (Math.random() * 50 + 10).toFixed(0),
  address: faker.address.streetAddress(),
  status: faker.random.arrayElement(['active', 'inactive', 'blocked']),
  avatar: {
    initials: 'AN',
    icon: <MailM />,
    title: 'Top 10 product add to cart',
    titleLarg: 'Summer Sale 45% OFF',
    status: 'active',
    labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
    label: ['Edited 11 Jun 2019 18:47'],
    labelLoader: ['Dynamic'],
  },
  select: {
    value: faker.random.arrayElement(['option 1', 'option 2', 'option 3']),
    options: ['option 1', 'option 2', 'option 3'],
  },
  tag: {
    label: 'status',
    shape: TagShape.STATUS_NEUTRAL,
  },
  enabled: faker.random.boolean(),
  editable: faker.random.boolean() ? faker.name.findName() : undefined,
  checked: faker.random.boolean(),
  relations: RELATIONS,
}));

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const getDefaultProps = () => ({
  hideTitleBar: boolean('Hide title bar', false),
  hideTitlePart: true,
  dataSource,
  loading: boolean('Set loading state', false),
  roundedHeader: boolean('Rounded header', false),
  pagination: {
    showSizeChanger: boolean('Show size changer', true),
    showQuickJumper: boolean('Show quick jumper', true),
    onChange: action('pageChanged'),
  },
  scroll: {
    x: false,
  },
  title: text('Table title', ''),
  onSearch: action('onSearch'),
  cellSize: select('Set cells size', CELL_SIZES, CELL_SIZES.default),
  headerButton: boolean('Show header button', false) && (
    <Button type="ghost" mode="icon-label" onClick={action('Header button action')}>
      <Icon component={<AddM />} />
      {text('Header button label', 'Add row')}
    </Button>
  ),
});

const stories = {
  default: () => ({
    ...getDefaultProps(),
    columns: renderWithIconInHeaders(COLUMNS as Column[], boolean('Set icons in headers', false)),
  }),
  withLabels: () => ({
    ...getDefaultProps(),
    columns: renderWithIconInHeaders(COLUMNS_WITH_LABELS as Column[], boolean('Set icons in headers', false)),
  }),
  withIcons: () => ({
    ...getDefaultProps(),
    columns: renderWithIconInHeaders(COLUMNS_WITH_ICONS as Column[], boolean('Set icons in headers', false)),
  }),
  withStatuses: () => ({
    ...getDefaultProps(),
    columns: renderWithIconInHeaders(COLUMNS_WITH_STATUSES as Column[], boolean('Set icons in headers', false)),
  }),
  withAvatars: () => ({
    ...getDefaultProps(),
    columns: renderWithIconInHeaders(COLUMNS_WITH_AVATARS as Column[], boolean('Set icons in headers', false)),
  }),
  withTriggers: () => ({
    ...getDefaultProps(),
    columns: renderWithIconInHeaders(COLUMNS_WITH_TRIGGERS as Column[], boolean('Set icons in headers', false)),
  }),
};

export default {
  name: 'Components/Table/Table with all types of content',
  decorator,
  stories,
  Component: Table,
};
