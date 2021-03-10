import * as React from 'react';
import { ItemProps } from '../Item.types';

export interface FilterItemProps {
  item: ItemProps;
  greyBackground?: boolean;
  onRemove?: (removeParams: { id: React.ReactText }) => void;
  onDuplicate?: (duplicateParams: { id: React.ReactText }) => void;
  onUpdate?: (updateParams: { id: React.ReactText; name: string }) => void;
  onSelect: (selectParams: { id: React.ReactText }) => void;
  selected: boolean;
  texts: {
    [k: string]: string | React.ReactNode;
  };
  theme: { [k: string]: string };
  searchQuery?: string;
  style?: React.CSSProperties;
}
