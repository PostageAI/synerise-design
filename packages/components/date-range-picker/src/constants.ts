import { range } from '@synerise/ds-date-picker/dist/utils';

export const SECONDS = 'SECONDS';
export const MINUTES = 'MINUTES';
export const HOURS = 'HOURS';
export const DAYS = 'DAYS';
export const WEEKS = 'WEEKS';
export const MONTHS = 'MONTHS';
export const YEARS = 'YEARS';
export const ABSOLUTE = 'ABSOLUTE';
export const RELATIVE = 'RELATIVE';
export const RELATIVE_OFFSET_MAX = 999999;
export const RELATIVE_DURATION_MAX = 999999;
export const RELATIVE_TYPES = [SECONDS, MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS];
export const ALL_TIME_DURATION = { type: YEARS, value: 1000 };
export const RELATIVE_PRESETS = [
  {
    key: 'TODAY',
    translationKey: 'SNRS.DATE.TODAY',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 0 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'YESTERDAY',
    translationKey: 'SNRS.DATE.YESTERDAY',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'LAST_7_DAYS',
    translationKey: 'SNRS.DATE.LAST_7_DAYS',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 0 },
    duration: { type: DAYS, value: 7 },
  },
  {
    key: 'THIS_WEEK',
    translationKey: 'SNRS.DATE.THIS_WEEK',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: WEEKS, value: 0 },
    duration: { type: WEEKS, value: 1 },
  },
  {
    key: 'LAST_WEEK',
    translationKey: 'SNRS.DATE.LAST_WEEK',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: WEEKS, value: 1 },
    duration: { type: WEEKS, value: 1 },
  },
  {
    key: 'THIS_MONTH',
    translationKey: 'SNRS.DATE.THIS_MONTH',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 0 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'LAST_MONTH',
    translationKey: 'SNRS.DATE.LAST_MONTH',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'LAST_3_MONTHS',
    translationKey: 'SNRS.DATE.LAST_3_MONTHS',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 3 },
  },
  {
    key: 'LAST_6_MONTHS',
    translationKey: 'SNRS.DATE.LAST_6_MONTHS',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 6 },
  },
  {
    key: 'LAST_YEAR',
    translationKey: 'SNRS.DATE.LAST_YEAR',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: YEARS, value: 1 },
    duration: { type: YEARS, value: 1 },
  },
  {
    key: 'ALL_TIME',
    translationKey: 'SNRS.DATE.ALL_TIME',
    type: ABSOLUTE,
  },
  {
    key: 'TOMORROW',
    translationKey: 'SNRS.DATE.TOMORROW',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'NEXT_7_DAYS',
    translationKey: 'SNRS.DATE.NEXT_7_DAYS',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 7 },
  },
  {
    key: 'NEXT_MONTH',
    translationKey: 'SNRS.DATE.NEXT_MONTH',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'NEXT_3_MONTHS',
    translationKey: 'SNRS.DATE.NEXT_3_MONTHS',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 3 },
  },
  {
    key: 'NEXT_6_MONTHS',
    translationKey: 'SNRS.DATE.NEXT_6_MONTHS',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 6 },
  },
  {
    key: 'NEXT_YEAR',
    translationKey: 'SNRS.DATE.NEXT_YEAR',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: YEARS, value: 1 },
    duration: { type: YEARS, value: 1 },
  },
];

export const TIME_OPTIONS = {
  HOURS: range(0, 24),
  MINUTES: range(0, 60),
  SECONDS: range(0, 60),
};