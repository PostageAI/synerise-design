import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CloseM, EditS } from '@synerise/ds-icon/dist/icons';
import InlineSelect from '@synerise/ds-inline-edit/dist/InlineSelect/InlineSelect';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './MonthlyFilter.styles';
import { MONTHLY_TYPES, MONTH_DAYS, PERIODS, PERIODS_TYPE, MAX_RULES_ALLOWED, defaultId } from '../constants';
import { Month, MonthlyFilterProps } from './MonthlyFilter.types';
import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import { Tag, TagShape } from '@synerise/ds-tags';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';
import TimeWindow from '../TimeWindow/TimeWindow';

class MonthlyFilter extends React.PureComponent<MonthlyFilterProps> {
  state = {
    visible: {
      [defaultId]: true,
    },
  };

  componentDidMount(): void {
    const { value } = this.props;
    value.length && this.handleCollapse(value[0].id);
  }

  setData = (definition: string): void => {
    const { onChange } = this.props;
    return onChange(definition);
  };

  handleAddRow = (): void => {
    const id = Math.random();
    const { value } = this.props;

    this.setData([
      ...value,
      { period: MONTHLY_TYPES.DAY_OF_MONTH, periodType: PERIODS_TYPE[0].value, definition: {}, id },
    ]);
    this.handleCollapse(id);
  };

  handleRemoveRow = (e: Event, index: React.ReactText): void => {
    const { value } = this.props;
    e.stopPropagation();
    const result = value.filter((item, key) => key !== index);
    this.handleRemoveRowCollapse(value[index].id);
    this.setData([...result]);
  };

  handleRemoveRowCollapse = (deletedId: number): void => {
    const { value } = this.props;
    const { visible } = this.state;
    const itemKey = value.findIndex(item => item.id === deletedId);
    const next = value[itemKey + 1];
    const prev = value[itemKey - 1];
    visible[deletedId] && (next || prev) && this.handleCollapse(next ? next.id : prev.id);
  };

  handleTypeChange = (val: string, index: number): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = {
      ...data[index],
      period: val,
      definition: {},
    };
    this.setData(data);
  };

  handlePeriodTypeChange = (val: string, index: number): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = {
      ...data[index],
      periodType: val,
    };
    this.setData(data);
  };

  handleDefinitionChange = (definition: string, index: number): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = { ...data[index], definition };
    this.setData(data);
  };

  dayWeekFormatter = (index: number, long: boolean): string => {
    const { intl } = this.props;
    const weekStartIndex = Math.floor(index / 7);
    const dayOfWeek = index - weekStartIndex * 7;
    const weekday = intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.${dayOfWeek}` });
    const nthWeek = intl.formatMessage({
      id: `SNRS.NTH.${weekStartIndex === 5 ? 'LAST' : weekStartIndex + 1}`,
    });
    return long ? `${nthWeek} ${weekday}` : intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS.${dayOfWeek}` });
  };

  dayMonthFormatter = (i: number, long: boolean): string => {
    const { intl } = this.props;

    const locale = intl.locale.substring(0, 2);
    return long
      ? intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.NTH_DAY_OF_MONTH' }, { nth: MONTH_DAYS(locale)[i] })
      : MONTH_DAYS(locale)[i];
  };

  dayTemplate = (index: number): { week: number; day: number } => {
    const weekStartIndex = Math.floor(index / 7);
    return { week: weekStartIndex, day: index - weekStartIndex * 7 };
  };

  getTimeWindowSettings = (item: Month) => {
    const { intl } = this.props;

    const settings = {
      [MONTHLY_TYPES.DAY_OF_MONTH]: {
        numberOfDays: 31,
        reverseGroup: 1,
        inverted: item.periodType === 'ending',
        dayTemplate: (dayOfMonth: number): { day: number } => ({ day: dayOfMonth }),
        dayFormatter: this.dayMonthFormatter,
      },
      [MONTHLY_TYPES.DAY_OF_WEEK]: {
        numberOfDays: 7 * 5,
        reverseGroup: 7,
        dayTemplate: this.dayTemplate,
        dayFormatter: this.dayWeekFormatter,
        labelInverted: item.periodType === 'ending',
        inverted: item.periodType === 'ending',
        rowLabelFormatter: (rowIndex: number): string =>
          intl.formatMessage({
            id: `SNRS.NTH.${rowIndex === 0 && item.periodType === 'ending' ? 'LAST' : rowIndex + 1}`,
          }),
      },
    };
    return settings[item.period];
  };

  handleCollapse = (id: React.ReactText) => {
    const { visible } = this.state;
    const updatedVisible = {};
    for (let i in visible) {
      updatedVisible[i.id] = !visible[i];
    }
    updatedVisible[id] = true;
    this.setState({
      visible: updatedVisible,
    });
  };

  render(): JSX.Element {
    const { value, intl } = this.props;
    const { visible } = this.state;
    return (
      <React.Fragment>
        {value.map((item, key) => (
          <ContentItem
            item={{
              tag: (
                <Tag
                  name={String(key + 1)}
                  shape={TagShape.SINGLE_CHARACTER_ROUND}
                  color={theme.palette['grey-100']}
                  textColor={theme.palette['grey-500']}
                />
              ),
              id: item.id,
              name: (
                <S.DropdownHeader className={visible[item.id] && 'dropdown-header-visible'}>
                  <S.DropdownLabel>
                    <b>
                      <FormattedMessage
                        id="DS.DATE-RANGE-PICKER.RULE"
                        values={{
                          value: key + 1,
                        }}
                      />
                    </b>{' '}
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.DAYS-OF" />
                  </S.DropdownLabel>
                  <S.Select
                    expanded={false}
                    input={{
                      value: intl.formatMessage({ id: PERIODS[0].translationKey }),
                      name: 'name-of-input',
                      maxLength: 120,
                      placeholder: 'This is placeholder',
                    }}
                    dataSource={PERIODS.map(i => ({
                      text: intl.formatMessage({ id: i.name as string }),
                    }))}
                    //                    onChange={({ value }) => this.handleTypeChange(value, key)}

                    size="small"
                  />

                  <S.DropdownLabel>
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.COUNTED-FROM" />
                  </S.DropdownLabel>
                  <S.Select
                    expanded={false}
                    input={{
                      value: intl.formatMessage({ id: PERIODS_TYPE[0].translationKey }),
                      name: 'name-of-input',
                      maxLength: 120,
                      placeholder: 'This is placeholder',
                    }}
                    dataSource={PERIODS_TYPE.map(i => ({
                      text: intl.formatMessage({ id: i.translationKey as string }),
                    }))}
                    size="small"
                    //onChange={({ value }) => this.handlePeriodTypeChange(value, key)}
                  />

                  <S.EditBtn>
                    <Icon component={<EditS />} size={25} />
                    <FormattedMessage id="SNRS.MANAGEABLE-LIST.EDIT" />
                  </S.EditBtn>
                </S.DropdownHeader>
              ),
              content: (
                <S.Wrapper>
                  <TimeWindow
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item.period}_${key}`}
                    showSelectAll
                    invertibleTime
                    numberOfDaysPerRow={7}
                    days={item.definition}
                    onChange={(definition): void => this.handleDefinitionChange(definition, key)}
                    timeMarks={{}}
                    {...this.getTimeWindowSettings(item)}
                  />
                </S.Wrapper>
              ),
            }}
            headerSuffix={
              <Tooltip title={intl.formatMessage({ id: 'SNRS.MANAGEABLE-LIST.REMOVE' })}>
                <S.DropdownDeleteBtn onClick={e => this.handleRemoveRow(e, key)}>
                  <Icon component={<CloseM />} size={15} />
                </S.DropdownDeleteBtn>
              </Tooltip>
            }
            texts={{}}
          ></ContentItem>
        ))}
        <S.AddContainer>
          {value.length < MAX_RULES_ALLOWED && (
            <Button.Creator  label={<FormattedMessage id="DS.DATE-RANGE-PICKER.ADD-RULE" />} onClick={this.handleAddRow} block />
          )}
        </S.AddContainer>
      </React.Fragment>
    );
  }
}

export default injectIntl(MonthlyFilter);
