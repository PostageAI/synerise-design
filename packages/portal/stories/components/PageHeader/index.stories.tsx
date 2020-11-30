import PageHeader from '@synerise/ds-page-header';

import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import Icon from '@synerise/ds-icon/';
import { AngleDownS, ArrowRightCircleM, MailM, OptionHorizontalM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import { boolean, select } from '@storybook/addon-knobs';
import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Stepper from '@synerise/ds-stepper';

const shapes = ['circle', 'square'] as const;
const statuses = ['active', 'inactive', 'blocked'] as const;
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
const tabs = [
  {
    label: 'Tab first',
  },
  {
    label: 'Tab second',
  },
  {
    label: 'Tab Third',
  },
];

const stories = {
  default: {
    title: 'Default Main page header',
  },
  description: {
    title: 'Main page header with description',
    description: 'Description',
  },
  optionBar: {
    title: 'Main page header with option bar',
    bar: <Button>Function</Button>,
  },
  tabs: withState({
    activeTab: 0,
  })(({ store }) => (
    <PageHeader
      title="Main page header with tabs"
      tabs={
        <Tabs
          tabs={tabs}
          activeTab={store.state.activeTab}
          handleTabClick={(index: number) => store.set({ activeTab: index })}
          configuration={{
            label: 'Manage dashboards',
            action: action('Manage dashboards click'),
          }}
        />
      }
    />
  )),
  isolated: () => {
    const isolated = boolean('Isolated', true);
    return <PageHeader title="Nav can be isolated from header's wrapper" isolated={isolated} />;
  },
  backButton: {
    title: 'Main page header witch back button',
    onGoBack: action('goBack'),
  },
  closeButton: {
    title: 'Main page header witch close button',
    onClose: action('onClick'),
  },
  examples: withState({
    activeTab: 0,
    value: '',
  })(({ store }) => (
    <PageHeader
      onGoBack={action('goBack')}
      bar={
        <>
          <Button type="tertiary">Function</Button>
        </>
      }
      inlineEdit={{
        name: 'name-of-input',
        value: store.state.value,
        maxLength: 60,
        handleOnChange: event => {
          store.set({ value: event.target.value });
        },
        handleOnBlur: () => action('onBlur'),
        handleOnEnterPress: () => action('onEnterPress'),
        placeholder: 'Example text',
        size: 'normal',
      }}
      more={
        <Button type="ghost" mode="icon-label">
          <Icon component={<ArrowRightCircleM />} color={theme.palette['grey-600']} />
          More details
        </Button>
      }
      avatar={
        <Badge status="active">
          <Avatar
            backgroundColor={select('backgroundColors', backgroundColors, 'red')}
            backgroundColorHue={'100'}
            disabled={boolean('disabled', false)}
            hasStatus
            shape={select('shape', shapes, 'circle')}
            size={select('size', ['small', 'medium', 'large', 'extraLarge'], 'large')}
          >
            <Icon component={<MailM />} color={theme.palette['red-600']} />
          </Avatar>
        </Badge>
      }
      tabs={
        <Tabs
          tabs={tabs}
          activeTab={store.state.activeTab}
          handleTabClick={(index: number) => store.set({ activeTab: index })}
          configuration={{
            label: 'Manage dashboards',
            action: action('Manage dashboards click'),
          }}
        />
      }
      rightSide={
        <>
          <Button>Duplicate</Button>
          <Button mode={'split'} type={'primary'}>
            Edit
            <Icon component={<AngleDownS />} color={'#ffffff'} />
          </Button>
        </>
      }
    />
  )),
  withStepper: () => (
    <PageHeader
      avatar={
        <Badge status="active">
          <Avatar
            backgroundColor={select('backgroundColors', backgroundColors, 'red')}
            backgroundColorHue={'100'}
            disabled={boolean('disabled', false)}
            hasStatus
            shape={select('shape', shapes, 'circle')}
            size={select('size', ['small', 'medium', 'large', 'extraLarge'], 'large')}
          >
            <Icon component={<MailM />} color={theme.palette['red-600']} />
          </Avatar>
        </Badge>
      }
      inlineEdit={{
        name: 'name-of-input',
        value: 'Example text',
        maxLength: 60,
        handleOnChange: action('Edit'),
        handleOnBlur: () => action('onBlur'),
        handleOnEnterPress: () => action('onEnterPress'),
        placeholder: 'Example text',
        size: 'normal',
      }}
      rightSide={
        <>
          <Stepper style={{ flex: '1', justifyContent: 'flex-end', marginRight: '16px' }}>
            <Stepper.Step label="Details" stepNumber={1} active />
            <Stepper.Step label="Settings" stepNumber={2} />
            <Stepper.Step label="Filters" stepNumber={3} />
            <Stepper.Step label="Ranking" stepNumber={4} />
          </Stepper>
          <Button>Cancel</Button>
          <Button type={'primary'}>Save</Button>
          <Button type="ghost" mode="single-icon">
            <Icon component={<OptionHorizontalM />} />
          </Button>
        </>
      }
    />
  ),
};

export default {
  name: 'Components/Page Header',
  withoutCenter: true,
  stories,
  Component: PageHeader,
};
