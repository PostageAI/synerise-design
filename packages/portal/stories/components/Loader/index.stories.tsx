import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Loader from '@synerise/ds-loader';



const iconSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L'
};
const colorOptions = {
  blue: 'blue',
  grey:'grey',
  red:'red',
  green: 'green',
  yellow: 'yellow',
  pink: 'pink',
  mars: 'mars',
  orange: 'orange',
  fern: 'fern',
  cyan: 'cyan',
  purple: 'purple',
  violet: 'violet',
};

const stories = {
  default: () => {
    const size = select('Size', iconSizes,'M')
    const elementsPosition = select('Position of elements', ['right','bottom'],'right');
    const showText = boolean ('Show Loading text',true, );
    const colors = select('Set custom color', colorOptions, colorOptions.blue);
    const loadingText = text('Loading', 'Loading...');
    const getLoading = (showText: boolean): string | null => {
      if (showText) {
        return loadingText;
      } else {
        return null;
      }
    };
    return(
      <div>
        <Loader size={size} color={colors} label={loadingText && getLoading(showText)} elementsPosition={elementsPosition}></Loader>
      </div>
    )
  },
};

export default {
name: 'Components/Loader',
  config: {},
  stories,
  Component: Loader,
}
