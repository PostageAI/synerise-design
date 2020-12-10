import * as React from 'react';
import Button from '@synerise/ds-button';
import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import Badge from '@synerise/ds-badge';
import { CloseS, FilterM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { useIntl } from 'react-intl';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './RangeFilterStatus.styles';
import { RangeFilterStatusProps } from './RangeFilterStatus.types';

const RangeFilterStatus: React.FC<RangeFilterStatusProps> = ({ onFilterRemove, disabled, filter, label, onClick }) => {
  const intl = useIntl();
  return (
    <S.Container>
      {!filter ? (
        <Button.Creator label={label} disabled={disabled} onClick={onClick} block />
      ) : (
        <ContentItem
          onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
            e.stopPropagation();
            onClick();
          }}
          headerSuffix={
            <>
              <S.SuffixText>Change</S.SuffixText>
              <Tooltip title="Remove">
                <Icon
                  onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
                    e.stopPropagation();
                    onFilterRemove && onFilterRemove();
                  }}
                  component={<CloseS />}
                  color={theme.palette['red-600']}
                />
              </Tooltip>
            </>
          }
          item={{
            id: 'filter-trigger',
            name: intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.${filter.type}` }),
            tag: (
              <S.BadgeWrapper>
                <Badge status="active" flag pulsing>
                  <Icon component={<FilterM />} />
                </Badge>
              </S.BadgeWrapper>
            ),
          }}
          texts={{}}
        />
      )}
    </S.Container>
  );
};

export default RangeFilterStatus;
