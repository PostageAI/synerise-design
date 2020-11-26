---
id: action-area
title: ActionArea
---

ActionArea UI Component

## Installation
```
npm i @synerise/ds-action-area
or
yarn add @synerise/ds-action-area
```

## Usage
```
import ActionArea from '@synerise/ds-action-area'

<ActionArea description="Description" label="Label" actionLabel="Define" action={() => {}} />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-action-area--default"></iframe>

## API

| Property    | Description                                      | Type                        | Default |
| ---         | ---                                              | ---                         | ---     |
| action      | Function called when user clicks on ActionButton | `Function`                  | -       |
| actionLabel | Label of action button                           | `string`/ `React.ReactNode` | -       |
| description | Description of ActionArea                        | `string`/ `React.ReactNode` | -       |
| label       | Label of ActionArea                              | `string`/ `React.ReactNode` | -       |
| withMargin  | Adds bottom margin                               | `boolean`                   | -       |

