import * as React from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Input, InputGroup, TextArea, RawInput } from '@synerise/ds-input';
import { DSProvider } from '@synerise/ds-core';

import Icon from '@synerise/ds-icon';
import { ReactComponent as FileM } from '@synerise/ds-icon/dist/icons/file-m.svg';
import Select from '@synerise/ds-select';

export const InputBasic = () => (
  <div style={{ width: '300px' }}>
    <DSProvider code="en_GB">
      <Input
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        value={text('value', '')}
      />
    </DSProvider>
  </div>
);

export const InputWithPreSelect = () => {
  const select = (
    <Select onChange={action('OnChange')} style={{ width: '50%' }} defaultValue="post">
      <Select.Option value="post">POST</Select.Option>
      <Select.Option value="get">GET</Select.Option>
    </Select>
  );

  const input = (
    <RawInput
      placeholder={text('placeholder', 'Placeholder')}
      disabled={boolean('disabled', false)}
      onChange={action('onChange')}
      value={text('value', '')}
      style={{ width: '50%' }}
    />
  );

  return (
    <div style={{ width: '300px' }}>
      <DSProvider code="en_GB">
        <RawInput.Group compact>
          {select}
          {input}
        </RawInput.Group>
      </DSProvider>
    </div>
  );
};

export const InputWithIcons = () => (
  <div style={{ width: '300px' }}>
    <DSProvider code="en_GB">
      <Input
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        value={text('value', '')}
        icon1={<Icon component={<FileM />} />}
        icon2={<Icon component={<FileM />} />}
      />
    </DSProvider>
  </div>
);

export const TextAreaBasic = () => (
  <div style={{ width: '300px' }}>
    <DSProvider code="en_GB">
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        value={text('value', '')}
      />
    </DSProvider>
  </div>
);

export const TextAreaWithIcons = () => (
  <div style={{ width: '300px' }}>
    <DSProvider code="en_GB">
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        value={text('value', '')}
        icon1={<Icon component={<FileM />} />}
        icon2={<Icon component={<FileM />} />}
      />
    </DSProvider>
  </div>
);
