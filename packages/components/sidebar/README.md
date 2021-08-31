---
id: sidebar
title: Sidebar
---

Sidebar UI Component

## Installation

```
npm i @synerise/ds-sidebar
or
yarn add @synerise/ds-sidebar
```

## Usage

```
import Sidebar from '@synerise/ds-sidebar'

<Sidebar />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-sidebar--default"></iframe>

## API

#### Sidebar

| Property         | Description                                | Type                             | Default |
| ---------------- | ------------------------------------------ | -------------------------------- | ------- |
| children         | Place for Panel element                    | React.ReactNode                  | -       |
| order            | Place for optional Array with render order | string[]                         | -       |
| onChangeOrder    | Called on drag and drop fired              | (order: string / string[])=>void | -       |
| defaultActiveKey | Place for optional default active panel    | string[]                         | -       |

#### Panel

| Property | Description       | Type                     | Default |
| -------- | ----------------- | ------------------------ | ------- |
| header   | Panel header name | React.ReactNode / string | -       |
| children | Panel content     | React.ReactNode / string | -       |
| id       | Panel unique id   | string                   | -       |

#### SidebarButton

| Property     | Description                   | Type                     | Default |
| ------------ | ----------------------------- | ------------------------ | ------- |
| textButton   | text of button                | string                   | -       |
| spanText     | text of span                  | string                   | -       |
| dataSource   | data of all items in dropdown | string / MenuItemProps   | -       |
