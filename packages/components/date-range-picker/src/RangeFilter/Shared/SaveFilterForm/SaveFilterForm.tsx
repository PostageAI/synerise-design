import * as React from 'react';
import Button from '@synerise/ds-button';
import { RawInput } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';
import { CheckM, CloseM } from '@synerise/ds-icon';
import { useIntl } from 'react-intl';
import { SaveFilterFormProps } from './SaveFilterForm.types';
import * as S from './SaveFilterForm.styles';

const SaveFilterForm: React.FC<SaveFilterFormProps> = ({ onFilterSave }) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>();
  const intl = useIntl();
  const input = (
    <>
      <RawInput
        placeholder={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.FILTER-NAME' })}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setName(e.target.value);
        }}
      />
      <S.FormButton
        mode="single-icon"
        type="ghost"
        onClick={(): void => {
          setActive(false);
        }}
      >
        <Icon component={<CloseM />} />
      </S.FormButton>{' '}
      <S.FormButton
        mode="single-icon"
        type="custom-color-ghost"
        color="blue"
        onClick={(): void => {
          setActive(false);
          name && onFilterSave(name);
          setName('');
        }}
      >
        <Icon component={<CheckM />} />
      </S.FormButton>
    </>
  );
  return (
    <S.Container>
      {active ? (
        input
      ) : (
        <Button type="ghost" onClick={(): void => setActive(!active)}>
          {intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SAVE-FILTER' })}
        </Button>
      )}
    </S.Container>
  );
};

export default SaveFilterForm;
