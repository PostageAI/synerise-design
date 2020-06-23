import * as React from 'react';
import MomentLocaleUtils from 'react-day-picker/moment';
import * as fnsAddMonths from 'date-fns/add_months';
import * as fnsAddYears from 'date-fns/add_years';
import { injectIntl } from 'react-intl';
import fnsFormat from '../../format';

import Navbar from '../Navbar/Navbar';
import { DayPicker } from './DayPicker.styles';
import * as S from '../Navbar/Navbar.styles';
import { DayPickerProps } from './DayPicker.types';

const captionElement = (): null => null;

const Picker: React.FC<DayPickerProps> = ({
  month,
  onMonthChange,
  onMonthNameClick,
  onYearNameClick,
  hidePrev,
  hideNext,
  intl,
  ...rest
}) => {
  return (
    <>
      <Navbar
        title={
          <>
            <S.Link onClick={onMonthNameClick}>{fnsFormat(month, 'MMM', intl.locale)}</S.Link>{' '}
            <S.Link onClick={onYearNameClick}>{fnsFormat(month, 'YYYY', intl.locale)}</S.Link>
          </>
        }
        onLongPrev={(): void => onMonthChange(fnsAddYears(month, -1))}
        onShortPrev={(): void => onMonthChange(fnsAddMonths(month, -1))}
        onLongNext={(): void => onMonthChange(fnsAddYears(month, 1))}
        onShortNext={(): void => onMonthChange(fnsAddMonths(month, 1))}
        hidePrev={hidePrev}
        hideNext={hideNext}
        key="head"
      />
      <DayPicker
        month={month}
        firstDayOfWeek={1}
        captionElement={captionElement}
        key="body"
        locale={intl.locale}
        {...rest}
        localeUtils={MomentLocaleUtils}
      />
    </>
  );
};
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(Picker);
