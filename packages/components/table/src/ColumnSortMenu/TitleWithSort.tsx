import * as React from 'react';
import { ColumnTitleProps } from 'antd/lib/table/interface';
import { DSColumnType } from '../Table.types';
import createReplaceButtonsPortal from './replaceSortButtons';
import { SortStateAPI } from './useSortState';

export type SortButtonsRenderer<T> = (sortStateApi: SortStateAPI, column: DSColumnType<T>) => React.ReactElement;

export type SortRender<T> = 'default' | 'string' | SortButtonsRenderer<T>;

export interface TitleWithSortOwnProps<T> {
  column: DSColumnType<T>;
  sortRender: React.ReactElement;
  titleProps: ColumnTitleProps<T>;
}

export type TitleWithSortProps<T> = TitleWithSortOwnProps<T> & React.ComponentPropsWithoutRef<'span'>;

export const TitleWithSort = <T extends unknown>({
  column,
  sortRender,
  titleProps,
  ...spanProps
}: TitleWithSortProps<T>): React.ReactElement => {
  const itemRef = React.useRef<HTMLSpanElement>(null);
  const ReplaceButtonsPortal = createReplaceButtonsPortal(itemRef.current, sortRender);

  return (
    <>
      <span ref={itemRef} {...spanProps}>
        {typeof column.title === 'function' ? column.title(titleProps) : column.title}
      </span>
      <ReplaceButtonsPortal />
    </>
  );
};

export default TitleWithSort;
