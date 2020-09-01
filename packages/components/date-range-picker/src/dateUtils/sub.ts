import subSecond from "date-fns/subSeconds";
import subMinute from "date-fns/subMinutes";
import subHour from "date-fns/subHours";
import subDay from "date-fns/subDays";
import subWeek from "date-fns/subWeeks";
import subMonth from "date-fns/subMonths";
import subYear from "date-fns/subYears";

export default {
  SECONDS: subSecond,
  MINUTES: subMinute,
  HOURS: subHour,
  DAYS: subDay,
  WEEKS: subWeek,
  MONTHS: subMonth,
  YEARS: subYear,
};
