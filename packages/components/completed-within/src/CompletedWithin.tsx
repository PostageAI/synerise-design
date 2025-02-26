import * as React from 'react';
import { useIntl } from 'react-intl';
import Icon, { ClockM, Close3S } from '@synerise/ds-icon';

import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip';
import Settings from './Settings/Settings';
import { CompletedWithinProps, Period } from './CompletedWithin.types';
import * as S from './CompleteWithin.styles';

export const DEFAULT_PERIODS = ['SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'MONTHS', 'YEARS'];
const DEFAULT_PERIOD = 'DAYS';

const CompletedWithin: React.FC<CompletedWithinProps> = ({ value, onSetValue, text, periods, placeholder }) => {
  const intl = useIntl();

  const texts = React.useMemo(
    () => ({
      header: intl.formatMessage({ id: 'DS.COMPLETED-WITHIN.HEADER', defaultMessage: 'Completed within' }),
      completedLabel: intl.formatMessage({
        id: 'DS.COMPLETED-WITHIN.COMPLETED-WIHITN',
        defaultMessage: 'Completed within',
      }),
      clear: intl.formatMessage({ id: 'DS.COMPLETED-WITHIN.CLEAR', defaultMessage: 'Clear' }),
      periodPlaceholder: intl.formatMessage({
        id: 'DS.COMPLETED-WITHIN.PERIOD-PLACEHOLDER',
        defaultMessage: 'Interval',
      }),
      ...text,
    }),
    [text, intl]
  );

  const getPeriods = React.useMemo(() => {
    if (periods !== undefined && periods.length) {
      return periods;
    }
    return DEFAULT_PERIODS.map(period => ({
      value: period,
      label: intl.formatMessage({ id: `DS.COMPLETED-WITHIN.${period}`, defaultMessage: period }),
    }));
  }, [periods, intl]);

  const [innerValue, setInnerValue] = React.useState<string | number | undefined>(value.value);
  const [innerPeriod, setInnerPeriod] = React.useState<Period>(value.period || DEFAULT_PERIOD);

  const hasValue = React.useMemo(() => value.value !== undefined && value.value > 0, [value]);

  const handleVisibleChange = React.useCallback(
    (visible: boolean) => {
      if (!visible && innerValue && innerPeriod) {
        onSetValue({ value: Number(innerValue), period: innerPeriod });
      }
    },
    [innerPeriod, innerValue, onSetValue]
  );

  const handleClear = React.useCallback(() => {
    setInnerPeriod(undefined);
    setInnerValue(undefined);
    onSetValue({ value: undefined, period: undefined });
  }, [onSetValue]);

  const triggerMode = React.useMemo(() => {
    if (hasValue || placeholder) return 'icon-label';
    return 'single-icon';
  }, [hasValue, placeholder]);

  const triggerLabel = React.useMemo(() => {
    return hasValue
      ? `${texts.completedLabel} ${value.value} ${
          getPeriods.find(singlePeriod => singlePeriod.value === value.period)?.label
        }`
      : placeholder;
  }, [getPeriods, hasValue, texts, value, placeholder]);

  return (
    <S.CompletedWithinWrapper withValue={hasValue}>
      <Dropdown
        overlay={
          <Settings
            value={{ value: innerValue !== undefined ? Number(innerValue) : 0, period: innerPeriod }}
            onValueChange={setInnerValue}
            onPeriodChange={setInnerPeriod}
            text={texts}
            periods={getPeriods}
          />
        }
        trigger={['click']}
        onVisibleChange={handleVisibleChange}
        placement="topLeft"
      >
        <S.TriggerButton className="ds-completed-within" type="tertiary" mode={triggerMode}>
          <Icon component={<ClockM />} />
          {triggerLabel}
        </S.TriggerButton>
      </Dropdown>
      {hasValue && (
        <Tooltip title={texts.clear}>
          <S.ClearButton mode="single-icon" type="ghost" onClick={handleClear} data-testid="clear-button">
            <Icon component={<Close3S />} />
          </S.ClearButton>
        </Tooltip>
      )}
    </S.CompletedWithinWrapper>
  );
};
export default CompletedWithin;
