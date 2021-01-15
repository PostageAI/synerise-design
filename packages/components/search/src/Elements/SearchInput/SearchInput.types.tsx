import * as React from 'react';
import { InputProps } from 'antd/lib/input';

export type SearchInputProps = {
  alwaysExpanded?: boolean;
  alwaysHighlight?: boolean;
  clearTooltip?: string | React.ReactNode;
  closeOnClickOutside?: boolean;
  textLookupKey?: string;
  filterLookupKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterLabel?: { icon?: React.ReactNode; [key: string]: any } | null;
  focusTrigger?: boolean;
  onButtonClick?: () => void;
  onChange: (value: string) => void;
  onClear: () => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onToggle?: (isOpen: boolean) => void;
  placeholder?: string;
  toggleTrigger?: boolean;
  value: string;
  moveCursorToEnd?: boolean;
  disableInput?: boolean;
  inputProps?: Partial<InputProps>;
};

export type SearchInputState = {
  inputOffset: number;
  isInputOpen: boolean;
  isResultChosen: boolean;
  isInputFocused: boolean;
};
