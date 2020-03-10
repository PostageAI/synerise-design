import * as React from 'react';
import {text, select, number, boolean} from '@storybook/addon-knobs';
import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import DuplicateS from "@synerise/ds-icon/dist/icons/DuplicateS";

const wrapperStyles = {
  padding: '40px',
  width: '80%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const decorator = (storyFn) => (
  <div style={wrapperStyles}>
    {storyFn()}
  </div>
);

const shapes = ['circle', 'square'] as
const ;
const sizes = ['small', 'medium', 'large', 'extraLarge'] as
const ;
const statuses = ['error', 'default', 'success'] as
const ;
const backgroundColors = [
  'red',
  'green',
  'grey',
  'yellow',
  'blue',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
] as const;
const placeholderColors = backgroundColors;
const backgroundColorHue = [
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '100',
  '050',
] as const;
const placeholderColorHue = backgroundColorHue;
const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

const image = [
  '',
  imgSrc
] as
const ;

const stories = {
  sizes: () => (
    <div
      style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 200}}>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
        backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
        disabled={boolean('disabled', false)}
        size={'small'}
        shape={select('shape', shapes, 'circle')}
        tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
        src={imgSrc}
        hasStatus={boolean('has status', true)}
      >
        AK
      </Avatar>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
        backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
        disabled={boolean('disabled', false)}
        size={'medium'}
        shape={select('shape', shapes, 'circle')}
        tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
        src={imgSrc}
        hasStatus={boolean('has status', true)}
      >
        AK
      </Avatar>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
        backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
        disabled={boolean('disabled', false)}
        size={'large'}
        shape={select('shape', shapes, 'circle')}
        tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
        src={imgSrc}
        hasStatus={boolean('has status', true)}
      >
        AK
      </Avatar>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
        backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
        disabled={boolean('disabled', false)}
        size={'extraLarge'}
        shape={select('shape', shapes, 'circle')}
        tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
        src={imgSrc}
        hasStatus={boolean('has status', true)}
      >
        AK
      </Avatar>
    </div>
  ),
  statuses: () => (
    <div
      style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 200}}>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
        backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
        disabled={boolean('disabled', false)}
        size={select('sizeString', sizes, 'small')}
        shape={select('shape', shapes, 'circle')}
        tooltip={{name: 'Silvia Jobs'}}
        hasStatus={boolean('has status', true)}
      >
        AK
      </Avatar>
      <Badge status={'default'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'medium'}
          shape={select('shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'success'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'large'}
          shape={select('shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'error'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'extraLarge'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'error'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'extraLarge'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={boolean('has status', true)}
          placeholderColor={select('placeholderColors', placeholderColors, 'blue')}
          placeholderColorHue={select('placeholderColorHue', placeholderColorHue, '300')}
        >
          
        </Avatar>
      </Badge>
    </div>
  ),
  allOptions: () => (
    <div
      style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 200}}>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
        backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
        disabled={boolean('disabled', false)}
        size={select('sizeString', sizes, 'small')}
        shape={select('shape', shapes, 'circle')}
        tooltip={{name: 'Silvia Jobs'}}
        hasStatus={boolean('has status', true)}
        iconComponent={
          <Icon color={text('IconColor', '#fff')} size={number('iconSize', 20)} component={<DuplicateS/>}/>
        }
      >
        AK
      </Avatar>
      <Badge status={'default'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'medium'}
          shape={select('shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'success'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'large'}
          shape={select('shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={select('withImage', image, '')}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'error'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'extraLarge'}
          shape={'square'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
      </Badge>
    </div>
  ),
};

export default {
  name: 'Components|Avatar',
  withoutCenter: true,
  decorator,
  stories,
  Component: Avatar,
};
