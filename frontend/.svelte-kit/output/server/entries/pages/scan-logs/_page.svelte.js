import { v as derived, a as push, w as props_id, d as spread_attributes, h as bind_props, p as pop, j as ensure_array_like, b as attr, a5 as maybe_selected, e as escape_html, a1 as run, x as copy_payload, y as assign_payload, c as spread_props, f as clsx, _ as attr_class } from "../../../chunks/index2.js";
import { getFacetedUniqueValues, getFacetedRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, getCoreRowModel } from "@tanstack/table-core";
import { c as createSvelteTable, T as Table, a as Table_header, b as Table_row, d as Table_head, F as Flex_render, e as Table_body, f as Table_cell } from "../../../chunks/table-row.js";
import { CalendarDateTime, CalendarDate, getLocalTimeZone, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameDay, isSameMonth, isToday, isEqualMonth } from "@internationalized/date";
import { c as cn, b as buttonVariants, B as Button } from "../../../chunks/button.js";
import { c as createBitsAttrs, w as watch, u as getDataReadonly, g as getDataDisabled, v as getDataInvalid, a as attachRef, x as getAriaDisabled, y as getAriaReadonly, b as createId, d as box, m as mergeProps, z as getDataSelected, A as getDataUnavailable, B as getAriaSelected, I as Input } from "../../../chunks/create-id.js";
import "clsx";
import "style-to-object";
import { h as afterTick, j as ARROW_DOWN, A as ARROW_UP, r as ARROW_LEFT, s as ARROW_RIGHT, E as ENTER, S as SPACE, t as isHTMLElement, v as isBrowser, C as Context, u as useId, e as DOMContext, n as noop, w as resolveLocaleProp } from "../../../chunks/scroll-lock.js";
import { i as isValidIndex, e as chunk, C as Chevron_down, S as Search } from "../../../chunks/search.js";
import { C as Chevron_right, a as Chevron_left, R as Root, P as Popover_trigger, b as Popover_content } from "../../../chunks/index4.js";
import { C as Calendar } from "../../../chunks/calendar.js";
function getAnnouncer(doc) {
  function announce(value, kind = "assertive", timeout = 7500) {
    return;
  }
  return {
    announce
  };
}
const defaultDateDefaults = {
  defaultValue: void 0,
  granularity: "day"
};
function getDefaultDate(opts) {
  const withDefaults = { ...defaultDateDefaults, ...opts };
  const { defaultValue, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  let dateValue;
  if (referenceVal instanceof ZonedDateTime) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }
  return dateValue.calendar !== referenceVal.calendar ? toCalendar(dateValue, referenceVal.calendar) : dateValue;
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function getDateValueType(date) {
  if (date instanceof CalendarDate)
    return "date";
  if (date instanceof CalendarDateTime)
    return "datetime";
  if (date instanceof ZonedDateTime)
    return "zoneddatetime";
  throw new Error("Unknown date type");
}
function parseAnyDateValue(value, type) {
  switch (type) {
    case "date":
      return parseDate(value);
    case "datetime":
      return parseDateTime(value);
    case "zoneddatetime":
      return parseZonedDateTime(value);
    default:
      throw new Error(`Unknown date type: ${type}`);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function isBeforeOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) <= 0;
}
function isAfterOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) >= 0;
}
function isBetweenInclusive(date, start, end) {
  return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
function areAllDaysBetweenValid(start, end, isUnavailable, isDisabled) {
  if (isUnavailable === void 0 && isDisabled === void 0) {
    return true;
  }
  let dCurrent = start.add({ days: 1 });
  if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
    return false;
  }
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    dCurrent = dCurrent.add({ days: 1 });
    if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
      return false;
    }
  }
  return true;
}
const defaultPartOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};
function createFormatter(opts) {
  let locale = opts.initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    if (typeof opts.monthFormat.current !== "function" && typeof opts.yearFormat.current !== "function") {
      return new DateFormatter(locale, {
        month: opts.monthFormat.current,
        year: opts.yearFormat.current
      }).format(date);
    }
    const formattedMonth = typeof opts.monthFormat.current === "function" ? opts.monthFormat.current(date.getMonth() + 1) : new DateFormatter(locale, { month: opts.monthFormat.current }).format(date);
    const formattedYear = typeof opts.yearFormat.current === "function" ? opts.yearFormat.current(date.getFullYear()) : new DateFormatter(locale, { year: opts.yearFormat.current }).format(date);
    return `${formattedMonth} ${formattedYear}`;
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date, hourCycle = void 0) {
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric",
      hourCycle: hourCycle === 24 ? "h23" : void 0
    }).formatToParts(date);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  function part(dateObj, type, options = {}) {
    const opts2 = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts2);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function isCalendarDayNode(node) {
  if (!isHTMLElement(node)) return false;
  if (!node.hasAttribute("data-bits-day")) return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = weekStartsOn !== void 0 ? getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, "en-US") : getLastFirstDayOfWeek(firstDayOfMonth, 0, locale);
  const nextSaturday = weekStartsOn !== void 0 ? getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, "en-US") : getNextLastDayOfWeek(lastDayOfMonth, 0, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    let length = extraDays;
    if (nextMonthDays.length === 0) {
      length = extraDays - 1;
      nextMonthDays.push(startFrom);
    }
    const extraDaysArray = Array.from({ length }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return { value: dateObj, dates: allDays, weeks };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({ ...monthProps, dateObj }));
    return months;
  }
  months.push(createMonth({ ...monthProps, dateObj }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({ ...monthProps, dateObj: nextMonth }));
  }
  return months;
}
function getSelectableCells(calendarNode) {
  if (!calendarNode) return [];
  const selectableSelector = `[data-bits-day]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(calendarNode.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue) return;
  placeholder.current = parseStringToDateValue(cellValue, placeholder.current);
}
function shiftCalendarFocus({
  node,
  add,
  placeholder,
  calendarNode,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  months,
  numberOfMonths
}) {
  const candidateCells = getSelectableCells(calendarNode);
  if (!candidateCells.length) return;
  const index = candidateCells.indexOf(node);
  const nextIndex = index + add;
  if (isValidIndex(nextIndex, candidateCells)) {
    const nextCell = candidateCells[nextIndex];
    setPlaceholderToNodeValue(nextCell, placeholder);
    return nextCell.focus();
  }
  if (nextIndex < 0) {
    if (isPrevButtonDisabled) return;
    const firstMonth = months[0]?.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.subtract({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = newCandidateCells.length - Math.abs(nextIndex);
      if (isValidIndex(newIndex, newCandidateCells)) {
        const newCell = newCandidateCells[newIndex];
        setPlaceholderToNodeValue(newCell, placeholder);
        return newCell.focus();
      }
    });
  }
  if (nextIndex >= candidateCells.length) {
    if (isNextButtonDisabled) return;
    const firstMonth = months[0]?.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.add({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = nextIndex - candidateCells.length;
      if (isValidIndex(newIndex, newCandidateCells)) {
        const nextCell = newCandidateCells[newIndex];
        return nextCell.focus();
      }
    });
  }
}
const ARROW_KEYS = [
  ARROW_DOWN,
  ARROW_UP,
  ARROW_LEFT,
  ARROW_RIGHT
];
const SELECT_KEYS = [ENTER, SPACE];
function handleCalendarKeydown({
  event,
  handleCellClick,
  shiftFocus,
  placeholderValue
}) {
  const currentCell = event.target;
  if (!isCalendarDayNode(currentCell)) return;
  if (!ARROW_KEYS.includes(event.key) && !SELECT_KEYS.includes(event.key)) return;
  event.preventDefault();
  const kbdFocusMap = {
    [ARROW_DOWN]: 7,
    [ARROW_UP]: -7,
    [ARROW_LEFT]: -1,
    [ARROW_RIGHT]: 1
  };
  if (ARROW_KEYS.includes(event.key)) {
    const add = kbdFocusMap[event.key];
    if (add !== void 0) {
      shiftFocus(currentCell, add);
    }
  }
  if (SELECT_KEYS.includes(event.key)) {
    const cellValue = currentCell.getAttribute("data-value");
    if (!cellValue) return;
    handleCellClick(event, parseStringToDateValue(cellValue, placeholderValue));
  }
}
function handleCalendarNextPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}) {
  const firstMonth = months[0]?.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.add({ months: numberOfMonths }));
  } else {
    const newMonths = createMonths({
      dateObj: firstMonth.add({ months: 1 }),
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setMonths(newMonths);
    const firstNewMonth = newMonths[0];
    if (!firstNewMonth) return;
    setPlaceholder(firstNewMonth.value.set({ day: 1 }));
  }
}
function handleCalendarPrevPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}) {
  const firstMonth = months[0]?.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.subtract({ months: numberOfMonths }));
  } else {
    const newMonths = createMonths({
      dateObj: firstMonth.subtract({ months: 1 }),
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setMonths(newMonths);
    const firstNewMonth = newMonths[0];
    if (!firstNewMonth) return;
    setPlaceholder(firstNewMonth.value.set({ day: 1 }));
  }
}
function getWeekdays({ months, formatter, weekdayFormat }) {
  if (!months.length) return [];
  const firstMonth = months[0];
  const firstWeek = firstMonth.weeks[0];
  if (!firstWeek) return [];
  return firstWeek.map((date) => formatter.dayOfWeek(toDate(date), weekdayFormat));
}
function useMonthViewOptionsSync(props) {
}
function useMonthViewPlaceholderSync({
  placeholder,
  getVisibleMonths,
  weekStartsOn,
  locale,
  fixedWeeks,
  numberOfMonths,
  setMonths
}) {
}
function getIsNextButtonDisabled({ maxValue, months, disabled }) {
  if (!maxValue || !months.length) return false;
  if (disabled) return true;
  const lastMonthInView = months[months.length - 1]?.value;
  if (!lastMonthInView) return false;
  const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
  return isAfter(firstMonthOfNextPage, maxValue);
}
function getIsPrevButtonDisabled({ minValue, months, disabled }) {
  if (!minValue || !months.length) return false;
  if (disabled) return true;
  const firstMonthInView = months[0]?.value;
  if (!firstMonthInView) return false;
  const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
  return isBefore(lastMonthOfPrevPage, minValue);
}
function getCalendarHeadingValue({ months, locale, formatter }) {
  if (!months.length) return "";
  if (locale !== formatter.getLocale()) {
    formatter.setLocale(locale);
  }
  if (months.length === 1) {
    const month = toDate(months[0].value);
    return `${formatter.fullMonthAndYear(month)}`;
  }
  const startMonth = toDate(months[0].value);
  const endMonth = toDate(months[months.length - 1].value);
  const startMonthName = formatter.fullMonth(startMonth);
  const endMonthName = formatter.fullMonth(endMonth);
  const startMonthYear = formatter.fullYear(startMonth);
  const endMonthYear = formatter.fullYear(endMonth);
  const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
  return content;
}
function getCalendarElementProps({
  fullCalendarLabel,
  id,
  isInvalid,
  disabled,
  readonly
}) {
  return {
    id,
    role: "application",
    "aria-label": fullCalendarLabel,
    "data-invalid": getDataInvalid(isInvalid),
    "data-disabled": getDataDisabled(disabled),
    "data-readonly": getDataReadonly(readonly)
  };
}
function getFirstNonDisabledDateInView(calendarRef) {
  if (!isBrowser) return;
  const daysInView = Array.from(calendarRef.querySelectorAll("[data-bits-day]:not([aria-disabled=true])"));
  if (daysInView.length === 0) return;
  const element = daysInView[0];
  const value = element?.getAttribute("data-value");
  const type = element?.getAttribute("data-type");
  if (!value || !type) return;
  return parseAnyDateValue(value, type);
}
function useEnsureNonDisabledPlaceholder({
  ref,
  placeholder,
  defaultPlaceholder,
  minValue,
  maxValue,
  isDateDisabled
}) {
  function isDisabled(date) {
    if (isDateDisabled.current(date)) return true;
    if (minValue.current && isBefore(date, minValue.current)) return true;
    if (maxValue.current && isBefore(maxValue.current, date)) return true;
    return false;
  }
  watch(() => ref.current, () => {
    if (!ref.current) return;
    if (placeholder.current && isSameDay(placeholder.current, defaultPlaceholder) && isDisabled(defaultPlaceholder)) {
      placeholder.current = getFirstNonDisabledDateInView(ref.current) ?? defaultPlaceholder;
    }
  });
}
const calendarAttrs = createBitsAttrs({
  component: "calendar",
  parts: [
    "root",
    "grid",
    "cell",
    "next-button",
    "prev-button",
    "day",
    "grid-body",
    "grid-head",
    "grid-row",
    "head-cell",
    "header",
    "heading",
    "month-select",
    "year-select"
  ]
});
function getDefaultYears(opts) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const latestYear = Math.max(opts.placeholderYear, currentYear);
  let minYear;
  let maxYear;
  if (opts.minValue) {
    minYear = opts.minValue.year;
  } else {
    const initialMinYear = latestYear - 100;
    minYear = opts.placeholderYear < initialMinYear ? opts.placeholderYear - 10 : initialMinYear;
  }
  if (opts.maxValue) {
    maxYear = opts.maxValue.year;
  } else {
    maxYear = latestYear + 10;
  }
  if (minYear > maxYear) {
    minYear = maxYear;
  }
  const totalYears = maxYear - minYear + 1;
  return Array.from({ length: totalYears }, (_, i) => minYear + i);
}
const CalendarRootContext = new Context("Calendar.Root | RangeCalender.Root");
class CalendarNextButtonState {
  static create(opts) {
    return new CalendarNextButtonState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  #isDisabled = derived(() => this.root.isNextButtonDisabled);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onclick = this.onclick.bind(this);
    this.attachment = attachRef(this.opts.ref);
  }
  onclick(_) {
    if (this.isDisabled) return;
    this.root.nextPage();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "button",
    type: "button",
    "aria-label": "Next",
    "aria-disabled": getAriaDisabled(this.isDisabled),
    "data-disabled": getDataDisabled(this.isDisabled),
    disabled: this.isDisabled,
    [this.root.getBitsAttr("next-button")]: "",
    //
    onclick: this.onclick,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarPrevButtonState {
  static create(opts) {
    return new CalendarPrevButtonState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  #isDisabled = derived(() => this.root.isPrevButtonDisabled);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onclick = this.onclick.bind(this);
    this.attachment = attachRef(this.opts.ref);
  }
  onclick(_) {
    if (this.isDisabled) return;
    this.root.prevPage();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "button",
    type: "button",
    "aria-label": "Previous",
    "aria-disabled": getAriaDisabled(this.isDisabled),
    "data-disabled": getDataDisabled(this.isDisabled),
    disabled: this.isDisabled,
    [this.root.getBitsAttr("prev-button")]: "",
    //
    onclick: this.onclick,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarGridState {
  static create(opts) {
    return new CalendarGridState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    tabindex: -1,
    role: "grid",
    "aria-readonly": getAriaReadonly(this.root.opts.readonly.current),
    "aria-disabled": getAriaDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    [this.root.getBitsAttr("grid")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarGridBodyState {
  static create(opts) {
    return new CalendarGridBodyState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("grid-body")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarGridHeadState {
  static create(opts) {
    return new CalendarGridHeadState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("grid-head")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarGridRowState {
  static create(opts) {
    return new CalendarGridRowState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("grid-row")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarHeadCellState {
  static create(opts) {
    return new CalendarHeadCellState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("head-cell")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarHeaderState {
  static create(opts) {
    return new CalendarHeaderState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("header")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarMonthSelectState {
  static create(opts) {
    return new CalendarMonthSelectState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onchange = this.onchange.bind(this);
    this.attachment = attachRef(this.opts.ref);
  }
  #monthItems = derived(() => {
    this.root.opts.locale.current;
    const monthNumbers = this.opts.months.current;
    const monthFormat = this.opts.monthFormat.current;
    const months = [];
    for (const month of monthNumbers) {
      const date = this.root.opts.placeholder.current.set({ month });
      let label;
      if (typeof monthFormat === "function") {
        label = monthFormat(month);
      } else {
        label = this.root.formatter.custom(toDate(date), { month: monthFormat });
      }
      months.push({ value: month, label });
    }
    return months;
  });
  get monthItems() {
    return this.#monthItems();
  }
  set monthItems($$value) {
    return this.#monthItems($$value);
  }
  #currentMonth = derived(() => this.root.opts.placeholder.current.month);
  get currentMonth() {
    return this.#currentMonth();
  }
  set currentMonth($$value) {
    return this.#currentMonth($$value);
  }
  #isDisabled = derived(() => this.root.opts.disabled.current || this.opts.disabled.current);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  #snippetProps = derived(() => {
    return {
      monthItems: this.monthItems,
      selectedMonthItem: this.monthItems.find((month) => month.value === this.currentMonth)
    };
  });
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  onchange(event) {
    if (this.isDisabled) return;
    const target = event.target;
    const month = parseInt(target.value, 10);
    if (!isNaN(month)) {
      this.root.opts.placeholder.current = this.root.opts.placeholder.current.set({ month });
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    value: this.currentMonth,
    disabled: this.isDisabled,
    "data-disabled": getDataDisabled(this.isDisabled),
    [this.root.getBitsAttr("month-select")]: "",
    //
    onchange: this.onchange,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarYearSelectState {
  static create(opts) {
    return new CalendarYearSelectState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onchange = this.onchange.bind(this);
    this.attachment = attachRef(this.opts.ref);
  }
  #years = derived(() => {
    if (this.opts.years.current && this.opts.years.current.length) return this.opts.years.current;
    return this.root.defaultYears;
  });
  get years() {
    return this.#years();
  }
  set years($$value) {
    return this.#years($$value);
  }
  #yearItems = derived(() => {
    this.root.opts.locale.current;
    const yearFormat = this.opts.yearFormat.current;
    const localYears = [];
    for (const year of this.years) {
      const date = this.root.opts.placeholder.current.set({ year });
      let label;
      if (typeof yearFormat === "function") {
        label = yearFormat(year);
      } else {
        label = this.root.formatter.custom(toDate(date), { year: yearFormat });
      }
      localYears.push({ value: year, label });
    }
    return localYears;
  });
  get yearItems() {
    return this.#yearItems();
  }
  set yearItems($$value) {
    return this.#yearItems($$value);
  }
  #currentYear = derived(() => this.root.opts.placeholder.current.year);
  get currentYear() {
    return this.#currentYear();
  }
  set currentYear($$value) {
    return this.#currentYear($$value);
  }
  #isDisabled = derived(() => this.root.opts.disabled.current || this.opts.disabled.current);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  #snippetProps = derived(() => {
    return {
      yearItems: this.yearItems,
      selectedYearItem: this.yearItems.find((year) => year.value === this.currentYear)
    };
  });
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  onchange(event) {
    if (this.isDisabled) return;
    const target = event.target;
    const year = parseInt(target.value, 10);
    if (!isNaN(year)) {
      this.root.opts.placeholder.current = this.root.opts.placeholder.current.set({ year });
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    value: this.currentYear,
    disabled: this.isDisabled,
    "data-disabled": getDataDisabled(this.isDisabled),
    [this.root.getBitsAttr("year-select")]: "",
    //
    onchange: this.onchange,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Calendar_grid($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridState = CalendarGridState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<table${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></table>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_body($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridBodyState = CalendarGridBodyState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridBodyState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tbody${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></tbody>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_head($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridHeadState = CalendarGridHeadState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridHeadState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<thead${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></thead>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_head_cell($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headCellState = CalendarHeadCellState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headCellState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<th${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></th>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_row($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridRowState = CalendarGridRowState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridRowState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tr${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></tr>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_header($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headerState = CalendarHeaderState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<header${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></header>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_month_select($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    months = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    monthFormat = "long",
    disabled = false,
    "aria-label": ariaLabel = "Select a month",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const monthSelectState = CalendarMonthSelectState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    months: box.with(() => months),
    monthFormat: box.with(() => monthFormat),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, monthSelectState.props, { "aria-label": ariaLabel });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      ...monthSelectState.snippetProps
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<select${spread_attributes({ ...mergedProps }, null)}>`;
    $$payload.select_value = { ...mergedProps }?.value;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload, monthSelectState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(monthSelectState.monthItems);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let month = each_array[$$index];
        $$payload.out += `<option${attr("value", month.value)}${maybe_selected($$payload, month.value)}${attr("selected", month.value === monthSelectState.currentMonth, true)}>${escape_html(month.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_next_button($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    // for safari
    tabindex = 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const nextButtonState = CalendarNextButtonState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, nextButtonState.props, { tabindex });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_prev_button($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    // for safari
    tabindex = 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const prevButtonState = CalendarPrevButtonState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, prevButtonState.props, { tabindex });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_year_select($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    years,
    yearFormat = "numeric",
    disabled = false,
    "aria-label": ariaLabel = "Select a year",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const yearSelectState = CalendarYearSelectState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    years: box.with(() => years),
    yearFormat: box.with(() => yearFormat),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, yearSelectState.props, { "aria-label": ariaLabel });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      ...yearSelectState.snippetProps
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<select${spread_attributes({ ...mergedProps }, null)}>`;
    $$payload.select_value = { ...mergedProps }?.value;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload, yearSelectState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(yearSelectState.yearItems);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let year = each_array[$$index];
        $$payload.out += `<option${attr("value", year.value)}${maybe_selected($$payload, year.value)}${attr("selected", year.value === yearSelectState.currentYear, true)}>${escape_html(year.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const RangeCalendarCellContext = new Context("RangeCalendar.Cell");
class RangeCalendarRootState {
  static create(opts) {
    return CalendarRootContext.set(new RangeCalendarRootState(opts));
  }
  opts;
  attachment;
  #visibleMonths = derived(() => this.months.map((month) => month.value));
  get visibleMonths() {
    return this.#visibleMonths();
  }
  set visibleMonths($$value) {
    return this.#visibleMonths($$value);
  }
  months = [];
  announcer;
  formatter;
  accessibleHeadingId = useId();
  focusedValue = void 0;
  lastPressedDateValue = void 0;
  domContext;
  #weekdays = derived(() => {
    return getWeekdays({
      months: this.months,
      formatter: this.formatter,
      weekdayFormat: this.opts.weekdayFormat.current
    });
  });
  get weekdays() {
    return this.#weekdays();
  }
  set weekdays($$value) {
    return this.#weekdays($$value);
  }
  #isStartInvalid = derived(() => {
    if (!this.opts.startValue.current) return false;
    return this.isDateUnavailable(this.opts.startValue.current) || this.isDateDisabled(this.opts.startValue.current);
  });
  get isStartInvalid() {
    return this.#isStartInvalid();
  }
  set isStartInvalid($$value) {
    return this.#isStartInvalid($$value);
  }
  #isEndInvalid = derived(() => {
    if (!this.opts.endValue.current) return false;
    return this.isDateUnavailable(this.opts.endValue.current) || this.isDateDisabled(this.opts.endValue.current);
  });
  get isEndInvalid() {
    return this.#isEndInvalid();
  }
  set isEndInvalid($$value) {
    return this.#isEndInvalid($$value);
  }
  #isInvalid = derived(() => {
    if (this.isStartInvalid || this.isEndInvalid) return true;
    if (this.opts.endValue.current && this.opts.startValue.current && isBefore(this.opts.endValue.current, this.opts.startValue.current)) return true;
    return false;
  });
  get isInvalid() {
    return this.#isInvalid();
  }
  set isInvalid($$value) {
    return this.#isInvalid($$value);
  }
  #isNextButtonDisabled = derived(() => {
    return getIsNextButtonDisabled({
      maxValue: this.opts.maxValue.current,
      months: this.months,
      disabled: this.opts.disabled.current
    });
  });
  get isNextButtonDisabled() {
    return this.#isNextButtonDisabled();
  }
  set isNextButtonDisabled($$value) {
    return this.#isNextButtonDisabled($$value);
  }
  #isPrevButtonDisabled = derived(() => {
    return getIsPrevButtonDisabled({
      minValue: this.opts.minValue.current,
      months: this.months,
      disabled: this.opts.disabled.current
    });
  });
  get isPrevButtonDisabled() {
    return this.#isPrevButtonDisabled();
  }
  set isPrevButtonDisabled($$value) {
    return this.#isPrevButtonDisabled($$value);
  }
  #headingValue = derived(() => {
    this.opts.monthFormat.current;
    this.opts.yearFormat.current;
    return getCalendarHeadingValue({
      months: this.months,
      formatter: this.formatter,
      locale: this.opts.locale.current
    });
  });
  get headingValue() {
    return this.#headingValue();
  }
  set headingValue($$value) {
    return this.#headingValue($$value);
  }
  #fullCalendarLabel = derived(() => `${this.opts.calendarLabel.current} ${this.headingValue}`);
  get fullCalendarLabel() {
    return this.#fullCalendarLabel();
  }
  set fullCalendarLabel($$value) {
    return this.#fullCalendarLabel($$value);
  }
  #highlightedRange = derived(() => {
    if (this.opts.startValue.current && this.opts.endValue.current) return null;
    if (!this.opts.startValue.current || !this.focusedValue) return null;
    const isStartBeforeFocused = isBefore(this.opts.startValue.current, this.focusedValue);
    const start = isStartBeforeFocused ? this.opts.startValue.current : this.focusedValue;
    const end = isStartBeforeFocused ? this.focusedValue : this.opts.startValue.current;
    const range = { start, end };
    if (isSameDay(start.add({ days: 1 }), end) || isSameDay(start, end)) {
      return range;
    }
    const isValid = areAllDaysBetweenValid(start, end, this.isDateUnavailable, this.isDateDisabled);
    if (isValid) return range;
    return null;
  });
  get highlightedRange() {
    return this.#highlightedRange();
  }
  set highlightedRange($$value) {
    return this.#highlightedRange($$value);
  }
  #initialPlaceholderYear = derived(() => run(() => this.opts.placeholder.current.year));
  get initialPlaceholderYear() {
    return this.#initialPlaceholderYear();
  }
  set initialPlaceholderYear($$value) {
    return this.#initialPlaceholderYear($$value);
  }
  #defaultYears = derived(() => {
    return getDefaultYears({
      minValue: this.opts.minValue.current,
      maxValue: this.opts.maxValue.current,
      placeholderYear: this.initialPlaceholderYear
    });
  });
  get defaultYears() {
    return this.#defaultYears();
  }
  set defaultYears($$value) {
    return this.#defaultYears($$value);
  }
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(opts.ref);
    this.domContext = new DOMContext(opts.ref);
    this.announcer = getAnnouncer();
    this.formatter = createFormatter({
      initialLocale: this.opts.locale.current,
      monthFormat: this.opts.monthFormat,
      yearFormat: this.opts.yearFormat
    });
    this.months = createMonths({
      dateObj: this.opts.placeholder.current,
      weekStartsOn: this.opts.weekStartsOn.current,
      locale: this.opts.locale.current,
      fixedWeeks: this.opts.fixedWeeks.current,
      numberOfMonths: this.opts.numberOfMonths.current
    });
    useMonthViewPlaceholderSync({
      placeholder: this.opts.placeholder,
      getVisibleMonths: () => this.visibleMonths,
      weekStartsOn: this.opts.weekStartsOn,
      locale: this.opts.locale,
      fixedWeeks: this.opts.fixedWeeks,
      numberOfMonths: this.opts.numberOfMonths,
      setMonths: this.setMonths
    });
    useMonthViewOptionsSync({
      fixedWeeks: this.opts.fixedWeeks,
      locale: this.opts.locale,
      numberOfMonths: this.opts.numberOfMonths,
      placeholder: this.opts.placeholder,
      setMonths: this.setMonths,
      weekStartsOn: this.opts.weekStartsOn
    });
    watch(() => this.opts.value.current, (value) => {
      if (value.start && value.end) {
        this.opts.startValue.current = value.start;
        this.opts.endValue.current = value.end;
      } else if (value.start) {
        this.opts.startValue.current = value.start;
        this.opts.endValue.current = void 0;
      } else if (value.start === void 0 && value.end === void 0) {
        this.opts.startValue.current = void 0;
        this.opts.endValue.current = void 0;
      }
    });
    watch(() => this.opts.value.current, (value) => {
      const startValue = value.start;
      if (startValue && this.opts.placeholder.current !== startValue) {
        this.opts.placeholder.current = startValue;
      }
    });
    watch(
      [
        () => this.opts.startValue.current,
        () => this.opts.endValue.current,
        () => this.opts.excludeDisabled.current
      ],
      ([startValue, endValue, excludeDisabled]) => {
        if (!excludeDisabled || !startValue || !endValue) return;
        if (this.#hasDisabledDatesInRange(startValue, endValue)) {
          this.#setStartValue(void 0);
          this.#setEndValue(void 0);
          this.#announceEmpty();
        }
      }
    );
    watch(
      [
        () => this.opts.startValue.current,
        () => this.opts.endValue.current
      ],
      ([startValue, endValue]) => {
        if (this.opts.value.current && this.opts.value.current.start === startValue && this.opts.value.current.end === endValue) {
          return;
        }
        if (startValue && endValue) {
          this.#updateValue((prev) => {
            if (prev.start === startValue && prev.end === endValue) {
              return prev;
            }
            if (isBefore(endValue, startValue)) {
              const start = startValue;
              const end = endValue;
              this.#setStartValue(end);
              this.#setEndValue(start);
              if (!this.#isRangeValid(endValue, startValue)) {
                this.#setStartValue(startValue);
                this.#setEndValue(void 0);
                return { start: startValue, end: void 0 };
              }
              return { start: endValue, end: startValue };
            } else {
              if (!this.#isRangeValid(startValue, endValue)) {
                this.#setStartValue(endValue);
                this.#setEndValue(void 0);
                return { start: endValue, end: void 0 };
              }
              return { start: startValue, end: endValue };
            }
          });
        } else if (this.opts.value.current && this.opts.value.current.start && this.opts.value.current.end) {
          this.opts.value.current.start = void 0;
          this.opts.value.current.end = void 0;
        }
      }
    );
    this.shiftFocus = this.shiftFocus.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.isDateDisabled = this.isDateDisabled.bind(this);
    this.isDateUnavailable = this.isDateUnavailable.bind(this);
    this.isOutsideVisibleMonths = this.isOutsideVisibleMonths.bind(this);
    this.isSelected = this.isSelected.bind(this);
    useEnsureNonDisabledPlaceholder({
      placeholder: opts.placeholder,
      defaultPlaceholder: opts.defaultPlaceholder,
      isDateDisabled: opts.isDateDisabled,
      maxValue: opts.maxValue,
      minValue: opts.minValue,
      ref: opts.ref
    });
  }
  #updateValue(cb) {
    const value = this.opts.value.current;
    const newValue = cb(value);
    this.opts.value.current = newValue;
    if (newValue.start && newValue.end) {
      this.opts.onRangeSelect?.current?.();
    }
  }
  #setStartValue(value) {
    this.opts.startValue.current = value;
    this.#updateValue((prev) => ({ ...prev, start: value }));
  }
  #setEndValue(value) {
    this.opts.endValue.current = value;
    this.#updateValue((prev) => ({ ...prev, end: value }));
  }
  setMonths = (months) => {
    this.months = months;
  };
  isOutsideVisibleMonths(date) {
    return !this.visibleMonths.some((month) => isSameMonth(date, month));
  }
  isDateDisabled(date) {
    if (this.opts.isDateDisabled.current(date) || this.opts.disabled.current) return true;
    const minValue = this.opts.minValue.current;
    const maxValue = this.opts.maxValue.current;
    if (minValue && isBefore(date, minValue)) return true;
    if (maxValue && isAfter(date, maxValue)) return true;
    return false;
  }
  isDateUnavailable(date) {
    if (this.opts.isDateUnavailable.current(date)) return true;
    return false;
  }
  isSelectionStart(date) {
    if (!this.opts.startValue.current) return false;
    return isSameDay(date, this.opts.startValue.current);
  }
  isSelectionEnd(date) {
    if (!this.opts.endValue.current) return false;
    return isSameDay(date, this.opts.endValue.current);
  }
  isSelected(date) {
    if (this.opts.startValue.current && isSameDay(this.opts.startValue.current, date)) return true;
    if (this.opts.endValue.current && isSameDay(this.opts.endValue.current, date)) return true;
    if (this.opts.startValue.current && this.opts.endValue.current) {
      return isBetweenInclusive(date, this.opts.startValue.current, this.opts.endValue.current);
    }
    return false;
  }
  #isRangeValid(start, end) {
    const orderedStart = isBefore(end, start) ? end : start;
    const orderedEnd = isBefore(end, start) ? start : end;
    const startDate = orderedStart.toDate(getLocalTimeZone());
    const endDate = orderedEnd.toDate(getLocalTimeZone());
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1e3 * 60 * 60 * 24));
    const daysInRange = daysDifference + 1;
    if (this.opts.minDays.current && daysInRange < this.opts.minDays.current) return false;
    if (this.opts.maxDays.current && daysInRange > this.opts.maxDays.current) return false;
    if (this.opts.excludeDisabled.current && this.#hasDisabledDatesInRange(orderedStart, orderedEnd)) {
      return false;
    }
    return true;
  }
  shiftFocus(node, add) {
    return shiftCalendarFocus({
      node,
      add,
      placeholder: this.opts.placeholder,
      calendarNode: this.opts.ref.current,
      isPrevButtonDisabled: this.isPrevButtonDisabled,
      isNextButtonDisabled: this.isNextButtonDisabled,
      months: this.months,
      numberOfMonths: this.opts.numberOfMonths.current
    });
  }
  #announceEmpty() {
    this.announcer.announce("Selected date is now empty.", "polite");
  }
  #announceSelectedDate(date) {
    this.announcer.announce(`Selected Date: ${this.formatter.selectedDate(date, false)}`, "polite");
  }
  #announceSelectedRange(start, end) {
    this.announcer.announce(`Selected Dates: ${this.formatter.selectedDate(start, false)} to ${this.formatter.selectedDate(end, false)}`, "polite");
  }
  handleCellClick(e, date) {
    if (this.isDateDisabled(date) || this.isDateUnavailable(date)) return;
    const prevLastPressedDate = this.lastPressedDateValue;
    this.lastPressedDateValue = date;
    if (this.opts.startValue.current && this.highlightedRange === null) {
      if (isSameDay(this.opts.startValue.current, date) && !this.opts.preventDeselect.current && !this.opts.endValue.current) {
        this.#setStartValue(void 0);
        this.opts.placeholder.current = date;
        this.#announceEmpty();
        return;
      } else if (!this.opts.endValue.current) {
        e.preventDefault();
        if (prevLastPressedDate && isSameDay(prevLastPressedDate, date)) {
          this.#setStartValue(date);
          this.#announceSelectedDate(date);
        }
      }
    }
    if (this.opts.startValue.current && this.opts.endValue.current && isSameDay(this.opts.endValue.current, date) && !this.opts.preventDeselect.current) {
      this.#setStartValue(void 0);
      this.#setEndValue(void 0);
      this.opts.placeholder.current = date;
      this.#announceEmpty();
      return;
    }
    if (!this.opts.startValue.current) {
      this.#announceSelectedDate(date);
      this.#setStartValue(date);
    } else if (!this.opts.endValue.current) {
      const startDate = this.opts.startValue.current;
      const endDate = date;
      const orderedStart = isBefore(endDate, startDate) ? endDate : startDate;
      const orderedEnd = isBefore(endDate, startDate) ? startDate : endDate;
      if (!this.#isRangeValid(orderedStart, orderedEnd)) {
        this.#setStartValue(date);
        this.#setEndValue(void 0);
        this.#announceSelectedDate(date);
      } else {
        if (isBefore(endDate, startDate)) {
          this.#setStartValue(endDate);
          this.#setEndValue(startDate);
          this.#announceSelectedRange(endDate, startDate);
        } else {
          this.#setEndValue(date);
          this.#announceSelectedRange(this.opts.startValue.current, date);
        }
      }
    } else if (this.opts.endValue.current && this.opts.startValue.current) {
      this.#setEndValue(void 0);
      this.#announceSelectedDate(date);
      this.#setStartValue(date);
    }
  }
  onkeydown(event) {
    return handleCalendarKeydown({
      event,
      handleCellClick: this.handleCellClick,
      placeholderValue: this.opts.placeholder.current,
      shiftFocus: this.shiftFocus
    });
  }
  /**
   * Navigates to the next page of the calendar.
   */
  nextPage() {
    handleCalendarNextPage({
      fixedWeeks: this.opts.fixedWeeks.current,
      locale: this.opts.locale.current,
      numberOfMonths: this.opts.numberOfMonths.current,
      pagedNavigation: this.opts.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => this.opts.placeholder.current = date,
      weekStartsOn: this.opts.weekStartsOn.current,
      months: this.months
    });
  }
  /**
   * Navigates to the previous page of the calendar.
   */
  prevPage() {
    handleCalendarPrevPage({
      fixedWeeks: this.opts.fixedWeeks.current,
      locale: this.opts.locale.current,
      numberOfMonths: this.opts.numberOfMonths.current,
      pagedNavigation: this.opts.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => this.opts.placeholder.current = date,
      weekStartsOn: this.opts.weekStartsOn.current,
      months: this.months
    });
  }
  nextYear() {
    this.opts.placeholder.current = this.opts.placeholder.current.add({ years: 1 });
  }
  prevYear() {
    this.opts.placeholder.current = this.opts.placeholder.current.subtract({ years: 1 });
  }
  setYear(year) {
    this.opts.placeholder.current = this.opts.placeholder.current.set({ year });
  }
  setMonth(month) {
    this.opts.placeholder.current = this.opts.placeholder.current.set({ month });
  }
  getBitsAttr = (part) => {
    return calendarAttrs.getAttr(part, "range-calendar");
  };
  #snippetProps = derived(() => ({ months: this.months, weekdays: this.weekdays }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    ...getCalendarElementProps({
      fullCalendarLabel: this.fullCalendarLabel,
      id: this.opts.id.current,
      isInvalid: this.isInvalid,
      disabled: this.opts.disabled.current,
      readonly: this.opts.readonly.current
    }),
    [this.getBitsAttr("root")]: "",
    //
    onkeydown: this.onkeydown,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  #hasDisabledDatesInRange(start, end) {
    for (let date = start; isBefore(date, end) || isSameDay(date, end); date = date.add({ days: 1 })) {
      if (this.isDateDisabled(date)) return true;
    }
    return false;
  }
}
class RangeCalendarCellState {
  static create(opts) {
    return RangeCalendarCellContext.set(new RangeCalendarCellState(opts, CalendarRootContext.get()));
  }
  opts;
  root;
  attachment;
  #cellDate = derived(() => toDate(this.opts.date.current));
  get cellDate() {
    return this.#cellDate();
  }
  set cellDate($$value) {
    return this.#cellDate($$value);
  }
  #isOutsideMonth = derived(() => !isSameMonth(this.opts.date.current, this.opts.month.current));
  get isOutsideMonth() {
    return this.#isOutsideMonth();
  }
  set isOutsideMonth($$value) {
    return this.#isOutsideMonth($$value);
  }
  #isDisabled = derived(() => this.root.isDateDisabled(this.opts.date.current) || this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  #isUnavailable = derived(() => this.root.opts.isDateUnavailable.current(this.opts.date.current));
  get isUnavailable() {
    return this.#isUnavailable();
  }
  set isUnavailable($$value) {
    return this.#isUnavailable($$value);
  }
  #isDateToday = derived(() => isToday(this.opts.date.current, getLocalTimeZone()));
  get isDateToday() {
    return this.#isDateToday();
  }
  set isDateToday($$value) {
    return this.#isDateToday($$value);
  }
  #isOutsideVisibleMonths = derived(() => this.root.isOutsideVisibleMonths(this.opts.date.current));
  get isOutsideVisibleMonths() {
    return this.#isOutsideVisibleMonths();
  }
  set isOutsideVisibleMonths($$value) {
    return this.#isOutsideVisibleMonths($$value);
  }
  #isFocusedDate = derived(() => isSameDay(this.opts.date.current, this.root.opts.placeholder.current));
  get isFocusedDate() {
    return this.#isFocusedDate();
  }
  set isFocusedDate($$value) {
    return this.#isFocusedDate($$value);
  }
  #isSelectedDate = derived(() => this.root.isSelected(this.opts.date.current));
  get isSelectedDate() {
    return this.#isSelectedDate();
  }
  set isSelectedDate($$value) {
    return this.#isSelectedDate($$value);
  }
  #isSelectionStart = derived(() => this.root.isSelectionStart(this.opts.date.current));
  get isSelectionStart() {
    return this.#isSelectionStart();
  }
  set isSelectionStart($$value) {
    return this.#isSelectionStart($$value);
  }
  #isRangeStart = derived(() => this.root.isSelectionStart(this.opts.date.current));
  get isRangeStart() {
    return this.#isRangeStart();
  }
  set isRangeStart($$value) {
    return this.#isRangeStart($$value);
  }
  #isRangeEnd = derived(() => {
    if (!this.root.opts.endValue.current) return this.root.isSelectionStart(this.opts.date.current);
    return this.root.isSelectionEnd(this.opts.date.current);
  });
  get isRangeEnd() {
    return this.#isRangeEnd();
  }
  set isRangeEnd($$value) {
    return this.#isRangeEnd($$value);
  }
  #isRangeMiddle = derived(() => this.isSelectionMiddle);
  get isRangeMiddle() {
    return this.#isRangeMiddle();
  }
  set isRangeMiddle($$value) {
    return this.#isRangeMiddle($$value);
  }
  #isSelectionMiddle = derived(() => {
    return this.isSelectedDate && !this.isSelectionStart && !this.isSelectionEnd;
  });
  get isSelectionMiddle() {
    return this.#isSelectionMiddle();
  }
  set isSelectionMiddle($$value) {
    return this.#isSelectionMiddle($$value);
  }
  #isSelectionEnd = derived(() => this.root.isSelectionEnd(this.opts.date.current));
  get isSelectionEnd() {
    return this.#isSelectionEnd();
  }
  set isSelectionEnd($$value) {
    return this.#isSelectionEnd($$value);
  }
  #isHighlighted = derived(() => this.root.highlightedRange ? isBetweenInclusive(this.opts.date.current, this.root.highlightedRange.start, this.root.highlightedRange.end) : false);
  get isHighlighted() {
    return this.#isHighlighted();
  }
  set isHighlighted($$value) {
    return this.#isHighlighted($$value);
  }
  #labelText = derived(() => this.root.formatter.custom(this.cellDate, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }));
  get labelText() {
    return this.#labelText();
  }
  set labelText($$value) {
    return this.#labelText($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
  }
  #snippetProps = derived(() => ({
    disabled: this.isDisabled,
    unavailable: this.isUnavailable,
    selected: this.isSelectedDate
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #ariaDisabled = derived(() => {
    return this.isDisabled || this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current || this.isUnavailable;
  });
  get ariaDisabled() {
    return this.#ariaDisabled();
  }
  set ariaDisabled($$value) {
    return this.#ariaDisabled($$value);
  }
  #sharedDataAttrs = derived(() => ({
    "data-unavailable": getDataUnavailable(this.isUnavailable),
    "data-today": this.isDateToday ? "" : void 0,
    "data-outside-month": this.isOutsideMonth ? "" : void 0,
    "data-outside-visible-months": this.isOutsideVisibleMonths ? "" : void 0,
    "data-focused": this.isFocusedDate ? "" : void 0,
    "data-selection-start": this.isSelectionStart ? "" : void 0,
    "data-selection-end": this.isSelectionEnd ? "" : void 0,
    "data-range-start": this.isRangeStart ? "" : void 0,
    "data-range-end": this.isRangeEnd ? "" : void 0,
    "data-range-middle": this.isRangeMiddle ? "" : void 0,
    "data-highlighted": this.isHighlighted ? "" : void 0,
    "data-selected": getDataSelected(this.isSelectedDate),
    "data-value": this.opts.date.current.toString(),
    "data-type": getDateValueType(this.opts.date.current),
    "data-disabled": getDataDisabled(this.isDisabled || this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current)
  }));
  get sharedDataAttrs() {
    return this.#sharedDataAttrs();
  }
  set sharedDataAttrs($$value) {
    return this.#sharedDataAttrs($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "gridcell",
    "aria-selected": getAriaSelected(this.isSelectedDate),
    "aria-disabled": getAriaDisabled(this.ariaDisabled),
    ...this.sharedDataAttrs,
    [this.root.getBitsAttr("cell")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class RangeCalendarDayState {
  static create(opts) {
    return new RangeCalendarDayState(opts, RangeCalendarCellContext.get());
  }
  opts;
  cell;
  attachment;
  constructor(opts, cell) {
    this.opts = opts;
    this.cell = cell;
    this.attachment = attachRef(opts.ref);
    this.onclick = this.onclick.bind(this);
    this.onmouseenter = this.onmouseenter.bind(this);
    this.onfocusin = this.onfocusin.bind(this);
  }
  #tabindex = derived(() => this.cell.isOutsideMonth && this.cell.root.opts.disableDaysOutsideMonth.current || this.cell.isDisabled ? void 0 : this.cell.isFocusedDate ? 0 : -1);
  onclick(e) {
    if (this.cell.isDisabled) return;
    this.cell.root.handleCellClick(e, this.cell.opts.date.current);
  }
  onmouseenter(_) {
    if (this.cell.isDisabled) return;
    this.cell.root.focusedValue = this.cell.opts.date.current;
  }
  onfocusin(_) {
    if (this.cell.isDisabled) return;
    this.cell.root.focusedValue = this.cell.opts.date.current;
  }
  #snippetProps = derived(() => ({
    disabled: this.cell.isDisabled,
    unavailable: this.cell.isUnavailable,
    selected: this.cell.isSelectedDate,
    day: `${this.cell.opts.date.current.day}`
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "button",
    "aria-label": this.cell.labelText,
    "aria-disabled": getAriaDisabled(this.cell.ariaDisabled),
    ...this.cell.sharedDataAttrs,
    tabindex: this.#tabindex(),
    [this.cell.root.getBitsAttr("day")]: "",
    // Shared logic for range calendar and calendar
    "data-bits-day": "",
    //
    onclick: this.onclick,
    onmouseenter: this.onmouseenter,
    onfocusin: this.onfocusin,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Range_calendar_cell$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    date,
    month,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cellState = RangeCalendarCellState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    date: box.with(() => date),
    month: box.with(() => month)
  });
  const mergedProps = mergeProps(restProps, cellState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...cellState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<td${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload, cellState.snippetProps);
    $$payload.out += `<!----></td>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_day$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const dayState = RangeCalendarDayState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, dayState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...dayState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload, dayState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(dayState.cell.opts.date.current.day)}`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Range_calendar$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    value = void 0,
    onValueChange = noop,
    placeholder = void 0,
    onPlaceholderChange = noop,
    weekdayFormat = "narrow",
    weekStartsOn,
    pagedNavigation = false,
    isDateDisabled = () => false,
    isDateUnavailable = () => false,
    fixedWeeks = false,
    numberOfMonths = 1,
    locale,
    calendarLabel = "Event",
    disabled = false,
    readonly = false,
    minValue = void 0,
    maxValue = void 0,
    preventDeselect = false,
    disableDaysOutsideMonth = true,
    minDays,
    maxDays,
    onStartValueChange = noop,
    onEndValueChange = noop,
    excludeDisabled = false,
    monthFormat = "long",
    yearFormat = "numeric",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let startValue = value?.start;
  let endValue = value?.end;
  const defaultPlaceholder = getDefaultDate({ defaultValue: value?.start });
  function handleDefaultPlaceholder() {
    if (placeholder !== void 0) return;
    placeholder = defaultPlaceholder;
  }
  handleDefaultPlaceholder();
  watch.pre(() => placeholder, () => {
    handleDefaultPlaceholder();
  });
  function handleDefaultValue() {
    if (value !== void 0) return;
    value = { start: void 0, end: void 0 };
  }
  handleDefaultValue();
  watch.pre(() => value, () => {
    handleDefaultValue();
  });
  const rootState = RangeCalendarRootState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value, (v) => {
      value = v;
      onValueChange(v);
    }),
    placeholder: box.with(() => placeholder, (v) => {
      placeholder = v;
      onPlaceholderChange(v);
    }),
    disabled: box.with(() => disabled),
    readonly: box.with(() => readonly),
    preventDeselect: box.with(() => preventDeselect),
    minValue: box.with(() => minValue),
    maxValue: box.with(() => maxValue),
    isDateUnavailable: box.with(() => isDateUnavailable),
    isDateDisabled: box.with(() => isDateDisabled),
    pagedNavigation: box.with(() => pagedNavigation),
    weekStartsOn: box.with(() => weekStartsOn),
    weekdayFormat: box.with(() => weekdayFormat),
    numberOfMonths: box.with(() => numberOfMonths),
    locale: resolveLocaleProp(() => locale),
    calendarLabel: box.with(() => calendarLabel),
    fixedWeeks: box.with(() => fixedWeeks),
    disableDaysOutsideMonth: box.with(() => disableDaysOutsideMonth),
    minDays: box.with(() => minDays),
    maxDays: box.with(() => maxDays),
    excludeDisabled: box.with(() => excludeDisabled),
    startValue: box.with(() => startValue, (v) => {
      startValue = v;
      onStartValueChange(v);
    }),
    endValue: box.with(() => endValue, (v) => {
      endValue = v;
      onEndValueChange(v);
    }),
    monthFormat: box.with(() => monthFormat),
    yearFormat: box.with(() => yearFormat),
    defaultPlaceholder
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...rootState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload, rootState.snippetProps);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value, placeholder });
  pop();
}
const columns = [
  {
    accessorKey: "scan_time",
    header: "Scan Time",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId));
      const dateB = new Date(rowB.getValue(columnId));
      return dateA.getTime() - dateB.getTime();
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("scan_time"));
      return date.toLocaleString(void 0, {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    }
  },
  {
    accessorKey: "user_id",
    header: "User",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const userA = rowA.getValue(columnId);
      const userB = rowB.getValue(columnId);
      if (!userA && !userB) return 0;
      if (!userA) return 1;
      if (!userB) return -1;
      const nameA = `${userA.first_name} ${userA.last_name}`;
      const nameB = `${userB.first_name} ${userB.last_name}`;
      return nameA.localeCompare(nameB);
    },
    cell: ({ row }) => {
      const user = row.getValue("user_id");
      if (!user) return "Unknown User";
      return `${user.first_name} ${user.last_name}`;
    }
  },
  {
    accessorKey: "animal_id",
    header: "Animal",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const animalA = rowA.getValue(columnId);
      const animalB = rowB.getValue(columnId);
      if (!animalA && !animalB) return 0;
      if (!animalA) return 1;
      if (!animalB) return -1;
      return animalA.name.localeCompare(animalB.name);
    },
    cell: ({ row }) => {
      const animal = row.getValue("animal_id");
      if (!animal) return "Unknown Animal";
      return `${animal.name} (${animal.species})`;
    }
  },
  {
    accessorKey: "animal_note",
    header: "Interaction Type",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const noteA = rowA.getValue(columnId);
      const noteB = rowB.getValue(columnId);
      if (!noteA && !noteB) return 0;
      if (!noteA) return 1;
      if (!noteB) return -1;
      return noteA.note_type.localeCompare(noteB.note_type);
    },
    cell: ({ row }) => {
      const note = row.getValue("animal_note");
      return note?.note_type || "N/A";
    }
  }
];
function Range_calendar($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    placeholder = void 0,
    weekdayFormat = "short",
    class: className,
    buttonVariant = "ghost",
    captionLayout = "label",
    locale = "en-US",
    months: monthsProp,
    years,
    monthFormat: monthFormatProp,
    yearFormat = "numeric",
    day,
    disableDaysOutsideMonth = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const monthFormat = (() => {
    if (monthFormatProp) return monthFormatProp;
    if (captionLayout.startsWith("dropdown")) return "short";
    return "long";
  })();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { months, weekdays }) {
        $$payload3.out += `<!---->`;
        Range_calendar_months($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(months);
            $$payload4.out += `<!---->`;
            Range_calendar_nav($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Range_calendar_prev_button($$payload5, { variant: buttonVariant });
                $$payload5.out += `<!----> <!---->`;
                Range_calendar_next_button($$payload5, { variant: buttonVariant });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!--[-->`;
            for (let monthIndex = 0, $$length = each_array.length; monthIndex < $$length; monthIndex++) {
              let month = each_array[monthIndex];
              $$payload4.out += `<!---->`;
              Range_calendar_month($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Range_calendar_header($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Range_calendar_caption($$payload6, {
                        captionLayout,
                        months: monthsProp,
                        monthFormat,
                        years,
                        yearFormat,
                        month: month.value,
                        locale,
                        monthIndex,
                        get placeholder() {
                          return placeholder;
                        },
                        set placeholder($$value) {
                          placeholder = $$value;
                          $$settled = false;
                        }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Range_calendar_grid($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      GridHead($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Range_calendar_grid_row($$payload7, {
                            class: "select-none",
                            children: ($$payload8) => {
                              const each_array_1 = ensure_array_like(weekdays);
                              $$payload8.out += `<!--[-->`;
                              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                                let weekday = each_array_1[$$index];
                                $$payload8.out += `<!---->`;
                                Range_calendar_head_cell($$payload8, {
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->${escape_html(weekday.slice(0, 2))}`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!---->`;
                              }
                              $$payload8.out += `<!--]-->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      GridBody($$payload6, {
                        children: ($$payload7) => {
                          const each_array_2 = ensure_array_like(month.weeks);
                          $$payload7.out += `<!--[-->`;
                          for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
                            let weekDates = each_array_2[$$index_2];
                            $$payload7.out += `<!---->`;
                            Range_calendar_grid_row($$payload7, {
                              class: "mt-2 w-full",
                              children: ($$payload8) => {
                                const each_array_3 = ensure_array_like(weekDates);
                                $$payload8.out += `<!--[-->`;
                                for (let $$index_1 = 0, $$length3 = each_array_3.length; $$index_1 < $$length3; $$index_1++) {
                                  let date = each_array_3[$$index_1];
                                  $$payload8.out += `<!---->`;
                                  Range_calendar_cell($$payload8, {
                                    date,
                                    month: month.value,
                                    children: ($$payload9) => {
                                      if (day) {
                                        $$payload9.out += "<!--[-->";
                                        day($$payload9, {
                                          day: date,
                                          outsideMonth: !isEqualMonth(date, month.value)
                                        });
                                        $$payload9.out += `<!---->`;
                                      } else {
                                        $$payload9.out += "<!--[!-->";
                                        $$payload9.out += `<!---->`;
                                        Range_calendar_day($$payload9, {});
                                        $$payload9.out += `<!---->`;
                                      }
                                      $$payload9.out += `<!--]-->`;
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$payload8.out += `<!---->`;
                                }
                                $$payload8.out += `<!--]-->`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          }
                          $$payload7.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      };
      Range_calendar$1($$payload2, spread_props([
        {
          weekdayFormat,
          disableDaysOutsideMonth,
          class: cn("bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", className),
          locale,
          monthFormat,
          yearFormat
        },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          },
          get placeholder() {
            return placeholder;
          },
          set placeholder($$value) {
            placeholder = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value, placeholder });
  pop();
}
function Range_calendar_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Range_calendar_cell$1($$payload2, spread_props([
      {
        class: cn("size-(--cell-size) dark:[&:has([data-range-start])]:hover:bg-accent dark:[&:has([data-range-end])]:hover:bg-accent [&:has([data-range-middle])]:bg-accent dark:[&:has([data-range-middle])]:hover:bg-accent/50 [&:has([data-selected])]:bg-accent relative p-0 text-center text-sm focus-within:z-20 data-[range-middle]:rounded-r-md [&:first-child[data-selected]_[data-bits-day]]:rounded-l-md [&:has([data-range-end])]:rounded-r-md [&:has([data-range-middle])]:rounded-none first:[&:has([data-range-middle])]:rounded-l-md last:[&:has([data-range-middle])]:rounded-r-md [&:has([data-range-start])]:rounded-l-md [&:last-child[data-selected]_[data-bits-day]]:rounded-r-md", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_day($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Range_calendar_day$1($$payload2, spread_props([
      {
        class: cn(
          buttonVariants({ variant: "ghost" }),
          "size-(--cell-size) flex select-none flex-col items-center justify-center gap-1 whitespace-nowrap p-0 font-normal leading-none",
          "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground [&[data-today][data-disabled]]:text-muted-foreground data-[range-middle]:rounded-none",
          // range Start
          "data-[range-start]:bg-primary dark:data-[range-start]:hover:bg-accent data-[range-start]:text-primary-foreground",
          // range End
          "data-[range-end]:bg-primary dark:data-[range-end]:hover:bg-accent data-[range-end]:text-primary-foreground",
          // Outside months
          "[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground",
          // Disabled
          "data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:line-through",
          "dark:data-[range-middle]:hover:bg-accent/0",
          // hover
          "dark:hover:text-accent-foreground",
          // focus
          "focus:border-ring focus:ring-ring/50 focus:relative",
          // inner spans
          "[&>span]:text-xs [&>span]:opacity-70",
          className
        )
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_grid($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid($$payload2, spread_props([
      {
        class: cn("mt-4 flex w-full border-collapse flex-col gap-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_header($$payload2, spread_props([
      {
        class: cn("h-(--cell-size) flex w-full items-center justify-center gap-1.5 text-sm font-medium", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_months($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cn("relative flex flex-col gap-4 md:flex-row", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_grid_row($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid_row($$payload2, spread_props([
      { class: cn("flex", className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_head_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_head_cell($$payload2, spread_props([
      {
        class: cn("text-muted-foreground w-(--cell-size) rounded-md text-[0.8rem] font-normal", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Fallback$1($$payload) {
  Chevron_right($$payload, { class: "size-4" });
}
function Range_calendar_next_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    variant = "ghost",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_next_button($$payload2, spread_props([
      {
        class: cn(buttonVariants({ variant }), "size-(--cell-size) select-none bg-transparent p-0 disabled:opacity-50 rtl:rotate-180", className),
        children: children || Fallback$1
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Fallback($$payload) {
  Chevron_left($$payload, { class: "size-4" });
}
function Range_calendar_prev_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    variant = "ghost",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_prev_button($$payload2, spread_props([
      {
        class: cn(buttonVariants({ variant }), "size-(--cell-size) select-none bg-transparent p-0 disabled:opacity-50 rtl:rotate-180", className),
        children: children || Fallback
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_month_select($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    value,
    onchange,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<span${attr_class(clsx(cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative flex rounded-md border", className)))}><!---->`;
    {
      let child = function($$payload3, { props, monthItems, selectedMonthItem }) {
        const each_array = ensure_array_like(monthItems);
        $$payload3.out += `<select${spread_attributes({ ...props }, null)}>`;
        $$payload3.select_value = { ...props, value }?.value;
        $$payload3.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let monthItem = each_array[$$index];
          $$payload3.out += `<option${attr("value", monthItem.value)}${maybe_selected($$payload3, monthItem.value)}${attr("selected", value !== void 0 ? monthItem.value === value : monthItem.value === selectedMonthItem.value, true)}>${escape_html(monthItem.label)}</option>`;
        }
        $$payload3.out += `<!--]-->`;
        $$payload3.select_value = void 0;
        $$payload3.out += `</select> <span class="[&amp;>svg]:text-muted-foreground flex h-8 select-none items-center gap-1 rounded-md pl-2 pr-1 text-sm font-medium [&amp;>svg]:size-3.5" aria-hidden="true">${escape_html(monthItems.find((item) => item.value === value)?.label || selectedMonthItem.label)} `;
        Chevron_down($$payload3, { class: "size-4" });
        $$payload3.out += `<!----></span>`;
      };
      Calendar_month_select($$payload2, spread_props([
        { class: "absolute inset-0 opacity-0" },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          child,
          $$slots: { child: true }
        }
      ]));
    }
    $$payload2.out += `<!----></span>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_year_select($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    value,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<span${attr_class(clsx(cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative flex rounded-md border", className)))}><!---->`;
    {
      let child = function($$payload3, { props, yearItems, selectedYearItem }) {
        const each_array = ensure_array_like(yearItems);
        $$payload3.out += `<select${spread_attributes({ ...props }, null)}>`;
        $$payload3.select_value = { ...props, value }?.value;
        $$payload3.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let yearItem = each_array[$$index];
          $$payload3.out += `<option${attr("value", yearItem.value)}${maybe_selected($$payload3, yearItem.value)}${attr("selected", value !== void 0 ? yearItem.value === value : yearItem.value === selectedYearItem.value, true)}>${escape_html(yearItem.label)}</option>`;
        }
        $$payload3.out += `<!--]-->`;
        $$payload3.select_value = void 0;
        $$payload3.out += `</select> <span class="[&amp;>svg]:text-muted-foreground flex h-8 select-none items-center gap-1 rounded-md pl-2 pr-1 text-sm font-medium [&amp;>svg]:size-3.5" aria-hidden="true">${escape_html(yearItems.find((item) => item.value === value)?.label || selectedYearItem.label)} `;
        Chevron_down($$payload3, { class: "size-4" });
        $$payload3.out += `<!----></span>`;
      };
      Calendar_year_select($$payload2, spread_props([
        { class: "absolute inset-0 opacity-0" },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          child,
          $$slots: { child: true }
        }
      ]));
    }
    $$payload2.out += `<!----></span>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_caption($$payload, $$props) {
  push();
  let {
    captionLayout,
    months,
    monthFormat,
    years,
    yearFormat,
    month,
    locale,
    placeholder = void 0,
    monthIndex = 0
  } = $$props;
  function formatYear(date) {
    const dateObj = date.toDate(getLocalTimeZone());
    if (typeof yearFormat === "function") return yearFormat(dateObj.getFullYear());
    return new DateFormatter(locale, { year: yearFormat }).format(dateObj);
  }
  function formatMonth(date) {
    const dateObj = date.toDate(getLocalTimeZone());
    if (typeof monthFormat === "function") return monthFormat(dateObj.getMonth() + 1);
    return new DateFormatter(locale, { month: monthFormat }).format(dateObj);
  }
  function MonthSelect($$payload2) {
    Range_calendar_month_select($$payload2, {
      months,
      monthFormat,
      value: month.month,
      onchange: (e) => {
        if (!placeholder) return;
        const v = Number.parseInt(e.currentTarget.value);
        const newPlaceholder = placeholder.set({ month: v });
        placeholder = newPlaceholder.subtract({ months: monthIndex });
      }
    });
  }
  function YearSelect($$payload2) {
    Range_calendar_year_select($$payload2, { years, yearFormat, value: month.year });
  }
  if (captionLayout === "dropdown") {
    $$payload.out += "<!--[-->";
    MonthSelect($$payload);
    $$payload.out += `<!----> `;
    YearSelect($$payload);
    $$payload.out += `<!---->`;
  } else if (captionLayout === "dropdown-months") {
    $$payload.out += "<!--[1-->";
    MonthSelect($$payload);
    $$payload.out += `<!----> `;
    if (placeholder) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(formatYear(placeholder))}`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else if (captionLayout === "dropdown-years") {
    $$payload.out += "<!--[2-->";
    if (placeholder) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(formatMonth(placeholder))}`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    YearSelect($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(formatMonth(month))} ${escape_html(formatYear(month))}`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { placeholder });
  pop();
}
function Range_calendar_nav($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<nav${spread_attributes(
    {
      ...restProps,
      class: clsx(cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", className))
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></nav>`;
  bind_props($$props, { ref });
  pop();
}
function Range_calendar_month($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      ...restProps,
      class: clsx(cn("flex flex-col", className))
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
const GridHead = Calendar_grid_head;
const GridBody = Calendar_grid_body;
function Rfid_scan_log_data_table($$payload, $$props) {
  push();
  let {
    data,
    columns: columns2,
    searchPlaceholder = "Search..."
  } = $$props;
  let pagination = { pageIndex: 0, pageSize: 10 };
  let columnFilters = [];
  let sorting = [];
  let globalFilter = "";
  let dateRange = void 0;
  let startValue = void 0;
  const df = new DateFormatter("en-US", { dateStyle: "long" });
  const globalFilterFn = (row, columnId, filterValue) => {
    if (!filterValue) return true;
    const searchValue = filterValue.toLowerCase();
    const original = row.original;
    const searchableValues = [
      original.id,
      original.scan_time,
      `${original.user_id?.first_name} ${original.user_id?.last_name}`,
      `${original.animal_id?.name} (${original.animal_id?.species})`,
      original.animal_id?.name,
      original.animal_id?.species,
      original.animal_note?.note_type
    ];
    return searchableValues.some((value) => String(value || "").toLowerCase().includes(searchValue));
  };
  const dateRangeFilterFn = (row, columnId, filterValue) => {
    if (!filterValue) return true;
    const { start, end } = filterValue;
    if (!start && !end) return true;
    const cellValue = row.getValue(columnId);
    if (!cellValue) return false;
    const cellDate = new Date(cellValue);
    const startDate = start ? start.toDate(getLocalTimeZone()) : null;
    const endDate = end ? end.toDate(getLocalTimeZone()) : null;
    if (startDate && cellDate < startDate) return false;
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      if (cellDate > endOfDay) return false;
    }
    return true;
  };
  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns: columns2,
    state: {
      get pagination() {
        return pagination;
      },
      get columnFilters() {
        return columnFilters;
      },
      get sorting() {
        return sorting;
      },
      get globalFilter() {
        return globalFilter;
      }
    },
    onPaginationChange: (updater) => {
      pagination = typeof updater === "function" ? updater(pagination) : updater;
    },
    onColumnFiltersChange: (updater) => {
      columnFilters = typeof updater === "function" ? updater(columnFilters) : updater;
    },
    onSortingChange: (updater) => {
      sorting = typeof updater === "function" ? updater(sorting) : updater;
    },
    onGlobalFilterChange: (updater) => {
      globalFilter = typeof updater === "function" ? updater(globalFilter) : updater;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn,
    filterFns: { dateRange: dateRangeFilterFn }
  });
  function clearFilters() {
    globalFilter = "";
    dateRange = void 0;
    startValue = void 0;
    sorting = [];
    table.resetColumnFilters();
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array_4 = ensure_array_like(table.getRowModel().rows);
    $$payload2.out += `<div class="flex flex-col gap-4 py-4"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"><span class="flex items-center">`;
    Search($$payload2, { class: "mr-3 text-gray-500" });
    $$payload2.out += `<!----> `;
    Input($$payload2, {
      placeholder: searchPlaceholder,
      value: globalFilter,
      oninput: (e) => globalFilter = e.currentTarget.value,
      class: "w-full sm:max-w-sm"
    });
    $$payload2.out += `<!----></span> `;
    Button($$payload2, {
      variant: "outline",
      onclick: clearFilters,
      class: "w-full sm:w-auto",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Clear All Filters`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2"><span class="text-sm font-medium">Date Range:</span> <!---->`;
    Root($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let child = function($$payload4, { props }) {
            Button($$payload4, spread_props([
              {
                variant: "outline",
                class: cn("w-[300px] justify-start text-left font-normal", !dateRange && !startValue && "text-muted-foreground")
              },
              props,
              {
                children: ($$payload5) => {
                  Calendar($$payload5, { class: "mr-2 size-4" });
                  $$payload5.out += `<!----> `;
                  if (dateRange?.start) {
                    $$payload5.out += "<!--[-->";
                    if (dateRange?.end) {
                      $$payload5.out += "<!--[-->";
                      $$payload5.out += `${escape_html(df.format(dateRange.start.toDate(getLocalTimeZone())))} - ${escape_html(df.format(dateRange.end.toDate(getLocalTimeZone())))}`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                      $$payload5.out += `${escape_html(df.format(dateRange.start.toDate(getLocalTimeZone())))}`;
                    }
                    $$payload5.out += `<!--]-->`;
                  } else if (startValue) {
                    $$payload5.out += "<!--[1-->";
                    $$payload5.out += `${escape_html(df.format(startValue.toDate(getLocalTimeZone())))}`;
                  } else {
                    $$payload5.out += "<!--[!-->";
                    $$payload5.out += `Pick a date`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              }
            ]));
          };
          Popover_trigger($$payload3, { child, $$slots: { child: true } });
        }
        $$payload3.out += `<!----> <!---->`;
        Popover_content($$payload3, {
          class: "w-auto p-0",
          align: "start",
          children: ($$payload4) => {
            Range_calendar($$payload4, {
              onStartValueChange: (v) => startValue = v,
              numberOfMonths: 2,
              get value() {
                return dateRange;
              },
              set value($$value) {
                dateRange = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></div> <div class="hidden md:block rounded-md border"><!---->`;
    Table($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Table_header($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(table.getHeaderGroups());
            $$payload4.out += `<!--[-->`;
            for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
              let headerGroup = each_array[$$index_1];
              $$payload4.out += `<!---->`;
              Table_row($$payload4, {
                children: ($$payload5) => {
                  const each_array_1 = ensure_array_like(headerGroup.headers);
                  $$payload5.out += `<!--[-->`;
                  for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                    let header = each_array_1[$$index];
                    $$payload5.out += `<!---->`;
                    Table_head($$payload5, {
                      colspan: header.colSpan,
                      children: ($$payload6) => {
                        if (!header.isPlaceholder) {
                          $$payload6.out += "<!--[-->";
                          if (header.column.getCanSort()) {
                            $$payload6.out += "<!--[-->";
                            Button($$payload6, {
                              variant: "ghost",
                              onclick: () => header.column.toggleSorting(),
                              class: "h-auto p-0 font-medium hover:bg-transparent",
                              children: ($$payload7) => {
                                Flex_render($$payload7, {
                                  content: header.column.columnDef.header,
                                  context: header.getContext()
                                });
                                $$payload7.out += `<!----> `;
                                if (header.column.getIsSorted() === "asc") {
                                  $$payload7.out += "<!--[-->";
                                  $$payload7.out += `<span class="ml-1">↑</span>`;
                                } else if (header.column.getIsSorted() === "desc") {
                                  $$payload7.out += "<!--[1-->";
                                  $$payload7.out += `<span class="ml-1">↓</span>`;
                                } else {
                                  $$payload7.out += "<!--[!-->";
                                  $$payload7.out += `<span class="ml-1 opacity-50">↕</span>`;
                                }
                                $$payload7.out += `<!--]-->`;
                              },
                              $$slots: { default: true }
                            });
                          } else {
                            $$payload6.out += "<!--[!-->";
                            Flex_render($$payload6, {
                              content: header.column.columnDef.header,
                              context: header.getContext()
                            });
                          }
                          $$payload6.out += `<!--]-->`;
                        } else {
                          $$payload6.out += "<!--[!-->";
                        }
                        $$payload6.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!---->`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Table_body($$payload3, {
          children: ($$payload4) => {
            const each_array_2 = ensure_array_like(table.getRowModel().rows);
            if (each_array_2.length !== 0) {
              $$payload4.out += "<!--[-->";
              for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
                let row = each_array_2[$$index_3];
                $$payload4.out += `<!---->`;
                Table_row($$payload4, {
                  "data-state": row.getIsSelected() && "selected",
                  children: ($$payload5) => {
                    const each_array_3 = ensure_array_like(row.getVisibleCells());
                    $$payload5.out += `<!--[-->`;
                    for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
                      let cell = each_array_3[$$index_2];
                      $$payload5.out += `<!---->`;
                      Table_cell($$payload5, {
                        children: ($$payload6) => {
                          Flex_render($$payload6, {
                            content: cell.column.columnDef.cell,
                            context: cell.getContext()
                          });
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!---->`;
                    }
                    $$payload5.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              }
            } else {
              $$payload4.out += "<!--[!-->";
              $$payload4.out += `<!---->`;
              Table_row($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Table_cell($$payload5, {
                    colspan: columns2.length,
                    class: "h-24 text-center",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->No results found.`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="md:hidden space-y-4">`;
    if (each_array_4.length !== 0) {
      $$payload2.out += "<!--[-->";
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let row = each_array_4[$$index_4];
        const rowData = row.original;
        $$payload2.out += `<div class="bg-card border rounded-lg p-4 space-y-3"><div class="flex justify-between items-start"><div><div class="text-sm font-medium">Scan Time</div> <div class="text-xs text-muted-foreground">${escape_html(new Date(rowData.scan_time).toLocaleString())}</div></div></div> `;
        if (rowData.animal_id) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="border-t pt-3"><div class="text-sm font-medium text-primary">${escape_html(rowData.animal_id.name)}</div> <div class="text-xs text-muted-foreground">${escape_html(rowData.animal_id.species)}</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (rowData.user_id) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="border-t pt-3"><div class="text-xs text-muted-foreground">Scanned by:</div> <div class="text-sm">${escape_html(rowData.user_id.first_name)}
            ${escape_html(rowData.user_id.last_name)}</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (rowData.animal_note) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="border-t pt-3"><div class="text-xs text-muted-foreground">Interaction Type:</div> <div class="text-sm">${escape_html(rowData.animal_note.note_type || "N/A")}</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div>`;
      }
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div class="text-center py-8 text-muted-foreground">No results found.</div>`;
    }
    $$payload2.out += `<!--]--></div> <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4"><div class="text-sm text-muted-foreground text-center sm:text-left">`;
    if (table.getFilteredRowModel().rows.length > 0) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `Showing ${escape_html(pagination.pageIndex * pagination.pageSize + 1)} to
      ${escape_html(Math.min((pagination.pageIndex + 1) * pagination.pageSize, table.getFilteredRowModel().rows.length))}
      of ${escape_html(table.getFilteredRowModel().rows.length)} entries `;
      if (table.getFilteredRowModel().rows.length !== data.length) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="hidden sm:inline">(filtered from ${escape_html(data.length)} total)</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `No entries to show`;
    }
    $$payload2.out += `<!--]--></div> <div class="flex items-center space-x-2">`;
    Button($$payload2, {
      variant: "outline",
      size: "lg",
      onclick: () => table.previousPage(),
      disabled: !table.getCanPreviousPage(),
      class: "px-2 sm:px-3",
      children: ($$payload3) => {
        $$payload3.out += `<span class="hidden sm:inline">Previous</span> <span class="sm:hidden">Prev</span>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="text-sm font-medium px-2"><span class="hidden sm:inline">Page</span> ${escape_html(pagination.pageIndex + 1)} <span class="hidden sm:inline">of</span> <span class="sm:hidden">/</span> ${escape_html(table.getPageCount() || 1)}</div> `;
    Button($$payload2, {
      variant: "outline",
      size: "lg",
      onclick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      class: "px-2 sm:px-3",
      children: ($$payload3) => {
        $$payload3.out += `<span class="hidden sm:inline">Next</span> <span class="sm:hidden">Next</span>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  $$payload.out += `<div class="px-6 pt-6 pb-6"><div class="flex items-center justify-between mb-2"><div class="space-y-1"><h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Scan Logs</h1> <p class="text-xl text-muted-foreground">View all recent scan logs for your animals.</p></div></div> <div class="mt-6">`;
  Rfid_scan_log_data_table($$payload, { data: data.rfid_logs, columns });
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
