import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { ItemsMenu, TreeTable } from '@synerise/ds-table';
import Icon from '@synerise/ds-icon';
import {
  AddM,
  ChildRowLeftDownM,
  EditM,
  FileDownloadM,
  InfoFillS,
  TrashM,
  VarTypeBooleanM,
  VarTypeStringM,
} from '@synerise/ds-icon/dist/icons';
import Table from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import * as React from 'react';
import { dataSource } from './content/tabletree.data';
import Checkbox from '@synerise/ds-checkbox';
import { renderWithIconInHeaders } from './helpers/helpers';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const updateChildren = (label: string, newValue: boolean, children: any[]) => {
  return children.map(child => {
    if (!child.children) {
      return {
        ...child,
        [label]: newValue,
      };
    }
    return {
      ...child,
      [label]: newValue,
      children: updateChildren(label, newValue, child.children),
    };
  });
};

const updateParents = (data: any[], label: string) => {
  return data.map(record => {
    if (!record.children) {
      return {
        ...record,
      };
    }
    return {
      ...record,
      [label]: updateParents(record.children, label).filter(child => child[label] === false).length === 0,
    };
  });
};

const stories = {
  default: withState({
    data: dataSource,
    expandedRows: [],
    selectedRows: [],
  })(({ store }) => {
    const { expandedRows, selectedRows, data } = store.state;
    const handleExpandRow = (key: string): void => {
      if (expandedRows.indexOf(key) < 0) {
        store.set({ expandedRows: [...expandedRows, key] });
      } else {
        store.set({ expandedRows: expandedRows.filter(k => k !== key) });
      }
    };

    const setValue = (newValue: boolean, record: any, label: string) => {
      const setChildrenValue = data => {
        return data.map(rec => {
          if (rec.key === record.key) {
            if (!rec.children) {
              return {
                ...rec,
                [label]: newValue,
              };
            }
            return {
              ...rec,
              [label]: newValue,
              children: updateChildren(label, newValue, rec.children),
            };
          } else {
            if (!rec.children) {
              return {
                ...rec,
              };
            }
            return {
              ...rec,
              children: setChildrenValue(rec.children),
            };
          }
        });
      };

      const updatedChilds = setChildrenValue(data);
      store.set({ data: updateParents(updatedChilds, label) });
    };

    const getColumns = () => {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          icon: { component: <VarTypeStringM /> },
          iconTooltip: { component: <InfoFillS /> },
          render: name => name,
        },
        {
          title: 'Create',
          dataIndex: 'create_permission',
          key: 'create_permission',
          icon: { component: <VarTypeBooleanM /> },
          iconTooltip: { component: <InfoFillS /> },
          width: 120,
          render: (value, record) => (
            <Checkbox
              withoutPadding
              checked={value}
              onChange={e => setValue(e.target.checked, record, 'create_permission')}
            />
          ),
        },
        {
          title: 'Read',
          dataIndex: 'read_permission',
          key: 'read_permission',
          icon: { component: <VarTypeBooleanM /> },
          iconTooltip: { component: <InfoFillS /> },
          width: 120,
          render: (value, record) => (
            <Checkbox
              withoutPadding
              checked={value}
              onChange={e => setValue(e.target.checked, record, 'read_permission')}
            />
          ),
        },
        {
          title: 'Edit',
          dataIndex: 'edit_permission',
          key: 'edit_permission',
          icon: { component: <VarTypeBooleanM /> },
          iconTooltip: { component: <InfoFillS /> },
          width: 120,
          render: (value, record) => (
            <Checkbox
              withoutPadding
              checked={value}
              onChange={e => setValue(e.target.checked, record, 'edit_permission')}
            />
          ),
        },
        {
          title: 'Delete',
          dataIndex: 'delete_permission',
          key: 'delete_permission',
          icon: { component: <VarTypeBooleanM /> },
          iconTooltip: { component: <InfoFillS /> },
          width: 120,
          render: (value, record) => (
            <Checkbox
              withoutPadding
              checked={value}
              onChange={e => setValue(e.target.checked, record, 'delete_permission')}
            />
          ),
        },
      ];
    };

    const selectEven = () => {
      const evenRows = data.map(row => row.key).filter((key, index) => index % 2);
      store.set({ selectedRows: evenRows });
    };

    return (
      <TreeTable
        dataSource={data}
        columns={renderWithIconInHeaders(getColumns(), boolean('Set icons in headers', false))}
        loading={boolean('Set loading state', false)}
        roundedHeader={boolean('Rounded header', false)}
        cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
        defaultExpandAllRows={boolean('Default expand all rows', true)}
        headerButton={
          boolean('Show header button', false) && (
            <Button type="ghost" mode="icon-label" onClick={action('Header button action')}>
              <Icon component={<AddM />} />
              {text('Header button label', 'Add row')}
            </Button>
          )
        }
        pagination={{
          showSizeChanger: boolean('Show size changer', true),
          showQuickJumper: boolean('Show quick jumper', true),
          onChange: action('pageChanged'),
        }}
        locale={{
          pagination: {
            items: 'results',
          },
          selected: 'selected',
        }}
        expandIcon={props => {
          const { expandable, expanded, onExpand, record } = props;

          return expandable ? (
            <td className="ant-table-cell">
              <Button.Expander expanded={expanded} onClick={e => onExpand(record, e)} />
            </td>
          ) : (
            <Icon component={<ChildRowLeftDownM />} />
          );
        }}
        rowKey={row => row.key}
        onSearch={console.log}
        onRow={(record, index: number) => ({
          onClick: event => {
            boolean('Expand on row click', false) && handleExpandRow(record.key);
          },
        })}
        itemsMenu={
          <ItemsMenu>
            <Button onClick={action('Export')} type="secondary" mode="icon-label">
              <Icon component={<FileDownloadM />} />
              Export
            </Button>
            <Button onClick={action('Edit')} type="secondary" mode="icon-label">
              <Icon component={<EditM />} />
              Edit
            </Button>
            <Button onClick={action('Delete')} type="secondary" mode="icon-label">
              <Icon component={<TrashM />} />
              Delete
            </Button>
          </ItemsMenu>
        }
      />
    );
  }),
};

export default {
  name: 'Table/Table tree',
  decorator,
  stories,
  Component: Table,
};
