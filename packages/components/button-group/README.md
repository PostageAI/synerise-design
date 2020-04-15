---
id: button-group
title: Button-Group
---

A group of buttons is used to wrap a series of buttons.

## When to use it

---

- To combine primary and secondary buttons.
- To allow users to navigate between several separate tabs with options in a main screen.

## Component anatomy

---

This is a complex component, which means that it may consist of other components:

- [icon](/docs/theme/components/icon/)
- [button](/docs/theme/components/button/)
- [utils](/docs/theme/components/utils/)

## Installation

---

```
npm i @synerise/ds-button-group
```

or

```
yarn add @synerise/ds-button-group
```

## Usage

---

```
import ButtonGroup from '@synerise/ds-button-group'


<ButtonGroup
  title={'Some title'}
  size={'large'}
  description={'Some description'}
>
  <Button onClick={() => alert('Clicked!')}>Click me!</Button>
  <Button onClick={() => alert('Clicked!')}>Click me!</Button>
  <Button onClick={() => alert('Clicked!')}>Click me!</Button>
</ButtonGroup>

```

## Demo

---

<iframe src="/storybook-static/iframe.html?id=components-buttongroup--default"></iframe>

## API

---

| Property        | Description                                                             | Type            | Default  |
| --------------- | ----------------------------------------------------------------------- | --------------- | -------- |
| title           | The title of the group                                                  | string          | -        |
| description     | The description of the group                                            | string          | -        |
| size            | Defines the size of the button: `small`, `large`                        | string          | -        |
| buttonsPosition | Defines the horizontal position of buttons: `left`, `center` or `right` | string          | `center` |
| fullWidth       | Set buttons width to fill all available space                           | boolean         | `false`  |
| children        | Buttons used in the group                                               | React.ReactNode | -        |
