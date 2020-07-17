import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import { action } from '@storybook/addon-actions';

const stories = {
  default: () => {
    return (
      <div>
        <DatePicker
          showTime={true}
          onApply={value => {
            action('Selected', value);
          }}
          texts={{
            apply:'Apply',
            inputPlaceholder: 'Select date',

          }}
          useStartOfDay
        />
      </div>
    );
  },
};

export default {
  name: 'Pickers|DatePicker',
  config: {},
  stories,
};
