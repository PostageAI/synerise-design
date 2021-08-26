import { CollectorTexts, CollectorProps } from '../../Collector.types';

export type ButtonPanelProps = {
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
  showCancel: boolean;
  texts: CollectorTexts;
} & Pick<CollectorProps, 'addButtonProps' | 'cancelButtonProps'>
