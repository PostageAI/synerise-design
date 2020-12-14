import * as React from 'react';
import { IntlShape } from 'react-intl';
import { SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';
import { DateLimitMode } from './Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

export type FilterValue = {
  definition?: Partial<FilterDefinition>;
  type: string;
};
export type RangeFilterProps = {
  value: FilterValue | undefined;
  onApply: (filter: FilterValue) => void;
  onCancel: () => void;
  intl: IntlShape;
  savedFilters?: SavedFilter[];
  onFilterSave?: (filters: SavedFilter[]) => void;
};

export type RangeFilterState = {
  [filterType: string]: FilterValue | Partial<FilterDefinition> | string | undefined;
  activeType: string;
  rangeClipboard?: Partial<FilterDefinition>;
};
export type FilterDefinition = {
  start?: string;
  stop?: string;
  inverted?: boolean;
  restricted?: boolean;
  period?: string;
  type: string;
  display?: boolean;
  periodType?: string;
  mode?: DateLimitMode;
};

export type Period = {
  translationKey?: string;
  name: string | React.ReactNode;
  value: string | React.ReactNode;
};

export type DenormalizedFilter = {
  start: string;
  stop: string;
  day?: React.ReactText;
};
export type NormalizedFilter = NormalizedFilterBase & {
  from: string;
  to: string;
  day?: React.ReactText;
  week?: React.ReactText;
};
export type NormalizedFilterBase = {
  type?: string;
  nestingType?: string;
};
export type WeekFilter = {
  week: number;
};

export type WeeklyFilterDefinition = {
  [key: string]: FilterDefinition;
};

export type MonthlyFilterDefinition = {
  definition: {
    [key: string]: FilterDefinition;
  };
  id: number;
  period: string;
  periodType: string;
};
