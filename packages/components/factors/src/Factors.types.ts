import * as React from 'react';
import { DateFilter } from '@synerise/ds-date-range-picker/dist/date.types';
import { Texts as DateRangeTexts } from '@synerise/ds-date-range-picker/dist/DateRangePicker.types';

export const ALL_FACTOR_TYPES = [
  'text',
  'number',
  'parameter',
  'contextParameter',
  'dynamicKey',
  'formula',
  'array',
  'date',
  'dateRange',
] as const;
export type FactorType = typeof ALL_FACTOR_TYPES[number] | string;
export type DynamicKeyValueType = { key: React.ReactText; value: React.ReactText };
export type FormulaValueType = { name: string; value: string };
export type ParameterValueType = {
  type: string;
  icon: React.ReactNode;
  name: string;
  id: React.ReactText;
  groupId?: React.ReactText;
};

export type ParameterGroup = {
  id: React.ReactText;
  name: string;
  defaultGroup?: boolean;
  icon?: React.ReactNode;
  subGroups?: ParameterGroup[];
};

export type ParameterItem = {
  id: React.ReactText;
  name: string;
  groupId: React.ReactText;
  icon?: React.ReactNode;
};

export type FactorValueType =
  | string
  | number
  | Date
  | undefined
  | DynamicKeyValueType
  | FormulaValueType
  | ParameterValueType
  | Partial<DateFilter>;

export type SelectedFactorType = {
  name: string;
  icon: React.ReactNode;
  input: React.ReactNode;
};

export type FactorsTexts = {
  dateRangePicker: DateRangeTexts;
  datePicker: {
    apply: string;
    clearTooltip: string;
    inputPlaceholder: string;
    now: string;
  };
  dynamicKey: {
    keyPlaceholder: string;
    valuePlaceholder: string;
  };
  formula: {
    buttonPlaceholder: string;
    defaultName: string;
  };
  parameter: {
    searchPlaceholder: string;
    noResults: string;
    loadingParameter: string;
  };
  valuePlaceholder: string;
  modalApply: string;
  modalCancel: string;
  modalTitle: string;
};

export type FactorsProps = {
  factorKey?: React.ReactText;
  withoutTypeSelector?: boolean;
  setSelectedFactorType?: (factor: FactorType) => void;
  unavailableFactorTypes?: FactorType[];
  availableFactorTypes?: FactorType[];
  selectedFactorType: FactorType;
  defaultFactorType: FactorType;
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  onActivate?: () => void;
  onChangeValue: (value: FactorValueType) => void;
  value: FactorValueType;
  textType?: 'autocomplete' | 'expansible' | 'default' | string;
  autocompleteText?: {
    options: string[];
  };
  parameters?: {
    buttonLabel: string | React.ReactNode;
    buttonIcon: React.ReactNode;
    groups?: ParameterGroup[];
    items: ParameterItem[];
    showAllGroup?: boolean;
  };
  onParamsClick?: () => void;
  formulaEditor?: React.ReactNode;
  texts?: Partial<FactorsTexts>;
  opened?: boolean;
  loading?: boolean;
  preventAutoloadData?: boolean;
  withCustomFactor?: React.ReactNode;
};

export type FactorTypeSelectorProps = Pick<
  FactorsProps,
  'unavailableFactorTypes' | 'availableFactorTypes' | 'selectedFactorType'
> & {
  setSelectedFactorType: (factor: FactorType) => void;
  selectedFactor: SelectedFactorType;
};

export type FactorValueProps = Pick<
  FactorsProps,
  | 'onChangeValue'
  | 'onParamsClick'
  | 'value'
  | 'selectedFactorType'
  | 'parameters'
  | 'autocompleteText'
  | 'withoutTypeSelector'
  | 'textType'
  | 'formulaEditor'
  | 'opened'
  | 'loading'
  | 'factorKey'
  | 'preventAutoloadData'
  | 'getPopupContainerOverride'
  | 'onActivate'
> & {
  texts: FactorsTexts;
  selectedFactor: SelectedFactorType;
};

export type InputProps = Pick<
  FactorsProps,
  | 'value'
  | 'parameters'
  | 'autocompleteText'
  | 'withoutTypeSelector'
  | 'textType'
  | 'opened'
  | 'getPopupContainerOverride'
  | 'onActivate'
> & {
  texts: FactorsTexts;
  onChange: (value: FactorValueType) => void;
  factorType: FactorType;
  onParamsClick?: () => void;
  formulaEditor?: React.ReactNode;
  loading?: boolean;
  preventAutoloadData?: boolean;
};

export type TextModalProps = {
  value: string;
  onApply: (value: string) => void;
  visible: boolean;
  onCancel: () => void;
  texts: FactorsTexts;
};

export type ParameterDropdownProps = {
  setDropdownVisible: (show: boolean) => void;
  setSelected: (val: ParameterItem) => void;
  groups?: ParameterGroup[];
  items?: ParameterItem[];
  texts: FactorsTexts;
  loading?: boolean;
  onFetchData?: () => void;
  hasMoreItems?: boolean;
};

export type FormulaModalProps = {
  value: FormulaValueType;
  onApply: (value: FormulaValueType) => void;
  visible: boolean;
  onCancel: () => void;
  texts: FactorsTexts;
  formulaEditor?: React.ReactNode;
};
