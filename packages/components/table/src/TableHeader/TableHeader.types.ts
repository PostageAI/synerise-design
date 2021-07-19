import * as React from 'react';
import { Filter, Locale, RowSelection } from '../Table.types';

export interface Props<T extends { key: React.ReactText }> {
  title?: React.ReactNode;
  filters?: Filter[];
  selectedRows?: number;
  itemsMenu: React.ReactNode;
  selection?: RowSelection<T>;
  dataSource: T[];
  searchComponent?: React.ReactNode;
  filterComponent?: React.ReactNode;
  rowKey?: Function | string;
  withBorderTop?: boolean;
  headerButton?: React.ReactNode;
  locale: Locale;
  renderSelectionTitle?: (selection?: RowSelection<T>, filters?: Filter[]) => React.ReactNode;
  hideTitlePart?: boolean;
}
