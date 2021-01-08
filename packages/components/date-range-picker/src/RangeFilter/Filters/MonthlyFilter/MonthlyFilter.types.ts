import { IntlShape } from 'react-intl';
import { RangeActions } from '../../Shared/TimeWindow/TimeWindow.types';
import { FilterDefinition } from '../../RangeFilter.types';
import { WithTranslations } from '../../../DateRangePicker.types';

export type MonthlyFilterProps = {
  value: Month[];
  onChange: (definition: string | object) => void;
  intl: IntlShape;
  rangeClipboard?: Partial<FilterDefinition>;
} & Partial<RangeActions> &
  WithTranslations;
export type Month = {
  id: string;
  period: string;
  periodType?: string;
  definition: string | object;
};
