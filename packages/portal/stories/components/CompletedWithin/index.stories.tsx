import * as React from 'react';

import CompletedWithin from '@synerise/ds-completed-within';
import { withState } from '@dump247/storybook-state';
import { PeriodValue } from '@synerise/ds-completed-within/dist/CompletedWithin.types';
import { boolean, text } from '@storybook/addon-knobs';

const DEFAULT_STATE = {
  value: {
    value: 0,
    period: undefined,
  },
};

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const handleSetValue = (value: PeriodValue) => store.set({ value });

    return (
      <CompletedWithin
        text={{
          header: 'Completed within',
          completedLabel: 'Completed within',
          clear: 'Clear',
          periodPlaceholder: 'Interval',
        }}
        value={store.state.value}
        onSetValue={handleSetValue}
        placeholder={boolean('With placeholder', false) ? text('Placeholder', 'Completed within') : undefined}
      />
    );
  }),
};

export default {
  name: 'Components/Filter/CompletedWithin',
  config: {},
  stories,
  Component: CompletedWithin,
};
