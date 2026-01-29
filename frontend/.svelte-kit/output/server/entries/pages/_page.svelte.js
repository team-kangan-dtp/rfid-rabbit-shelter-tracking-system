import { A as noop, Z as setContext, z as getContext, t as element, p as pop, a as push, e as escape_html, w as props_id, d as spread_attributes, f as clsx, h as bind_props, a6 as source, a7 as render_effect, T as set, a8 as deferred, V as get$1, a3 as hasContext, _ as attr_class, b as attr, s as stringify, a9 as attr_style, c as spread_props, x as copy_payload, y as assign_payload, j as ensure_array_like, a1 as run } from "../../chunks/index2.js";
import { c as cn, B as Button } from "../../chunks/button.js";
import "clsx";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../chunks/card-title.js";
import { Logger, format, localPoint, sortFunc, unique, isLiteralObject, Duration, DateToken, greatestAbs, notNull } from "@layerstack/utils";
import { cls } from "@layerstack/tailwind";
import memoize from "memoize";
import { M as MediaQuery, a as SvelteSet, c as createSubscriber } from "../../chunks/index-server2.js";
import { InternSet, max, min, bisector, extent, range, quantile, sum } from "d3-array";
import { quadtree } from "d3-quadtree";
import { scaleLinear, scaleSqrt, scaleOrdinal, scaleBand, scaleTime, scaleUtc } from "d3-scale";
import { get } from "lodash-es";
import { rgb } from "d3-color";
import { s as snapshot } from "../../chunks/clone.js";
import { geoPath, geoTransform } from "d3-geo";
import { path } from "d3-path";
import { curveLinearClosed, lineRadial, line, pointRadial, arc, curveLinear, curveBumpX, curveBumpY } from "d3-shape";
import { interpolatePath } from "d3-interpolate-path";
import { objectId } from "@layerstack/utils/object";
import { Delaunay } from "d3-delaunay";
import { geoVoronoi } from "d3-geo-voronoi";
import "@dagrejs/dagre";
import "d3-tile";
import "d3-sankey";
import { timeTicks, timeYear, timeDay } from "d3-time";
import { quantize, interpolate, interpolateRound } from "d3-interpolate";
const now = () => Date.now();
const raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => noop()
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
const THEMES = { light: "", dark: ".dark" };
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) return void 0;
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (payload.key === key) {
    configLabelKey = payload.key;
  } else if (payload.name === key) {
    configLabelKey = payload.name;
  } else if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload !== void 0 && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const chartContextKey = Symbol("chart-context");
function setChartContext$1(value) {
  return setContext(chartContextKey, value);
}
function useChart() {
  return getContext(chartContextKey);
}
function Chart_style($$payload, $$props) {
  push();
  let { id, config } = $$props;
  const colorConfig = config ? Object.entries(config).filter(([, config2]) => config2.theme || config2.color) : null;
  const themeContents = (() => {
    if (!colorConfig || !colorConfig.length) return;
    const themeContents2 = [];
    for (let [_theme, prefix] of Object.entries(THEMES)) {
      let content = `${prefix} [data-chart=${id}] {
`;
      const color = colorConfig.map(([key, itemConfig]) => {
        const theme = _theme;
        const color2 = itemConfig.theme?.[theme] || itemConfig.color;
        return color2 ? `	--color-${key}: ${color2};` : null;
      });
      content += color.join("\n") + "\n}";
      themeContents2.push(content);
    }
    return themeContents2.join("\n");
  })();
  if (themeContents) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      element($$payload, "style", void 0, () => {
        $$payload.out += `${escape_html(themeContents)}`;
      });
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Chart_container($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    ref = null,
    id = uid,
    class: className,
    children,
    config,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const chartId = `chart-${id || uid.replace(/:/g, "")}`;
  setChartContext$1({
    get config() {
      return config;
    }
  });
  $$payload.out += `<div${spread_attributes(
    {
      "data-chart": chartId,
      "data-slot": "chart",
      class: clsx(cn(
        "flex aspect-video justify-center overflow-visible text-xs",
        // Overrides
        //
        // Stroke around dots/marks when hovering
        "[&_.stroke-white]:stroke-transparent",
        // override the default stroke color of lines
        "[&_.lc-line]:stroke-border/50",
        // by default, layerchart shows a line intersecting the point when hovering, this hides that
        "[&_.lc-highlight-line]:stroke-0",
        // by default, when you hover a point on a stacked series chart, it will drop the opacity
        // of the other series, this overrides that
        "[&_.lc-area-path]:opacity-100 [&_.lc-highlight-line]:opacity-100 [&_.lc-highlight-point]:opacity-100 [&_.lc-spline-path]:opacity-100 [&_.lc-text-svg]:overflow-visible [&_.lc-text]:text-xs",
        // We don't want the little tick lines between the axis labels and the chart, so we remove
        // the stroke. The alternative is to manually disable `tickMarks` on the x/y axis of every
        // chart.
        "[&_.lc-axis-tick]:stroke-0",
        // We don't want to display the rule on the x/y axis, as there is already going to be
        // a grid line there and rule ends up overlapping the marks because it is rendered after
        // the marks
        "[&_.lc-rule-x-line:not(.lc-grid-x-rule)]:stroke-0 [&_.lc-rule-y-line:not(.lc-grid-y-rule)]:stroke-0",
        "[&_.lc-grid-x-radial-line]:stroke-border [&_.lc-grid-x-radial-circle]:stroke-border",
        "[&_.lc-grid-y-radial-line]:stroke-border [&_.lc-grid-y-radial-circle]:stroke-border",
        // Legend adjustments
        "[&_.lc-legend-swatch-button]:items-center [&_.lc-legend-swatch-button]:gap-1.5",
        "[&_.lc-legend-swatch-group]:items-center [&_.lc-legend-swatch-group]:gap-4",
        "[&_.lc-legend-swatch]:size-2.5 [&_.lc-legend-swatch]:rounded-[2px]",
        // Labels
        "[&_.lc-labels-text:not([fill])]:fill-foreground [&_text]:stroke-transparent",
        // Tick labels on th x/y axes
        "[&_.lc-axis-tick-label]:fill-muted-foreground [&_.lc-axis-tick-label]:font-normal",
        "[&_.lc-tooltip-rects-g]:fill-transparent",
        "[&_.lc-layout-svg-g]:fill-transparent",
        "[&_.lc-root-container]:w-full",
        className
      )),
      ...restProps
    },
    null
  )}>`;
  Chart_style($$payload, { id: chartId, config });
  $$payload.out += `<!----> `;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
class MediaQueryPresets {
  width(width) {
    return new MediaQuery(`(min-width: ${width}px)`);
  }
  height(height) {
    return new MediaQuery(`(min-height: ${height}px)`);
  }
  // Matches tailwind defaults (https://tailwindcss.com/docs/responsive-design)
  smScreen = this.width(640);
  mdScreen = this.width(768);
  lgScreen = this.width(1024);
  xlScreen = this.width(1280);
  xxlScreen = this.width(1536);
  screen = new MediaQuery("screen and (min-width: 0)");
  // workaround for https://github.com/sveltejs/svelte/issues/15930
  print = new MediaQuery("print and (min-width: 0)");
  // workaround for https://github.com/sveltejs/svelte/issues/15930
  dark = new MediaQuery("(prefers-color-scheme: dark)");
  light = new MediaQuery("(prefers-color-scheme: light)");
  motion = new MediaQuery("(prefers-reduced-motion: no-preference)");
  motionReduce = new MediaQuery("(prefers-reduced-motion: reduce)");
  landscape = new MediaQuery("(orientation: landscape)");
  portrait = new MediaQuery("(orientation: portrait)");
}
class UniqueState {
  #initial;
  current;
  constructor(initial) {
    this.#initial = initial ?? [];
    this.current = new SvelteSet(initial ?? []);
  }
  /** Clear all values */
  clear() {
    this.current.clear();
  }
  /** Reset to initial values */
  reset() {
    this.clear();
    this.addEach(this.#initial);
  }
  /** Add a value */
  add(value) {
    this.current.add(value);
  }
  /** Add multiple values */
  addEach(values) {
    for (const value of values) {
      this.current.add(value);
    }
  }
  /** Remove a value */
  delete(value) {
    this.current.delete(value);
  }
  /** Toggle a value */
  toggle(value) {
    if (this.current.has(value)) {
      this.current.delete(value);
    } else {
      this.current.add(value);
    }
  }
}
class SelectionState {
  #initial;
  #selected;
  all;
  single;
  max;
  constructor(options = {}) {
    this.#initial = options.initial ?? [];
    this.#selected = new UniqueState(this.#initial);
    this.all = options.all ?? [];
    this.single = options.single ?? false;
    this.max = options.max;
  }
  get current() {
    return this.single ? Array.from(this.#selected.current)[0] ?? null : Array.from(this.#selected.current);
  }
  set current(values) {
    if (Array.isArray(values)) {
      if (this.max == null || values.length < this.max) {
        this.#selected.clear();
        this.#selected.addEach(values);
      } else {
        throw new Error(`Too many values selected.  Current: ${values.length}, max: ${this.max}`);
      }
    } else if (values != null) {
      this.#selected.clear();
      this.#selected.add(values);
    } else {
      this.#selected.clear();
    }
  }
  /** Check if a value is selected */
  isSelected(value) {
    return this.#selected.current.has(value);
  }
  /** Check if the selection is empty */
  isEmpty() {
    return this.#selected.current.size === 0;
  }
  /** Check if all values in `all` are selected */
  isAllSelected() {
    return this.all.every((v) => this.#selected.current.has(v));
  }
  /** Check if any values in `all` are selected */
  isAnySelected() {
    return this.all.some((v) => this.#selected.current.has(v));
  }
  /** Check if the selection is at the maximum */
  isMaxSelected() {
    return this.max != null ? this.#selected.current.size >= this.max : false;
  }
  /** Check if a value is disabled (max reached) */
  isDisabled(value) {
    return !this.isSelected(value) && this.isMaxSelected();
  }
  /** Clear all selected values */
  clear() {
    this.#selected.clear();
  }
  /** Reset to initial values */
  reset() {
    this.#selected.reset();
  }
  /** Toggle a value */
  toggle(value) {
    if (this.#selected.current.has(value)) {
      const prevSelected = [...this.#selected.current];
      this.#selected.clear();
      this.#selected.addEach(prevSelected.filter((v) => v != value));
    } else if (this.single) {
      this.#selected.clear();
      this.#selected.add(value);
    } else {
      if (this.max == null || this.#selected.current.size < this.max) {
        return this.#selected.add(value);
      }
    }
  }
  /** Toggle all values */
  toggleAll() {
    let values;
    if (this.isAllSelected()) {
      values = [...this.#selected.current].filter((v) => !this.all.includes(v));
    } else {
      values = [...this.#selected.current, ...this.all];
    }
    this.#selected.clear();
    this.#selected.addEach(values);
  }
}
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}
function cartesianToPolar(x, y) {
  let radians = Math.atan2(y, x);
  radians += Math.PI / 2;
  if (radians < 0) {
    radians += 2 * Math.PI;
  }
  return {
    radius: Math.sqrt(x ** 2 + y ** 2),
    radians
  };
}
function accessor(prop) {
  if (Array.isArray(prop)) {
    return (d) => prop.map((p) => accessor(p)(d));
  } else if (typeof prop === "function") {
    return prop;
  } else if (typeof prop === "string" || typeof prop === "number") {
    return (d) => get(d, prop);
  } else {
    return (d) => d;
  }
}
function chartDataArray(data) {
  if (data == null) {
    return [];
  } else if (Array.isArray(data)) {
    return data;
  } else if ("nodes" in data) {
    return data.nodes;
  } else if ("descendants" in data) {
    return data.descendants();
  }
  return [];
}
function defaultChartPadding(axis = true, legend = false) {
  if (axis === false) {
    return void 0;
  } else {
    return {
      top: axis === true || axis === "y" ? 4 : 0,
      left: axis === true || axis === "y" ? 20 : 0,
      bottom: (axis === true || axis === "x" ? 20 : 0) + (legend === true ? 32 : 0),
      right: axis === true || axis === "x" ? 4 : 0
    };
  }
}
function findRelatedData(data, original, accessor2) {
  return data.find((d) => {
    return accessor2(d)?.valueOf() === accessor2(original)?.valueOf();
  });
}
const MEASUREMENT_ELEMENT_ID = "__text_measurement_id";
function _getStringWidth(str, style) {
  try {
    let textEl = document.getElementById(MEASUREMENT_ELEMENT_ID);
    if (!textEl) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.width = "0";
      svg.style.height = "0";
      svg.style.position = "absolute";
      svg.style.top = "-100%";
      svg.style.left = "-100%";
      textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textEl.setAttribute("id", MEASUREMENT_ELEMENT_ID);
      svg.appendChild(textEl);
      document.body.appendChild(svg);
    }
    Object.assign(textEl.style, style);
    textEl.textContent = str;
    return textEl.getComputedTextLength();
  } catch (e) {
    return null;
  }
}
const getStringWidth = memoize(_getStringWidth, {
  cacheKey: ([str, style]) => `${str}_${JSON.stringify(style)}`
});
function toTitleCase(str) {
  return str.replace(/^\w/, (d) => d.toUpperCase());
}
const DEFAULT_ELLIPSIS = "…";
function truncateText(text, { position = "end", ellipsis = DEFAULT_ELLIPSIS, maxWidth, style, maxChars }) {
  if (!text)
    return "";
  if (maxWidth === void 0 && maxChars === void 0)
    return text;
  let workingText = text;
  if (maxChars !== void 0 && text.length > maxChars) {
    if (position === "start") {
      workingText = ellipsis + text.slice(-maxChars);
    } else if (position === "middle") {
      const half = Math.floor(maxChars / 2);
      workingText = text.slice(0, half) + ellipsis + text.slice(-half);
    } else {
      workingText = text.slice(0, maxChars) + ellipsis;
    }
  }
  if (maxWidth !== void 0) {
    const fullWidth = getStringWidth(workingText, style);
    if (fullWidth === null || fullWidth <= maxWidth)
      return workingText;
    const ellipsisWidth = getStringWidth(ellipsis, style) ?? 0;
    let availableWidth = maxWidth - ellipsisWidth;
    if (position === "start") {
      let truncated = workingText.slice(ellipsis.length);
      let truncatedWidth = getStringWidth(truncated, style);
      while (truncatedWidth !== null && truncatedWidth > availableWidth && truncated.length > 0) {
        truncated = truncated.slice(1);
        truncatedWidth = getStringWidth(truncated, style);
      }
      return ellipsis + truncated;
    } else if (position === "middle") {
      const halfWidth = availableWidth / 2;
      let left = "";
      let right = "";
      let bestLeft = "";
      let bestRight = "";
      for (let i = 0, j = workingText.length - 1; i < workingText.length && j >= 0; i++, j--) {
        const leftTest = workingText.slice(0, i + 1);
        const rightTest = workingText.slice(j);
        const leftWidth = getStringWidth(leftTest, style);
        const rightWidth = getStringWidth(rightTest, style);
        if (leftWidth !== null && leftWidth <= halfWidth)
          left = leftTest;
        if (rightWidth !== null && rightWidth <= halfWidth)
          right = rightTest;
        const combinedWidth = getStringWidth(left + ellipsis + right, style);
        if (combinedWidth !== null && combinedWidth <= maxWidth) {
          bestLeft = left;
          bestRight = right;
        } else {
          break;
        }
      }
      return bestLeft + ellipsis + bestRight;
    } else {
      let truncated = workingText.slice(0, -ellipsis.length);
      let truncatedWidth = getStringWidth(truncated + ellipsis, style);
      while (truncatedWidth !== null && truncatedWidth > maxWidth && truncated.length > 0) {
        truncated = truncated.slice(0, -1);
        truncatedWidth = getStringWidth(truncated + ellipsis, style);
      }
      return truncated + ellipsis;
    }
  }
  return workingText;
}
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  return arr1.every((k) => {
    return arr2.includes(k);
  });
}
function calcDomain(s, extents, domain) {
  return extents ? partialDomain(extents[s], domain) : domain;
}
function partialDomain(domain = [], directive) {
  if (Array.isArray(directive) === true) {
    return directive.map((d, i) => {
      if (d === null) {
        return domain[i];
      }
      return d;
    });
  }
  return domain;
}
function createChartScale(axis, { domain, scale, padding, nice, reverse, width, height, range: range2, percentRange }) {
  const defaultRange = getDefaultRange(axis, width, height, reverse, range2, percentRange);
  const trueScale = scale.copy();
  trueScale.domain(domain);
  if (!trueScale.interpolator || typeof trueScale.interpolator === "function" && trueScale.interpolator().name.startsWith("identity")) {
    trueScale.range(defaultRange);
  }
  if (padding) {
    trueScale.domain(padScale(trueScale, padding));
  }
  if (nice === true || typeof nice === "number") {
    if (typeof trueScale.nice === "function") {
      trueScale.nice(typeof nice === "number" ? nice : void 0);
    } else {
      console.error(`[Layer Chart] You set \`${axis}Nice: true\` but the ${axis}Scale does not have a \`.nice\` method. Ignoring...`);
    }
  }
  return trueScale;
}
const unpaddable = ["scaleThreshold", "scaleQuantile", "scaleQuantize", "scaleSequentialQuantile"];
function padScale(scale, padding) {
  if (typeof scale.range !== "function") {
    throw new Error("Scale method `range` must be a function");
  }
  if (typeof scale.domain !== "function") {
    throw new Error("Scale method `domain` must be a function");
  }
  if (!Array.isArray(padding) || unpaddable.includes(findScaleName(scale))) {
    return scale.domain();
  }
  if (isOrdinalDomain(scale) === true)
    return scale.domain();
  const { lift, ground } = getPadFunctions(scale);
  const d0 = scale.domain()[0];
  const isTime = Object.prototype.toString.call(d0) === "[object Date]";
  const [d1, d2] = scale.domain().map((d) => {
    return isTime ? lift(d.getTime()) : lift(d);
  });
  const [r1, r2] = scale.range();
  const paddingLeft = padding[0] || 0;
  const paddingRight = padding[1] || 0;
  const step = (d2 - d1) / (Math.abs(r2 - r1) - paddingLeft - paddingRight);
  return [d1 - paddingLeft * step, paddingRight * step + d2].map((d) => {
    return isTime ? ground(new Date(d).getTime()) : ground(d);
  });
}
function f(name, modifier = "") {
  return `scale${toTitleCase(modifier)}${toTitleCase(name)}`;
}
function findScaleName(scale) {
  if (typeof scale.bandwidth === "function") {
    if (typeof scale.paddingInner === "function") {
      return f("band");
    }
    return f("point");
  }
  if (arraysEqual(Object.keys(scale), ["domain", "range", "unknown", "copy"])) {
    return f("ordinal");
  }
  let modifier = "";
  if (scale.interpolator) {
    if (scale.domain().length === 3) {
      modifier = "diverging";
    } else {
      modifier = "sequential";
    }
  }
  if (scale.quantiles) {
    return f("quantile", modifier);
  }
  if (scale.thresholds) {
    return f("quantize", modifier);
  }
  if (scale.constant) {
    return f("symlog", modifier);
  }
  if (scale.base) {
    return f("log", modifier);
  }
  if (scale.exponent) {
    if (scale.exponent() === 0.5) {
      return f("sqrt", modifier);
    }
    return f("pow", modifier);
  }
  if (arraysEqual(Object.keys(scale), ["domain", "range", "invertExtent", "unknown", "copy"])) {
    return f("threshold");
  }
  if (arraysEqual(Object.keys(scale), [
    "invert",
    "range",
    "domain",
    "unknown",
    "copy",
    "ticks",
    "tickFormat",
    "nice"
  ])) {
    return f("identity");
  }
  if (arraysEqual(Object.keys(scale), [
    "invert",
    "domain",
    "range",
    "rangeRound",
    "round",
    "clamp",
    "unknown",
    "copy",
    "ticks",
    "tickFormat",
    "nice"
  ])) {
    return f("radial");
  }
  if (modifier) {
    return f(modifier);
  }
  if (scale.domain()[0] instanceof Date) {
    const d = /* @__PURE__ */ new Date();
    let s = "";
    d.getDay = () => s = "time";
    d.getUTCDay = () => s = "utc";
    scale.tickFormat(0, "%a")(d);
    return f(s);
  }
  return f("linear");
}
function isOrdinalDomain(scale) {
  if (typeof scale.bandwidth === "function")
    return true;
  if (arraysEqual(Object.keys(scale), ["domain", "range", "unknown", "copy"])) {
    return true;
  }
  return false;
}
function calcScaleExtents(flatData, getters, activeScales) {
  const scaleGroups = Object.entries(activeScales).reduce((groups, [key, scaleInfo]) => {
    const domainType = isOrdinalDomain(scaleInfo.scale) === true ? "ordinal" : "other";
    if (!groups[domainType]) {
      groups[domainType] = {};
    }
    groups[domainType][key] = getters[key];
    return groups;
  }, { ordinal: false, other: false });
  let extents = {};
  if (scaleGroups.ordinal) {
    const sortOptions = Object.fromEntries(Object.entries(activeScales).map(([key, scaleInfo]) => [key, scaleInfo.sort]));
    extents = calcUniques(flatData, scaleGroups.ordinal, sortOptions);
  }
  if (scaleGroups.other) {
    const otherExtents = calcExtents(flatData, scaleGroups.other);
    extents = { ...extents, ...otherExtents };
  }
  return extents;
}
function calcUniques(data, fields, sortOptions = {}) {
  if (!Array.isArray(data)) {
    throw new TypeError(`The first argument of calcUniques() must be an array. You passed in a ${typeof data}. If you got this error using the <Chart> component, consider passing a flat array to the \`flatData\` prop`);
  }
  if (Array.isArray(fields) || fields === void 0 || fields === null) {
    throw new TypeError("The second argument of calcUniques() must be an object with field names as keys and accessor functions as values.");
  }
  const uniques = {};
  const keys = Object.keys(fields);
  for (const key of keys) {
    const set2 = new InternSet();
    const accessor2 = fields[key];
    if (!accessor2)
      continue;
    for (const item of data) {
      const value = accessor2(item);
      if (Array.isArray(value)) {
        for (const val of value) {
          set2.add(val);
        }
      } else {
        set2.add(value);
      }
    }
    const results = Array.from(set2);
    if (sortOptions.sort === true || sortOptions[key] === true) {
      results.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      });
    }
    uniques[key] = results;
  }
  return uniques;
}
function calcBaseRange(s, width, height, reverse, percentRange) {
  let min2;
  let max2;
  if (percentRange === true) {
    min2 = 0;
    max2 = 100;
  } else {
    min2 = s === "r" ? 1 : 0;
    max2 = s === "y" ? height : s === "r" ? 25 : width;
  }
  return reverse === true ? [max2, min2] : [min2, max2];
}
function getDefaultRange(s, width, height, reverse, range2, percentRange = false) {
  return !range2 ? calcBaseRange(s, width, height, reverse, percentRange) : typeof range2 === "function" ? range2({ width, height }) : range2;
}
function identity(d) {
  return d;
}
function findScaleType(scale) {
  if (scale.constant) {
    return "symlog";
  }
  if (scale.base) {
    return "log";
  }
  if (typeof scale.exponent === "function") {
    const expValue = scale.exponent();
    if (expValue === 0.5) {
      return "sqrt";
    }
    return "pow";
  }
  return "other";
}
function log(sign) {
  return (x) => Math.log(sign * x);
}
function exp(sign) {
  return (x) => sign * Math.exp(x);
}
function symlog(c) {
  return (x) => Math.sign(x) * Math.log1p(Math.abs(x / c));
}
function symexp(c) {
  return (x) => Math.sign(x) * Math.expm1(Math.abs(x)) * c;
}
function pow(exponent) {
  return function powFn(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}
function getPadFunctions(scale) {
  const scaleType = findScaleType(scale);
  switch (scaleType) {
    case "log": {
      const domain = scale.domain();
      const sign = Math.sign(domain[0]);
      return { lift: log(sign), ground: exp(sign), scaleType };
    }
    case "pow": {
      const exponent = 1;
      return {
        lift: pow(exponent),
        ground: pow(1 / exponent),
        scaleType
      };
    }
    case "sqrt": {
      const exponent = 0.5;
      return {
        lift: pow(exponent),
        ground: pow(1 / exponent),
        scaleType
      };
    }
    case "symlog": {
      const constant = 1;
      return {
        lift: symlog(constant),
        ground: symexp(constant),
        scaleType
      };
    }
    default:
      return {
        lift: identity,
        ground: identity,
        scaleType
      };
  }
}
function createGetter(accessor2, scale) {
  return (d) => {
    const val = accessor2(d);
    if (!scale)
      return void 0;
    if (Array.isArray(val)) {
      return val.map((v) => scale(v));
    }
    return scale(val);
  };
}
function calcExtents(data, fields) {
  if (!Array.isArray(data)) {
    throw new TypeError(`The first argument of calcExtents() must be an array. You passed in a ${typeof data}. If you got this error using the <Chart> component, consider passing a flat array to the \`flatData\` prop.`);
  }
  if (Array.isArray(fields) || fields === void 0 || fields === null) {
    throw new TypeError("The second argument of calcExtents() must be an object with field names as keys as accessor functions as values.");
  }
  const extents = {};
  const keys = Object.keys(fields);
  const kl = keys.length;
  let i;
  let j;
  let k;
  let s;
  let min2;
  let max2;
  let acc;
  let val;
  const dl = data.length;
  for (i = 0; i < kl; i += 1) {
    s = keys[i];
    acc = fields[s];
    min2 = null;
    max2 = null;
    if (!acc)
      continue;
    for (j = 0; j < dl; j += 1) {
      val = acc(data[j]);
      if (Array.isArray(val)) {
        const vl = val.length;
        for (k = 0; k < vl; k += 1) {
          if (val[k] !== void 0 && val[k] !== null && (typeof val[k] === "string" || Number.isNaN(val[k]) === false)) {
            if (min2 === null || val[k] < min2) {
              min2 = val[k];
            }
            if (max2 === null || val[k] > max2) {
              max2 = val[k];
            }
          }
        }
      } else if (val !== void 0 && val !== null && (typeof val === "string" || Number.isNaN(val) === false)) {
        if (min2 === null || val < min2) {
          min2 = val;
        }
        if (max2 === null || val > max2) {
          max2 = val;
        }
      }
    }
    extents[s] = [min2, max2];
  }
  return extents;
}
function raise(node) {
  if (node.nextSibling) {
    node.parentNode?.appendChild(node);
  }
}
const indent = "    ";
function printObject(obj) {
  Object.entries(obj).forEach(([key, value]) => {
    console.log(`${indent}${key}:`, value);
  });
}
function getRgb(clr) {
  const { r, g, b, opacity: o } = rgb(clr);
  if (![r, g, b].every((c) => c >= 0 && c <= 255)) {
    return false;
  }
  return { r, g, b, o };
}
function printValues(scale, method, extraSpace = "") {
  const values = scale[method]();
  const colorValues = colorizeArray(values);
  if (colorValues) {
    printColorArray(colorValues, method, values);
  } else {
    console.log(`${indent}${indent}${toTitleCase(method)}:${extraSpace}`, values);
  }
}
function printColorArray(colorValues, method, values) {
  console.log(`${indent}${indent}${toTitleCase(method)}:    %cArray%c(${values.length}) ` + colorValues[0] + "%c ]", "color: #1377e4", "color: #737373", "color: #1478e4", ...colorValues[1], "color: #1478e4");
}
function colorizeArray(arr) {
  const colors = [];
  const a = arr.map((d, i) => {
    const rgbo = getRgb(d);
    if (rgbo !== false) {
      colors.push(rgbo);
      const space = i === arr.length - 1 ? " " : "";
      return `%c ${d}${space}`;
    }
    return d;
  });
  if (colors.length) {
    return [
      `%c[ ${a.join(", ")}`,
      colors.map((d) => `background-color: rgba(${d.r}, ${d.g}, ${d.b}, ${d.o}); color:${contrast(d)};`)
    ];
  }
  return null;
}
function printScale(s, scale, acc) {
  const scaleName = findScaleName(scale);
  console.log(`${indent}${s}:`);
  console.log(`${indent}${indent}Accessor: "${acc.toString()}"`);
  console.log(`${indent}${indent}Type: ${scaleName}`);
  printValues(scale, "domain");
  printValues(scale, "range", " ");
}
function contrast({ r, g, b }) {
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? "black" : "white";
}
function printDebug(obj) {
  console.log("/********* LayerChart Debug ************/");
  console.log("Bounding box:");
  printObject(obj.boundingBox);
  console.log("Data:");
  console.log(indent, obj.data);
  if (obj.flatData) {
    console.log("flatData:");
    console.log(indent, obj.flatData);
  }
  console.log("Scales:");
  Object.keys(obj.activeGetters).forEach((g) => {
    printScale(g, obj[`${g}Scale`], obj[g]);
  });
  console.log("/************ End LayerChart Debug ***************/\n");
}
function filterObject(obj, comparisonObj = {}) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => {
    return value !== void 0 && comparisonObj[key] === void 0;
  }));
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => (
        // @ts-ignore
        tick_spring(ctx, last_value[i], current_value[i], target_value[i])
      )
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
class Spring {
  #stiffness = source(0.15);
  #damping = source(0.8);
  #precision = source(0.01);
  #current;
  #target;
  #last_value = (
    /** @type {T} */
    void 0
  );
  #last_time = 0;
  #inverse_mass = 1;
  #momentum = 0;
  /** @type {import('../internal/client/types').Task | null} */
  #task = null;
  /** @type {ReturnType<typeof deferred> | null} */
  #deferred = null;
  /**
   * @param {T} value
   * @param {SpringOpts} [options]
   */
  constructor(value, options = {}) {
    this.#current = source(value);
    this.#target = source(value);
    if (typeof options.stiffness === "number") this.#stiffness.v = clamp(options.stiffness, 0, 1);
    if (typeof options.damping === "number") this.#damping.v = clamp(options.damping, 0, 1);
    if (typeof options.precision === "number") this.#precision.v = options.precision;
  }
  /**
   * Create a spring whose value is bound to the return value of `fn`. This must be called
   * inside an effect root (for example, during component initialisation).
   *
   * ```svelte
   * <script>
   * 	import { Spring } from 'svelte/motion';
   *
   * 	let { number } = $props();
   *
   * 	const spring = Spring.of(() => number);
   * <\/script>
   * ```
   * @template U
   * @param {() => U} fn
   * @param {SpringOpts} [options]
   */
  static of(fn, options) {
    const spring = new Spring(fn(), options);
    render_effect(() => {
      spring.set(fn());
    });
    return spring;
  }
  /** @param {T} value */
  #update(value) {
    set(this.#target, value);
    this.#current.v ??= value;
    this.#last_value ??= this.#current.v;
    if (!this.#task) {
      this.#last_time = raf.now();
      var inv_mass_recovery_rate = 1e3 / (this.#momentum * 60);
      this.#task ??= loop((now2) => {
        this.#inverse_mass = Math.min(this.#inverse_mass + inv_mass_recovery_rate, 1);
        const elapsed = Math.min(now2 - this.#last_time, 1e3 / 30);
        const ctx = {
          inv_mass: this.#inverse_mass,
          opts: {
            stiffness: this.#stiffness.v,
            damping: this.#damping.v,
            precision: this.#precision.v
          },
          settled: true,
          dt: elapsed * 60 / 1e3
        };
        var next = tick_spring(ctx, this.#last_value, this.#current.v, this.#target.v);
        this.#last_value = this.#current.v;
        this.#last_time = now2;
        set(this.#current, next);
        if (ctx.settled) {
          this.#task = null;
        }
        return !ctx.settled;
      });
    }
    return this.#task.promise;
  }
  /**
   * Sets `spring.target` to `value` and returns a `Promise` that resolves if and when `spring.current` catches up to it.
   *
   * If `options.instant` is `true`, `spring.current` immediately matches `spring.target`.
   *
   * If `options.preserveMomentum` is provided, the spring will continue on its current trajectory for
   * the specified number of milliseconds. This is useful for things like 'fling' gestures.
   *
   * @param {T} value
   * @param {SpringUpdateOpts} [options]
   */
  set(value, options) {
    this.#deferred?.reject(new Error("Aborted"));
    if (options?.instant || this.#current.v === void 0) {
      this.#task?.abort();
      this.#task = null;
      set(this.#current, set(this.#target, value));
      this.#last_value = value;
      return Promise.resolve();
    }
    if (options?.preserveMomentum) {
      this.#inverse_mass = 0;
      this.#momentum = options.preserveMomentum;
    }
    var d = this.#deferred = deferred();
    d.promise.catch(noop);
    this.#update(value).then(() => {
      if (d !== this.#deferred) return;
      d.resolve(void 0);
    });
    return d.promise;
  }
  get current() {
    return get$1(this.#current);
  }
  get damping() {
    return get$1(this.#damping);
  }
  set damping(v) {
    set(this.#damping, clamp(v, 0, 1));
  }
  get precision() {
    return get$1(this.#precision);
  }
  set precision(v) {
    set(this.#precision, v);
  }
  get stiffness() {
    return get$1(this.#stiffness);
  }
  set stiffness(v) {
    set(this.#stiffness, clamp(v, 0, 1));
  }
  get target() {
    return get$1(this.#target);
  }
  set target(v) {
    this.set(v);
  }
}
function clamp(n, min2, max2) {
  return Math.max(min2, Math.min(max2, n));
}
function linear$1(t) {
  return t;
}
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function cubicIn(t) {
  return t * t * t;
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = (
      /** @type {Array<any>} */
      b.map((bi, i) => {
        return get_interpolator(
          /** @type {Array<any>} */
          a[i],
          bi
        );
      })
    );
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) {
      throw new Error("Object cannot be null");
    }
    if (is_date(a) && is_date(b)) {
      const an = a.getTime();
      const bn = b.getTime();
      const delta = bn - an;
      return (t) => new Date(an + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = (
      /** @type {number} */
      b - /** @type {number} */
      a
    );
    return (t) => a + t * delta;
  }
  return () => b;
}
class Tween {
  #current;
  #target;
  /** @type {TweenedOptions<T>} */
  #defaults;
  /** @type {import('../internal/client/types').Task | null} */
  #task = null;
  /**
   * @param {T} value
   * @param {TweenedOptions<T>} options
   */
  constructor(value, options = {}) {
    this.#current = source(value);
    this.#target = source(value);
    this.#defaults = options;
  }
  /**
   * Create a tween whose value is bound to the return value of `fn`. This must be called
   * inside an effect root (for example, during component initialisation).
   *
   * ```svelte
   * <script>
   * 	import { Tween } from 'svelte/motion';
   *
   * 	let { number } = $props();
   *
   * 	const tween = Tween.of(() => number);
   * <\/script>
   * ```
   * @template U
   * @param {() => U} fn
   * @param {TweenedOptions<U>} [options]
   */
  static of(fn, options) {
    const tween = new Tween(fn(), options);
    render_effect(() => {
      tween.set(fn());
    });
    return tween;
  }
  /**
   * Sets `tween.target` to `value` and returns a `Promise` that resolves if and when `tween.current` catches up to it.
   *
   * If `options` are provided, they will override the tween's defaults.
   * @param {T} value
   * @param {TweenedOptions<T>} [options]
   * @returns
   */
  set(value, options) {
    set(this.#target, value);
    let {
      delay = 0,
      duration = 400,
      easing = linear$1,
      interpolate: interpolate2 = get_interpolator
    } = { ...this.#defaults, ...options };
    if (duration === 0) {
      this.#task?.abort();
      set(this.#current, value);
      return Promise.resolve();
    }
    const start = raf.now() + delay;
    let fn;
    let started = false;
    let previous_task = this.#task;
    this.#task = loop((now2) => {
      if (now2 < start) {
        return true;
      }
      if (!started) {
        started = true;
        const prev = this.#current.v;
        fn = interpolate2(prev, value);
        if (typeof duration === "function") {
          duration = duration(prev, value);
        }
        previous_task?.abort();
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        set(this.#current, value);
        return false;
      }
      set(this.#current, fn(easing(elapsed / /** @type {number} */
      duration)));
      return true;
    });
    return this.#task.promise;
  }
  get current() {
    return get$1(this.#current);
  }
  get target() {
    return get$1(this.#target);
  }
  set target(v) {
    this.set(v);
  }
}
class MotionSpring extends Spring {
  type = "spring";
  constructor(value, options) {
    super(value, options);
  }
}
class MotionTween extends Tween {
  type = "tween";
  constructor(value, options) {
    super(value, options);
  }
}
class MotionNone {
  type = "none";
  #current = null;
  #target = null;
  constructor(value, _options = {}) {
    this.#current = value;
    this.#target = value;
  }
  /**
   * Updates the value immediately and returns a resolved promise
   * to maintain API compatibility with animated motion classes
   */
  set(value, _options = {}) {
    this.#current = value;
    this.#target = value;
    return Promise.resolve();
  }
  get current() {
    return this.#current;
  }
  get target() {
    return this.#target;
  }
  set target(v) {
    this.set(v);
  }
}
function setupTracking(motion, getValue, options) {
  if (options.controlled) return;
}
function createMotion(initialValue, getValue, motionProp, options = {}) {
  const motion = parseMotionProp(motionProp);
  const motionState = motion.type === "spring" ? new MotionSpring(initialValue, motion.options) : motion.type === "tween" ? new MotionTween(initialValue, motion.options) : new MotionNone(initialValue);
  setupTracking(motionState, getValue, options);
  return motionState;
}
function createControlledMotion(initialValue, motionProp) {
  return createMotion(initialValue, () => initialValue, motionProp, { controlled: true });
}
function createMotionTracker() {
  let latestIndex = 0;
  let current = false;
  function handle(promise) {
    latestIndex += 1;
    if (!promise) {
      current = false;
      return;
    }
    let currIndex = latestIndex;
    current = true;
    promise.then(() => {
      if (currIndex === latestIndex) {
        current = false;
      }
    }).catch(() => {
    });
  }
  return {
    handle,
    get current() {
      return current;
    }
  };
}
function extractTweenConfig(prop) {
  const resolved = parseMotionProp(prop);
  if (resolved.type === "tween") return resolved;
}
function parseMotionProp(config, accessor2) {
  if (typeof config === "object" && "type" in config && "options" in config) {
    if (typeof config.options === "object") return config;
    return { type: config.type, options: {} };
  }
  if (config === void 0) return { type: "none", options: {} };
  if (typeof config === "string") {
    if (config === "spring") {
      return { type: "spring", options: {} };
    } else if (config === "tween") {
      return { type: "tween", options: {} };
    }
    return { type: "none", options: {} };
  }
  if (typeof config === "object" && "type" in config) {
    if (config.type === "spring") {
      const { type, ...options } = config;
      return { type: "spring", options };
    } else if (config.type === "tween") {
      const { type, ...options } = config;
      return { type: "tween", options };
    } else {
      return { type: "none", options: {} };
    }
  }
  if (accessor2) {
    const propConfig = config[accessor2];
    if (propConfig !== void 0) {
      return parseMotionProp(propConfig);
    }
  }
  return { type: "none", options: {} };
}
function isAnyScale(scale) {
  return typeof scale === "function" && typeof scale.range === "function";
}
function isScaleBand(scale) {
  return typeof scale.bandwidth === "function";
}
function isScaleTime(scale) {
  const domain = scale.domain();
  return domain[0] instanceof Date || domain[1] instanceof Date;
}
function getRange(scale) {
  if (isAnyScale(scale)) {
    return scale.range();
  }
  console.error("[LayerChart] Your scale doesn't have a `.range` method?");
  return [];
}
function scaleBandInvert(scale) {
  const domain = scale.domain();
  const eachBand = scale.step();
  const paddingOuter = eachBand * (scale.paddingOuter?.() ?? scale.padding());
  return function(value) {
    const index = Math.floor((value - paddingOuter / 2) / eachBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
}
function scaleInvert(scale, value) {
  if (isScaleBand(scale)) {
    return scaleBandInvert(scale)(value);
  } else {
    return scale.invert?.(value);
  }
}
function createScale(scale, domain, range2, context) {
  const scaleCopy = scale.copy();
  if (domain) {
    scaleCopy.domain(domain);
  }
  if (typeof range2 === "function") {
    scaleCopy.range(range2(context));
  } else {
    scaleCopy.range(range2);
  }
  return scaleCopy;
}
function canBeZero(val) {
  if (val === 0) return true;
  return val;
}
function makeAccessor(acc) {
  if (!canBeZero(acc)) return null;
  if (Array.isArray(acc)) {
    return (d) => acc.map((k) => {
      return typeof k !== "function" ? d[k] : k(d);
    });
  } else if (typeof acc !== "function") {
    return (d) => d[acc];
  }
  return acc;
}
const defaultWindow = void 0;
function getActiveElement(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const {
      window: window2 = defaultWindow,
      document: document2 = window2?.document
    } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement(this.#document);
  }
}
new ActiveElement();
function isFunction(value) {
  return typeof value === "function";
}
function extract(value, defaultValue) {
  if (isFunction(value)) {
    const getter = value;
    const gotten = getter();
    if (gotten === void 0) return defaultValue;
    return gotten;
  }
  if (value === void 0) return defaultValue;
  return value;
}
class Context {
  #name;
  #key;
  /**
   * @param name The name of the context.
   * This is used for generating the context key and error messages.
   */
  constructor(name) {
    this.#name = name;
    this.#key = Symbol(name);
  }
  /**
   * The key used to get and set the context.
   *
   * It is not recommended to use this value directly.
   * Instead, use the methods provided by this class.
   */
  get key() {
    return this.#key;
  }
  /**
   * Checks whether this has been set in the context of a parent component.
   *
   * Must be called during component initialisation.
   */
  exists() {
    return hasContext(this.#key);
  }
  /**
   * Retrieves the context that belongs to the closest parent component.
   *
   * Must be called during component initialisation.
   *
   * @throws An error if the context does not exist.
   */
  get() {
    const context = getContext(this.#key);
    if (context === void 0) {
      throw new Error(`Context "${this.#name}" not found`);
    }
    return context;
  }
  /**
   * Retrieves the context that belongs to the closest parent component,
   * or the given fallback value if the context does not exist.
   *
   * Must be called during component initialisation.
   */
  getOr(fallback) {
    const context = getContext(this.#key);
    if (context === void 0) {
      return fallback;
    }
    return context;
  }
  /**
   * Associates the given value with the current component and returns it.
   *
   * Must be called during component initialisation.
   */
  set(context) {
    return setContext(this.#key, context);
  }
}
function useDebounce(callback, wait) {
  let context = null;
  const wait$ = extract(wait, 250);
  function debounced(...args) {
    if (context) {
      if (context.timeout) {
        clearTimeout(context.timeout);
      }
    } else {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      context = {
        timeout: null,
        runner: null,
        promise,
        resolve,
        reject
      };
    }
    context.runner = async () => {
      if (!context) return;
      const ctx = context;
      context = null;
      try {
        ctx.resolve(await callback.apply(this, args));
      } catch (error) {
        ctx.reject(error);
      }
    };
    context.timeout = setTimeout(context.runner, wait$);
    return context.promise;
  }
  debounced.cancel = async () => {
    if (!context || context.timeout === null) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || context.timeout === null) return;
    }
    clearTimeout(context.timeout);
    context.reject("Cancelled");
    context = null;
  };
  debounced.runScheduledNow = async () => {
    if (!context || !context.timeout) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || !context.timeout) return;
    }
    clearTimeout(context.timeout);
    context.timeout = null;
    await context.runner?.();
  };
  Object.defineProperty(debounced, "pending", {
    enumerable: true,
    get() {
      return !!context?.timeout;
    }
  });
  return debounced;
}
function runWatcher(sources, flush, effect, options = {}) {
  const { lazy = false } = options;
}
function watch(sources, effect, options) {
  runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
  runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow } = options;
  let observer;
  (() => {
    const value = extract(target);
    return new Set(value ? Array.isArray(value) ? value : [value] : []);
  })();
  const stop = () => {
  };
  return {
    stop,
    takeRecords() {
      return observer?.takeRecords();
    }
  };
}
function layerClass(layerName) {
  return `lc-${layerName}`;
}
function isObjectWithClass(val) {
  return typeof val === "object" && val !== null && typeof val !== "function";
}
function extractLayerProps(props, layerName, extraClasses) {
  const className = layerClass(layerName);
  if (isObjectWithClass(props)) {
    return {
      ...props,
      class: cls(className, props.class ?? "", extraClasses)
    };
  }
  return {
    class: cls(className, extraClasses)
  };
}
const DEFAULT_TRANSLATE = { x: 0, y: 0 };
const DEFAULT_SCALE = 1;
const _TransformContext = new Context("TransformContext");
function createDefaultTransformContext() {
  let defaultTranslate = DEFAULT_TRANSLATE;
  let defaultScale = DEFAULT_SCALE;
  const defaultContext = {
    mode: "none",
    get scale() {
      return defaultScale;
    },
    setScale: (value) => {
      defaultScale = value;
    },
    get translate() {
      return defaultTranslate;
    },
    setTranslate: (value) => {
      defaultTranslate = value;
    },
    moving: false,
    dragging: false,
    scrollMode: "none",
    setScrollMode: () => {
    },
    reset: () => {
    },
    zoomIn: () => {
    },
    zoomOut: () => {
    },
    translateCenter: () => {
    },
    zoomTo: () => {
    }
  };
  return defaultContext;
}
function getTransformContext() {
  return _TransformContext.getOr(createDefaultTransformContext());
}
function setTransformContext(transform) {
  return _TransformContext.set(transform);
}
function TransformContext($$payload, $$props) {
  push();
  let {
    mode = "none",
    motion,
    processTranslate = (x, y, deltaX, deltaY) => ({ x: x + deltaX, y: y + deltaY }),
    disablePointer = false,
    initialScrollMode = "none",
    clickDistance = 10,
    ondragend = () => {
    },
    ondragstart = () => {
    },
    onTransform = () => {
    },
    initialTranslate,
    initialScale,
    onwheel = () => {
    },
    onpointerdown = () => {
    },
    onpointermove = () => {
    },
    ontouchmove = () => {
    },
    onpointerup = () => {
    },
    ondblclick = () => {
    },
    onclickcapture = () => {
    },
    ref: refProp = void 0,
    children,
    class: className,
    transformContext = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  transformContext = {
    get mode() {
      return mode;
    },
    get scale() {
      return scale.current;
    },
    setScale,
    get translate() {
      return translate.current;
    },
    setTranslate,
    get dragging() {
      return dragging;
    },
    get moving() {
      return moving;
    },
    reset,
    zoomIn,
    zoomOut,
    translateCenter,
    zoomTo,
    get scrollMode() {
      return scrollMode;
    },
    setScrollMode
  };
  const ctx = getChartContext();
  let dragging = false;
  let scrollMode = initialScrollMode;
  const resolvedMotion = parseMotionProp(motion);
  const translate = createControlledMotion(initialTranslate ?? DEFAULT_TRANSLATE, resolvedMotion);
  const scale = createControlledMotion(initialScale ?? DEFAULT_SCALE, resolvedMotion);
  function setScrollMode(mode2) {
    scrollMode = mode2;
  }
  function reset() {
    translate.target = initialTranslate ?? DEFAULT_TRANSLATE;
    scale.target = initialScale ?? DEFAULT_SCALE;
  }
  function zoomIn() {
    scaleTo(1.25, {
      x: (ctx.width + ctx.padding.left) / 2,
      y: (ctx.height + ctx.padding.top) / 2
    });
  }
  function zoomOut() {
    scaleTo(0.8, {
      x: (ctx.width + ctx.padding.left) / 2,
      y: (ctx.height + ctx.padding.top) / 2
    });
  }
  function translateCenter() {
    translate.target = { x: 0, y: 0 };
  }
  function zoomTo(center, rect) {
    const newScale = rect ? ctx.width < ctx.height ? ctx.width / rect.width : ctx.height / rect.height : 1;
    translate.target = {
      x: ctx.width / 2 - center.x * newScale,
      y: ctx.height / 2 - center.y * newScale
    };
    if (rect) {
      scale.target = newScale;
    }
  }
  function scaleTo(value, point, options = void 0) {
    const currentScale = scale.current;
    const newScale = scale.current * value;
    setScale(newScale, options);
    const invertTransformPoint = {
      x: (point.x - ctx.padding.left - translate.current.x) / currentScale,
      y: (point.y - ctx.padding.top - translate.current.y) / currentScale
    };
    const newTranslate = {
      x: point.x - ctx.padding.left - invertTransformPoint.x * newScale,
      y: point.y - ctx.padding.top - invertTransformPoint.y * newScale
    };
    setTranslate(newTranslate, options);
  }
  const translating = createMotionTracker();
  const scaling = createMotionTracker();
  const moving = dragging || translating.current || scaling.current;
  function setTranslate(point, options) {
    translating.handle(translate.set(point, options));
  }
  function setScale(value, options) {
    scaling.handle(scale.set(value, options));
  }
  watch([() => scale.current, () => translate.current], () => {
    onTransform({
      scale: scale.current,
      translate: translate.current
    });
  });
  setTransformContext(transformContext);
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cls(layerClass("transform-context"), "h-full", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload, { transformContext });
  $$payload.out += `<!----></div>`;
  bind_props($$props, {
    ref: refProp,
    transformContext,
    setScrollMode,
    reset,
    zoomIn,
    zoomOut,
    translateCenter,
    zoomTo,
    setTranslate,
    setScale
  });
  pop();
}
const _GeoContext = new Context("GeoContext");
function getGeoContext() {
  return _GeoContext.getOr({ projection: void 0 });
}
function setGeoContext(geo) {
  return _GeoContext.set(geo);
}
function GeoContext($$payload, $$props) {
  push();
  let {
    projection: projectionProp,
    fitGeojson,
    fixedAspectRatio,
    clipAngle,
    clipExtent,
    rotate,
    scale,
    translate,
    center,
    applyTransform = [],
    reflectX,
    reflectY,
    geoContext: geoContextProp = void 0,
    children
  } = $$props;
  const ctx = getChartContext();
  getTransformContext();
  let projection = void 0;
  const geoContext = {
    get projection() {
      return projection;
    },
    set projection(v) {
      projection = v;
    }
  };
  geoContextProp = geoContext;
  setGeoContext(geoContext);
  fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [ctx.width, ctx.height];
  children($$payload, { geoContext });
  $$payload.out += `<!---->`;
  bind_props($$props, { geoContext: geoContextProp });
  pop();
}
function Svg($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    innerRef: innerRefProp = void 0,
    zIndex = 0,
    pointerEvents,
    viewBox,
    ignoreTransform = false,
    center = false,
    class: className,
    title,
    defs,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  const ctx = getChartContext();
  const transformCtx = getTransformContext();
  const transform = (() => {
    if (transformCtx.mode === "canvas" && !ignoreTransform) {
      return `translate(${transformCtx.translate.x},${transformCtx.translate.y}) scale(${transformCtx.scale})`;
    } else if (center) {
      return `translate(${center === "x" || center === true ? ctx.width / 2 : 0}, ${center === "y" || center === true ? ctx.height / 2 : 0})`;
    }
  })();
  setRenderContext("svg");
  $$payload.out += `<svg${spread_attributes(
    {
      viewBox,
      width: ctx.containerWidth,
      height: ctx.containerHeight,
      class: clsx(cls(layerClass("layout-svg"), "absolute top-0 left-0 overflow-visible", pointerEvents === false && "pointer-events-none", className)),
      role: "figure",
      ...restProps
    },
    null,
    void 0,
    { "z-index": zIndex },
    3
  )}>`;
  if (typeof title === "function") {
    $$payload.out += "<!--[-->";
    title($$payload);
    $$payload.out += `<!---->`;
  } else if (title) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<title${attr_class(clsx(layerClass("layout-svg-title")))}>${escape_html(title)}</title>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--><defs>`;
  defs?.($$payload);
  $$payload.out += `<!----></defs><g${attr_class(clsx(layerClass("layout-svg-g")))}${attr("transform", `translate(${stringify(ctx.padding.left)}, ${stringify(ctx.padding.top)})`)}>`;
  if (transform) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<g${attr("transform", transform)}${attr_class(clsx(layerClass("layout-svg-g-transform")))}>`;
    children?.($$payload, { ref });
    $$payload.out += `<!----></g>`;
  } else {
    $$payload.out += "<!--[!-->";
    children?.($$payload, { ref });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></g></svg>`;
  bind_props($$props, { ref: refProp, innerRef: innerRefProp });
  pop();
}
function createId(prefix, uid) {
  return `${prefix}-${uid}`;
}
function ClipPath($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("clipPath-", uid),
    useId,
    disabled = false,
    children,
    clip,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const url = `url(#${id})`;
  const renderContext = getRenderContext();
  if (renderContext === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<defs><clipPath${spread_attributes({ id, ...restProps }, null, void 0, void 0, 3)}>`;
    clip?.($$payload, { id });
    $$payload.out += `<!---->`;
    if (useId) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<use${attr("href", `#${stringify(useId)}`)}></use>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></clipPath></defs>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (children) {
    $$payload.out += "<!--[-->";
    if (disabled || renderContext !== "svg") {
      $$payload.out += "<!--[-->";
      children($$payload, { id, url, useId });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<g${attr_class(clsx(layerClass("clip-path-g")))}${attr_style("", { "clip-path": url })}>`;
      children($$payload, { id, url, useId });
      $$payload.out += `<!----></g>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const DEFAULT_FILL = "rgb(0, 0, 0)";
const CANVAS_STYLES_ELEMENT_ID = "__layerchart_canvas_styles_id";
const supportedStyles = [
  "fill",
  "fillOpacity",
  "stroke",
  "strokeWidth",
  "opacity",
  "fontWeight",
  "fontSize",
  "fontFamily",
  "textAnchor",
  "textAlign",
  "paintOrder"
];
function _getComputedStyles(canvas, { styles, classes } = {}) {
  try {
    let svg = document.getElementById(CANVAS_STYLES_ELEMENT_ID);
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", CANVAS_STYLES_ELEMENT_ID);
      svg.style.display = "none";
      canvas.after(svg);
    }
    svg = svg;
    svg.removeAttribute("style");
    svg.removeAttribute("class");
    if (styles) {
      Object.assign(svg.style, styles);
    }
    svg.style.display = "none";
    if (classes) {
      svg.setAttribute("class", cls(classes).split(" ").filter((s) => !s.startsWith("transition-")).join(" "));
    }
    const computedStyles = supportedStyles.reduce((acc, style) => {
      acc[style] = window.getComputedStyle(svg)[style];
      return acc;
    }, {});
    return computedStyles;
  } catch (e) {
    console.error("Unable to get computed styles", e);
    return {};
  }
}
function getComputedStylesKey(canvas, { styles, classes } = {}) {
  return JSON.stringify({ canvasId: canvas.id, styles, classes });
}
const getComputedStyles = memoize(_getComputedStyles, {
  cacheKey: ([canvas, styleOptions]) => {
    return getComputedStylesKey(canvas, styleOptions);
  }
});
function render(ctx, render2, styleOptions = {}, { applyText } = {}) {
  let resolvedStyles;
  if (styleOptions.classes == null && !Object.values(styleOptions.styles ?? {}).some((v) => typeof v === "string" && v.includes("var("))) {
    resolvedStyles = styleOptions.styles ?? {};
  } else {
    const { constantStyles, variableStyles } = Object.entries(styleOptions.styles ?? {}).reduce((acc, [key, value]) => {
      if (typeof value === "number" || typeof value === "string" && !value.includes("var(")) {
        acc.constantStyles[key] = value;
      } else if (typeof value === "string" && value.includes("var(")) {
        acc.variableStyles[key] = value;
      }
      return acc;
    }, { constantStyles: {}, variableStyles: {} });
    const computedStyles = getComputedStyles(ctx.canvas, {
      styles: variableStyles,
      classes: styleOptions.classes
    });
    resolvedStyles = { ...computedStyles, ...constantStyles };
  }
  const paintOrder = resolvedStyles?.paintOrder === "stroke" ? ["stroke", "fill"] : ["fill", "stroke"];
  if (resolvedStyles?.opacity) {
    ctx.globalAlpha = Number(resolvedStyles?.opacity);
  }
  if (applyText) {
    ctx.font = `${resolvedStyles.fontWeight} ${resolvedStyles.fontSize} ${resolvedStyles.fontFamily}`;
    if (resolvedStyles.textAnchor === "middle") {
      ctx.textAlign = "center";
    } else if (resolvedStyles.textAnchor === "end") {
      ctx.textAlign = "right";
    } else {
      ctx.textAlign = resolvedStyles.textAlign;
    }
  }
  if (resolvedStyles.strokeDasharray?.includes(",")) {
    const dashArray = resolvedStyles.strokeDasharray.split(",").map((s) => Number(s.replace("px", "")));
    ctx.setLineDash(dashArray);
  }
  for (const attr2 of paintOrder) {
    if (attr2 === "fill") {
      const fill = styleOptions.styles?.fill && (styleOptions.styles?.fill instanceof CanvasGradient || styleOptions.styles?.fill instanceof CanvasPattern || !styleOptions.styles?.fill?.includes("var")) ? styleOptions.styles.fill : resolvedStyles?.fill;
      if (fill && !["none", DEFAULT_FILL].includes(fill)) {
        const currentGlobalAlpha = ctx.globalAlpha;
        const fillOpacity = Number(resolvedStyles?.fillOpacity);
        const opacity = Number(resolvedStyles?.opacity);
        ctx.globalAlpha = fillOpacity * opacity;
        ctx.fillStyle = fill;
        render2.fill(ctx);
        ctx.globalAlpha = currentGlobalAlpha;
      }
    } else if (attr2 === "stroke") {
      const stroke = styleOptions.styles?.stroke && (styleOptions.styles?.stroke instanceof CanvasGradient || !styleOptions.styles?.stroke?.includes("var")) ? styleOptions.styles?.stroke : resolvedStyles?.stroke;
      if (stroke && !["none"].includes(stroke)) {
        ctx.lineWidth = typeof resolvedStyles?.strokeWidth === "string" ? Number(resolvedStyles?.strokeWidth?.replace("px", "")) : resolvedStyles?.strokeWidth ?? 1;
        ctx.strokeStyle = stroke;
        render2.stroke(ctx);
      }
    }
  }
}
function renderPathData(ctx, pathData, styleOptions = {}) {
  const path2 = new Path2D(pathData ?? "");
  render(ctx, {
    fill: (ctx2) => ctx2.fill(path2),
    stroke: (ctx2) => ctx2.stroke(path2)
  }, styleOptions);
}
function renderCircle(ctx, coords, styleOptions = {}) {
  ctx.beginPath();
  ctx.arc(coords.cx, coords.cy, coords.r, 0, 2 * Math.PI);
  render(ctx, {
    fill: (ctx2) => {
      ctx2.fill();
    },
    stroke: (ctx2) => {
      ctx2.stroke();
    }
  }, styleOptions);
  ctx.closePath();
}
function _createLinearGradient(ctx, x0, y0, x1, y1, stops) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  for (const { offset, color } of stops) {
    gradient.addColorStop(offset, color);
  }
  return gradient;
}
memoize(_createLinearGradient, {
  cacheKey: (args) => JSON.stringify(args.slice(1))
  // Ignore `ctx` argument
});
function _createPattern(ctx, width, height, shapes, background) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  ctx.canvas.after(patternCanvas);
  patternCanvas.width = width;
  patternCanvas.height = height;
  if (background) {
    patternCtx.fillStyle = background;
    patternCtx.fillRect(0, 0, width, height);
  }
  for (const shape of shapes) {
    patternCtx.save();
    if (shape.type === "circle") {
      renderCircle(patternCtx, { cx: shape.cx, cy: shape.cy, r: shape.r }, { styles: { fill: shape.fill, opacity: shape.opacity } });
    } else if (shape.type === "line") {
      renderPathData(patternCtx, shape.path, {
        styles: { stroke: shape.stroke, strokeWidth: shape.strokeWidth, opacity: shape.opacity }
      });
    }
    patternCtx.restore();
  }
  const pattern = ctx.createPattern(patternCanvas, "repeat");
  ctx.canvas.parentElement?.removeChild(patternCanvas);
  return pattern;
}
memoize(_createPattern, {
  cacheKey: (args) => JSON.stringify(args.slice(1))
  // Ignore `ctx` argument
});
const CanvasContext = new Context("CanvasContext");
const defaultCanvasContext = {
  register: (_) => {
    return () => {
    };
  },
  invalidate: () => {
  }
};
function getCanvasContext() {
  return CanvasContext.getOr(defaultCanvasContext);
}
function setCanvasContext(context) {
  return CanvasContext.set(context);
}
function registerCanvasComponent(component) {
  getCanvasContext();
}
function Canvas($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    canvasContext: canvasContextProp = void 0,
    willReadFrequently = false,
    debug = false,
    zIndex = 0,
    pointerEvents = true,
    fallback,
    center = false,
    ignoreTransform = false,
    disableHitCanvas = false,
    class: className,
    children,
    onclick,
    ondblclick,
    onpointerenter,
    onpointermove,
    onpointerleave: onpointerleave2,
    onpointerdown,
    ontouchmove,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  let context = void 0;
  getChartContext();
  getTransformContext();
  new Logger("Canvas");
  let components = /* @__PURE__ */ new Map();
  let pendingInvalidation = false;
  const { dark } = new MediaQueryPresets();
  watch(() => dark.current, () => {
    canvasContext.invalidate();
  });
  useMutationObserver(() => document.documentElement, () => canvasContext.invalidate(), {});
  function update() {
    return;
  }
  function createCanvasContext() {
    function register(component) {
      const key = Symbol();
      components.set(key, component);
      invalidate();
      return () => {
        components.delete(key);
        invalidate();
      };
    }
    function invalidate() {
      if (pendingInvalidation) return;
      pendingInvalidation = true;
      requestAnimationFrame(update);
    }
    return { register, invalidate };
  }
  const canvasContext = createCanvasContext();
  setCanvasContext(canvasContext);
  setRenderContext("canvas");
  $$payload.out += `<canvas${spread_attributes(
    {
      class: clsx(cls(layerClass("layout-canvas"), "absolute top-0 left-0 w-full h-full", pointerEvents === false && "pointer-events-none", className)),
      ...restProps
    },
    null,
    void 0,
    { "z-index": zIndex }
  )}>`;
  if (fallback) {
    $$payload.out += "<!--[-->";
    if (typeof fallback === "function") {
      $$payload.out += "<!--[-->";
      fallback($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(fallback)}`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></canvas> <canvas${attr_class(clsx(cls(
    layerClass("hit-canvas"),
    "layerchart-hitcanvas",
    "absolute top-0 left-0 w-full h-full",
    "pointer-events-none",
    // events all handled by main canvas
    // '[image-rendering:pixelated]', // https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
    "border border-danger",
    !debug && "opacity-0"
  )))}></canvas> `;
  children?.($$payload, { ref, canvasContext: context });
  $$payload.out += `<!---->`;
  bind_props($$props, {
    ref: refProp,
    canvasContext: canvasContextProp
  });
  pop();
}
function createKey(getValue) {
  const value = getValue();
  const key = value && typeof value === "object" ? objectId(value) : value;
  return {
    get current() {
      return key;
    }
  };
}
function Rect($$payload, $$props) {
  push();
  let {
    height,
    width,
    x = 0,
    y = 0,
    initialX = x,
    initialY = y,
    fill,
    fillOpacity,
    stroke,
    initialHeight = height,
    initialWidth = width,
    strokeWidth,
    opacity,
    ref: refProp = void 0,
    motion,
    class: className,
    onclick,
    ondblclick,
    onpointerenter,
    onpointermove,
    onpointerleave: onpointerleave2,
    onpointerover,
    onpointerout,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const motionX = createMotion(initialX, () => x, parseMotionProp(motion, "x"));
  const motionY = createMotion(initialY, () => y, parseMotionProp(motion, "y"));
  const motionWidth = createMotion(initialWidth, () => width, parseMotionProp(motion, "width"));
  const motionHeight = createMotion(initialHeight, () => height, parseMotionProp(motion, "height"));
  const renderCtx = getRenderContext();
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent();
  }
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<rect${spread_attributes(
      {
        x: motionX.current,
        y: motionY.current,
        width: motionWidth.current,
        height: motionHeight.current,
        fill,
        "fill-opacity": fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        opacity,
        class: clsx(cls(layerClass("rect"), fill == null && "fill-surface-content", className)),
        ...restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></rect>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
function RectClipPath($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("clipPath-", uid),
    x = 0,
    y = 0,
    disabled = false,
    children: childrenProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let clip = function($$payload2) {
      Rect($$payload2, spread_props([
        { x, y },
        extractLayerProps(restProps, "clip-path-rect")
      ]));
    }, children = function($$payload2, { url }) {
      childrenProp?.($$payload2, { id, url });
      $$payload2.out += `<!---->`;
    };
    ClipPath($$payload, {
      id,
      disabled,
      clip,
      children,
      $$slots: { clip: true, default: true }
    });
  }
  pop();
}
function ChartClipPath($$payload, $$props) {
  push();
  let {
    full = false,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  RectClipPath($$payload, spread_props([
    {
      x: full && ctx.padding.left ? -ctx.padding.left : 0,
      y: full && ctx.padding.top ? -ctx.padding.top : 0,
      disabled,
      height: ctx.height + (full ? (ctx.padding?.top ?? 0) + (ctx.padding?.bottom ?? 0) : 0),
      width: ctx.width + (full ? (ctx.padding?.left ?? 0) + (ctx.padding?.right ?? 0) : 0)
    },
    extractLayerProps(restProps, "chart-clip-path")
  ]));
  pop();
}
function geoCurvePath(projection, curve, context) {
  const pathContext = path();
  const geoPath$1 = geoPath(projection, curveContext(curve(pathContext)));
  const fn = (object) => {
    geoPath$1(object);
    return pathContext + "";
  };
  Object.setPrototypeOf(fn, geoPath$1);
  return fn;
}
function curveContext(curve) {
  return {
    beginPath() {
    },
    moveTo(x, y) {
      curve.lineStart();
      curve.point(x, y);
    },
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    },
    lineTo(x, y) {
      curve.point(x, y);
    },
    closePath() {
      curve.lineEnd();
    }
  };
}
function geoFitObjectTransform(projection, size, object) {
  const newProjection = projection.fitSize(size, object);
  const translate = newProjection.translate();
  return { translate: { x: translate[0], y: translate[1] }, scale: newProjection.scale() };
}
function GeoPath($$payload, $$props) {
  push();
  let {
    fill,
    stroke,
    strokeWidth,
    opacity,
    geoTransform: geoTransform$1,
    geojson,
    tooltipContext,
    curve = curveLinearClosed,
    onclick,
    class: className,
    ref: refProp = void 0,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const geo = getGeoContext();
  const projection = geoTransform$1 && geo.projection ? geoTransform(geoTransform$1(geo.projection)) : geo.projection;
  const geoPath$1 = (() => {
    if (!projection) return;
    if (curve === curveLinearClosed) {
      return geoPath(projection);
    }
    return geoCurvePath(projection, curve);
  })();
  const renderCtx = getRenderContext();
  createKey(() => fill);
  createKey(() => stroke);
  const _onPointerEnter = (e) => {
    restProps.onpointerenter?.(e);
    tooltipContext?.show(e, geojson);
  };
  const _onPointerMove = (e) => {
    restProps.onpointermove?.(e);
    tooltipContext?.show(e, geojson);
  };
  const _onPointerLeave = (e) => {
    restProps.onpointerleave?.(e);
    tooltipContext?.hide();
  };
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        pointerenter: restProps.onpointerenter || tooltipContext ? _onPointerEnter : void 0,
        pointermove: restProps.onpointermove || tooltipContext ? _onPointerMove : void 0,
        pointerleave: restProps.onpointerleave || tooltipContext ? _onPointerLeave : void 0,
        pointerdown: restProps.onpointerdown,
        touchmove: restProps.ontouchmove
      }
    });
  }
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload, { geoPath: geoPath$1 });
    $$payload.out += `<!---->`;
  } else if (renderCtx === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<path${spread_attributes(
      {
        ...restProps,
        d: geojson ? geoPath$1?.(geojson) : "",
        fill,
        stroke,
        "stroke-width": strokeWidth,
        opacity,
        class: clsx(cls(layerClass("geo-path"), fill == null && "fill-transparent", className))
      },
      null,
      void 0,
      void 0,
      3
    )}></path>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
const linear = (x) => x;
function fade(node, { delay = 0, duration = 400, easing = linear } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function Group($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    x,
    initialX: initialXProp,
    y,
    initialY: initialYProp,
    center = false,
    preventTouchMove = false,
    opacity = void 0,
    motion,
    transitionIn: transitionInProp,
    transitionInParams: transitionInParamsProp,
    class: className,
    children,
    ref: refProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const initialX = initialXProp ?? x;
  const initialY = initialYProp ?? y;
  const trueX = x ?? (center === "x" || center === true ? ctx.width / 2 : 0);
  const trueY = y ?? (center === "y" || center === true ? ctx.height / 2 : 0);
  const motionX = createMotion(initialX, () => trueX, motion);
  const motionY = createMotion(initialY, () => trueY, motion);
  transitionInProp ? transitionInProp : extractTweenConfig(motion)?.options ? fade : () => {
  };
  const transform = (() => {
    if (center || x != null || y != null) {
      return `translate(${motionX.current}px, ${motionY.current}px)`;
    }
  })();
  const renderCtx = getRenderContext();
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        click: restProps.onclick,
        dblclick: restProps.ondblclick,
        pointerenter: restProps.onpointerenter,
        pointermove: restProps.onpointermove,
        pointerleave: restProps.onpointerleave,
        pointerdown: restProps.onpointerdown
      }
    });
  }
  if (renderCtx === "canvas") {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else if (renderCtx === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<g${spread_attributes(
      {
        class: clsx(cls(layerClass("group-g"), className)),
        opacity,
        ...restProps
      },
      null,
      void 0,
      { transform },
      3
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></g>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...restProps,
        class: clsx(cls(layerClass("group-div"), "absolute", className))
      },
      null,
      void 0,
      { transform, opacity }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
function flattenPathData(pathData, yOverride = 0) {
  let result = pathData;
  result = result.replace(/([MLTQCSAZ])(-?\d*\.?\d+),(-?\d*\.?\d+)/g, (match, command, x, y) => {
    return `${command}${x},${yOverride}`;
  });
  result = result.replace(/([v])(-?\d*\.?\d+)/g, (match, command, l) => {
    return `${command}${0}`;
  });
  return result;
}
function Marker($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    type,
    id = createId("marker-", uid),
    size = 10,
    markerWidth = size,
    markerHeight = size,
    markerUnits = "userSpaceOnUse",
    orient = "auto-start-reverse",
    refX = ["arrow", "triangle"].includes(type ?? "") ? 9 : 5,
    refY = 5,
    viewBox = "0 0 10 10",
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<defs><marker${spread_attributes(
    {
      id,
      markerWidth,
      markerHeight,
      markerUnits,
      orient,
      refX,
      refY,
      viewBox,
      ...restProps,
      class: clsx(cls(
        layerClass("marker"),
        "overflow-visible",
        // stroke
        restProps.stroke == null && (["arrow", "circle-stroke", "line"].includes(type ?? "") ? "stroke-[context-stroke]" : type === "circle" ? "stroke-surface-100" : "stroke-none"),
        // extra stroke attrs
        "[stroke-linecap:round] [stroke-linejoin:round]",
        //fill
        restProps.fill == null && (["triangle", "dot", "circle"].includes(type ?? "") ? "fill-[context-stroke]" : type === "circle-stroke" ? "fill-surface-100" : "fill-none"),
        className
      ))
    },
    null,
    void 0,
    void 0,
    3
  )}>`;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else if (type === "triangle") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<path d="M 0 0 L 10 5 L 0 10 z"${attr_class(clsx(layerClass("marker-triangle")))}></path>`;
  } else if (type === "arrow") {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<polyline points="0 0, 10 5, 0 10"${attr_class(clsx(layerClass("marker-arrow")))}></polyline>`;
  } else if (type === "circle" || type === "circle-stroke" || type === "dot") {
    $$payload.out += "<!--[3-->";
    $$payload.out += `<circle${attr("cx", 5)}${attr("cy", 5)}${attr("r", 5)}${attr_class(clsx(layerClass("marker-circle")))}></circle>`;
  } else if (type === "line") {
    $$payload.out += "<!--[4-->";
    $$payload.out += `<polyline points="5 0, 5 10"${attr_class(clsx(layerClass("marker-line")))}></polyline>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></marker></defs>`;
  pop();
}
function MarkerWrapper($$payload, $$props) {
  let { id, marker } = $$props;
  if (typeof marker === "function") {
    $$payload.out += "<!--[-->";
    marker($$payload, { id });
    $$payload.out += `<!---->`;
  } else if (marker) {
    $$payload.out += "<!--[1-->";
    Marker($$payload, spread_props([
      {
        id,
        type: typeof marker === "string" ? marker : void 0
      },
      typeof marker === "object" ? marker : null
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
}
function Spline($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  const ctx = getChartContext();
  let {
    data,
    pathData,
    x,
    y,
    motion,
    draw,
    curve,
    defined,
    fill,
    stroke,
    strokeWidth,
    fillOpacity,
    class: className,
    marker,
    markerStart: markerStartProp,
    markerMid: markerMidProp,
    markerEnd: markerEndProp,
    startContent,
    endContent,
    opacity,
    pathRef: pathRefProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let pathRef = void 0;
  const markerStart = markerStartProp ?? marker;
  const markerMid = markerMidProp ?? marker;
  const markerEnd = markerEndProp ?? marker;
  const markerStartId = markerStart ? createId("marker-start", uid) : "";
  const markerMidId = markerMid ? createId("marker-mid", uid) : "";
  const markerEndId = markerEnd ? createId("marker-end", uid) : "";
  function getScaleValue(data2, scale, accessor2) {
    let value = accessor2(data2);
    if (Array.isArray(value)) {
      value = max(value);
    }
    if (scale.domain().length) {
      return scale(value);
    } else {
      return value;
    }
  }
  const xAccessor = x ? accessor(x) : ctx.x;
  const yAccessor = y ? accessor(y) : ctx.y;
  const xOffset = isScaleBand(ctx.xScale) ? ctx.xScale.bandwidth() / 2 : 0;
  const yOffset = isScaleBand(ctx.yScale) ? ctx.yScale.bandwidth() / 2 : 0;
  const extractedTween = extractTweenConfig(motion);
  const tweenedOptions = extractedTween ? {
    type: extractedTween.type,
    options: {
      interpolate: interpolatePath,
      ...extractedTween.options
    }
  } : void 0;
  function defaultPathData() {
    if (!tweenedOptions) {
      return "";
    } else if (pathData) {
      return flattenPathData(pathData, Math.min(ctx.yScale(0) ?? ctx.yRange[0], ctx.yRange[0]));
    } else if (ctx.config.x) {
      const path2 = ctx.radial ? lineRadial().angle((d2) => ctx.xScale(xAccessor(d2)) + 0).radius((d2) => Math.min(ctx.yScale(0), ctx.yRange[0])) : line().x((d2) => ctx.xScale(xAccessor(d2)) + xOffset).y((d2) => Math.min(ctx.yScale(0), ctx.yRange[0]));
      path2.defined(defined ?? ((d2) => xAccessor(d2) != null && yAccessor(d2) != null));
      if (curve) path2.curve(curve);
      return path2(data ?? ctx.data);
    }
  }
  const d = (() => {
    const path2 = ctx.radial ? lineRadial().angle((d2) => getScaleValue(d2, ctx.xScale, xAccessor) + 0).radius((d2) => getScaleValue(d2, ctx.yScale, yAccessor) + yOffset) : line().x((d2) => getScaleValue(d2, ctx.xScale, xAccessor) + xOffset).y((d2) => getScaleValue(d2, ctx.yScale, yAccessor) + yOffset);
    path2.defined(defined ?? ((d2) => xAccessor(d2) != null && yAccessor(d2) != null));
    if (curve) path2.curve(curve);
    return pathData ?? path2(data ?? ctx.data) ?? "";
  })();
  const tweenedState = createMotion(defaultPathData(), () => d, tweenedOptions);
  const renderCtx = getRenderContext();
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        click: restProps.onclick,
        pointerenter: restProps.onpointerenter,
        pointermove: restProps.onpointermove,
        pointerleave: restProps.onpointerleave,
        pointerdown: restProps.onpointerdown,
        pointerover: restProps.onpointerover,
        pointerout: restProps.onpointerout,
        touchmove: restProps.ontouchmove
      }
    });
  }
  let startPoint = void 0;
  const endPointDuration = (() => {
    if (typeof draw === "object" && draw.duration !== void 0 && typeof draw.duration !== "function") {
      return draw.duration;
    }
    return 800;
  })();
  const endPoint = createControlledMotion(void 0, draw ? {
    type: "tween",
    duration: () => endPointDuration,
    easing: typeof draw === "object" && draw.easing ? draw.easing : cubicInOut,
    interpolate() {
      return (t) => {
        const totalLength = 0;
        const point = pathRef?.getPointAtLength(totalLength * t);
        return point;
      };
    }
  } : { type: "none" });
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      $$payload.out += `<path${spread_attributes(
        {
          d: tweenedState.current,
          ...restProps,
          class: clsx(cls(layerClass("spline-path"), !fill && "fill-none", !stroke && "stroke-surface-content", className)),
          fill,
          "fill-opacity": fillOpacity,
          stroke,
          "stroke-width": strokeWidth,
          opacity,
          "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
          "marker-mid": markerMidId ? `url(#${markerMidId})` : void 0,
          "marker-end": markerEndId ? `url(#${markerEndId})` : void 0
        },
        null,
        void 0,
        void 0,
        3
      )}></path>`;
      MarkerWrapper($$payload, { id: markerStartId, marker: markerStart });
      $$payload.out += `<!---->`;
      MarkerWrapper($$payload, { id: markerMidId, marker: markerMid });
      $$payload.out += `<!---->`;
      MarkerWrapper($$payload, { id: markerEndId, marker: markerEnd });
      $$payload.out += `<!---->`;
      if (startContent && startPoint) {
        $$payload.out += "<!--[-->";
        Group($$payload, {
          x: startPoint.x,
          y: startPoint.y,
          class: layerClass("spline-g-start"),
          children: ($$payload2) => {
            startContent($$payload2, {
              point: startPoint,
              value: {
                x: ctx.xScale?.invert?.(startPoint.x),
                y: ctx.yScale?.invert?.(startPoint.y)
              }
            });
            $$payload2.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
      if (endContent && endPoint.current) {
        $$payload.out += "<!--[-->";
        Group($$payload, {
          x: endPoint.current.x,
          y: endPoint.current.y,
          class: layerClass("spline-g-end"),
          children: ($$payload2) => {
            endContent($$payload2, {
              point: endPoint.current,
              value: {
                x: ctx.xScale?.invert?.(endPoint.current.x),
                y: ctx.yScale?.invert?.(endPoint.current.y)
              }
            });
            $$payload2.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { pathRef: pathRefProp });
  pop();
}
function Circle($$payload, $$props) {
  push();
  let {
    cx = 0,
    initialCx: initialCxProp,
    cy = 0,
    initialCy: initialCyProp,
    r = 1,
    initialR: initialRProp,
    motion,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    opacity,
    class: className,
    ref: refProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const initialCx = initialCxProp ?? cx;
  const initialCy = initialCyProp ?? cy;
  const initialR = initialRProp ?? r;
  const renderCtx = getRenderContext();
  const motionCx = createMotion(initialCx, () => cx, motion);
  const motionCy = createMotion(initialCy, () => cy, motion);
  const motionR = createMotion(initialR, () => r, motion);
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        click: restProps.onclick,
        pointerdown: restProps.onpointerdown,
        pointerenter: restProps.onpointerenter,
        pointermove: restProps.onpointermove,
        pointerleave: restProps.onpointerleave
      }
    });
  }
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<circle${spread_attributes(
      {
        cx: motionCx.current,
        cy: motionCy.current,
        r: motionR.current,
        fill,
        "fill-opacity": fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        opacity,
        class: clsx(cls(layerClass("circle"), fill == null && "fill-surface-content", className)),
        ...restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></circle>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
function CircleClipPath($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("clipPath-", uid),
    cx = 0,
    cy = 0,
    r,
    motion,
    disabled = false,
    ref: refProp = void 0,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let clip = function($$payload3) {
        Circle($$payload3, spread_props([
          { cx, cy, r, motion },
          extractLayerProps(restProps, "clip-path-circle"),
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
      };
      ClipPath($$payload2, {
        id,
        disabled,
        children,
        clip,
        $$slots: { clip: true }
      });
    }
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref: refProp });
  pop();
}
function Voronoi($$payload, $$props) {
  push();
  let {
    data,
    r,
    classes = {},
    onclick,
    onpointerenter,
    onpointerdown,
    onpointermove,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const geo = getGeoContext();
  const points = (data ?? ctx.flatData).map((d) => {
    const xValue = geo.projection ? ctx.x(d) : ctx.xGet(d);
    const yValue = geo.projection ? ctx.y(d) : ctx.yGet(d);
    const x = Array.isArray(xValue) ? min(xValue) : xValue;
    const y = Array.isArray(yValue) ? min(yValue) : yValue;
    let point;
    if (ctx.radial) {
      const radialPoint = pointRadial(x, y);
      point = [
        radialPoint[0] + ctx.width / 2,
        radialPoint[1] + ctx.height / 2
      ];
    } else {
      point = [x, y];
    }
    point.data = d;
    return point;
  });
  const boundWidth = Math.max(ctx.width, 0);
  const boundHeight = Math.max(ctx.height, 0);
  const disableClip = r === 0 || r == null || r === Infinity;
  Group($$payload, spread_props([
    restProps,
    {
      class: cls(layerClass("voronoi-g"), classes.root, className),
      children: ($$payload2) => {
        if (geo.projection) {
          $$payload2.out += "<!--[-->";
          const polygons = geoVoronoi().polygons(points);
          const each_array = ensure_array_like(polygons.features);
          $$payload2.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let feature = each_array[$$index];
            const point = r ? geo.projection?.(feature.properties.sitecoordinates) : null;
            CircleClipPath($$payload2, {
              cx: point?.[0],
              cy: point?.[1],
              r: r ?? 0,
              disabled: point == null || disableClip,
              children: ($$payload3) => {
                GeoPath($$payload3, {
                  geojson: feature,
                  class: cls(layerClass("voronoi-geo-path"), "fill-transparent stroke-transparent", classes.path),
                  onclick: (e) => onclick?.(e, { data: feature.properties.site.data, feature }),
                  onpointerenter: (e) => onpointerenter?.(e, { data: feature.properties.site.data, feature }),
                  onpointermove: (e) => onpointermove?.(e, { data: feature.properties.site.data, feature }),
                  onpointerdown: (e) => onpointerdown?.(e, { data: feature.properties.site.data, feature }),
                  onpointerleave,
                  ontouchmove: (e) => {
                    e.preventDefault();
                  }
                });
              },
              $$slots: { default: true }
            });
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
          const voronoi = Delaunay.from(points).voronoi([0, 0, boundWidth, boundHeight]);
          const each_array_1 = ensure_array_like(points);
          $$payload2.out += `<!--[-->`;
          for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
            let point = each_array_1[i];
            const pathData = voronoi.renderCell(i);
            if (pathData) {
              $$payload2.out += "<!--[-->";
              CircleClipPath($$payload2, {
                cx: point[0],
                cy: point[1],
                r: r ?? 0,
                disabled: disableClip,
                children: ($$payload3) => {
                  Spline($$payload3, {
                    pathData,
                    class: cls(layerClass("voronoi-path"), "fill-transparent stroke-transparent", classes.path),
                    onclick: (e) => onclick?.(e, { data: point.data, point }),
                    onpointerenter: (e) => onpointerenter?.(e, { data: point.data, point }),
                    onpointermove: (e) => onpointermove?.(e, { data: point.data, point }),
                    onpointerleave,
                    onpointerdown: (e) => onpointerdown?.(e, { data: point.data, point }),
                    ontouchmove: (e) => {
                      e.preventDefault();
                    }
                  });
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function quadtreeRects(quadtree2, showLeaves = true) {
  const rects = [];
  quadtree2.visit((node, x0, y0, x1, y1) => {
    if (showLeaves || Array.isArray(node)) {
      rects.push({ x: x0, y: y0, width: x1 - x0, height: y1 - y0 });
    }
  });
  return rects;
}
function asAny(x) {
  return x;
}
function handleBarTooltipPayload({ ctx, data, metaCtx }) {
  const seriesItems = metaCtx.stackSeries ? [...metaCtx.visibleSeries].reverse() : metaCtx.visibleSeries;
  const payload = seriesItems.map((s) => {
    const seriesTooltipData = s.data ? findRelatedData(s.data, data, ctx.x) : data;
    const valueAccessor = accessor(s.value ?? (s.data ? ctx.y : s.key));
    const label = metaCtx.orientation === "vertical" ? ctx.x(data) : ctx.y(data);
    const name = s.label ?? (s.key !== "default" ? s.key : "value");
    const value = seriesTooltipData ? valueAccessor(seriesTooltipData) : void 0;
    const color = s.color ?? ctx.cScale?.(ctx.c(data));
    return {
      ...s.data,
      chartType: "bar",
      color,
      label,
      name,
      value,
      valueAccessor,
      key: s.key,
      payload: data,
      rawSeriesData: s,
      formatter: format
    };
  });
  return payload;
}
function handleAreaTooltipPayload({ ctx, data, metaCtx }) {
  const seriesItems = metaCtx.stackSeries ? [...metaCtx.visibleSeries].reverse() : metaCtx.visibleSeries;
  const payload = seriesItems.map((s) => {
    const seriesTooltipData = s.data ? findRelatedData(s.data, data, ctx.x) : data;
    const valueAccessor = accessor(s.value ?? (s.data ? asAny(ctx.y) : s.key));
    const label = ctx.x(data);
    const name = s.label ?? (s.key !== "default" ? s.key : "value");
    const value = seriesTooltipData ? valueAccessor(seriesTooltipData) : void 0;
    const color = s.color ?? ctx.cScale?.(ctx.c(data));
    return {
      ...s.data,
      chartType: "area",
      color,
      label,
      name,
      value,
      valueAccessor,
      key: s.key,
      payload: data,
      rawSeriesData: s,
      formatter: format
    };
  });
  return payload;
}
function handleLineTooltipPayload({ ctx, data, metaCtx }) {
  return metaCtx.visibleSeries.map((s) => {
    const seriesTooltipData = s.data ? findRelatedData(s.data, data, ctx.x) : data;
    const label = ctx.x(data);
    const valueAccessor = accessor(s.value ?? (s.data ? asAny(ctx.y) : s.key));
    const name = s.label ?? (s.key !== "default" ? s.key : "value");
    const value = seriesTooltipData ? valueAccessor(seriesTooltipData) : void 0;
    const color = s.color ?? ctx.cScale?.(ctx.c(data));
    return {
      ...s.data,
      chartType: "line",
      color,
      label,
      name,
      value,
      valueAccessor,
      key: s.key,
      payload: data,
      rawSeriesData: s,
      formatter: format
    };
  });
}
function handlePieOrArcTooltipPayload({ ctx, data, metaCtx }) {
  const keyAccessor = accessor(metaCtx.key);
  const labelAccessor = accessor(metaCtx.label);
  const valueAccessor = accessor(metaCtx.value);
  const colorAccessor = accessor(metaCtx.color);
  return [
    {
      key: keyAccessor(data),
      label: labelAccessor(data) || keyAccessor(data),
      value: valueAccessor(data),
      color: colorAccessor(data) ?? ctx.cScale?.(ctx.c(data)),
      payload: data,
      chartType: "pie",
      labelAccessor,
      keyAccessor,
      valueAccessor,
      colorAccessor
    }
  ];
}
function handleScatterTooltipPayload({ ctx, data, metaCtx }) {
  return [{ payload: data, key: "" }];
}
const _TooltipMetaContext = new Context("TooltipMetaContext");
function getTooltipMetaContext() {
  return _TooltipMetaContext.getOr(null);
}
function setTooltipMetaContext(v) {
  return _TooltipMetaContext.set(v);
}
function getTooltipPayload({ ctx, tooltipData, metaCtx }) {
  if (!metaCtx)
    return [{ payload: tooltipData, key: "" }];
  switch (metaCtx.type) {
    case "bar":
      return handleBarTooltipPayload({ ctx, data: tooltipData, metaCtx });
    case "area":
      return handleAreaTooltipPayload({ ctx, data: tooltipData, metaCtx });
    case "line":
      return handleLineTooltipPayload({ ctx, data: tooltipData, metaCtx });
    case "pie":
    case "arc":
      return handlePieOrArcTooltipPayload({ ctx, data: tooltipData, metaCtx });
    case "scatter":
      return handleScatterTooltipPayload({ ctx, data: tooltipData, metaCtx });
  }
}
const _TooltipContext = new Context("TooltipContext");
function getTooltipContext() {
  return _TooltipContext.get();
}
function setTooltipContext(tooltip) {
  return _TooltipContext.set(tooltip);
}
function TooltipContext($$payload, $$props) {
  push();
  const ctx = getChartContext();
  const geoCtx = getGeoContext();
  let {
    ref: refProp = void 0,
    debug = false,
    findTooltipData = "closest",
    hideDelay = 0,
    locked = false,
    mode = "manual",
    onclick = () => {
    },
    radius = Infinity,
    raiseTarget = false,
    tooltipContext: tooltipContextProp = void 0,
    children
  } = $$props;
  let x = 0;
  let y = 0;
  let data = null;
  let payload = [];
  let isHoveringTooltipArea = false;
  let isHoveringTooltipContent = false;
  const metaCtx = getTooltipMetaContext();
  const tooltipContext = {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get data() {
      return data;
    },
    get payload() {
      return payload;
    },
    show: showTooltip,
    hide: hideTooltip,
    get mode() {
      return mode;
    },
    get isHoveringTooltipArea() {
      return isHoveringTooltipArea;
    },
    get isHoveringTooltipContent() {
      return isHoveringTooltipContent;
    },
    set isHoveringTooltipContent(value) {
      isHoveringTooltipContent = value;
    }
  };
  tooltipContextProp = tooltipContext;
  setTooltipContext(tooltipContext);
  let hideTimeoutId;
  const bisectX = bisector((d) => {
    const value = ctx.x(d);
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  }).left;
  const bisectY = bisector((d) => {
    const value = ctx.y(d);
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  }).left;
  function findData(previousValue, currentValue, valueAtPoint, accessor2) {
    switch (findTooltipData) {
      case "closest":
        if (currentValue === void 0) {
          return previousValue;
        } else if (previousValue === void 0) {
          return currentValue;
        } else {
          return Number(valueAtPoint) - Number(accessor2(previousValue)) > Number(accessor2(currentValue)) - Number(valueAtPoint) ? currentValue : previousValue;
        }
      case "left":
        return previousValue;
      case "right":
      default:
        return currentValue;
    }
  }
  function showTooltip(e, tooltipData) {
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
    }
    if (locked) {
      return;
    }
    const containerNode = e.target.closest(".lc-root-container");
    const point = localPoint(e, containerNode);
    if (tooltipData == null) {
      switch (mode) {
        case "bisect-x": {
          let xValueAtPoint;
          if (ctx.radial) {
            const { radians } = cartesianToPolar(point.x - ctx.width / 2, point.y - ctx.height / 2);
            xValueAtPoint = scaleInvert(ctx.xScale, radians);
          } else {
            xValueAtPoint = scaleInvert(ctx.xScale, point.x - ctx.padding.left);
          }
          const index = bisectX(ctx.flatData, xValueAtPoint, 1);
          const previousValue = ctx.flatData[index - 1];
          const currentValue = ctx.flatData[index];
          tooltipData = findData(previousValue, currentValue, xValueAtPoint, ctx.x);
          break;
        }
        case "bisect-y": {
          const yValueAtPoint = scaleInvert(ctx.yScale, point.y - ctx.padding.top);
          const index = bisectY(ctx.flatData, yValueAtPoint, 1);
          const previousValue = ctx.flatData[index - 1];
          const currentValue = ctx.flatData[index];
          tooltipData = findData(previousValue, currentValue, yValueAtPoint, ctx.y);
          break;
        }
        case "bisect-band": {
          const xValueAtPoint = scaleInvert(ctx.xScale, point.x);
          const yValueAtPoint = scaleInvert(ctx.yScale, point.y);
          if (isScaleBand(ctx.xScale)) {
            const bandData = ctx.flatData.filter((d) => ctx.x(d) === xValueAtPoint).sort(sortFunc(ctx.y));
            const index = bisectY(bandData, yValueAtPoint, 1);
            const previousValue = bandData[index - 1];
            const currentValue = bandData[index];
            tooltipData = findData(previousValue, currentValue, yValueAtPoint, ctx.y);
          } else if (isScaleBand(ctx.yScale)) {
            const bandData = ctx.flatData.filter((d) => ctx.y(d) === yValueAtPoint).sort(sortFunc(ctx.x));
            const index = bisectX(bandData, xValueAtPoint, 1);
            const previousValue = bandData[index - 1];
            const currentValue = bandData[index];
            tooltipData = findData(previousValue, currentValue, xValueAtPoint, ctx.x);
          } else ;
          break;
        }
        case "quadtree-x":
        case "quadtree-y":
        case "quadtree": {
          tooltipData = quadtree$1?.find(point.x - ctx.padding.left, point.y - ctx.padding.top, radius);
          break;
        }
      }
    }
    if (tooltipData) {
      if (raiseTarget) {
        raise(e.target);
      }
      const payloadData = getTooltipPayload({ ctx, tooltipData, metaCtx });
      x = point.x;
      y = point.y;
      data = tooltipData;
      payload = payloadData;
    } else {
      hideTooltip();
    }
  }
  function hideTooltip() {
    if (locked) {
      return;
    }
    isHoveringTooltipArea = false;
    hideTimeoutId = setTimeout(
      () => {
        if (!isHoveringTooltipArea && !isHoveringTooltipContent) {
          data = null;
          payload = [];
        }
      },
      hideDelay
    );
  }
  const quadtree$1 = (() => {
    if (["quadtree", "quadtree-x", "quadtree-y"].includes(mode)) {
      return quadtree().x((d) => {
        if (mode === "quadtree-y") {
          return 0;
        }
        if (geoCtx.projection) {
          const lat = ctx.x(d);
          const long = ctx.y(d);
          const geoValue = geoCtx.projection([lat, long]) ?? [0, 0];
          return geoValue[0];
        }
        const value = ctx.xGet(d);
        if (Array.isArray(value)) {
          return min(value);
        } else {
          return value;
        }
      }).y((d) => {
        if (mode === "quadtree-x") {
          return 0;
        }
        if (geoCtx.projection) {
          const lat = ctx.x(d);
          const long = ctx.y(d);
          const geoValue = geoCtx.projection([lat, long]) ?? [0, 0];
          return geoValue[1];
        }
        const value = ctx.yGet(d);
        if (Array.isArray(value)) {
          return min(value);
        } else {
          return value;
        }
      }).addAll(ctx.flatData);
    }
  })();
  const rects = (() => {
    if (mode === "bounds" || mode === "band") {
      return ctx.flatData.map((d) => {
        const xValue = ctx.xGet(d);
        const yValue = ctx.yGet(d);
        const x2 = Array.isArray(xValue) ? xValue[0] : xValue;
        const y2 = Array.isArray(yValue) ? yValue[0] : yValue;
        const xOffset = isScaleBand(ctx.xScale) ? ctx.xScale.padding() * ctx.xScale.step() / 2 : 0;
        const yOffset = isScaleBand(ctx.yScale) ? ctx.yScale.padding() * ctx.yScale.step() / 2 : 0;
        const fullWidth = max(ctx.xRange) - min(ctx.xRange);
        const fullHeight = max(ctx.yRange) - min(ctx.yRange);
        if (mode === "band") {
          return {
            x: isScaleBand(ctx.xScale) ? x2 - xOffset : min(ctx.xRange),
            y: isScaleBand(ctx.yScale) ? y2 - yOffset : min(ctx.yRange),
            width: isScaleBand(ctx.xScale) ? ctx.xScale.step() : fullWidth,
            height: isScaleBand(ctx.yScale) ? ctx.yScale.step() : fullHeight,
            data: d
          };
        } else if (mode === "bounds") {
          return {
            x: isScaleBand(ctx.xScale) || Array.isArray(xValue) ? x2 - xOffset : min(ctx.xRange),
            // y: isScaleBand($yScale) || Array.isArray(yValue) ? y - yOffset : min($yRange),
            y: y2 - yOffset,
            width: Array.isArray(xValue) ? xValue[1] - xValue[0] : isScaleBand(ctx.xScale) ? ctx.xScale.step() : min(ctx.xRange) + x2,
            height: Array.isArray(yValue) ? yValue[1] - yValue[0] : isScaleBand(ctx.yScale) ? ctx.yScale.step() : max(ctx.yRange) - y2,
            data: d
          };
        }
      }).filter((x2) => x2 !== void 0).sort(sortFunc("x"));
    }
    return [];
  })();
  const triggerPointerEvents = [
    "bisect-x",
    "bisect-y",
    "bisect-band",
    "quadtree",
    "quadtree-x",
    "quadtree-y"
  ].includes(mode);
  $$payload.out += `<div${attr_class(clsx(cls(layerClass("tooltip-context"), "absolute", debug && triggerPointerEvents && "bg-danger/10 outline outline-danger")))}${attr_style("", {
    top: `${stringify(ctx.padding.top)}px`,
    left: `${stringify(ctx.padding.left)}px`,
    width: `${stringify(ctx.width)}px`,
    height: `${stringify(ctx.height)}px`
  })}><div${attr_class(clsx(cls(layerClass("tooltip-context-container"), "absolute")))}${attr_style("", {
    top: `-${stringify(ctx.padding.top ?? 0)}px`,
    left: `-${stringify(ctx.padding.left ?? 0)}px`,
    width: `${stringify(ctx.containerWidth)}px`,
    height: `${stringify(ctx.containerHeight)}px`
  })}>`;
  children?.($$payload, { tooltipContext });
  $$payload.out += `<!----> `;
  if (mode === "voronoi") {
    $$payload.out += "<!--[-->";
    Svg($$payload, {
      children: ($$payload2) => {
        Voronoi($$payload2, {
          r: radius,
          onpointerenter: (e, { data: data2 }) => {
            showTooltip(e, data2);
          },
          onpointermove: (e, { data: data2 }) => {
            showTooltip(e, data2);
          },
          onpointerleave: () => hideTooltip(),
          onpointerdown: (e) => {
            if (e.target?.hasPointerCapture(e.pointerId)) {
              e.target.releasePointerCapture(e.pointerId);
            }
          },
          onclick: (e, { data: data2 }) => {
            onclick(e, { data: data2 });
          },
          classes: {
            path: cls(debug && "fill-danger/10 stroke-danger")
          }
        });
      },
      $$slots: { default: true }
    });
  } else if (mode === "bounds" || mode === "band") {
    $$payload.out += "<!--[1-->";
    Svg($$payload, {
      center: ctx.radial,
      children: ($$payload2) => {
        const each_array = ensure_array_like(rects);
        $$payload2.out += `<g${attr_class(clsx(layerClass("tooltip-rects-g")))}><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let rect = each_array[$$index];
          if (ctx.radial) {
            $$payload2.out += "<!--[-->";
            Arc($$payload2, {
              innerRadius: rect.y,
              outerRadius: rect.y + rect.height,
              startAngle: rect.x,
              endAngle: rect.x + rect.width,
              class: cls(layerClass("tooltip-rect"), debug ? "fill-danger/10 stroke-danger" : "fill-transparent"),
              onpointerenter: (e) => showTooltip(e, rect?.data),
              onpointermove: (e) => showTooltip(e, rect?.data),
              onpointerleave: () => hideTooltip(),
              onpointerdown: (e) => {
                const target = e.target;
                if (target?.hasPointerCapture(e.pointerId)) {
                  target.releasePointerCapture(e.pointerId);
                }
              },
              onclick: (e) => {
                onclick(e, { data: rect?.data });
              }
            });
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<rect${attr("x", rect?.x)}${attr("y", rect?.y)}${attr("width", rect?.width)}${attr("height", rect?.height)}${attr_class(clsx(cls(layerClass("tooltip-rect"), debug ? "fill-danger/10 stroke-danger" : "fill-transparent")))}></rect>`;
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]--></g>`;
      },
      $$slots: { default: true }
    });
  } else if (["quadtree", "quadtree-x", "quadtree-y"].includes(mode) && debug) {
    $$payload.out += "<!--[2-->";
    Svg($$payload, {
      pointerEvents: false,
      children: ($$payload2) => {
        ChartClipPath($$payload2, {
          children: ($$payload3) => {
            $$payload3.out += `<g${attr_class(clsx(layerClass("tooltip-quadtree-g")))}>`;
            if (quadtree$1) {
              $$payload3.out += "<!--[-->";
              const each_array_1 = ensure_array_like(quadtreeRects(quadtree$1, false));
              $$payload3.out += `<!--[-->`;
              for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                let rect = each_array_1[$$index_1];
                $$payload3.out += `<rect${attr("x", rect.x)}${attr("y", rect.y)}${attr("width", rect.width)}${attr("height", rect.height)}${attr_class(clsx(cls(layerClass("tooltip-quadtree-rect"), debug ? "fill-danger/10 stroke-danger" : "fill-transparent")))}></rect>`;
              }
              $$payload3.out += `<!--]-->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></g>`;
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, {
    ref: refProp,
    tooltipContext: tooltipContextProp
  });
  pop();
}
const _BrushContext = new Context("BrushContext");
function setBrushContext(brush) {
  return _BrushContext.set(brush);
}
function BrushContext($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    brushContext: brushContextProp = void 0,
    axis = "x",
    handleSize = 5,
    resetOnEnd = false,
    ignoreResetClick = false,
    xDomain,
    yDomain,
    mode = "integrated",
    disabled = false,
    range: range2 = {},
    handle = {},
    classes = {},
    onBrushEnd = () => {
    },
    onBrushStart = () => {
    },
    onChange = () => {
    },
    onReset = () => {
    },
    children
  } = $$props;
  if (xDomain === void 0) {
    xDomain = ctx.xScale.domain();
  }
  if (yDomain === void 0) {
    yDomain = ctx.yScale.domain();
  }
  ctx.config.xDomain;
  ctx.config.yDomain;
  const xDomainMinMax = extent(ctx.xScale.domain());
  xDomainMinMax[0];
  xDomainMinMax[1];
  const yDomainMinMax = extent(ctx.yScale.domain());
  yDomainMinMax[0];
  yDomainMinMax[1];
  const top = ctx.yScale(yDomain?.[1]);
  const bottom = ctx.yScale(yDomain?.[0]);
  const left = ctx.xScale(xDomain?.[0]);
  const right = ctx.xScale(xDomain?.[1]);
  const _range = {
    x: axis === "both" || axis === "x" ? left : 0,
    y: axis === "both" || axis === "y" ? top : 0,
    width: axis === "both" || axis === "x" ? right - left : ctx.width,
    height: axis === "both" || axis === "y" ? bottom - top : ctx.height
  };
  let isActive = false;
  const brushContext = {
    get xDomain() {
      return xDomain;
    },
    set xDomain(v) {
      xDomain = v;
    },
    get yDomain() {
      return yDomain;
    },
    set yDomain(v) {
      yDomain = v;
    },
    get isActive() {
      return isActive;
    },
    set isActive(v) {
      isActive = v;
    },
    get range() {
      return _range;
    },
    get handleSize() {
      return handleSize;
    }
  };
  brushContextProp = brushContext;
  setBrushContext(brushContext);
  new Logger("BrushContext");
  if (disabled) {
    $$payload.out += "<!--[-->";
    children?.($$payload, { brushContext });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    const handleClass = layerClass("brush-handle");
    $$payload.out += `<div${attr_class(clsx(cls(layerClass("brush-context"), "absolute touch-none")))}${attr_style("", {
      top: `${stringify(ctx.padding.top)}px`,
      left: `${stringify(ctx.padding.left)}px`,
      width: `${stringify(ctx.width)}px`,
      height: `${stringify(ctx.height)}px`
    })}><div${attr_class(clsx(cls(layerClass("brush-container"), "absolute")))}${attr_style("", {
      top: `-${stringify(ctx.padding.top ?? 0)}px`,
      left: `-${stringify(ctx.padding.left ?? 0)}px`,
      width: `${stringify(ctx.containerWidth)}px`,
      height: `${stringify(ctx.containerHeight)}px`
    })}>`;
    children?.($$payload, { brushContext });
    $$payload.out += `<!----></div> `;
    if (brushContext.isActive) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${spread_attributes(
        {
          ...range2,
          class: clsx(cls(layerClass("brush-range"), "absolute bg-surface-content/10 cursor-move select-none", "z-10", classes.range, range2?.class))
        },
        null,
        void 0,
        {
          left: `${stringify(_range.x)}px`,
          top: `${stringify(_range.y)}px`,
          width: `${stringify(_range.width)}px`,
          height: `${stringify(_range.height)}px`
        }
      )}></div> `;
      if (axis === "both" || axis === "y") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${spread_attributes(
          {
            ...handle,
            "data-position": "top",
            class: clsx(cls(handleClass, "cursor-ns-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(_range.width)}px`,
            height: `${stringify(handleSize)}px`
          }
        )}></div> <div${spread_attributes(
          {
            ...handle,
            "data-position": "bottom",
            class: clsx(cls(handleClass, "handle bottom", "cursor-ns-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(bottom - handleSize)}px`,
            width: `${stringify(_range.width)}px`,
            height: `${stringify(handleSize)}px`
          }
        )}></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (axis === "both" || axis === "x") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${spread_attributes(
          {
            ...handle,
            "data-position": "left",
            class: clsx(cls(handleClass, "cursor-ew-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(handleSize)}px`,
            height: `${stringify(_range.height)}px`
          }
        )}></div> <div${spread_attributes(
          {
            ...handle,
            "data-position": "right",
            class: clsx(cls(handleClass, "cursor-ew-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(right - handleSize + 1)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(handleSize)}px`,
            height: `${stringify(_range.height)}px`
          }
        )}></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { brushContext: brushContextProp });
  pop();
}
const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
const _ChartContext = new Context("ChartContext");
function getChartContext() {
  return _ChartContext.getOr({});
}
function setChartContext(context) {
  return _ChartContext.set(context);
}
const _RenderContext = new Context("RenderContext");
function getRenderContext() {
  return _RenderContext.get();
}
function setRenderContext(context) {
  return _RenderContext.set(context);
}
function Chart($$payload, $$props) {
  push();
  let {
    ssr = false,
    pointerEvents = true,
    position = "relative",
    percentRange = false,
    ref: refProp = void 0,
    x: xProp,
    y: yProp,
    z: zProp,
    r: rProp,
    data = [],
    xDomain: xDomainProp,
    yDomain: yDomainProp,
    zDomain: zDomainProp,
    rDomain: rDomainProp,
    xNice = false,
    yNice = false,
    zNice = false,
    rNice = false,
    xPadding,
    yPadding,
    zPadding,
    rPadding,
    // @ts-expect-error shh
    xScale: xScaleProp = scaleLinear(),
    // @ts-expect-error shh
    yScale: yScaleProp = scaleLinear(),
    zScale: zScaleProp = scaleLinear(),
    rScale: rScaleProp = scaleSqrt(),
    flatData: flatDataProp,
    padding: paddingProp = {},
    verbose = true,
    debug = false,
    extents: extentsProp = {},
    xDomainSort = false,
    yDomainSort = false,
    zDomainSort = false,
    rDomainSort = false,
    xReverse = false,
    zReverse = false,
    rReverse = false,
    yRange: _yRangeProp,
    zRange: zRangeProp,
    rRange: rRangeProp,
    xBaseline = null,
    yBaseline = null,
    meta = {},
    children: _children,
    radial = false,
    xRange: _xRangeProp,
    x1: x1Prop,
    x1Domain: x1DomainProp,
    x1Range: x1RangeProp,
    x1Scale: x1ScaleProp,
    y1: y1Prop,
    y1Domain: y1DomainProp,
    y1Range: y1RangeProp,
    y1Scale: y1ScaleProp,
    c: cProp,
    cScale: cScaleProp,
    cDomain: cDomainProp,
    cRange: cRangeProp,
    onResize,
    geo,
    context: contextProp = void 0,
    tooltip,
    transform,
    onTransform,
    ondragend,
    ondragstart,
    brush
  } = $$props;
  let ref = void 0;
  const xRangeProp = _xRangeProp ? _xRangeProp : radial ? [0, 2 * Math.PI] : void 0;
  let containerWidth = 100;
  let containerHeight = 100;
  useDebounce(printDebug, 200);
  const _xDomain = (() => {
    if (xDomainProp !== void 0) return xDomainProp;
    if (xBaseline != null && Array.isArray(data)) {
      const xValues = data.flatMap(accessor(xProp));
      return [
        min([xBaseline, ...xValues]),
        max([xBaseline, ...xValues])
      ];
    }
  })();
  const _yDomain = (() => {
    if (yDomainProp !== void 0) return yDomainProp;
    if (yBaseline != null && Array.isArray(data)) {
      const yValues = data.flatMap(accessor(yProp));
      return [
        min([yBaseline, ...yValues]),
        max([yBaseline, ...yValues])
      ];
    }
  })();
  const yRangeProp = _yRangeProp ?? (radial ? ({ height: height2 }) => [0, height2 / 2] : void 0);
  const yReverse = yScaleProp ? !isScaleBand(yScaleProp) : true;
  const x = makeAccessor(xProp);
  const y = makeAccessor(yProp);
  const z = makeAccessor(zProp);
  const r = makeAccessor(rProp);
  const c = accessor(cProp);
  const x1 = accessor(x1Prop);
  const y1 = accessor(y1Prop);
  const flatData = flatDataProp ?? data;
  const filteredExtents = filterObject(snapshot(extentsProp));
  const activeGetters = { x, y, z, r };
  const padding = (() => {
    if (typeof paddingProp === "number") {
      return {
        ...defaultPadding,
        top: paddingProp,
        right: paddingProp,
        bottom: paddingProp,
        left: paddingProp
      };
    }
    return { ...defaultPadding, ...paddingProp };
  })();
  const box = (() => {
    const top = padding.top;
    const right = containerWidth - padding.right;
    const bottom = containerHeight - padding.bottom;
    const left = padding.left;
    const width2 = right - left;
    const height2 = bottom - top;
    return { top, left, bottom, right, width: width2, height: height2 };
  })();
  const width = box.width;
  const height = box.height;
  const extents = (() => {
    const scaleLookup = {
      x: { scale: xScaleProp, sort: xDomainSort },
      y: { scale: yScaleProp, sort: yDomainSort },
      z: { scale: zScaleProp, sort: zDomainSort },
      r: { scale: rScaleProp, sort: rDomainSort }
    };
    const getters = filterObject(activeGetters, filteredExtents);
    const activeScales = Object.fromEntries(Object.keys(getters).map((k) => [k, scaleLookup[k]]));
    if (Object.keys(getters).length > 0) {
      const calculatedExtents = calcScaleExtents(flatData, getters, activeScales);
      return { ...calculatedExtents, ...filteredExtents };
    } else {
      return {};
    }
  })();
  const xDomain = calcDomain("x", extents, _xDomain);
  const yDomain = calcDomain("y", extents, _yDomain);
  const zDomain = calcDomain("z", extents, zDomainProp);
  const rDomain = calcDomain("r", extents, rDomainProp);
  const x1Domain = x1DomainProp ?? extent(chartDataArray(data), x1);
  const y1Domain = y1DomainProp ?? extent(chartDataArray(data), y1);
  const cDomain = cDomainProp ?? unique(chartDataArray(data).map(c));
  const snappedPadding = snapshot(xPadding);
  snapshot(extents);
  const xScale = createChartScale("x", {
    scale: xScaleProp,
    domain: xDomain,
    padding: snappedPadding,
    nice: xNice,
    reverse: xReverse,
    percentRange,
    range: xRangeProp,
    height,
    width
  });
  const xGet = createGetter(x, xScale);
  const yScale = createChartScale("y", {
    scale: yScaleProp,
    domain: yDomain,
    padding: yPadding,
    nice: yNice,
    reverse: yReverse,
    percentRange,
    range: yRangeProp,
    height,
    width
  });
  const yGet = createGetter(y, yScale);
  const zScale = createChartScale("z", {
    scale: zScaleProp,
    domain: zDomain,
    padding: zPadding,
    nice: zNice,
    reverse: zReverse,
    percentRange,
    range: zRangeProp,
    height,
    width
  });
  const zGet = createGetter(z, zScale);
  const rScale = createChartScale("r", {
    scale: rScaleProp,
    domain: rDomain,
    padding: rPadding,
    nice: rNice,
    reverse: rReverse,
    percentRange,
    range: rRangeProp,
    height,
    width
  });
  const rGet = createGetter(r, rScale);
  const x1Scale = x1ScaleProp && x1RangeProp ? createScale(x1ScaleProp, x1Domain, x1RangeProp, { xScale, width, height }) : null;
  const x1Get = createGetter(x1, x1Scale);
  const y1Scale = y1ScaleProp && y1RangeProp ? createScale(y1ScaleProp, y1Domain, y1RangeProp, { yScale, width, height }) : null;
  const y1Get = createGetter(y1, y1Scale);
  const cScale = cRangeProp ? createScale(cScaleProp ?? scaleOrdinal(), cDomain, cRangeProp, { width, height }) : null;
  const cGet = (d) => cScale?.(c(d));
  const xDomainPossiblyNice = xScale.domain();
  const yDomainPossiblyNice = yScale.domain();
  const zDomainPossiblyNice = zScale.domain();
  const rDomainPossiblyNice = rScale.domain();
  const xRange = getRange(xScale);
  const yRange = getRange(yScale);
  const zRange = getRange(zScale);
  const rRange = getRange(rScale);
  const aspectRatio = width / height;
  const config = {
    x: xProp,
    y: yProp,
    z: zProp,
    r: rProp,
    c: cProp,
    x1: x1Prop,
    y1: y1Prop,
    xDomain: _xDomain,
    yDomain: _yDomain,
    zDomain: zDomainProp,
    rDomain: rDomainProp,
    x1Domain: x1DomainProp,
    y1Domain: y1DomainProp,
    cDomain: cDomainProp,
    xRange: _xRangeProp,
    yRange: _yRangeProp,
    zRange: zRangeProp,
    rRange: rRangeProp,
    cRange: cRangeProp,
    x1Range: x1RangeProp,
    y1Range: y1RangeProp
  };
  let geoContext = null;
  let transformContext = null;
  let tooltipContext = null;
  let brushContext = null;
  const context = {
    get activeGetters() {
      return activeGetters;
    },
    get config() {
      return config;
    },
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get percentRange() {
      return percentRange;
    },
    get aspectRatio() {
      return aspectRatio;
    },
    get containerWidth() {
      return containerWidth;
    },
    get containerHeight() {
      return containerHeight;
    },
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get z() {
      return z;
    },
    get r() {
      return r;
    },
    get c() {
      return c;
    },
    get x1() {
      return x1;
    },
    get y1() {
      return y1;
    },
    get data() {
      return data;
    },
    get xNice() {
      return xNice;
    },
    get yNice() {
      return yNice;
    },
    get zNice() {
      return zNice;
    },
    get rNice() {
      return rNice;
    },
    get xDomainSort() {
      return xDomainSort;
    },
    get yDomainSort() {
      return yDomainSort;
    },
    get zDomainSort() {
      return zDomainSort;
    },
    get rDomainSort() {
      return rDomainSort;
    },
    get xReverse() {
      return xReverse;
    },
    get yReverse() {
      return yReverse;
    },
    get zReverse() {
      return zReverse;
    },
    get rReverse() {
      return rReverse;
    },
    get xPadding() {
      return xPadding;
    },
    get yPadding() {
      return yPadding;
    },
    get zPadding() {
      return zPadding;
    },
    get rPadding() {
      return rPadding;
    },
    get padding() {
      return padding;
    },
    get flatData() {
      return flatData;
    },
    get extents() {
      return extents;
    },
    get xDomain() {
      return xDomainPossiblyNice;
    },
    get yDomain() {
      return yDomainPossiblyNice;
    },
    get zDomain() {
      return zDomainPossiblyNice;
    },
    get rDomain() {
      return rDomainPossiblyNice;
    },
    get cDomain() {
      return cDomain;
    },
    get x1Domain() {
      return x1Domain;
    },
    get y1Domain() {
      return y1Domain;
    },
    get xRange() {
      return xRange;
    },
    get yRange() {
      return yRange;
    },
    get zRange() {
      return zRange;
    },
    get rRange() {
      return rRange;
    },
    get cRange() {
      return cRangeProp;
    },
    get x1Range() {
      return x1RangeProp;
    },
    get y1Range() {
      return y1RangeProp;
    },
    get meta() {
      return meta;
    },
    set meta(v) {
      meta = v;
    },
    get xScale() {
      return xScale;
    },
    get yScale() {
      return yScale;
    },
    get zScale() {
      return zScale;
    },
    get rScale() {
      return rScale;
    },
    get yGet() {
      return yGet;
    },
    get xGet() {
      return xGet;
    },
    get zGet() {
      return zGet;
    },
    get rGet() {
      return rGet;
    },
    get cGet() {
      return cGet;
    },
    get x1Get() {
      return x1Get;
    },
    get y1Get() {
      return y1Get;
    },
    get cScale() {
      return cScale;
    },
    get x1Scale() {
      return x1Scale;
    },
    get y1Scale() {
      return y1Scale;
    },
    get radial() {
      return radial;
    },
    get containerRef() {
      return ref;
    },
    get geo() {
      return geoContext;
    },
    get transform() {
      return transformContext;
    },
    get tooltip() {
      return tooltipContext;
    },
    get brush() {
      return brushContext;
    }
  };
  contextProp = context;
  setChartContext(context);
  const initialTransform = geo?.applyTransform?.includes("translate") && geo?.fitGeojson && geo?.projection ? geoFitObjectTransform(geo.projection(), [width, height], geo.fitGeojson) : void 0;
  const processTranslate = (() => {
    if (!geo) return void 0;
    return (x2, y2, deltaX, deltaY) => {
      if (geo.applyTransform?.includes("rotate") && geoContext?.projection) {
        const projectionScale = geoContext.projection.scale() ?? 0;
        const sensitivity = 75;
        return {
          x: x2 + deltaX * (sensitivity / projectionScale),
          y: y2 + deltaY * (sensitivity / projectionScale) * -1
        };
      } else {
        return { x: x2 + deltaX, y: y2 + deltaY };
      }
    };
  })();
  const brushProps = typeof brush === "object" ? brush : { disabled: !brush };
  const tooltipProps = typeof tooltip === "object" ? tooltip : {};
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (ssr === true || typeof window !== "undefined") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${attr_class(clsx(layerClass("root-container")), "svelte-1j8sovf")}${attr_style("", {
        position,
        top: position === "absolute" ? "0" : null,
        right: position === "absolute" ? "0" : null,
        bottom: position === "absolute" ? "0" : null,
        left: position === "absolute" ? "0" : null,
        "pointer-events": pointerEvents === false ? "none" : null
      })}><!---->`;
      {
        TransformContext($$payload2, spread_props([
          {
            mode: transform?.mode ?? geo?.applyTransform?.length ? "manual" : "none",
            initialTranslate: initialTransform?.translate,
            initialScale: initialTransform?.scale,
            processTranslate
          },
          transform,
          {
            ondragstart,
            onTransform,
            ondragend,
            get transformContext() {
              return transformContext;
            },
            set transformContext($$value) {
              transformContext = $$value;
              $$settled = false;
            },
            children: ($$payload3) => {
              GeoContext($$payload3, spread_props([
                geo,
                {
                  get geoContext() {
                    return geoContext;
                  },
                  set geoContext($$value) {
                    geoContext = $$value;
                    $$settled = false;
                  },
                  children: ($$payload4) => {
                    BrushContext($$payload4, spread_props([
                      brushProps,
                      {
                        get brushContext() {
                          return brushContext;
                        },
                        set brushContext($$value) {
                          brushContext = $$value;
                          $$settled = false;
                        },
                        children: ($$payload5) => {
                          TooltipContext($$payload5, spread_props([
                            tooltipProps,
                            {
                              get tooltipContext() {
                                return tooltipContext;
                              },
                              set tooltipContext($$value) {
                                tooltipContext = $$value;
                                $$settled = false;
                              },
                              children: ($$payload6) => {
                                _children?.($$payload6, { context });
                                $$payload6.out += `<!---->`;
                              },
                              $$slots: { default: true }
                            }
                          ]));
                        },
                        $$slots: { default: true }
                      }
                    ]));
                  },
                  $$slots: { default: true }
                }
              ]));
            },
            $$slots: { default: true }
          }
        ]));
      }
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref: refProp, context: contextProp });
  pop();
}
function extractOutsideArc(arcPath) {
  const matches = arcPath.match(/(^.+?)(L|Z)/);
  if (!matches || !matches[1]) return arcPath;
  return matches[1];
}
function normalizeAngle(angle) {
  return (angle % 360 + 360) % 360;
}
function getArcPathMiddle(props) {
  const centerRadius = (props.innerRadius() + props.outerRadius()) / 2;
  const cornerAngleOffset = (() => {
    if (props.cornerRadius() <= 0 || centerRadius <= 0) return 0;
    const effectiveCornerRadius = Math.min(props.cornerRadius(), centerRadius);
    return effectiveCornerRadius * 0.5 / centerRadius;
  })();
  const effectiveStartAngle = (() => {
    if (props.invertCorner()) {
      return props.startAngle() - cornerAngleOffset;
    }
    return props.startAngle() + cornerAngleOffset;
  })();
  const effectiveEndAngle = (() => {
    if (props.invertCorner()) {
      return props.endAngle() + cornerAngleOffset;
    }
    return props.endAngle() - cornerAngleOffset;
  })();
  const path2 = extractOutsideArc(arc().outerRadius(centerRadius).innerRadius(centerRadius - 0.5).startAngle(effectiveStartAngle).endAngle(effectiveEndAngle)() ?? "");
  return {
    get current() {
      return path2;
    }
  };
}
function getArcPathInner(props) {
  const cornerAngleOffset = (() => {
    if (props.cornerRadius() <= 0 || props.innerRadius() <= 0) return 0;
    if (props.cornerRadius() >= props.innerRadius()) return Math.PI / 4;
    return props.cornerRadius() * 0.5 / props.innerRadius();
  })();
  const effectiveStartAngle = (() => {
    if (props.invertCorner()) {
      return props.startAngle() - cornerAngleOffset;
    }
    return props.startAngle() + cornerAngleOffset;
  })();
  const effectiveEndAngle = (() => {
    if (props.invertCorner()) {
      return props.endAngle() + cornerAngleOffset;
    }
    return props.endAngle() - cornerAngleOffset;
  })();
  const path2 = extractOutsideArc(arc().innerRadius(props.innerRadius()).outerRadius(props.innerRadius() + 0.5).startAngle(effectiveStartAngle).endAngle(effectiveEndAngle)() ?? "");
  return {
    get current() {
      return path2;
    }
  };
}
function getArcPathOuter(props) {
  const cornerAngleOffset = (() => {
    if (props.cornerRadius() <= 0 || props.outerRadius() <= 0) return 0;
    return props.cornerRadius() * 0.5 / props.outerRadius();
  })();
  const effectiveStartAngle = (() => {
    if (props.invertCorner()) {
      return props.startAngle() - cornerAngleOffset;
    }
    return props.startAngle() + cornerAngleOffset;
  })();
  const effectiveEndAngle = (() => {
    if (props.invertCorner()) {
      return props.endAngle() + cornerAngleOffset;
    }
    return props.endAngle() - cornerAngleOffset;
  })();
  const path2 = extractOutsideArc(arc().innerRadius(props.outerRadius() - 0.5).outerRadius(props.outerRadius()).startAngle(effectiveStartAngle).endAngle(effectiveEndAngle)() ?? "");
  return {
    get current() {
      return path2;
    }
  };
}
function pointOnCircle(radius, angle) {
  const adjustedAngle = angle - Math.PI / 2;
  return [
    radius * Math.cos(adjustedAngle),
    radius * Math.sin(adjustedAngle)
  ];
}
function createArcTextProps(props, opts = {}, position) {
  const effectiveStartAngleRadians = (() => {
    const start = props.startAngle();
    const end = props.endAngle();
    const offset = opts.startOffset;
    if (offset) {
      try {
        const percentage = parseFloat(offset.slice(0, -1)) / 100;
        if (!isNaN(percentage) && percentage >= 0 && percentage <= 1) {
          const span = end - start;
          return start + span * percentage;
        } else {
          console.warn("Invalid percentage for startOffset:", offset);
        }
      } catch (e) {
        console.warn("Could not parse startOffset percentage:", offset, e);
      }
    }
    return start;
  })();
  const effectiveStartDegrees = radiansToDegrees(effectiveStartAngleRadians);
  const normalizedStartDegrees = normalizeAngle(effectiveStartDegrees);
  const startDegrees = radiansToDegrees(props.startAngle());
  const endDegrees = radiansToDegrees(props.endAngle());
  const isClockwise = startDegrees < endDegrees;
  const isTopCw = isClockwise && (normalizedStartDegrees >= 270 || normalizedStartDegrees <= 90);
  const isTopCcw = !isClockwise && (normalizedStartDegrees > 270 || normalizedStartDegrees <= 90);
  const isBottomCw = isClockwise && normalizedStartDegrees < 270 && normalizedStartDegrees >= 90;
  const isBottomCcw = !isClockwise && normalizedStartDegrees <= 270 && normalizedStartDegrees > 90;
  const reverseText = isTopCcw || isBottomCw;
  const pathGenProps = {
    ...props,
    startAngle: () => reverseText ? props.endAngle() : props.startAngle(),
    endAngle: () => reverseText ? props.startAngle() : props.endAngle(),
    invertCorner: () => isBottomCw || isBottomCcw
  };
  const innerPath = getArcPathInner(pathGenProps);
  const middlePath = getArcPathMiddle(pathGenProps);
  const outerPath = getArcPathOuter(pathGenProps);
  const innerDominantBaseline = (() => {
    if (isBottomCw || isBottomCcw) return "auto";
    if (isTopCw || isTopCcw) return "hanging";
    return "auto";
  })();
  const outerDominantBaseline = (() => {
    if (isBottomCw || isBottomCcw) return "hanging";
    return void 0;
  })();
  const sharedProps = (() => {
    if (reverseText) {
      return {
        startOffset: opts.startOffset ?? "100%",
        textAnchor: "end"
      };
    }
    return { startOffset: opts.startOffset ?? void 0 };
  })();
  const radialPositionProps = (() => {
    if (position !== "outer-radial") return {};
    const midAngle = (props.startAngle() + props.endAngle()) / 2;
    const basePadding = opts.radialOffset ?? opts.outerPadding ?? 23;
    const midAngleDegrees = normalizeAngle(radiansToDegrees(midAngle));
    let textAnchor = "middle";
    let effectivePadding = basePadding;
    const isBottomZone = midAngleDegrees > 45 && midAngleDegrees < 135;
    const isTopZone = midAngleDegrees > 225 && midAngleDegrees < 315;
    const isRightZone = midAngleDegrees <= 45 || midAngleDegrees >= 315;
    const isLeftZone = midAngleDegrees >= 135 && midAngleDegrees <= 225;
    const positionRadius = props.outerRadius() + effectivePadding;
    const [x, y] = pointOnCircle(positionRadius, midAngle);
    if (isRightZone) {
      textAnchor = "start";
      if (midAngleDegrees > 350 || midAngleDegrees < 10) textAnchor = "start";
    } else if (isLeftZone) {
      textAnchor = "end";
      if (midAngleDegrees > 170 && midAngleDegrees < 190) textAnchor = "end";
    } else if (isBottomZone) {
      textAnchor = "middle";
    } else if (isTopZone) {
      textAnchor = "middle";
    }
    return {
      x,
      y,
      textAnchor,
      dominantBaseline: "middle"
    };
  })();
  const current = (() => {
    if (position === "inner") {
      return {
        path: innerPath.current,
        ...sharedProps,
        dominantBaseline: innerDominantBaseline
      };
    } else if (position === "outer") {
      return {
        path: outerPath.current,
        ...sharedProps,
        dominantBaseline: outerDominantBaseline
      };
    } else if (position === "middle") {
      return {
        path: middlePath.current,
        ...sharedProps,
        dominantBaseline: "middle"
      };
    } else if (position === "centroid") {
      const centroid = props.centroid();
      return {
        x: centroid[0],
        y: centroid[1],
        textAnchor: "middle",
        verticalAnchor: "middle"
      };
    } else {
      return radialPositionProps;
    }
  })();
  return {
    get current() {
      return current;
    }
  };
}
function Arc($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    trackRef: trackRefProp = void 0,
    motion,
    value = 0,
    initialValue = 0,
    domain = [0, 100],
    range: range2 = [0, 360],
    // degrees
    startAngle: startAngleProp,
    endAngle: endAngleProp,
    innerRadius: innerRadiusProp,
    outerRadius: outerRadiusProp,
    cornerRadius = 0,
    padAngle = 0,
    trackStartAngle: trackStartAngleProp,
    trackEndAngle: trackEndAngleProp,
    trackInnerRadius: trackInnerRadiusProp,
    trackOuterRadius: trackOuterRadiusProp,
    trackCornerRadius: trackCornerRadiusProp,
    trackPadAngle: trackPadAngleProp,
    fill,
    fillOpacity,
    stroke = "none",
    strokeWidth,
    opacity,
    data,
    offset = 0,
    onpointerenter = () => {
    },
    onpointermove = () => {
    },
    onpointerleave: onpointerleave2 = () => {
    },
    ontouchmove = () => {
    },
    tooltipContext,
    track = false,
    children,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  let trackRef = void 0;
  const ctx = getChartContext();
  const endAngle = endAngleProp ?? degreesToRadians(ctx.config.xRange ? max(ctx.xRange) : max(range2));
  const motionEndAngle = createMotion(initialValue, () => value, motion);
  const scale = scaleLinear().domain(domain).range(range2);
  function getOuterRadius(outerRadius2, chartRadius) {
    if (!outerRadius2) {
      return chartRadius;
    } else if (outerRadius2 > 1) {
      return outerRadius2;
    } else if (outerRadius2 > 0) {
      return chartRadius * outerRadius2;
    } else if (outerRadius2 < 0) {
      return chartRadius + outerRadius2;
    } else {
      return outerRadius2;
    }
  }
  const outerRadius = getOuterRadius(outerRadiusProp, (Math.min(ctx.xRange[1], ctx.yRange[0]) ?? 0) / 2);
  const trackOuterRadius = trackOuterRadiusProp ? getOuterRadius(trackOuterRadiusProp, (Math.min(ctx.xRange[1], ctx.yRange[0]) ?? 0) / 2) : outerRadius;
  function getInnerRadius(innerRadius2, outerRadius2) {
    if (innerRadius2 == null) {
      return Math.min(...ctx.yRange);
    } else if (innerRadius2 > 1) {
      return innerRadius2;
    } else if (innerRadius2 > 0) {
      return outerRadius2 * innerRadius2;
    } else if (innerRadius2 < 0) {
      return outerRadius2 + innerRadius2;
    } else {
      return innerRadius2;
    }
  }
  const innerRadius = getInnerRadius(innerRadiusProp, outerRadius);
  const trackInnerRadius = trackInnerRadiusProp ? getInnerRadius(trackInnerRadiusProp, trackOuterRadius) : innerRadius;
  const startAngle = startAngleProp ?? degreesToRadians(range2[0]);
  const trackStartAngle = trackStartAngleProp ?? startAngleProp ?? degreesToRadians(range2[0]);
  const trackEndAngle = trackEndAngleProp ?? endAngleProp ?? degreesToRadians(range2[1]);
  const trackCornerRadius = trackCornerRadiusProp ?? cornerRadius;
  const trackPadAngle = trackPadAngleProp ?? padAngle;
  const arcEndAngle = endAngleProp ?? degreesToRadians(scale(motionEndAngle.current));
  const arc$1 = arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(startAngle).endAngle(arcEndAngle).cornerRadius(cornerRadius).padAngle(padAngle);
  const trackArc = arc().innerRadius(trackInnerRadius).outerRadius(trackOuterRadius).startAngle(trackStartAngle).endAngle(trackEndAngle).cornerRadius(trackCornerRadius).padAngle(trackPadAngle);
  const angle = ((startAngle ?? 0) + (endAngle ?? 0)) / 2;
  const xOffset = Math.sin(angle) * offset;
  const yOffset = -Math.cos(angle) * offset;
  const trackArcCentroid = (() => {
    const centroid = trackArc.centroid();
    return [centroid[0] + xOffset, centroid[1] + yOffset];
  })();
  const boundingBox = trackRef ? trackRef.getBBox() : {};
  const onPointerEnter = (e) => {
    onpointerenter?.(e);
    tooltipContext?.show(e, data);
  };
  const onPointerMove = (e) => {
    onpointermove?.(e);
    tooltipContext?.show(e, data);
  };
  const onPointerLeave = (e) => {
    onpointerleave2?.(e);
    tooltipContext?.hide();
  };
  function getTrackTextProps(position, opts = {}) {
    return createArcTextProps(
      {
        startAngle: () => trackStartAngle,
        endAngle: () => trackEndAngle,
        outerRadius: () => trackOuterRadius + (opts.outerPadding ? opts.outerPadding : 0),
        innerRadius: () => trackInnerRadius,
        cornerRadius: () => trackCornerRadius,
        centroid: () => trackArcCentroid
      },
      opts,
      position
    ).current;
  }
  function getArcTextProps(position, opts = {}) {
    return createArcTextProps(
      {
        startAngle: () => startAngle,
        endAngle: () => arcEndAngle,
        outerRadius: () => outerRadius + (opts.outerPadding ? opts.outerPadding : 0),
        innerRadius: () => innerRadius,
        cornerRadius: () => cornerRadius,
        centroid: () => trackArcCentroid
      },
      opts,
      position
    ).current;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (track) {
      $$payload2.out += "<!--[-->";
      Spline($$payload2, spread_props([
        { pathData: trackArc(), stroke: "none" },
        extractLayerProps(track, "arc-track"),
        {
          get pathRef() {
            return trackRef;
          },
          set pathRef($$value) {
            trackRef = $$value;
            $$settled = false;
          }
        }
      ]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Spline($$payload2, spread_props([
      {
        pathData: arc$1(),
        transform: `translate(${stringify(xOffset)}, ${stringify(yOffset)})`,
        fill,
        fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        opacity
      },
      restProps,
      {
        class: cls(layerClass("arc-line"), className),
        onpointerenter: onPointerEnter,
        onpointermove: onPointerMove,
        onpointerleave: onPointerLeave,
        ontouchmove: (e) => {
          ontouchmove?.(e);
          if (!tooltipContext) return;
          e.preventDefault();
        },
        get pathRef() {
          return ref;
        },
        set pathRef($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!----> `;
    children?.($$payload2, {
      centroid: trackArcCentroid,
      boundingBox,
      value: motionEndAngle.current,
      getTrackTextProps,
      getArcTextProps
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref: refProp, trackRef: trackRefProp });
  pop();
}
function Html($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    zIndex = 0,
    pointerEvents = true,
    role,
    "aria-label": label,
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
    center = false,
    ignoreTransform = false,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  const roleVal = role || (label || labelledBy || describedBy ? "figure" : void 0);
  const ctx = getChartContext();
  const transformCtx = getTransformContext();
  const transform = (() => {
    if (transformCtx.mode === "canvas" && !ignoreTransform) {
      return `translate(${transformCtx.translate.x}px,${transformCtx.translate.y}px) scale(${transformCtx.scale})`;
    } else if (center) {
      return `translate(${center === "x" || center === true ? ctx.width / 2 : 0}px, ${center === "y" || center === true ? ctx.height / 2 : 0}px)`;
    }
  })();
  setRenderContext("html");
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cls(layerClass("layout-html"), "absolute top-0 left-0", pointerEvents === false && "pointer-events-none", className)),
      role: roleVal,
      "aria-label": label,
      "aria-labelledby": labelledBy,
      "aria-describedby": describedBy,
      ...restProps
    },
    null,
    void 0,
    {
      transform,
      "transform-origin": "top left",
      "z-index": zIndex,
      "pointer-events": pointerEvents === false ? "none" : null,
      top: `${stringify(ctx.padding.top)}px`,
      bottom: `${stringify(ctx.padding.bottom)}px`,
      left: `${stringify(ctx.padding.left)}px`,
      right: `${stringify(ctx.padding.right)}px`
    }
  )}>`;
  children?.($$payload, { ref });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function Layer($$payload, $$props) {
  let {
    type,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (type === "canvas") {
    $$payload.out += "<!--[-->";
    Canvas($$payload, spread_props([
      restProps,
      {
        children: ($$payload2) => {
          children?.($$payload2);
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
  } else if (type === "svg") {
    $$payload.out += "<!--[1-->";
    Svg($$payload, spread_props([
      restProps,
      {
        children: ($$payload2) => {
          children?.($$payload2);
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
  } else if (type === "html") {
    $$payload.out += "<!--[2-->";
    Html($$payload, spread_props([
      restProps,
      {
        children: ($$payload2) => {
          children?.($$payload2);
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
}
function ColorRamp($$payload, $$props) {
  push();
  let {
    interpolator,
    steps = 10,
    height = "20px",
    width = "100%",
    ref: refProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let href = "";
  $$payload.out += `<image${spread_attributes(
    {
      href,
      preserveAspectRatio: "none",
      height,
      width,
      ...extractLayerProps(restProps, "color-ramp")
    },
    null,
    void 0,
    void 0,
    3
  )}></image>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function Legend($$payload, $$props) {
  push();
  let {
    scale: scaleProp,
    title = "",
    width = 320,
    height = 10,
    ticks = width / 64,
    tickFormat: tickFormatProp,
    tickValues: tickValuesProp,
    tickFontSize = 10,
    tickLength: tickLengthProp = 4,
    placement,
    orientation = "horizontal",
    onclick,
    onpointerenter,
    onpointerleave: onpointerleave2,
    variant = "ramp",
    classes = {},
    ref: refProp = void 0,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const scale = scaleProp ?? ctx.cScale;
  const scaleConfig = (() => {
    if (!scale) {
      return {
        xScale: void 0,
        interpolator: void 0,
        swatches: void 0,
        tickLabelOffset: 0,
        tickLine: true,
        tickLength: tickLengthProp,
        tickFormat: tickFormatProp,
        tickValues: tickValuesProp
      };
    } else if (scale.interpolate) {
      const n = Math.min(scale.domain().length, scale.range().length);
      const xScale = scale.copy().rangeRound?.(quantize(interpolate(0, width), n));
      const interpolator = scale.copy().domain(quantize(interpolate(0, 1), n));
      const _tickFormat = tickFormatProp ?? xScale?.tickFormat?.();
      return {
        xScale,
        interpolator,
        tickFormat: _tickFormat,
        tickLabelOffset: 0,
        tickLine: true,
        tickValues: tickValuesProp,
        tickLength: tickLengthProp,
        swatches: void 0
      };
    } else if (scale.interpolator) {
      const xScale = Object.assign(scale.copy().interpolator(interpolateRound(0, width)), {
        range() {
          return [0, width];
        }
      });
      const interpolator = scale.interpolator();
      let tickValues = tickValuesProp;
      if (!xScale.ticks) {
        if (tickValues === void 0) {
          const n = Math.round(ticks + 1);
          tickValues = range(n).map((i) => quantile(scale.domain(), i / (n - 1)));
        }
      }
      const tickFormat = tickFormatProp ?? xScale.tickFormat?.();
      return {
        interpolator,
        tickValues,
        tickFormat,
        swatches: void 0,
        tickLabelOffset: 0,
        tickLine: true,
        tickLength: tickLengthProp,
        xScale
      };
    } else if (scale.invertExtent) {
      const thresholds = scale.thresholds ? scale.thresholds() : scale.quantiles ? scale.quantiles() : scale.domain();
      const xScale = scaleLinear().domain([-1, scale.range().length - 1]).rangeRound([0, width]);
      const swatches = scale.range().map((d, i) => {
        return {
          x: xScale(i - 1),
          y: 0,
          width: xScale(i) - xScale(i - 1),
          height,
          fill: d
        };
      });
      const tickValues = range(thresholds.length);
      const tickFormat = (i) => {
        const value = thresholds[i];
        return tickFormatProp ? format(value, tickFormatProp) : value;
      };
      return {
        xScale,
        swatches,
        tickValues,
        tickFormat,
        tickLabelOffset: 0,
        tickLine: true,
        tickLength: tickLengthProp,
        interpolator: void 0
      };
    } else {
      const xScale = scaleBand().domain(scale.domain()).rangeRound([0, width]);
      const swatches = scale.domain().map((d) => {
        return {
          x: xScale(d),
          y: 0,
          width: Math.max(0, xScale.bandwidth() - 1),
          height,
          fill: scale(d)
        };
      });
      const tickValues = scale.domain();
      const tickLabelOffset = xScale.bandwidth() / 2;
      const tickLine = false;
      const tickLength = 0;
      return {
        xScale,
        tickFormat: tickFormatProp,
        tickLabelOffset,
        tickLine,
        tickLength,
        tickValues,
        swatches,
        interpolator: void 0
      };
    }
  })();
  $$payload.out += `<div${spread_attributes(
    {
      ...restProps,
      "data-placement": placement,
      class: clsx(cls(
        layerClass("legend-container"),
        "inline-block",
        "z-1",
        // stack above tooltip context layers (band rects, voronoi, ...)
        placement && [
          "absolute",
          {
            "top-left": "top-0 left-0",
            top: "top-0 left-1/2 -translate-x-1/2",
            "top-right": "top-0 right-0",
            left: "top-1/2 left-0 -translate-y-1/2",
            center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            right: "top-1/2 right-0 -translate-y-1/2",
            "bottom-left": "bottom-0 left-0",
            bottom: "bottom-0 left-1/2 -translate-x-1/2",
            "bottom-right": "bottom-0 right-0"
          }[placement]
        ],
        className,
        classes.root
      ))
    },
    null
  )}><div${attr_class(clsx(cls(layerClass("legend-title"), "text-[10px] font-semibold", classes.title)))}>${escape_html(title)}</div> `;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload, {
      values: scaleConfig.tickValues ?? scaleConfig.xScale?.ticks?.(ticks) ?? [],
      scale
    });
    $$payload.out += `<!---->`;
  } else if (variant === "ramp") {
    $$payload.out += "<!--[1-->";
    const each_array_1 = ensure_array_like(tickValuesProp ?? scaleConfig.xScale?.ticks?.(ticks) ?? []);
    $$payload.out += `<svg${attr("width", width)}${attr("height", height + tickLengthProp + tickFontSize)}${attr("viewBox", `0 0 ${stringify(width)} ${stringify(height + tickLengthProp + tickFontSize)}`)}${attr_class(clsx(cls(layerClass("legend-ramp-svg"), "overflow-visible")))}><g${attr_class(clsx(layerClass("legend-ramp-g")))}>`;
    if (scaleConfig.interpolator) {
      $$payload.out += "<!--[-->";
      ColorRamp($$payload, {
        width,
        height,
        interpolator: scaleConfig.interpolator,
        class: layerClass("legend-color-ramp")
      });
    } else if (scaleConfig.swatches) {
      $$payload.out += "<!--[1-->";
      const each_array = ensure_array_like(scaleConfig.swatches);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let swatch = each_array[i];
        $$payload.out += `<rect${spread_attributes(
          {
            ...extractLayerProps(swatch, "legend-swatch")
          },
          null,
          void 0,
          void 0,
          3
        )}></rect>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></g><g${attr_class(clsx(layerClass("legend-tick-group")))}><!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let tick = each_array_1[i];
      $$payload.out += `<text text-anchor="middle"${attr("x", scaleConfig.xScale?.(tick) + scaleConfig.tickLabelOffset)}${attr("y", height + tickLengthProp + tickFontSize)}${attr_class(clsx(cls(layerClass("legend-tick-text"), "text-[10px] fill-surface-content", classes.label)))}${attr_style("", { "font-size": tickFontSize })}>${escape_html(tickFormatProp ? format(tick, asAny(tickFormatProp)) : tick)}</text>`;
      if (scaleConfig.tickLine) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<line${attr("x1", scaleConfig.xScale?.(tick))}${attr("y1", 0)}${attr("x2", scaleConfig.xScale?.(tick))}${attr("y2", height + tickLengthProp)}${attr_class(clsx(cls(layerClass("legend-tick-line"), "stroke-surface-content", classes.tick)))}></line>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></g></svg>`;
  } else if (variant === "swatches") {
    $$payload.out += "<!--[2-->";
    const each_array_2 = ensure_array_like(scaleConfig.tickValues ?? scaleConfig.xScale?.ticks?.(ticks) ?? []);
    $$payload.out += `<div${attr_class(clsx(cls(layerClass("legend-swatch-group"), "flex gap-x-4 gap-y-1", orientation === "vertical" && "flex-col", classes.items)))}><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let tick = each_array_2[$$index_2];
      const color = scale?.(tick) ?? "";
      const item = { value: tick, color };
      $$payload.out += `<button${attr_class(clsx(cls(layerClass("legend-swatch-button"), "flex items-center gap-1 truncate", !onclick && "cursor-auto", typeof classes.item === "function" ? classes.item(item) : classes.item)))}><div${attr_class(clsx(cls(layerClass("legend-swatch"), "h-4 w-4 shrink-0 rounded-full", classes.swatch)))}${attr_style("", { "background-color": color })}></div> <div${attr_class(clsx(cls(layerClass("legend-swatch-label"), "text-xs text-surface-content truncate whitespace-nowrap", classes.label)))}>${escape_html(tickFormatProp ? format(tick, asAny(tickFormatProp)) : tick)}</div></button>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function TooltipHeader($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    colorRef: colorRefProp = void 0,
    value,
    format: format$1,
    color,
    classes = { root: "", color: "" },
    props = { root: {}, color: {} },
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cls(layerClass("tooltip-header"), "font-semibold whitespace-nowrap border-b mb-1 pb-1 flex items-center gap-2", classes.root, props.root?.class, className)),
      ...restProps
    },
    null
  )}>`;
  if (color) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(clsx(cls(layerClass("tooltip-header-color"), "color", "inline-block size-2 rounded-full bg-[var(--color)]", classes.color)))}${attr_style("", { "--color": color })}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (children) {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(format$1 ? format(value, asAny(format$1)) : value)}`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { ref: refProp, colorRef: colorRefProp });
  pop();
}
function TooltipItem($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    labelRef: labelRefProp = void 0,
    valueRef: valueRefProp = void 0,
    colorRef: colorRefProp = void 0,
    label,
    value,
    format: format$1,
    valueAlign = "left",
    color,
    classes = { root: "", label: "", value: "", color: "" },
    props = { root: {}, label: {}, value: {}, color: {} },
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      ...props.root,
      class: clsx(cls(layerClass("tooltip-item-root"), "contents", classes.root, className, props.root?.class)),
      ...restProps
    },
    null
  )}><div${spread_attributes(
    {
      ...props.label,
      class: clsx(cls(layerClass("tooltip-item-label"), "label", "flex items-center gap-2 whitespace-nowrap", classes.label, props.label?.class))
    },
    null
  )}>`;
  if (color) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...props.color,
        class: clsx(cls(layerClass("tooltip-item-color"), "color", "inline-block size-2 rounded-full bg-[var(--color)]", classes.color, props.color?.class))
      },
      null,
      void 0,
      { "--color": color }
    )}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (typeof label === "function") {
    $$payload.out += "<!--[-->";
    label($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(label)}`;
  }
  $$payload.out += `<!--]--></div> <div${spread_attributes(
    {
      ...props.value,
      class: clsx(cls(
        layerClass("tooltip-item-value"),
        "value",
        "tabular-nums",
        {
          "text-right": valueAlign === "right",
          "text-center": valueAlign === "center"
        },
        classes.value,
        props.value?.class
      ))
    },
    null
  )}>`;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(format$1 ? format(value, asAny(format$1)) : value)}`;
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, {
    ref: refProp,
    labelRef: labelRefProp,
    valueRef: valueRefProp,
    colorRef: colorRefProp
  });
  pop();
}
function TooltipList($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cls(layerClass("tooltip-list"), "grid grid-cols-[1fr_auto] gap-x-2 gap-y-1 items-start", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function TooltipSeparator($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cls(layerClass("tooltip-separator"), "rounded-sm bg-surface-content/20 my-1 col-span-full h-px", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function Tooltip($$payload, $$props) {
  push();
  let {
    anchor = "top-left",
    classes = {},
    contained = "container",
    motion = "spring",
    pointerEvents = false,
    variant = "default",
    x = "pointer",
    xOffset = x === "pointer" ? 10 : 0,
    y = "pointer",
    yOffset = y === "pointer" ? 10 : 0,
    children,
    rootRef: rootRefProp = void 0,
    props = { root: {}, container: {}, content: {} },
    class: className
  } = $$props;
  const ctx = getChartContext();
  const tooltipCtx = getTooltipContext();
  let tooltipWidth = 0;
  let tooltipHeight = 0;
  function alignValue(value, align, additionalOffset, tooltipSize) {
    const alignOffset = align === "center" ? tooltipSize / 2 : align === "end" ? tooltipSize : 0;
    return value + (align === "end" ? -additionalOffset : additionalOffset) - alignOffset;
  }
  const positions = (() => {
    if (!tooltipCtx.data) {
      const tooltipX = run(() => tooltipCtx.x);
      const tooltipY = run(() => tooltipCtx.y);
      return { x: tooltipX, y: tooltipY };
    }
    const xBandOffset = isScaleBand(ctx.xScale) ? ctx.xScale.step() / 2 - ctx.xScale.padding() * ctx.xScale.step() / 2 : 0;
    const xValue = typeof x === "number" ? x : x === "data" ? ctx.xGet(tooltipCtx.data) + ctx.padding.left + xBandOffset : tooltipCtx.x;
    let xAlign = "start";
    switch (anchor) {
      case "top-left":
      case "left":
      case "bottom-left":
        xAlign = "start";
        break;
      case "top":
      case "center":
      case "bottom":
        xAlign = "center";
        break;
      case "top-right":
      case "right":
      case "bottom-right":
        xAlign = "end";
        break;
    }
    const yBandOffset = isScaleBand(ctx.yScale) ? ctx.yScale.step() / 2 - ctx.yScale.padding() * ctx.yScale.step() / 2 : 0;
    const yValue = typeof y === "number" ? y : y === "data" ? ctx.yGet(tooltipCtx.data) + ctx.padding.top + yBandOffset : tooltipCtx.y;
    let yAlign = "start";
    switch (anchor) {
      case "top-left":
      case "top":
      case "top-right":
        yAlign = "start";
        break;
      case "left":
      case "center":
      case "right":
        yAlign = "center";
        break;
      case "bottom-left":
      case "bottom":
      case "bottom-right":
        yAlign = "end";
        break;
    }
    const rect = {
      top: alignValue(yValue, yAlign, yOffset, tooltipHeight),
      left: alignValue(xValue, xAlign, xOffset, tooltipWidth),
      // set below
      bottom: 0,
      right: 0
    };
    rect.bottom = rect.top + tooltipHeight;
    rect.right = rect.left + tooltipWidth;
    if (contained === "container") {
      if (typeof x !== "number") {
        if ((xAlign === "start" || xAlign === "center") && rect.right > ctx.containerWidth) {
          rect.left = alignValue(xValue, "end", xOffset, tooltipWidth);
        }
        if ((xAlign === "end" || xAlign === "center") && rect.left < ctx.padding.left) {
          rect.left = alignValue(xValue, "start", xOffset, tooltipWidth);
        }
      }
      rect.right = rect.left + tooltipWidth;
      if (typeof y !== "number") {
        if ((yAlign === "start" || yAlign === "center") && rect.bottom > ctx.containerHeight) {
          rect.top = alignValue(yValue, "end", yOffset, tooltipHeight);
        }
        if ((yAlign === "end" || yAlign === "center") && rect.top < ctx.padding.top) {
          rect.top = alignValue(yValue, "start", yOffset, tooltipHeight);
        }
      }
      rect.bottom = rect.top + tooltipHeight;
    }
    return { x: rect.left, y: rect.top };
  })();
  const motionX = createMotion(tooltipCtx.x, () => positions.x, motion);
  const motionY = createMotion(tooltipCtx.y, () => positions.y, motion);
  if (tooltipCtx.data) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...props.root,
        class: clsx(cls("root", layerClass("tooltip-root"), classes.root, props.root?.class))
      },
      "svelte-1fmt6",
      { "pointer-events-none": !pointerEvents },
      {
        top: `${stringify(motionY.current)}px`,
        left: `${stringify(motionX.current)}px`
      }
    )}><div${spread_attributes(
      {
        ...props.container,
        class: clsx(cls(
          layerClass("tooltip-container"),
          variant !== "none" && [
            "text-sm py-1 px-2 h-full rounded-sm elevation-1"
          ],
          {
            default: [
              "bg-surface-100/90 dark:bg-surface-300/90 backdrop-filter backdrop-blur-[2px] text-surface-content",
              "[&_.label]:text-surface-content/75"
            ],
            invert: [
              "bg-surface-content/90 backdrop-filter backdrop-blur-[2px] text-surface-100 border border-surface-content",
              "[&_.label]:text-surface-100/50"
            ],
            none: ""
          }[variant],
          classes.container,
          props.container?.class,
          className
        ))
      },
      "svelte-1fmt6"
    )}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${spread_attributes(
        {
          ...props.content,
          class: clsx(cls(layerClass("tooltip-content"), classes.content))
        },
        "svelte-1fmt6"
      )}>`;
      children($$payload, {
        data: tooltipCtx.data,
        payload: tooltipCtx.payload
      });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { rootRef: rootRefProp });
  pop();
}
class HighlightKey {
  current = null;
  set = (seriesKey) => {
    this.current = seriesKey;
  };
}
class SeriesState {
  #series = [];
  selectedSeries = new SelectionState();
  selectedKeys = new SelectionState();
  highlightKey = new HighlightKey();
  constructor(getSeries) {
    this.#series = getSeries();
  }
  get series() {
    return this.#series;
  }
  get isDefaultSeries() {
    return this.#series.length === 1 && this.#series[0].key === "default";
  }
  get allSeriesData() {
    return this.#series.flatMap((s) => s.data?.map((d) => ({ seriesKey: s.key, ...d }))).filter((d) => d);
  }
  get visibleSeries() {
    return this.#series.filter((s) => this.selectedSeries.isEmpty() || this.selectedSeries.isSelected(s.key));
  }
}
function createLegendProps(opts) {
  return {
    scale: opts.seriesState.isDefaultSeries ? void 0 : scaleOrdinal(opts.seriesState.series.map((s) => s.key), opts.seriesState.series.map((s) => s.color)),
    tickFormat: (key) => opts.seriesState.series.find((s) => s.key === key)?.label ?? key,
    placement: "bottom",
    variant: "swatches",
    onclick: (_, item) => opts.seriesState.selectedSeries.toggle(item.value),
    onpointerenter: (_, item) => opts.seriesState.highlightKey.current = item.value,
    onpointerleave: () => opts.seriesState.highlightKey.current = null,
    ...opts.props,
    classes: {
      item: (item) => opts.seriesState.visibleSeries.length && !opts.seriesState.visibleSeries.some((s) => s.key === item.value) ? "opacity-50" : "",
      ...opts.props?.classes
    }
  };
}
function Line($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    x1,
    initialX1 = x1,
    y1,
    initialY1 = y1,
    x2,
    initialX2 = x2,
    y2,
    initialY2 = y2,
    class: className,
    strokeWidth,
    opacity,
    fill,
    stroke,
    marker,
    markerEnd,
    markerStart,
    markerMid,
    motion,
    fillOpacity,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const markerStartId = markerStart || marker ? createId("marker-start", uid) : "";
  const markerMidId = markerMid || marker ? createId("marker-mid", uid) : "";
  const markerEndId = markerEnd || marker ? createId("marker-end", uid) : "";
  const motionX1 = createMotion(initialX1, () => x1, motion);
  const motionY1 = createMotion(initialY1, () => y1, motion);
  const motionX2 = createMotion(initialX2, () => x2, motion);
  const motionY2 = createMotion(initialY2, () => y2, motion);
  const renderCtx = getRenderContext();
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        click: restProps.onclick,
        pointerenter: restProps.onpointerenter,
        pointermove: restProps.onpointermove,
        pointerleave: restProps.onpointerleave
      }
    });
  }
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<line${spread_attributes(
      {
        x1: motionX1.current,
        y1: motionY1.current,
        x2: motionX2.current,
        y2: motionY2.current,
        fill,
        stroke,
        "fill-opacity": fillOpacity,
        "stroke-width": strokeWidth,
        opacity,
        "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
        "marker-mid": markerMidId ? `url(#${markerMidId})` : void 0,
        "marker-end": markerEndId ? `url(#${markerEndId})` : void 0,
        class: clsx(cls(layerClass("line"), stroke === void 0 && "stroke-surface-content", className)),
        ...restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></line>`;
    MarkerWrapper($$payload, {
      id: markerStartId,
      marker: markerStart ?? marker
    });
    $$payload.out += `<!---->`;
    MarkerWrapper($$payload, { id: markerMidId, marker: markerMid ?? marker });
    $$payload.out += `<!---->`;
    MarkerWrapper($$payload, { id: markerEndId, marker: markerEnd ?? marker });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Rule($$payload, $$props) {
  push();
  let {
    x = false,
    xOffset = 0,
    y = false,
    yOffset = 0,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const xRangeMinMax = extent(ctx.xRange);
  const yRangeMinMax = extent(ctx.yRange);
  function showRule(value, axis) {
    switch (typeof value) {
      case "boolean":
        return value;
      case "string":
        return true;
      default:
        if (axis === "x") {
          return ctx.xScale(value) >= xRangeMinMax[0] && ctx.xScale(value) <= xRangeMinMax[1];
        } else {
          return ctx.yScale(value) >= yRangeMinMax[0] && ctx.yScale(value) <= yRangeMinMax[1];
        }
    }
  }
  Group($$payload, {
    class: layerClass("rule-g"),
    children: ($$payload2) => {
      if (showRule(x, "x")) {
        $$payload2.out += "<!--[-->";
        const xCoord = x === true || x === "left" ? xRangeMinMax[0] : x === "right" ? xRangeMinMax[1] : ctx.xScale(x) + xOffset;
        if (ctx.radial) {
          $$payload2.out += "<!--[-->";
          const [x1, y1] = pointRadial(xCoord, Number(yRangeMinMax[0]));
          const [x2, y2] = pointRadial(xCoord, Number(yRangeMinMax[1]));
          Line($$payload2, spread_props([
            restProps,
            {
              x1,
              y1,
              x2,
              y2,
              class: cls(layerClass("rule-x-radial-line"), "stroke-surface-content/10", className)
            }
          ]));
        } else {
          $$payload2.out += "<!--[!-->";
          Line($$payload2, spread_props([
            restProps,
            {
              x1: xCoord,
              x2: xCoord,
              y1: ctx.yRange[0] || 0,
              y2: ctx.yRange[1] || 0,
              class: cls(layerClass("rule-x-line"), "stroke-surface-content/50", className)
            }
          ]));
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (showRule(y, "y")) {
        $$payload2.out += "<!--[-->";
        if (ctx.radial) {
          $$payload2.out += "<!--[-->";
          Circle($$payload2, {
            r: y === true || y === "bottom" ? yRangeMinMax[1] : y === "top" ? yRangeMinMax[0] : ctx.yScale(y) + yOffset,
            class: cls(layerClass("rule-y-radial-circle"), "fill-none stroke-surface-content/50", className)
          });
        } else {
          $$payload2.out += "<!--[!-->";
          Line($$payload2, spread_props([
            restProps,
            {
              x1: ctx.xRange[0] || 0,
              x2: ctx.xRange[1] || 0,
              y1: y === true || y === "bottom" ? yRangeMinMax[1] : y === "top" ? yRangeMinMax[0] : ctx.yScale(y) + yOffset,
              y2: y === true || y === "bottom" ? yRangeMinMax[1] : y === "top" ? yRangeMinMax[0] : ctx.yScale(y) + yOffset,
              class: cls(layerClass("rule-y-line"), "stroke-surface-content/50", className)
            }
          ]));
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  pop();
}
function getPathLength(pathRef) {
  return 0;
}
function Text($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    value,
    x = 0,
    initialX = x,
    y = 0,
    initialY = y,
    dx = 0,
    dy = 0,
    lineHeight = "1em",
    capHeight = "0.71em",
    width,
    scaleToFit = false,
    textAnchor = "start",
    verticalAnchor = "end",
    dominantBaseline = "auto",
    rotate,
    opacity = 1,
    strokeWidth = 0,
    stroke,
    fill,
    fillOpacity,
    motion,
    svgRef: svgRefProp = void 0,
    ref: refProp = void 0,
    class: className,
    svgProps = {},
    truncate = false,
    path: path2,
    pathId = createId("text-path", uid),
    startOffset = "0%",
    transform: transformProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const renderCtx = getRenderContext();
  let style = void 0;
  const resolvedWidth = path2 ? getPathLength() : width;
  const defaultTruncateOptions = {
    maxChars: void 0,
    position: "end",
    maxWidth: resolvedWidth
  };
  const truncateConfig = (() => {
    if (typeof truncate === "boolean") {
      if (truncate) return defaultTruncateOptions;
      return false;
    }
    return { ...defaultTruncateOptions, ...truncate };
  })();
  const rawText = value != null ? value.toString().replace(/\\n/g, "\n") : "";
  const textValue = (() => {
    if (!truncateConfig) return rawText;
    return truncateText(rawText, truncateConfig);
  })();
  const spaceWidth = getStringWidth(" ", style) || 0;
  const wordsByLines = (() => {
    const lines = textValue.split("\n");
    return lines.flatMap((line2) => {
      const words = line2.split(/(?:(?!\u00A0+)\s+)/);
      if (width == null) {
        return [{ words }];
      } else {
        return words.reduce(
          (result, item) => {
            const currentLine = result[result.length - 1];
            const itemWidth = getStringWidth(item, style) || 0;
            if (currentLine && (width == null || scaleToFit || (currentLine.width || 0) + itemWidth + spaceWidth < width)) {
              currentLine.words.push(item);
              currentLine.width = currentLine.width || 0;
              currentLine.width += itemWidth + spaceWidth;
            } else {
              const newLine = { words: [item], width: itemWidth };
              result.push(newLine);
            }
            return result;
          },
          []
        );
      }
    });
  })();
  const lineCount = wordsByLines.length;
  function getPixelValue(cssValue) {
    if (typeof cssValue === "number") return cssValue;
    const result = cssValue.match(/([\d.]+)(\D+)/);
    const number = Number(result?.[1]);
    switch (result?.[2]) {
      case "px":
        return number;
      case "em":
      case "rem":
        return number * 16;
      default:
        return 0;
    }
  }
  const startDy = (() => {
    if (verticalAnchor === "start") {
      return getPixelValue(lineHeight);
    } else if (verticalAnchor === "middle") {
      return (lineCount - 1) / 2 * -getPixelValue(lineHeight) + getPixelValue(capHeight) / 2;
    } else {
      return (lineCount - 1) * -getPixelValue(lineHeight) - getPixelValue(capHeight) / 2;
    }
  })();
  const scaleTransform = (() => {
    if (scaleToFit && lineCount > 0 && typeof x == "number" && typeof y == "number" && typeof width == "number") {
      const lineWidth = wordsByLines[0].width || 1;
      const sx = width / lineWidth;
      const sy = sx;
      const originX = x - sx * x;
      const originY = y - sy * y;
      return `matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`;
    } else {
      return "";
    }
  })();
  const rotateTransform = rotate ? `rotate(${rotate}, ${x}, ${y})` : "";
  const transform = transformProp ?? `${scaleTransform} ${rotateTransform}`;
  function isValidXOrY(xOrY) {
    return (
      // number that is not NaN or Infinity
      typeof xOrY === "number" && Number.isFinite(xOrY) || // for percentage
      typeof xOrY === "string"
    );
  }
  const motionX = createMotion(initialX, () => x, motion);
  const motionY = createMotion(initialY, () => y, motion);
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent();
  }
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${spread_attributes(
      {
        x: dx,
        y: dy,
        ...svgProps,
        class: clsx(cls(layerClass("text-svg"), "overflow-visible [paint-order:stroke]", svgProps?.class))
      },
      null,
      void 0,
      void 0,
      3
    )}>`;
    if (path2) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<defs><!---->`;
      {
        $$payload.out += `<path${attr("id", pathId)}${attr("d", path2)}></path>`;
      }
      $$payload.out += `<!----></defs><text${spread_attributes(
        {
          dy,
          ...restProps,
          fill,
          "fill-opacity": fillOpacity,
          stroke,
          "stroke-width": strokeWidth,
          opacity,
          transform: transformProp,
          class: clsx(cls(layerClass("text"), fill === void 0 && "fill-surface-content", className))
        },
        null,
        void 0,
        void 0,
        3
      )}><textPath${attr_style(`text-anchor: ${stringify(textAnchor)};`)}${attr("dominant-baseline", dominantBaseline)}${attr("href", `#${stringify(pathId)}`)}${attr("startOffset", startOffset)}${attr_class(clsx(cls(layerClass("text-path"))))}>${escape_html(wordsByLines.map((line2) => line2.words.join(" ")).join())}</textPath></text>`;
    } else if (isValidXOrY(x) && isValidXOrY(y)) {
      $$payload.out += "<!--[1-->";
      const each_array = ensure_array_like(wordsByLines);
      $$payload.out += `<text${spread_attributes(
        {
          x: motionX.current,
          y: motionY.current,
          transform,
          "text-anchor": textAnchor,
          "dominant-baseline": dominantBaseline,
          ...restProps,
          fill,
          "fill-opacity": fillOpacity,
          stroke,
          "stroke-width": strokeWidth,
          opacity,
          class: clsx(cls(layerClass("text"), fill === void 0 && "fill-surface-content", className))
        },
        null,
        void 0,
        void 0,
        3
      )}><!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let line2 = each_array[index];
        $$payload.out += `<tspan${attr("x", motionX.current)}${attr("dy", index === 0 ? startDy : getPixelValue(lineHeight))}${attr_class(clsx(layerClass("text-tspan")))}>${escape_html(line2.words.join(" "))}</tspan>`;
      }
      $$payload.out += `<!--]--></text>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { svgRef: svgRefProp, ref: refProp });
  pop();
}
function getDurationFormat(duration, options = {
  multiline: false
}) {
  const { multiline = false, placement = "bottom" } = options;
  return function(date, i) {
    let result = "";
    if (+duration >= +new Duration({ duration: { years: 1 } })) {
      result = format(date, "year");
    } else if (+duration >= +new Duration({ duration: { days: 28 } })) {
      const isFirst = i === 0 || +timeYear.floor(date) === +date;
      if (multiline) {
        result = [format(date, "month", { variant: "short" }), isFirst && format(date, "year")];
      } else {
        result = format(date, "month", { variant: "short" }) + (isFirst ? ` '${format(date, "year", { variant: "short" })}` : "");
      }
    } else if (+duration >= +new Duration({ duration: { days: 1 } })) {
      const isFirst = i === 0 || date.getDate() <= duration.days;
      if (multiline) {
        result = [
          format(date, "custom", { custom: DateToken.DayOfMonth_numeric }),
          isFirst && format(date, "month", { variant: "short" })
        ];
      } else {
        result = format(date, "day", { variant: "short" });
      }
    } else if (+duration >= +new Duration({ duration: { hours: 1 } })) {
      const isFirst = i === 0 || +timeDay.floor(date) === +date;
      if (multiline) {
        result = [
          format(date, "custom", { custom: DateToken.Hour_numeric }),
          isFirst && format(date, "day", { variant: "short" })
        ];
      } else {
        result = isFirst ? format(date, "day", { variant: "short" }) : format(date, "custom", { custom: DateToken.Hour_numeric });
      }
    } else if (+duration >= +new Duration({ duration: { minutes: 1 } })) {
      const isFirst = i === 0 || +timeDay.floor(date) === +date;
      if (multiline) {
        result = [
          format(date, "time", { variant: "short" }),
          isFirst && format(date, "day", { variant: "short" })
        ];
      } else {
        result = format(date, "time", { variant: "short" });
      }
    } else if (+duration >= +new Duration({ duration: { seconds: 1 } })) {
      const isFirst = i === 0 || +timeDay.floor(date) === +date;
      result = [
        format(date, "time"),
        multiline && isFirst && format(date, "day", { variant: "short" })
      ];
    } else if (+duration >= +new Duration({ duration: { milliseconds: 1 } })) {
      const isFirst = i === 0 || +timeDay.floor(date) === +date;
      result = [
        format(date, "custom", {
          custom: [
            DateToken.Hour_2Digit,
            DateToken.Minute_2Digit,
            DateToken.Second_2Digit,
            DateToken.MiliSecond_3,
            DateToken.Hour_woAMPM
          ]
        }),
        multiline && isFirst && format(date, "day", { variant: "short" })
      ];
    } else {
      result = date.toString();
    }
    if (Array.isArray(result)) {
      switch (placement) {
        case "top":
          return result.filter(Boolean).reverse().join("\n");
        case "bottom":
          return result.filter(Boolean).join("\n");
        case "left":
          return result.filter(Boolean).reverse().join(" ");
        case "right":
          return result.filter(Boolean).join(" ");
        default:
          return result.filter(Boolean).join("\n");
      }
    } else {
      return result;
    }
  };
}
function resolveTickVals(scale, ticks, count) {
  if (Array.isArray(ticks))
    return ticks;
  if (typeof ticks === "function")
    return ticks(scale) ?? [];
  if (isLiteralObject(ticks) && "interval" in ticks) {
    if (ticks.interval === null || !("ticks" in scale) || typeof scale.ticks !== "function") {
      return [];
    }
    return scale.ticks(ticks.interval);
  }
  if (isScaleBand(scale)) {
    return ticks && typeof ticks === "number" ? scale.domain().filter((_, i) => i % ticks === 0) : scale.domain();
  }
  if (scale.ticks && typeof scale.ticks === "function") {
    return scale.ticks(count ?? (typeof ticks === "number" ? ticks : void 0));
  }
  return [];
}
function resolveTickFormat(options) {
  const { scale, ticks, count, formatType, multiline, placement } = options;
  if (formatType) {
    return (tick) => format(tick, formatType);
  }
  if (isScaleTime(scale) && count) {
    if (isLiteralObject(ticks) && "interval" in ticks && ticks.interval != null) {
      const start = ticks.interval.floor(/* @__PURE__ */ new Date());
      const end = ticks.interval.ceil(/* @__PURE__ */ new Date());
      return getDurationFormat(new Duration({ start, end }), { multiline, placement });
    } else {
      const [start, end] = timeTicks(scale.domain()[0], scale.domain()[1], count);
      return getDurationFormat(new Duration({ start, end }), { multiline, placement });
    }
  }
  if (scale.tickFormat) {
    return scale.tickFormat(count);
  }
  return (tick) => `${tick}`;
}
function Axis($$payload, $$props) {
  push();
  let {
    placement,
    label = "",
    labelPlacement = "middle",
    labelProps,
    rule = false,
    grid = false,
    ticks,
    tickSpacing = ["top", "bottom", "angle"].includes(placement) ? 80 : ["left", "right", "radius"].includes(placement) ? 50 : void 0,
    tickMultiline = false,
    tickLength = 4,
    tickMarks = true,
    format: format2,
    tickLabelProps,
    motion,
    transitionIn,
    transitionInParams,
    scale: scaleProp,
    classes = {},
    class: className,
    tickLabel,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const orientation = placement === "angle" ? "angle" : placement === "radius" ? "radius" : ["top", "bottom"].includes(placement) ? "horizontal" : "vertical";
  const scale = scaleProp ?? (["horizontal", "angle"].includes(orientation) ? ctx.xScale : ctx.yScale);
  const xRangeMinMax = extent(ctx.xRange);
  const yRangeMinMax = extent(ctx.yRange);
  const ctxSize = orientation === "vertical" ? ctx.height : orientation === "horizontal" ? ctx.width : orientation === "radius" ? ctx.height / 2 : orientation === "angle" ? ctx.width : null;
  const tickCount = typeof ticks === "number" ? ticks : tickSpacing && ctxSize ? Math.round(ctxSize / tickSpacing) : void 0;
  const tickVals = resolveTickVals(scale, ticks, tickCount);
  const tickFormat = resolveTickFormat({
    scale,
    ticks,
    count: tickCount,
    formatType: format2,
    multiline: tickMultiline,
    placement
  });
  function getCoords(tick) {
    switch (placement) {
      case "top":
        return {
          x: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0),
          y: yRangeMinMax[0]
        };
      case "bottom":
        return {
          x: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0),
          y: yRangeMinMax[1]
        };
      case "left":
        return {
          x: xRangeMinMax[0],
          y: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0)
        };
      case "right":
        return {
          x: xRangeMinMax[1],
          y: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0)
        };
      case "angle":
        return { x: scale(tick), y: yRangeMinMax[1] };
      case "radius":
        return {
          x: xRangeMinMax[0],
          y: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0)
        };
    }
  }
  function getDefaultTickLabelProps(tick) {
    switch (placement) {
      case "top":
        return {
          textAnchor: "middle",
          verticalAnchor: "end",
          dy: -tickLength
        };
      case "bottom":
        return {
          textAnchor: "middle",
          verticalAnchor: "start",
          dy: tickLength
        };
      case "left":
        return {
          textAnchor: "end",
          verticalAnchor: "middle",
          dx: -tickLength
        };
      case "right":
        return {
          textAnchor: "start",
          verticalAnchor: "middle",
          dx: tickLength
        };
      case "angle":
        const xValue = scale(tick);
        return {
          textAnchor: xValue === 0 || Math.abs(xValue - Math.PI) < 0.01 || // ~180deg
          Math.abs(xValue - Math.PI * 2) < 0.01 ? (
            // ~360deg
            "middle"
          ) : xValue > Math.PI ? "end" : "start",
          // angle in radians
          // ~360deg
          verticalAnchor: "middle",
          dx: Math.sin(xValue) * tickLength,
          dy: -Math.cos(xValue) * (tickLength + 4)
          // manually adjusted until Text supports custom styles
        };
      case "radius":
        return {
          textAnchor: "middle",
          verticalAnchor: "middle",
          dx: 2
        };
    }
  }
  const resolvedLabelX = (() => {
    if (placement === "left" || orientation === "horizontal" && labelPlacement === "start") {
      return -ctx.padding.left;
    } else if (placement === "right" || orientation === "horizontal" && labelPlacement === "end") {
      return ctx.width + ctx.padding.right;
    }
    return ctx.width / 2;
  })();
  const resolvedLabelY = (() => {
    if (placement === "top" || orientation === "vertical" && labelPlacement === "start") {
      return -ctx.padding.top;
    } else if (orientation === "vertical" && labelPlacement === "middle") {
      return ctx.height / 2;
    } else if (placement === "bottom" || labelPlacement === "end") {
      return ctx.height + ctx.padding.bottom;
    }
    return "0";
  })();
  const resolvedLabelTextAnchor = (() => {
    if (labelPlacement === "middle") {
      return "middle";
    } else if (placement === "right" || orientation === "horizontal" && labelPlacement === "end") {
      return "end";
    }
    return "start";
  })();
  const resolvedLabelVerticalAnchor = (() => {
    if (placement === "top" || orientation === "vertical" && labelPlacement === "start" || placement === "left" && labelPlacement === "middle") {
      return "start";
    }
    return "end";
  })();
  const resolvedLabelProps = {
    value: typeof label === "function" ? "" : void 0,
    x: resolvedLabelX,
    y: resolvedLabelY,
    textAnchor: resolvedLabelTextAnchor,
    verticalAnchor: resolvedLabelVerticalAnchor,
    rotate: orientation === "vertical" && labelPlacement === "middle" ? -90 : 0,
    capHeight: ".5rem",
    // text-[10px]
    ...labelProps,
    class: cls(layerClass("axis-label"), "text-[10px] stroke-surface-100 [stroke-width:2px] font-light", classes.label, labelProps?.class)
  };
  Group($$payload, spread_props([
    restProps,
    {
      "data-placement": placement,
      class: cls(layerClass("axis"), `placement-${placement}`, classes.root, className),
      children: ($$payload2) => {
        const each_array = ensure_array_like(tickVals);
        if (rule !== false) {
          $$payload2.out += "<!--[-->";
          const ruleProps = extractLayerProps(rule, "axis-rule");
          Rule($$payload2, spread_props([
            {
              x: placement === "left" || placement === "right" ? placement : placement === "angle",
              y: placement === "top" || placement === "bottom" ? placement : placement === "radius",
              motion
            },
            ruleProps,
            {
              class: cls("stroke-surface-content/50", classes.rule, ruleProps?.class)
            }
          ]));
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (typeof label === "function") {
          $$payload2.out += "<!--[-->";
          label($$payload2, { props: resolvedLabelProps });
          $$payload2.out += `<!---->`;
        } else if (label) {
          $$payload2.out += "<!--[1-->";
          Text($$payload2, spread_props([resolvedLabelProps]));
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> <!--[-->`;
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let tick = each_array[index];
          const tickCoords = getCoords(tick);
          const [radialTickCoordsX, radialTickCoordsY] = pointRadial(tickCoords.x, tickCoords.y);
          const [radialTickMarkCoordsX, radialTickMarkCoordsY] = pointRadial(tickCoords.x, tickCoords.y + tickLength);
          const resolvedTickLabelProps = {
            x: orientation === "angle" ? radialTickCoordsX : tickCoords.x,
            y: orientation === "angle" ? radialTickCoordsY : tickCoords.y,
            value: tickFormat(tick, index),
            ...getDefaultTickLabelProps(tick),
            motion,
            // complement 10px text (until Text supports custom styles)
            capHeight: "7px",
            lineHeight: "11px",
            ...tickLabelProps,
            class: cls(layerClass("axis-tick-label"), "text-[10px] stroke-surface-100 [stroke-width:2px] font-light", classes.tickLabel, tickLabelProps?.class)
          };
          Group($$payload2, {
            transitionIn,
            transitionInParams,
            class: layerClass("axis-tick-group"),
            children: ($$payload3) => {
              if (grid !== false) {
                $$payload3.out += "<!--[-->";
                const ruleProps = extractLayerProps(grid, "axis-grid");
                Rule($$payload3, spread_props([
                  {
                    x: orientation === "horizontal" || orientation === "angle" ? tick : false,
                    y: orientation === "vertical" || orientation === "radius" ? tick : false,
                    motion
                  },
                  ruleProps,
                  {
                    class: cls("stroke-surface-content/10", classes.rule, ruleProps?.class)
                  }
                ]));
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (tickMarks) {
                $$payload3.out += "<!--[-->";
                const tickClasses = cls(layerClass("axis-tick"), "stroke-surface-content/50", classes.tick);
                if (orientation === "horizontal") {
                  $$payload3.out += "<!--[-->";
                  Line($$payload3, {
                    x1: tickCoords.x,
                    y1: tickCoords.y,
                    x2: tickCoords.x,
                    y2: tickCoords.y + (placement === "top" ? -tickLength : tickLength),
                    motion,
                    class: tickClasses
                  });
                } else if (orientation === "vertical") {
                  $$payload3.out += "<!--[1-->";
                  Line($$payload3, {
                    x1: tickCoords.x,
                    y1: tickCoords.y,
                    x2: tickCoords.x + (placement === "left" ? -tickLength : tickLength),
                    y2: tickCoords.y,
                    motion,
                    class: tickClasses
                  });
                } else if (orientation === "angle") {
                  $$payload3.out += "<!--[2-->";
                  Line($$payload3, {
                    x1: radialTickCoordsX,
                    y1: radialTickCoordsY,
                    x2: radialTickMarkCoordsX,
                    y2: radialTickMarkCoordsY,
                    motion,
                    class: tickClasses
                  });
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (tickLabel) {
                $$payload3.out += "<!--[-->";
                tickLabel($$payload3, { props: resolvedTickLabelProps, index });
                $$payload3.out += `<!---->`;
              } else {
                $$payload3.out += "<!--[!-->";
                Text($$payload3, spread_props([resolvedTickLabelProps]));
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Grid($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    x = false,
    y = false,
    xTicks,
    yTicks: yTicksProp,
    bandAlign = "center",
    radialY = "circle",
    motion,
    transitionIn: transitionInProp,
    transitionInParams = { easing: cubicIn },
    classes = {},
    class: className,
    ref: refProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  const yTicks = yTicksProp ?? (!isScaleBand(ctx.yScale) ? 4 : void 0);
  const tweenConfig = extractTweenConfig(motion);
  const transitionIn = transitionInProp ?? tweenConfig?.options ? fade : () => ({});
  const xTickVals = resolveTickVals(ctx.xScale, xTicks);
  const yTickVals = resolveTickVals(ctx.yScale, yTicks);
  const xBandOffset = isScaleBand(ctx.xScale) ? bandAlign === "between" ? -(ctx.xScale.padding() * ctx.xScale.step()) / 2 : ctx.xScale.step() / 2 - ctx.xScale.padding() * ctx.xScale.step() / 2 : 0;
  const yBandOffset = isScaleBand(ctx.yScale) ? bandAlign === "between" ? -(ctx.yScale.padding() * ctx.yScale.step()) / 2 : ctx.yScale.step() / 2 - ctx.yScale.padding() * ctx.yScale.step() / 2 : 0;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Group($$payload2, spread_props([
      {
        class: cls(layerClass("grid"), classes.root, className)
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
        children: ($$payload3) => {
          if (x) {
            $$payload3.out += "<!--[-->";
            const splineProps = extractLayerProps(x, "grid-x-line");
            Group($$payload3, {
              transitionIn,
              transitionInParams,
              class: layerClass("grid-x"),
              children: ($$payload4) => {
                const each_array = ensure_array_like(xTickVals);
                $$payload4.out += `<!--[-->`;
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let x2 = each_array[$$index];
                  if (ctx.radial) {
                    $$payload4.out += "<!--[-->";
                    const [x1, y1] = pointRadial(ctx.xScale(x2), ctx.yRange[0]);
                    const [x22, y2] = pointRadial(ctx.xScale(x2), ctx.yRange[1]);
                    Line($$payload4, spread_props([
                      { x1, y1, x2: x22, y2, motion: tweenConfig },
                      splineProps,
                      {
                        class: cls(layerClass("grid-x-radial-line"), "stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                    Rule($$payload4, spread_props([
                      { x: x2, xOffset: xBandOffset, motion },
                      splineProps,
                      {
                        class: cls(layerClass("grid-x-rule"), "stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  }
                  $$payload4.out += `<!--]-->`;
                }
                $$payload4.out += `<!--]--> `;
                if (isScaleBand(ctx.xScale) && bandAlign === "between" && !ctx.radial && xTickVals.length) {
                  $$payload4.out += "<!--[-->";
                  Rule($$payload4, spread_props([
                    {
                      x: xTickVals[xTickVals.length - 1],
                      xOffset: ctx.xScale.step() + xBandOffset,
                      motion
                    },
                    splineProps,
                    {
                      class: cls(layerClass("grid-x-end-rule"), "stroke-surface-content/10", classes.line, splineProps?.class)
                    }
                  ]));
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (y) {
            $$payload3.out += "<!--[-->";
            const splineProps = extractLayerProps(y, "grid-y-line");
            Group($$payload3, {
              transitionIn,
              transitionInParams,
              class: layerClass("grid-y"),
              children: ($$payload4) => {
                const each_array_1 = ensure_array_like(yTickVals);
                $$payload4.out += `<!--[-->`;
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let y2 = each_array_1[$$index_1];
                  if (ctx.radial) {
                    $$payload4.out += "<!--[-->";
                    if (radialY === "circle") {
                      $$payload4.out += "<!--[-->";
                      Circle($$payload4, spread_props([
                        { r: ctx.yScale(y2) + yBandOffset, motion },
                        splineProps,
                        {
                          class: cls(layerClass("grid-y-radial-circle"), "fill-none stroke-surface-content/10", classes.line, splineProps?.class)
                        }
                      ]));
                    } else {
                      $$payload4.out += "<!--[!-->";
                      Spline($$payload4, spread_props([
                        {
                          data: xTickVals.map((x2) => ({ x: x2, y: y2 })),
                          x: "x",
                          y: "y",
                          motion: tweenConfig,
                          curve: curveLinearClosed
                        },
                        splineProps,
                        {
                          class: cls(layerClass("grid-y-radial-line"), "stroke-surface-content/10", classes.line, splineProps?.class)
                        }
                      ]));
                    }
                    $$payload4.out += `<!--]-->`;
                  } else {
                    $$payload4.out += "<!--[!-->";
                    Rule($$payload4, spread_props([
                      { y: y2, yOffset: yBandOffset, motion },
                      splineProps,
                      {
                        class: cls(layerClass("grid-y-rule"), "stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  }
                  $$payload4.out += `<!--]-->`;
                }
                $$payload4.out += `<!--]--> `;
                if (isScaleBand(ctx.yScale) && bandAlign === "between" && yTickVals.length) {
                  $$payload4.out += "<!--[-->";
                  if (ctx.radial) {
                    $$payload4.out += "<!--[-->";
                    Circle($$payload4, spread_props([
                      {
                        r: ctx.yScale(yTickVals[yTickVals.length - 1]) + ctx.yScale.step() + yBandOffset,
                        motion
                      },
                      splineProps,
                      {
                        class: cls(layerClass("grid-y-radial-circle"), "fill-none stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                    Rule($$payload4, spread_props([
                      {
                        y: yTickVals[yTickVals.length - 1],
                        yOffset: ctx.yScale.step() + yBandOffset,
                        motion
                      },
                      splineProps,
                      {
                        class: cls(layerClass("grid-y-end-rule"), "stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  }
                  $$payload4.out += `<!--]-->`;
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref: refProp });
  pop();
}
function resolveInsets(insets) {
  const all = insets?.all ?? 0;
  const x = insets?.x ?? all;
  const y = insets?.y ?? all;
  const left = insets?.left ?? x;
  const right = insets?.right ?? x;
  const top = insets?.top ?? y;
  const bottom = insets?.bottom ?? y;
  return { left, right, bottom, top };
}
function createDimensionGetter(ctx, getOptions) {
  const options = getOptions?.();
  return (item) => {
    const insets = resolveInsets(options?.insets);
    const xDomainMinMax = ctx.xScale.domain();
    const yDomainMinMax = ctx.yScale.domain();
    const _x = accessor(options?.x ?? ctx.x);
    const _y = accessor(options?.y ?? ctx.y);
    const _x1 = accessor(options?.x1 ?? ctx.x1);
    const _y1 = accessor(options?.y1 ?? ctx.y1);
    if (isScaleBand(ctx.yScale)) {
      const y = firstValue(ctx.yScale(_y(item)) ?? 0) + (ctx.y1Scale ? ctx.y1Scale(_y1(item)) : 0) + insets.top;
      const height = Math.max(0, ctx.yScale.bandwidth ? (ctx.y1Scale ? ctx.y1Scale.bandwidth?.() ?? 0 : ctx.yScale.bandwidth()) - insets.bottom - insets.top : 0);
      const xValue = _x(item);
      let left = 0;
      let right = 0;
      if (Array.isArray(xValue)) {
        left = min(xValue);
        right = max(xValue);
      } else if (xValue == null) {
        left = 0;
        right = 0;
      } else if (xValue > 0) {
        left = max([0, xDomainMinMax[0]]);
        right = xValue;
      } else {
        left = xValue;
        right = min([0, xDomainMinMax[1]]);
      }
      const x = ctx.xScale(left) + insets.left;
      const width = Math.max(0, ctx.xScale(right) - ctx.xScale(left) - insets.left - insets.right);
      return { x, y, width, height };
    } else {
      const x = firstValue(ctx.xScale(_x(item))) + (ctx.x1Scale ? ctx.x1Scale(_x1(item)) : 0) + insets.left;
      const width = Math.max(0, ctx.xScale.bandwidth ? (ctx.x1Scale ? ctx.x1Scale.bandwidth?.() ?? 0 : ctx.xScale.bandwidth()) - insets.left - insets.right : 0);
      const yValue = _y(item);
      let top = 0;
      let bottom = 0;
      if (Array.isArray(yValue)) {
        top = max(yValue);
        bottom = min(yValue);
      } else if (yValue == null) {
        top = 0;
        bottom = 0;
      } else if (yValue > 0) {
        top = yValue;
        bottom = max([0, yDomainMinMax[0]]);
      } else {
        top = min([0, yDomainMinMax[1]]);
        bottom = yValue;
      }
      const y = ctx.yScale(top) + insets.top;
      const height = ctx.yScale(bottom) - ctx.yScale(top) - insets.bottom - insets.top;
      return { x, y, width, height };
    }
  };
}
function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}
function Bar($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    data,
    x = ctx.x,
    y = ctx.y,
    x1,
    y1,
    fill,
    fillOpacity,
    stroke: strokeProp = "black",
    strokeWidth = 0,
    opacity,
    radius = 0,
    rounded: roundedProp = "all",
    motion,
    insets,
    initialX,
    initialY,
    initialHeight,
    initialWidth,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const stroke = strokeProp === null || strokeProp === void 0 ? "black" : strokeProp;
  const getDimensions = createDimensionGetter(ctx, () => ({ x, y, x1, y1, insets }));
  const dimensions = getDimensions(data) ?? { x: 0, y: 0, width: 0, height: 0 };
  const isVertical = isScaleBand(ctx.xScale);
  const valueAccessor = accessor(isVertical ? y : x);
  const value = valueAccessor(data);
  const resolvedValue = Array.isArray(value) ? greatestAbs(value) : value;
  const rounded = roundedProp === "edge" ? isVertical ? resolvedValue >= 0 ? "top" : "bottom" : resolvedValue >= 0 ? "right" : "left" : roundedProp;
  const topLeft = ["all", "top", "left", "top-left"].includes(rounded);
  const topRight = ["all", "top", "right", "top-right"].includes(rounded);
  const bottomLeft = ["all", "bottom", "left", "bottom-left"].includes(rounded);
  const bottomRight = ["all", "bottom", "right", "bottom-right"].includes(rounded);
  const width = dimensions.width;
  const height = dimensions.height;
  const diameter = 2 * radius;
  const pathData = `M${dimensions.x + radius},${dimensions.y} h${width - diameter}
      ${topRight ? `a${radius},${radius} 0 0 1 ${radius},${radius}` : `h${radius}v${radius}`}
      v${height - diameter}
      ${bottomRight ? `a${radius},${radius} 0 0 1 ${-radius},${radius}` : `v${radius}h${-radius}`}
      h${diameter - width}
      ${bottomLeft ? `a${radius},${radius} 0 0 1 ${-radius},${-radius}` : `h${-radius}v${-radius}`}
      v${diameter - height}
      ${topLeft ? `a${radius},${radius} 0 0 1 ${radius},${-radius}` : `v${-radius}h${radius}`}
      z`.split("\n").join("");
  if (ctx.radial) {
    $$payload.out += "<!--[-->";
    Arc($$payload, spread_props([
      {
        innerRadius: dimensions.y,
        outerRadius: dimensions.y + dimensions.height,
        startAngle: dimensions.x,
        endAngle: dimensions.x + dimensions.width,
        fill,
        fillOpacity,
        stroke,
        strokeWidth,
        opacity,
        cornerRadius: radius
      },
      extractLayerProps(restProps, "bar")
    ]));
  } else if (rounded === "all" || rounded === "none" || radius === 0) {
    $$payload.out += "<!--[1-->";
    Rect($$payload, spread_props([
      {
        fill,
        fillOpacity,
        stroke,
        strokeWidth,
        opacity,
        rx: rounded === "none" ? 0 : radius,
        motion,
        initialX,
        initialY,
        initialHeight,
        initialWidth
      },
      dimensions,
      extractLayerProps(restProps, "bar")
    ]));
  } else {
    $$payload.out += "<!--[!-->";
    const tweenMotion = extractTweenConfig(motion);
    Spline($$payload, spread_props([
      {
        pathData,
        fill,
        fillOpacity,
        stroke,
        strokeWidth,
        opacity,
        motion: tweenMotion
      },
      extractLayerProps(restProps, "bar")
    ]));
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Highlight($$payload, $$props) {
  push();
  const ctx = getChartContext();
  const tooltipCtx = getTooltipContext();
  let {
    data,
    x: xProp = ctx.x,
    y: yProp = ctx.y,
    axis: axisProp,
    points = false,
    lines: linesProp = false,
    area = false,
    bar = false,
    motion = "spring",
    onAreaClick,
    onBarClick,
    onPointClick,
    onPointEnter,
    onPointLeave
  } = $$props;
  const x = accessor(xProp);
  const y = accessor(yProp);
  const highlightData = data ?? tooltipCtx.data;
  const xValue = x(highlightData);
  const xCoord = Array.isArray(xValue) ? xValue.map((v) => ctx.xScale(v)) : ctx.xScale(xValue);
  const xOffset = isScaleBand(ctx.xScale) && !ctx.radial ? ctx.xScale.bandwidth() / 2 : 0;
  const yValue = y(highlightData);
  const yCoord = Array.isArray(yValue) ? yValue.map((v) => ctx.yScale(v)) : ctx.yScale(yValue);
  const yOffset = isScaleBand(ctx.yScale) && !ctx.radial ? ctx.yScale.bandwidth() / 2 : 0;
  const axis = axisProp == null ? isScaleBand(ctx.yScale) ? "y" : "x" : axisProp;
  const _lines = (() => {
    let tmpLines = [];
    if (!highlightData) return tmpLines;
    if (axis === "x" || axis === "both") {
      if (Array.isArray(xCoord)) {
        tmpLines = [
          ...tmpLines,
          ...xCoord.filter(notNull).map((xItem, i) => ({
            x1: xItem + xOffset,
            y1: min(ctx.yRange),
            x2: xItem + xOffset,
            y2: max(ctx.yRange)
          }))
        ];
      } else if (xCoord != null) {
        tmpLines = [
          ...tmpLines,
          {
            x1: xCoord + xOffset,
            y1: min(ctx.yRange),
            x2: xCoord + xOffset,
            y2: max(ctx.yRange)
          }
        ];
      }
    }
    if (axis === "y" || axis === "both") {
      if (Array.isArray(yCoord)) {
        tmpLines = [
          ...tmpLines,
          ...yCoord.filter(notNull).map((yItem, i) => ({
            x1: min(ctx.xRange),
            y1: yItem + yOffset,
            x2: max(ctx.xRange),
            y2: yItem + yOffset
          }))
        ];
      } else if (yCoord != null) {
        tmpLines = [
          ...tmpLines,
          {
            x1: min(ctx.xRange),
            y1: yCoord + yOffset,
            x2: max(ctx.xRange),
            y2: yCoord + yOffset
          }
        ];
      }
    }
    if (ctx.radial) {
      tmpLines = tmpLines.map((l) => {
        const [x1, y1] = pointRadial(l.x1, l.y1);
        const [x2, y2] = pointRadial(l.x2, l.y2);
        return { ...l, x1, y1, x2, y2 };
      });
    }
    return tmpLines;
  })();
  const _area = (() => {
    const tmpArea = { x: 0, y: 0, width: 0, height: 0 };
    if (!highlightData) return tmpArea;
    if (axis === "x" || axis === "both") {
      if (Array.isArray(xCoord)) {
        tmpArea.width = max(xCoord) - min(xCoord);
      } else if (isScaleBand(ctx.xScale)) {
        tmpArea.width = ctx.xScale.step();
      } else {
        const index = ctx.flatData.findIndex((d) => Number(x(d)) === Number(x(highlightData)));
        const isLastPoint = index + 1 === ctx.flatData.length;
        const nextDataPoint = isLastPoint ? max(ctx.xDomain) : x(ctx.flatData[index + 1]);
        tmpArea.width = (ctx.xScale(nextDataPoint) ?? 0) - (xCoord ?? 0);
      }
      tmpArea.x = (Array.isArray(xCoord) ? min(xCoord) : xCoord) - (isScaleBand(ctx.xScale) ? ctx.xScale.padding() * ctx.xScale.step() / 2 : 0);
      if (axis === "x") {
        tmpArea.y = min(ctx.yRange);
        tmpArea.height = max(ctx.yRange) - min(ctx.yRange);
      }
    }
    if (axis === "y" || axis === "both") {
      if (Array.isArray(yCoord)) {
        tmpArea.height = max(yCoord) - min(yCoord);
      } else if (isScaleBand(ctx.yScale)) {
        tmpArea.height = ctx.yScale.step();
      } else {
        const index = ctx.flatData.findIndex((d) => Number(x(d)) === Number(x(highlightData)));
        const isLastPoint = index + 1 === ctx.flatData.length;
        const nextDataPoint = isLastPoint ? max(ctx.yDomain) : x(ctx.flatData[index + 1]);
        tmpArea.height = (ctx.yScale(nextDataPoint) ?? 0) - (yCoord ?? 0);
      }
      tmpArea.y = (Array.isArray(yCoord) ? min(yCoord) : yCoord) - (isScaleBand(ctx.yScale) ? ctx.yScale.padding() * ctx.yScale.step() / 2 : 0);
      if (axis === "y") {
        tmpArea.width = max(ctx.xRange);
      }
    }
    return tmpArea;
  })();
  const _points = (() => {
    let tmpPoints = [];
    if (!highlightData) return tmpPoints;
    if (Array.isArray(xCoord)) {
      if (Array.isArray(highlightData)) {
        const highlightSeriesPoint = highlightData;
        if (Array.isArray(ctx.data)) {
          const seriesPointsData = ctx.data.map((series) => {
            return {
              series,
              point: series.find((d) => y(d) === y(highlightSeriesPoint))
            };
          }).filter((d) => d.point);
          tmpPoints = seriesPointsData.map((seriesPoint, i) => {
            return {
              x: ctx.xScale(seriesPoint.point[1]) + xOffset,
              y: yCoord + yOffset,
              fill: ctx.config.c ? ctx.cGet(seriesPoint.series) : null,
              data: { x: seriesPoint.point[1], y: yValue }
            };
          });
        }
      } else {
        tmpPoints = xCoord.filter(notNull).map((xItem, i) => {
          const _key = ctx.config.x?.[i];
          return {
            x: xItem + xOffset,
            y: yCoord + yOffset,
            // TODO: is there a better way to expose the series key/value?
            fill: ctx.config.c ? ctx.cGet({ ...highlightData, $key: _key }) : null,
            data: {
              x: xValue,
              // TODO: use highlightData[$key]?
              y: yValue
            }
          };
        });
      }
    } else if (Array.isArray(yCoord)) {
      if (Array.isArray(highlightData)) {
        const highlightSeriesPoint = highlightData;
        if (Array.isArray(ctx.data)) {
          const seriesPointsData = ctx.data.map((series) => {
            return {
              series,
              point: series.find((d) => x(d) === x(highlightSeriesPoint))
            };
          }).filter((d) => d.point);
          tmpPoints = seriesPointsData.map((seriesPoint, i) => ({
            x: xCoord + xOffset,
            y: ctx.yScale(seriesPoint.point[1]) + yOffset,
            fill: ctx.config.c ? ctx.cGet(seriesPoint.series) : null,
            data: { x: xValue, y: seriesPoint.point[1] }
          }));
        }
      } else {
        tmpPoints = yCoord.filter(notNull).map((yItem, i) => {
          const _key = ctx.config.y[i];
          return {
            x: xCoord + xOffset,
            y: yItem + yOffset,
            // TODO: is there a better way to expose the series key/value?
            fill: ctx.config.c ? ctx.cGet({ ...highlightData, $key: _key }) : null,
            data: {
              x: xValue,
              y: yValue
              // TODO: use highlightData[$key] ?
            }
          };
        });
      }
    } else if (xCoord != null && yCoord != null) {
      tmpPoints = [
        {
          x: xCoord + xOffset,
          y: yCoord + yOffset,
          fill: ctx.config.c ? ctx.cGet(highlightData) : null,
          data: { x: xValue, y: yValue }
        }
      ];
    } else {
      tmpPoints = [];
    }
    if (ctx.radial) {
      tmpPoints = tmpPoints.map((p) => {
        const [x2, y2] = pointRadial(p.x, p.y);
        return { ...p, x: x2, y: y2 };
      });
    }
    return tmpPoints;
  })();
  const areaProps = extractLayerProps(area, "highlight-area");
  const barProps = extractLayerProps(bar, "highlight-bar");
  const linesProps = extractLayerProps(linesProp, "highlight-line");
  const pointsProps = extractLayerProps(points, "highlight-point");
  if (highlightData) {
    $$payload.out += "<!--[-->";
    if (area) {
      $$payload.out += "<!--[-->";
      if (typeof area === "function") {
        $$payload.out += "<!--[-->";
        area($$payload, { area: _area });
        $$payload.out += `<!---->`;
      } else if (ctx.radial) {
        $$payload.out += "<!--[1-->";
        Arc($$payload, {
          motion: motion === "spring" ? "spring" : void 0,
          startAngle: _area.x,
          endAngle: _area.x + _area.width,
          innerRadius: _area.y,
          outerRadius: _area.y + _area.height,
          class: cls(!areaProps.fill && "fill-surface-content/5", areaProps.class),
          onclick: onAreaClick && ((e) => onAreaClick(e, { data: highlightData }))
        });
      } else {
        $$payload.out += "<!--[!-->";
        Rect($$payload, spread_props([
          {
            motion: motion === "spring" ? "spring" : void 0
          },
          _area,
          areaProps,
          {
            class: cls(!areaProps.fill && "fill-surface-content/5", areaProps.class),
            onclick: onAreaClick && ((e) => onAreaClick(e, { data: highlightData }))
          }
        ]));
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (bar) {
      $$payload.out += "<!--[-->";
      if (typeof bar === "function") {
        $$payload.out += "<!--[-->";
        bar($$payload);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        Bar($$payload, spread_props([
          {
            motion: motion === "spring" ? "spring" : void 0,
            data: highlightData
          },
          barProps,
          {
            class: cls(!barProps.fill && "fill-primary", barProps.class),
            onclick: onBarClick && ((e) => onBarClick(e, { data: highlightData }))
          }
        ]));
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (linesProp) {
      $$payload.out += "<!--[-->";
      if (typeof linesProp === "function") {
        $$payload.out += "<!--[-->";
        linesProp($$payload, { lines: _lines });
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array = ensure_array_like(_lines);
        $$payload.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let line2 = each_array[$$index];
          Line($$payload, spread_props([
            {
              motion: motion === "spring" ? "spring" : void 0,
              x1: line2.x1,
              y1: line2.y1,
              x2: line2.x2,
              y2: line2.y2
            },
            linesProps,
            {
              class: cls("stroke-surface-content/20 stroke-2 [stroke-dasharray:2,2] pointer-events-none", linesProps.class)
            }
          ]));
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (points) {
      $$payload.out += "<!--[-->";
      if (typeof points === "function") {
        $$payload.out += "<!--[-->";
        points($$payload, { points: _points });
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array_1 = ensure_array_like(_points);
        $$payload.out += `<!--[-->`;
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let point = each_array_1[$$index_1];
          Circle($$payload, spread_props([
            {
              motion: motion === "spring" ? "spring" : void 0,
              cx: point.x,
              cy: point.y,
              fill: point.fill,
              r: 4,
              strokeWidth: 6
            },
            pointsProps,
            {
              class: cls("stroke-white [paint-order:stroke] drop-shadow-sm", !point.fill && (typeof points === "boolean" || !points.fill) && "fill-primary", pointsProps.class),
              onpointerdown: onPointClick && ((e) => {
                e.stopPropagation();
              }),
              onclick: onPointClick && ((e) => onPointClick(e, { point, data: highlightData })),
              onpointerenter: onPointEnter && ((e) => {
                if (onPointClick) {
                  asAny(e.target).style.cursor = "pointer";
                }
                onPointEnter(e, { point, data: highlightData });
              }),
              onpointerleave: onPointLeave && ((e) => {
                if (onPointClick) {
                  asAny(e.target).style.cursor = "default";
                }
                onPointLeave(e, { point, data: highlightData });
              })
            }
          ]));
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function isSamePoint(p1, p2) {
  return Math.abs(p1.x - p2.x) < 1e-6 && Math.abs(p1.y - p2.y) < 1e-6;
}
function createDirectPath(source2, target) {
  if (isSamePoint(source2, target))
    return "";
  return `M ${source2.x} ${source2.y} L ${target.x} ${target.y}`;
}
function isNearZero(value) {
  return Math.abs(value) < 1e-6;
}
function createSquarePath({ source: source2, target, sweep }) {
  if (sweep === "horizontal-vertical") {
    return `M ${source2.x} ${source2.y} L ${target.x} ${source2.y} L ${target.x} ${target.y}`;
  } else {
    return `M ${source2.x} ${source2.y} L ${source2.x} ${target.y} L ${target.x} ${target.y}`;
  }
}
function createBeveledPath(opts) {
  const { radius, dx, dy, source: source2, target, sweep } = opts;
  const effectiveRadius = Math.max(0, Math.min(radius, Math.abs(dx), Math.abs(dy)));
  if (isNearZero(effectiveRadius)) {
    return createSquarePath(opts);
  }
  const signX = Math.sign(dx);
  const signY = Math.sign(dy);
  if (sweep === "horizontal-vertical") {
    const pBeforeCorner = { x: target.x - effectiveRadius * signX, y: source2.y };
    const pAfterCorner = { x: target.x, y: source2.y + effectiveRadius * signY };
    return `M ${source2.x} ${source2.y} L ${pBeforeCorner.x} ${pBeforeCorner.y} L ${pAfterCorner.x} ${pAfterCorner.y} L ${target.x} ${target.y}`;
  } else {
    const pBeforeCorner = { x: source2.x, y: target.y - effectiveRadius * signY };
    const pAfterCorner = { x: source2.x + effectiveRadius * signX, y: target.y };
    return `M ${source2.x} ${source2.y} L ${pBeforeCorner.x} ${pBeforeCorner.y} L ${pAfterCorner.x} ${pAfterCorner.y} L ${target.x} ${target.y}`;
  }
}
function createRoundedPath(opts) {
  const { radius, dx, dy, source: source2, target, sweep } = opts;
  const effectiveRadius = Math.max(0, Math.min(radius, Math.abs(dx), Math.abs(dy)));
  if (isNearZero(effectiveRadius)) {
    return createSquarePath(opts);
  }
  const signX = Math.sign(dx);
  const signY = Math.sign(dy);
  if (sweep === "horizontal-vertical") {
    const pBeforeCorner = { x: target.x - effectiveRadius * signX, y: source2.y };
    const pAfterCorner = { x: target.x, y: source2.y + effectiveRadius * signY };
    const sweepFlag = signX * signY > 0 ? 1 : 0;
    return `M ${source2.x} ${source2.y} L ${pBeforeCorner.x} ${pBeforeCorner.y} A ${effectiveRadius} ${effectiveRadius} 0 0 ${sweepFlag} ${pAfterCorner.x} ${pAfterCorner.y} L ${target.x} ${target.y}`;
  } else {
    const pBeforeCorner = { x: source2.x, y: target.y - effectiveRadius * signY };
    const pAfterCorner = { x: source2.x + effectiveRadius * signX, y: target.y };
    const sweepFlag = signX * signY > 0 ? 0 : 1;
    return `M ${source2.x} ${source2.y} L ${pBeforeCorner.x} ${pBeforeCorner.y} A ${effectiveRadius} ${effectiveRadius} 0 0 ${sweepFlag} ${pAfterCorner.x} ${pAfterCorner.y} L ${target.x} ${target.y}`;
  }
}
const pathStrategies = {
  square: createSquarePath,
  beveled: createBeveledPath,
  rounded: createRoundedPath
};
function getConnectorPresetPath(opts) {
  const { source: source2, target, type } = opts;
  if (isSamePoint(source2, target))
    return "";
  const dx = target.x - source2.x;
  const dy = target.y - source2.y;
  if (type === "straight" || isNearZero(dx) || isNearZero(dy)) {
    return createDirectPath(source2, target);
  }
  return (pathStrategies[type] || pathStrategies.square)({ ...opts, dx, dy });
}
const FALLBACK_PATH = "M0,0L0,0";
function getConnectorD3Path({ source: source2, target, sweep, curve }) {
  const dx = target.x - source2.x;
  const dy = target.y - source2.y;
  const line$1 = line().curve(curve);
  let points = [];
  const isAligned = isNearZero(dx) || isNearZero(dy);
  if (sweep === "none" || isAligned) {
    points = [
      [source2.x, source2.y],
      [target.x, target.y]
    ];
  } else if (sweep === "horizontal-vertical") {
    points = [
      [source2.x, source2.y],
      [target.x, source2.y],
      [target.x, target.y]
    ];
  } else if (sweep === "vertical-horizontal") {
    points = [
      [source2.x, source2.y],
      [source2.x, target.y],
      [target.x, target.y]
    ];
  }
  if (points.length === 2 && isNearZero(dx) && isNearZero(dx))
    return FALLBACK_PATH;
  const d = line$1(points);
  if (!d || d.includes("NaN"))
    return FALLBACK_PATH;
  return d;
}
function Connector($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    source: source2 = { x: 0, y: 0 },
    target = { x: 100, y: 100 },
    sweep: sweepProp,
    type = "rounded",
    radius = 20,
    curve = curveLinear,
    pathRef = void 0,
    pathData: pathDataProp,
    marker,
    markerStart,
    markerMid,
    markerEnd,
    motion,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const sweep = (() => {
    if (sweepProp) return sweepProp;
    if (type === "d3") return "none";
    return "horizontal-vertical";
  })();
  const markerStartId = markerStart || marker ? createId("marker-start", uid) : "";
  const markerMidId = markerMid || marker ? createId("marker-mid", uid) : "";
  const markerEndId = markerEnd || marker ? createId("marker-end", uid) : "";
  const extractedTween = extractTweenConfig(motion);
  const tweenOptions = extractedTween ? {
    type: extractedTween.type,
    options: {
      interpolate: interpolatePath,
      ...extractedTween.options
    }
  } : void 0;
  const pathData = (() => {
    if (pathDataProp) return pathDataProp;
    if (type === "d3") {
      return getConnectorD3Path({ source: source2, target, sweep, curve });
    } else {
      return getConnectorPresetPath({ source: source2, target, sweep, type, radius });
    }
  })();
  const motionPath = createMotion("", () => pathData, tweenOptions ? tweenOptions : { type: "none" });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Spline($$payload2, spread_props([
      {
        pathData: motionPath.current,
        "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
        "marker-mid": markerMidId ? `url(#${markerMidId})` : void 0,
        "marker-end": markerEndId ? `url(#${markerEndId})` : void 0
      },
      extractLayerProps(restProps, "connector"),
      restProps,
      {
        get pathRef() {
          return pathRef;
        },
        set pathRef($$value) {
          pathRef = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!----> `;
    MarkerWrapper($$payload2, { id: markerStartId, marker: markerStart });
    $$payload2.out += `<!----> `;
    MarkerWrapper($$payload2, { id: markerMidId, marker: markerMid });
    $$payload2.out += `<!----> `;
    MarkerWrapper($$payload2, { id: markerEndId, marker: markerEnd });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { pathRef });
  pop();
}
const FALLBACK_COORDS = { x: 0, y: 0 };
function Link($$payload, $$props) {
  push();
  let {
    data,
    sankey = false,
    source: sourceProp,
    target: targetProp,
    orientation: orientationProp,
    x: xProp,
    y: yProp,
    curve: curveProp,
    explicitCoords,
    type = "d3",
    sweep = "none",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const sourceAccessor = (() => {
    if (sourceProp) return sourceProp;
    if (sankey) return (d) => ({ node: d.source, y: d.y0, isSource: true });
    return (d) => d.source;
  })();
  const targetAccessor = (() => {
    if (targetProp) return targetProp;
    if (sankey) return (d) => ({ node: d.target, y: d.y1, isSource: false });
    return (d) => d.target;
  })();
  const orientation = (() => {
    if (orientationProp) return orientationProp;
    if (sankey) return "horizontal";
    return "vertical";
  })();
  const curve = (() => {
    if (curveProp) return curveProp;
    if (orientation === "horizontal") return curveBumpX;
    return curveBumpY;
  })();
  const xAccessor = (() => {
    if (xProp) return xProp;
    if (sankey) return (d) => d.isSource ? d.node.x1 : d.node.x0;
    return (d) => orientation === "horizontal" ? d.y : d.x;
  })();
  const yAccessor = (() => {
    if (yProp) return yProp;
    if (sankey) return (d) => d.y;
    return (d) => orientation === "horizontal" ? d.x : d.y;
  })();
  const sourceCoords = (() => {
    if (explicitCoords) return { x: explicitCoords.x1, y: explicitCoords.y1 };
    if (!data) return FALLBACK_COORDS;
    try {
      const sourceData = sourceAccessor(data);
      if (sourceData == null) return FALLBACK_COORDS;
      const xVal = xAccessor(sourceData);
      const yVal = yAccessor(sourceData);
      return {
        x: Number.isFinite(xVal) ? xVal : 0,
        y: Number.isFinite(yVal) ? yVal : 0
      };
    } catch (e) {
      console.error("Error accessing source coordinates:", e, "Data:", data);
      return FALLBACK_COORDS;
    }
  })();
  const targetCoords = (() => {
    if (explicitCoords) return { x: explicitCoords.x2, y: explicitCoords.y2 };
    if (!data) return FALLBACK_COORDS;
    try {
      const targetData = targetAccessor(data);
      if (targetData == null) return FALLBACK_COORDS;
      const xVal = xAccessor(targetData);
      const yVal = yAccessor(targetData);
      return {
        x: Number.isFinite(xVal) ? xVal : 0,
        y: Number.isFinite(yVal) ? yVal : 0
      };
    } catch (e) {
      console.error("Error accessing target coordinates:", e, "Data:", data);
      return FALLBACK_COORDS;
    }
  })();
  Connector($$payload, spread_props([
    {
      source: sourceCoords,
      target: targetCoords,
      type,
      curve,
      sweep
    },
    extractLayerProps(restProps, "link")
  ]));
  pop();
}
function Points($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    data,
    x,
    y,
    r = 5,
    offsetX,
    offsetY,
    links = false,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    opacity,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  function getOffset(value, offset, scale) {
    if (typeof offset === "function") {
      return offset(value, ctx);
    } else if (offset != null) {
      return offset;
    } else if (isScaleBand(scale) && !ctx.radial) {
      return scale.bandwidth() / 2;
    } else {
      return 0;
    }
  }
  const xAccessor = x ? accessor(x) : ctx.x;
  const yAccessor = y ? accessor(y) : ctx.y;
  const pointsData = data ?? ctx.data;
  const getPointObject = (xVal, yVal, d) => {
    const scaledX = ctx.xScale(xVal);
    const scaledY = ctx.yScale(yVal);
    return {
      x: scaledX + getOffset(scaledX, offsetX, ctx.xScale),
      y: scaledY + getOffset(scaledY, offsetY, ctx.yScale),
      r: ctx.config.r ? ctx.rGet(d) : r,
      xValue: xVal,
      yValue: yVal,
      data: d
    };
  };
  const points = pointsData.flatMap((d) => {
    const xValue = xAccessor(d);
    const yValue = yAccessor(d);
    if (Array.isArray(xValue)) {
      return xValue.filter(Boolean).map((xVal) => getPointObject(xVal, yValue, d));
    } else if (Array.isArray(yValue)) {
      return yValue.filter(Boolean).map((yVal) => getPointObject(xValue, yVal, d));
    } else if (xValue != null && yValue != null) {
      return getPointObject(xValue, yValue, d);
    }
    return [];
  });
  const _links = pointsData.flatMap((d) => {
    const xValue = xAccessor(d);
    const yValue = yAccessor(d);
    if (Array.isArray(xValue)) {
      const [xMin, xMax] = extent(ctx.xGet(d));
      const y2 = ctx.yGet(d) + getOffset(ctx.yGet(d), offsetY, ctx.yScale);
      return {
        source: {
          x: xMin + getOffset(xMin, offsetX, ctx.xScale) + (ctx.config.r ? ctx.rGet(d) : r),
          y: y2
        },
        target: {
          x: xMax + getOffset(xMax, offsetX, ctx.xScale) - (ctx.config.r ? ctx.rGet(d) : r),
          y: y2
        },
        data: d
      };
    } else if (Array.isArray(yValue)) {
      const x2 = ctx.xGet(d) + getOffset(ctx.xGet(d), offsetX, ctx.xScale);
      const [yMin, yMax] = extent(ctx.yGet(d));
      return {
        source: {
          x: x2,
          y: yMin + getOffset(yMin, offsetY, ctx.yScale)
        },
        target: {
          x: x2,
          y: yMax + getOffset(yMax, offsetY, ctx.yScale)
        },
        data: d
      };
    }
  });
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload, { points });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_1 = ensure_array_like(points);
    if (links) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(_links);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let link = each_array[$$index];
        Link($$payload, spread_props([
          {
            data: link,
            stroke: fill ?? (ctx.config.c ? ctx.cGet(link.data) : null)
          },
          extractLayerProps(links, "points-link")
        ]));
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let point = each_array_1[$$index_1];
      const radialPoint = pointRadial(point.x, point.y);
      Circle($$payload, spread_props([
        {
          cx: ctx.radial ? radialPoint[0] : point.x,
          cy: ctx.radial ? radialPoint[1] : point.y,
          r: point.r,
          fill: fill ?? (ctx.config.c ? ctx.cGet(point.data) : null),
          fillOpacity,
          stroke,
          strokeWidth,
          opacity
        },
        extractLayerProps(restProps, "point")
      ]));
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Labels($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    data,
    value,
    x,
    y,
    placement = "outside",
    offset = placement === "center" ? 0 : 4,
    format: format$1,
    key = (_, i) => i,
    children: childrenProp,
    class: className,
    fill,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  function getTextProps(point) {
    const pointValue = isScaleBand(ctx.yScale) ? point.xValue : point.yValue;
    const fillValue = typeof fill === "function" ? accessor(fill)(point.data) : fill;
    const displayValue = value ? accessor(value)(point.data) : isScaleBand(ctx.yScale) ? point.xValue : point.yValue;
    const formattedValue = format(
      displayValue,
      // @ts-expect-error - improve types
      format$1 ?? (value ? void 0 : isScaleBand(ctx.yScale) ? ctx.xScale.tickFormat?.() : ctx.yScale.tickFormat?.())
    );
    if (isScaleBand(ctx.yScale)) {
      if (pointValue < 0) {
        return {
          value: formattedValue,
          fill: fillValue,
          x: point.x + (placement === "outside" ? -offset : offset),
          y: point.y,
          textAnchor: placement === "outside" ? "end" : "start",
          verticalAnchor: "middle",
          capHeight: ".6rem"
        };
      } else {
        return {
          value: formattedValue,
          fill: fillValue,
          x: point.x + (placement === "outside" ? offset : -offset),
          y: point.y,
          textAnchor: placement === "outside" ? "start" : "end",
          verticalAnchor: "middle",
          capHeight: ".6rem"
        };
      }
    } else {
      if (pointValue < 0) {
        return {
          value: formattedValue,
          fill: fillValue,
          x: point.x,
          y: point.y + (placement === "outside" ? offset : -offset),
          capHeight: ".6rem",
          textAnchor: "middle",
          verticalAnchor: placement === "center" ? "middle" : placement === "outside" ? "start" : "end"
        };
      } else {
        return {
          value: formattedValue,
          fill: fillValue,
          x: point.x,
          y: point.y + (placement === "outside" ? -offset : offset),
          capHeight: ".6rem",
          textAnchor: "middle",
          verticalAnchor: placement === "center" ? "middle" : placement === "outside" ? "end" : "start"
        };
      }
    }
  }
  Group($$payload, {
    class: layerClass("labels-g"),
    children: ($$payload2) => {
      {
        let children = function($$payload3, { points }) {
          const each_array = ensure_array_like(points);
          $$payload3.out += `<!--[-->`;
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let point = each_array[i];
            const textProps = extractLayerProps(getTextProps(point), "labels-text");
            if (childrenProp) {
              $$payload3.out += "<!--[-->";
              childrenProp($$payload3, { data: point, textProps });
              $$payload3.out += `<!---->`;
            } else {
              $$payload3.out += "<!--[!-->";
              Text($$payload3, spread_props([
                textProps,
                restProps,
                {
                  class: cls("text-xs", placement === "inside" ? "fill-surface-300 stroke-surface-content" : "fill-surface-content stroke-surface-100", textProps.class, className)
                }
              ]));
            }
            $$payload3.out += `<!--]-->`;
          }
          $$payload3.out += `<!--]-->`;
        };
        Points($$payload2, {
          data,
          x,
          y,
          children,
          $$slots: { default: true }
        });
      }
    },
    $$slots: { default: true }
  });
  pop();
}
function DefaultTooltip($$payload, $$props) {
  push();
  let {
    tooltipProps,
    seriesState,
    canHaveTotal = false
  } = $$props;
  const context = getChartContext();
  $$payload.out += `<!---->`;
  {
    let children = function($$payload2, { data, payload }) {
      $$payload2.out += `<!---->`;
      TooltipHeader($$payload2, spread_props([
        { value: payload[0].label, format },
        tooltipProps?.header
      ]));
      $$payload2.out += `<!----> <!---->`;
      TooltipList($$payload2, spread_props([
        tooltipProps?.list,
        {
          children: ($$payload3) => {
            const each_array = ensure_array_like(payload);
            $$payload3.out += `<!--[-->`;
            for (let i = 0, $$length = each_array.length; i < $$length; i++) {
              let p = each_array[i];
              $$payload3.out += `<!---->`;
              TooltipItem($$payload3, spread_props([
                {
                  label: p.name,
                  value: p.value,
                  color: p.color,
                  format,
                  valueAlign: "right",
                  onpointerenter: () => seriesState.highlightKey.current = p.key,
                  onpointerleave: () => seriesState.highlightKey.current = null
                },
                tooltipProps?.item
              ]));
              $$payload3.out += `<!---->`;
            }
            $$payload3.out += `<!--]--> `;
            if (canHaveTotal && payload.length > 1 && !tooltipProps?.hideTotal) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<!---->`;
              TooltipSeparator($$payload3, spread_props([
                tooltipProps?.separator,
                { children: void 0 }
              ]));
              $$payload3.out += `<!----> <!---->`;
              TooltipItem($$payload3, spread_props([
                {
                  label: "total",
                  value: sum(seriesState.visibleSeries, (s) => {
                    const seriesTooltipData = s.data ? findRelatedData(s.data, data, context.x) : data;
                    const valueAccessor = accessor(s.value ?? (s.data ? context.y : s.key));
                    return valueAccessor(seriesTooltipData);
                  }),
                  format: "integer",
                  valueAlign: "right"
                },
                tooltipProps?.item
              ]));
              $$payload3.out += `<!---->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        }
      ]));
      $$payload2.out += `<!---->`;
    };
    Tooltip($$payload, spread_props([
      { context },
      tooltipProps?.root,
      { children, $$slots: { default: true } }
    ]));
  }
  $$payload.out += `<!---->`;
  pop();
}
function AnnotationLine($$payload, $$props) {
  push();
  const {
    x,
    y,
    label,
    labelPlacement = "top-right",
    labelXOffset = 0,
    labelYOffset = 0,
    props
  } = $$props;
  const ctx = getChartContext();
  const isVertical = x != null;
  const line2 = {
    x1: x ? ctx.xScale(x) : ctx.xRange[0],
    y1: y && !x ? ctx.yScale(y) : ctx.yRange[0],
    x2: x ? ctx.xScale(x) : ctx.xRange[1],
    y2: y ? ctx.yScale(y) : ctx.yRange[1]
  };
  const labelProps = isVertical ? {
    x: line2.x1 + (labelPlacement.includes("left") ? -labelXOffset : labelXOffset),
    y: (labelPlacement.includes("top") ? line2.y2 : labelPlacement.includes("bottom") ? line2.y1 : (line2.y1 - line2.y2) / 2) + (["top", "bottom-left", "bottom-right"].includes(labelPlacement) ? -labelYOffset : labelYOffset),
    dy: -2,
    // adjust for smaller font size
    textAnchor: labelPlacement.includes("left") ? "end" : labelPlacement.includes("right") ? "start" : "middle",
    verticalAnchor: labelPlacement === "top" ? "end" : labelPlacement === "bottom" ? "start" : labelPlacement.includes("top") ? "start" : labelPlacement.includes("bottom") ? "end" : "middle"
    // place above line// place below line
  } : {
    x: (labelPlacement.includes("left") ? line2.x1 : labelPlacement.includes("right") ? line2.x2 : (line2.x2 - line2.x1) / 2) + (["left", "top-right", "bottom-right"].includes(labelPlacement) ? -labelXOffset : labelXOffset),
    y: line2.y1 + (labelPlacement.includes("top") ? -labelYOffset : labelYOffset),
    dy: -2,
    // adjust for smaller font size
    textAnchor: labelPlacement === "left" ? "end" : labelPlacement === "right" ? "start" : labelPlacement.includes("left") ? "start" : labelPlacement.includes("right") ? "end" : "middle",
    // place beside line
    // place beside line
    verticalAnchor: labelPlacement.includes("top") ? "end" : labelPlacement.includes("bottom") ? "start" : "middle"
  };
  Line($$payload, spread_props([
    {
      x1: line2.x1,
      y1: line2.y1,
      x2: line2.x2,
      y2: line2.y2
    },
    props?.line,
    {
      class: cls("stroke-surface-content", props?.line?.class)
    }
  ]));
  $$payload.out += `<!----> `;
  if (label) {
    $$payload.out += "<!--[-->";
    Text($$payload, spread_props([
      { value: label },
      labelProps,
      props?.label,
      {
        class: cls("text-xs pointer-events-none", props?.label?.class)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function AnnotationPoint($$payload, $$props) {
  push();
  const {
    x,
    y,
    r = 4,
    label,
    labelPlacement = "center",
    labelXOffset = 0,
    labelYOffset = 0,
    details,
    props
  } = $$props;
  const ctx = getChartContext();
  const point = {
    x: x ? ctx.xScale(x) + (isScaleBand(ctx.xScale) ? ctx.xScale.bandwidth() / 2 : 0) : 0,
    y: y ? ctx.yScale(y) + (isScaleBand(ctx.yScale) ? ctx.yScale.bandwidth() / 2 : 0) : ctx.height
  };
  const labelProps = {
    x: point.x + ((["top", "center", "bottom"].includes(labelPlacement) ? 0 : r) + labelXOffset) * (labelPlacement.includes("left") ? -1 : 1),
    y: point.y + ((["left", "center", "right"].includes(labelPlacement) ? 0 : r) + labelYOffset) * (labelPlacement.includes("top") ? -1 : 1),
    dy: -2,
    // adjust for smaler font size
    textAnchor: labelPlacement.includes("left") ? "end" : labelPlacement.includes("right") ? "start" : "middle",
    verticalAnchor: labelPlacement.includes("top") ? "end" : labelPlacement.includes("bottom") ? "start" : "middle"
  };
  Circle($$payload, spread_props([
    {
      cx: point.x,
      cy: point.y,
      r,
      onpointermove: (e) => {
        if (details) {
          e.stopPropagation();
          ctx.tooltip.show(e, { annotation: { label, details } });
        }
      },
      onpointerleave: () => {
        if (details) {
          ctx.tooltip.hide();
        }
      }
    },
    props?.circle,
    {
      class: cls("stroke-surface-100", props?.circle?.class)
    }
  ]));
  $$payload.out += `<!----> `;
  if (label) {
    $$payload.out += "<!--[-->";
    Text($$payload, spread_props([
      { value: label },
      labelProps,
      props?.label,
      {
        class: cls("text-xs pointer-events-none", props?.label?.class)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function LinearGradient($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("linearGradient-", uid),
    stops = [
      "var(--tw-gradient-from)",
      "var(--tw-gradient-to)"
    ],
    vertical = false,
    x1 = "0%",
    y1 = "0%",
    x2 = vertical ? "0%" : "100%",
    y2 = vertical ? "100%" : "0%",
    rotate,
    units = "objectBoundingBox",
    ref: refProp = void 0,
    class: className,
    stopsContent,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  getChartContext();
  const renderCtx = getRenderContext();
  let canvasGradient = void 0;
  if (renderCtx === "canvas") {
    registerCanvasComponent();
  }
  if (renderCtx === "canvas") {
    $$payload.out += "<!--[-->";
    children?.($$payload, { id, gradient: asAny(canvasGradient) });
    $$payload.out += `<!---->`;
  } else if (renderCtx === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<defs><linearGradient${spread_attributes(
      {
        id,
        x1,
        y1,
        x2,
        y2,
        gradientTransform: rotate ? `rotate(${rotate})` : "",
        gradientUnits: units,
        ...extractLayerProps(restProps, "linear-gradient")
      },
      null,
      void 0,
      void 0,
      3
    )}>`;
    if (stopsContent) {
      $$payload.out += "<!--[-->";
      stopsContent?.($$payload);
      $$payload.out += `<!---->`;
    } else if (stops) {
      $$payload.out += "<!--[1-->";
      const each_array = ensure_array_like(stops);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let stop = each_array[i];
        if (Array.isArray(stop)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<stop${attr("offset", stop[0])}${attr("stop-color", stop[1])}${attr_class(clsx(cls(layerClass("linear-gradient-stop"), className)))}></stop>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<stop${attr("offset", `${stringify(i * (100 / (stops.length - 1)))}%`)}${attr("stop-color", stop)}${attr_class(clsx(cls(layerClass("linear-gradient-stop"), className)))}></stop>`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></linearGradient></defs>`;
    children?.($$payload, { id, gradient: `url(#${id})` });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
function Pattern($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("pattern-", uid),
    size = 4,
    width = size,
    height = size,
    lines: linesProp,
    circles: circlesProp,
    background,
    patternContent,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const renderCtx = getRenderContext();
  let canvasPattern = null;
  let shapes = [];
  if (linesProp) {
    const lineDefs = Array.isArray(linesProp) ? linesProp : linesProp === true ? [{}] : [linesProp];
    for (const line2 of lineDefs) {
      const stroke = line2.color ?? "var(--color-surface-content)";
      const strokeWidth = line2.width ?? 1;
      const opacity = line2.opacity ?? 1;
      let rotate = Math.round(line2.rotate ?? 0) % 360;
      if (rotate > 180) rotate = rotate - 360;
      else if (rotate > 90) rotate = rotate - 180;
      else if (rotate < -180) rotate = rotate + 360;
      else if (rotate < -90) rotate = rotate + 180;
      let path2 = "";
      if (rotate === 0) {
        path2 = `
        M 0 0 L ${width} 0
        M 0 ${height} L ${width} ${height}
    `;
      } else if (rotate === 90) {
        path2 = `
        M 0 0 L 0 ${height}
        M ${width} 0 L ${width} ${height}
    `;
      } else {
        if (rotate > 0) {
          path2 = `
          M 0 ${-height} L ${width * 2} ${height}
          M ${-width} ${-height} L ${width} ${height}
          M ${-width} 0 L ${width} ${height * 2}
      `;
        } else {
          path2 = `
          M ${-width} ${height} L ${width} ${-height}
          M ${-width} ${height * 2} L ${width * 2} ${-height}
          M 0 ${height * 2} L ${width * 2} 0
      `;
        }
      }
      shapes.push({
        type: "line",
        path: path2,
        stroke,
        strokeWidth,
        opacity
      });
    }
  }
  if (circlesProp) {
    const circleDefs = Array.isArray(circlesProp) ? circlesProp : circlesProp === true ? [{}] : [circlesProp];
    for (const circle of circleDefs) {
      if (circle.stagger) {
        shapes.push(
          {
            type: "circle",
            cx: size / 4,
            cy: size / 4,
            r: circle.radius ?? 1,
            fill: circle.color ?? "var(--color-surface-content)",
            opacity: circle.opacity ?? 1
          },
          {
            type: "circle",
            cx: size * 3 / 4,
            cy: size * 3 / 4,
            r: circle.radius ?? 1,
            fill: circle.color ?? "var(--color-surface-content)",
            opacity: circle.opacity ?? 1
          }
        );
      } else {
        shapes.push({
          type: "circle",
          cx: size / 2,
          cy: size / 2,
          r: circle.radius ?? 1,
          fill: circle.color ?? "var(--color-surface-content)",
          opacity: circle.opacity ?? 1
        });
      }
    }
  }
  if (renderCtx === "canvas") {
    registerCanvasComponent();
  }
  if (renderCtx === "canvas") {
    $$payload.out += "<!--[-->";
    children?.($$payload, { id, pattern: asAny(canvasPattern) });
    $$payload.out += `<!---->`;
  } else if (renderCtx === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<defs><pattern${spread_attributes(
      {
        id,
        width,
        height,
        patternUnits: "userSpaceOnUse",
        ...extractLayerProps(restProps, "pattern")
      },
      null,
      void 0,
      void 0,
      3
    )}>`;
    if (patternContent) {
      $$payload.out += "<!--[-->";
      patternContent?.($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(shapes.filter((shape) => shape.type === "line"));
      const each_array_1 = ensure_array_like(shapes.filter((shape) => shape.type === "circle"));
      if (background) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<rect${attr("width", width)}${attr("height", height)}${attr("fill", background)}></rect>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let line2 = each_array[$$index];
        $$payload.out += `<path${attr("d", line2.path)}${attr("stroke", line2.stroke)}${attr("stroke-width", line2.strokeWidth)} fill="none"${attr("opacity", line2.opacity)}></path>`;
      }
      $$payload.out += `<!--]--><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let circle = each_array_1[$$index_1];
        $$payload.out += `<circle${attr("cx", circle.cx)}${attr("cy", circle.cy)}${attr("r", circle.r)}${attr("fill", circle.fill)}${attr("opacity", circle.opacity)}></circle>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></pattern></defs>`;
    children?.($$payload, { id, pattern: `url(#${id})` });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function AnnotationRange($$payload, $$props) {
  push();
  const {
    x,
    y,
    fill,
    class: className,
    gradient,
    pattern,
    label,
    labelPlacement = "center",
    labelXOffset = 0,
    labelYOffset = 0,
    props
  } = $$props;
  const ctx = getChartContext();
  const rect = {
    x: x ? ctx.xScale(x[0] ?? ctx.xDomain[0]) - (isScaleBand(ctx.xScale) ? ctx.xScale.padding() * ctx.xScale.step() / 2 : 0) : ctx.xRange[0],
    y: y ? ctx.yScale(y[1] ?? ctx.yDomain[1]) : ctx.yRange[1],
    width: x ? ctx.xScale(x[1] ?? ctx.xDomain[1]) - ctx.xScale(x[0] ?? ctx.xDomain[0]) + (isScaleBand(ctx.xScale) ? ctx.xScale.step() : 0) : ctx.width,
    height: y ? ctx.yScale(y[0] ?? ctx.yDomain[0]) - ctx.yScale(y[1] ?? ctx.yDomain[1]) : ctx.height
  };
  const labelProps = {
    x: ((labelPlacement.includes("left") ? rect.x : labelPlacement.includes("right") ? (rect.x ?? 0) + rect.width : (rect.x ?? 0) + rect.width / 2) ?? 0) + (labelPlacement.includes("right") ? -labelXOffset : labelXOffset),
    y: ((labelPlacement.includes("top") ? rect.y : labelPlacement.includes("bottom") ? (rect.y ?? 0) + rect.height : (rect.y ?? 0) + rect.height / 2) ?? 0) + (labelPlacement.includes("bottom") ? -labelYOffset : labelYOffset),
    dy: -2,
    // adjust for smaler font size
    textAnchor: labelPlacement.includes("left") ? "start" : labelPlacement.includes("right") ? "end" : "middle",
    verticalAnchor: labelPlacement.includes("top") ? "start" : labelPlacement.includes("bottom") ? "end" : "middle"
  };
  if (fill || className) {
    $$payload.out += "<!--[-->";
    Rect($$payload, spread_props([
      rect,
      props?.rect,
      {
        fill,
        class: cls(props?.rect?.class, className)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (gradient) {
    $$payload.out += "<!--[-->";
    {
      let children = function($$payload2, { gradient: gradient2 }) {
        Rect($$payload2, spread_props([rect, props?.rect, { fill: gradient2 }]));
      };
      LinearGradient($$payload, spread_props([
        gradient,
        { children, $$slots: { default: true } }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (pattern) {
    $$payload.out += "<!--[-->";
    {
      let children = function($$payload2, { pattern: pattern2 }) {
        Rect($$payload2, spread_props([rect, props?.rect, { fill: pattern2 }]));
      };
      Pattern($$payload, spread_props([
        pattern,
        { children, $$slots: { default: true } }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (label) {
    $$payload.out += "<!--[-->";
    Text($$payload, spread_props([
      { value: label },
      labelProps,
      props?.label,
      {
        class: cls("text-xs pointer-events-none", props?.label?.class)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function ChartAnnotations($$payload, $$props) {
  push();
  let {
    annotations,
    layer,
    highlightKey,
    visibleSeries
  } = $$props;
  let visibleAnnotations = annotations.filter((a) => (a.layer === layer || a.layer == null && layer === "above") && (highlightKey == null || a.seriesKey == null || a.seriesKey === highlightKey) && visibleSeries.some((s) => a.seriesKey == null || a.seriesKey === s.key));
  const each_array = ensure_array_like(visibleAnnotations);
  $$payload.out += `<!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let annotation = each_array[$$index];
    if (annotation.type === "point") {
      $$payload.out += "<!--[-->";
      AnnotationPoint($$payload, spread_props([annotation]));
    } else if (annotation.type === "line") {
      $$payload.out += "<!--[1-->";
      AnnotationLine($$payload, spread_props([annotation]));
    } else if (annotation.type === "range") {
      $$payload.out += "<!--[2-->";
      AnnotationRange($$payload, spread_props([annotation]));
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function LineChart($$payload, $$props) {
  push();
  let {
    data = [],
    x: xProp,
    y: yProp,
    xDomain,
    radial = false,
    series: seriesProp,
    seriesLayout = "overlap",
    axis = true,
    brush = false,
    grid = true,
    labels = false,
    legend = false,
    points = false,
    rule = true,
    onTooltipClick = () => {
    },
    onPointClick,
    props = {},
    renderContext = "svg",
    profile = false,
    debug = false,
    xScale: xScaleProp,
    tooltip = true,
    children: childrenProp,
    aboveContext,
    belowContext,
    belowMarks,
    aboveMarks,
    marks,
    spline,
    highlight = true,
    annotations = [],
    context = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const series = seriesProp === void 0 ? [
    {
      key: "default",
      label: typeof yProp === "string" ? yProp : "value",
      value: yProp,
      color: "var(--color-primary)"
    }
  ] : seriesProp;
  const seriesState = new SeriesState(() => series);
  const chartData = seriesState.allSeriesData.length ? seriesState.allSeriesData : chartDataArray(data);
  const xScale = xScaleProp ?? (accessor(xProp)(chartData[0]) instanceof Date ? scaleTime() : scaleLinear());
  function getSplineProps(s, i) {
    const splineProps = {
      data: s.data,
      y: s.value ?? (s.data ? void 0 : s.key),
      stroke: s.color,
      ...props.spline,
      ...s.props,
      class: cls(
        layerClass("line-chart-line"),
        "transition-opacity",
        // Checking `visibleSeries.length > 1` fixes re-animated tweened areas on hover
        seriesState.visibleSeries.length > 1 && seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10",
        props.spline?.class,
        s.props?.class
      )
    };
    return splineProps;
  }
  function getPointsProps(s, i) {
    const pointsProps = {
      data: s.data,
      y: s.value ?? (s.data ? void 0 : s.key),
      fill: s.color,
      ...props.points,
      ...typeof points === "object" ? points : null,
      class: cls("stroke-surface-200 transition-opacity", seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10", props.points?.class, typeof points === "object" && points.class)
    };
    return pointsProps;
  }
  function getLabelsProps(s, i) {
    const labelsProps = {
      data: s.data,
      y: s.value ?? (s.data ? void 0 : s.key),
      ...props.labels,
      ...typeof labels === "object" ? labels : null,
      class: cls("stroke-surface-200 transition-opacity", seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10", props.labels?.class, typeof labels === "object" && labels.class)
    };
    return labelsProps;
  }
  const highlightPointsProps = typeof props.highlight?.points === "object" ? props.highlight.points : null;
  function getHighlightProps(s, i) {
    if (!context || !context.tooltip.data) return {};
    const seriesTooltipData = s.data && context.tooltip.data ? findRelatedData(s.data, context.tooltip.data, context.x) : null;
    return {
      data: seriesTooltipData,
      y: s.value ?? (s.data ? void 0 : s.key),
      lines: i === 0,
      onPointClick: onPointClick ? (e, detail) => onPointClick(e, { ...detail, series: s }) : void 0,
      onPointEnter: () => seriesState.highlightKey.current = s.key,
      onPointLeave: () => seriesState.highlightKey.current = null,
      ...props.highlight,
      points: props.highlight?.points == false ? false : {
        ...highlightPointsProps,
        fill: s.color,
        class: cls("transition-opacity", seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10", highlightPointsProps?.class)
      }
    };
  }
  function getLegendProps() {
    return createLegendProps({
      seriesState,
      props: {
        ...props.legend,
        ...typeof legend === "object" ? legend : null
      }
    });
  }
  function getGridProps() {
    return {
      x: radial,
      y: true,
      ...typeof grid === "object" ? grid : null,
      ...props.grid
    };
  }
  function getAxisProps(axisDirection) {
    if (axisDirection === "y") {
      return {
        placement: radial ? "radius" : "left",
        ...typeof axis === "object" ? axis : null,
        ...props.yAxis
      };
    }
    return {
      placement: radial ? "angle" : "bottom",
      ...typeof axis === "object" ? axis : null,
      ...props.xAxis
    };
  }
  function getRuleProps() {
    return {
      x: 0,
      y: 0,
      ...typeof rule === "object" ? rule : null,
      ...props.rule
    };
  }
  const brushProps = {
    ...typeof brush === "object" ? brush : null,
    ...props.brush
  };
  if (profile) {
    console.time("LineChart render");
  }
  setTooltipMetaContext({
    type: "line",
    get visibleSeries() {
      return seriesState.visibleSeries;
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let children = function($$payload3, { context: context2 }) {
        const snippetProps = {
          context: context2,
          series,
          visibleSeries: seriesState.visibleSeries,
          getLabelsProps,
          getPointsProps,
          getSplineProps,
          getHighlightProps,
          getLegendProps,
          getGridProps,
          getAxisProps,
          getRuleProps,
          highlightKey: seriesState.highlightKey.current,
          setHighlightKey: seriesState.highlightKey.set
        };
        if (childrenProp) {
          $$payload3.out += "<!--[-->";
          childrenProp($$payload3, snippetProps);
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
          belowContext?.($$payload3, snippetProps);
          $$payload3.out += `<!----> `;
          Layer($$payload3, spread_props([
            { type: renderContext },
            asAny(renderContext === "canvas" ? props.canvas : props.svg),
            {
              center: radial,
              debug,
              children: ($$payload4) => {
                if (typeof grid === "function") {
                  $$payload4.out += "<!--[-->";
                  grid($$payload4, snippetProps);
                  $$payload4.out += `<!---->`;
                } else if (grid) {
                  $$payload4.out += "<!--[1-->";
                  Grid($$payload4, spread_props([getGridProps()]));
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]--> `;
                ChartClipPath($$payload4, {
                  disabled: !brush,
                  children: ($$payload5) => {
                    ChartAnnotations($$payload5, {
                      annotations,
                      layer: "below",
                      highlightKey: seriesState.highlightKey.current,
                      visibleSeries: seriesState.visibleSeries
                    });
                    $$payload5.out += `<!----> `;
                    belowMarks?.($$payload5, snippetProps);
                    $$payload5.out += `<!----> `;
                    if (marks) {
                      $$payload5.out += "<!--[-->";
                      marks($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                      const each_array = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let s = each_array[i];
                        if (typeof spline === "function") {
                          $$payload5.out += "<!--[-->";
                          spline($$payload5, {
                            ...snippetProps,
                            props: getSplineProps(s),
                            seriesIndex: i
                          });
                          $$payload5.out += `<!---->`;
                        } else {
                          $$payload5.out += "<!--[!-->";
                          Spline($$payload5, spread_props([getSplineProps(s)]));
                        }
                        $$payload5.out += `<!--]-->`;
                      }
                      $$payload5.out += `<!--]-->`;
                    }
                    $$payload5.out += `<!--]--> `;
                    aboveMarks?.($$payload5, snippetProps);
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> `;
                if (typeof axis === "function") {
                  $$payload4.out += "<!--[-->";
                  axis($$payload4, snippetProps);
                  $$payload4.out += `<!----> `;
                  if (typeof rule === "function") {
                    $$payload4.out += "<!--[-->";
                    rule($$payload4, snippetProps);
                    $$payload4.out += `<!---->`;
                  } else if (rule) {
                    $$payload4.out += "<!--[1-->";
                    Rule($$payload4, spread_props([getRuleProps()]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]-->`;
                } else if (axis) {
                  $$payload4.out += "<!--[1-->";
                  if (axis !== "x") {
                    $$payload4.out += "<!--[-->";
                    Axis($$payload4, spread_props([getAxisProps("y")]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]--> `;
                  if (axis !== "y") {
                    $$payload4.out += "<!--[-->";
                    Axis($$payload4, spread_props([getAxisProps("x")]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]--> `;
                  if (typeof rule === "function") {
                    $$payload4.out += "<!--[-->";
                    rule($$payload4, snippetProps);
                    $$payload4.out += `<!---->`;
                  } else if (rule) {
                    $$payload4.out += "<!--[1-->";
                    Rule($$payload4, spread_props([getRuleProps()]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]-->`;
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]--> `;
                ChartClipPath($$payload4, {
                  disabled: !brush,
                  full: true,
                  children: ($$payload5) => {
                    if (typeof points === "function") {
                      $$payload5.out += "<!--[-->";
                      points($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else if (points) {
                      $$payload5.out += "<!--[1-->";
                      const each_array_1 = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                        let s = each_array_1[i];
                        Points($$payload5, spread_props([getPointsProps(s)]));
                      }
                      $$payload5.out += `<!--]-->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--> `;
                    if (typeof labels === "function") {
                      $$payload5.out += "<!--[-->";
                      labels($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else if (labels) {
                      $$payload5.out += "<!--[1-->";
                      const each_array_2 = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
                        let s = each_array_2[i];
                        Labels($$payload5, spread_props([getLabelsProps(s)]));
                      }
                      $$payload5.out += `<!--]-->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--> `;
                    if (typeof highlight === "function") {
                      $$payload5.out += "<!--[-->";
                      highlight($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else if (highlight) {
                      $$payload5.out += "<!--[1-->";
                      const each_array_3 = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
                        let s = each_array_3[i];
                        Highlight($$payload5, spread_props([getHighlightProps(s, i)]));
                      }
                      $$payload5.out += `<!--]-->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--> `;
                    ChartAnnotations($$payload5, {
                      annotations,
                      layer: "above",
                      highlightKey: seriesState.highlightKey.current,
                      visibleSeries: seriesState.visibleSeries
                    });
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!----> `;
          aboveContext?.($$payload3, snippetProps);
          $$payload3.out += `<!----> `;
          if (typeof legend === "function") {
            $$payload3.out += "<!--[-->";
            legend($$payload3, snippetProps);
            $$payload3.out += `<!---->`;
          } else if (legend) {
            $$payload3.out += "<!--[1-->";
            Legend($$payload3, spread_props([getLegendProps()]));
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (typeof tooltip === "function") {
            $$payload3.out += "<!--[-->";
            tooltip($$payload3, snippetProps);
            $$payload3.out += `<!---->`;
          } else if (tooltip) {
            $$payload3.out += "<!--[1-->";
            DefaultTooltip($$payload3, {
              tooltipProps: props.tooltip,
              seriesState,
              canHaveTotal: true
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Chart($$payload2, spread_props([
        {
          data: chartData,
          x: xProp,
          xDomain,
          xScale,
          y: yProp ?? series.map((s) => s.value ?? s.key),
          yBaseline: 0,
          yNice: true,
          radial,
          padding: radial ? void 0 : defaultChartPadding(axis, legend)
        },
        restProps,
        {
          tooltip: tooltip === false ? false : {
            mode: "quadtree-x",
            onclick: onTooltipClick,
            debug,
            ...props.tooltip?.context,
            ...typeof tooltip === "object" ? tooltip : null
          },
          brush: brush && (brush === true || brush.mode == void 0 || brush.mode === "integrated") ? {
            axis: "x",
            resetOnEnd: true,
            xDomain,
            ...brushProps,
            onBrushEnd: (e) => {
              xDomain = e.xDomain;
              brushProps.onBrushEnd?.(e);
            }
          } : false,
          get context() {
            return context;
          },
          set context($$value) {
            context = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { context });
  pop();
}
function Chart_tooltip($$payload, $$props) {
  push();
  function defaultFormatter(value, _payload) {
    return `${value}`;
  }
  let {
    ref = null,
    class: className,
    hideLabel = false,
    indicator = "dot",
    hideIndicator = false,
    labelKey,
    label,
    labelFormatter = defaultFormatter,
    labelClassName,
    formatter,
    nameKey,
    color,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const chart = useChart();
  const tooltipCtx = getTooltipContext();
  const formattedLabel = (() => {
    if (hideLabel || !tooltipCtx.payload?.length) return null;
    const [item] = tooltipCtx.payload;
    const key = labelKey ?? item?.label ?? item?.name ?? "value";
    const itemConfig = getPayloadConfigFromPayload(chart.config, item, key);
    const value = !labelKey && typeof label === "string" ? chart.config[label]?.label ?? label : itemConfig?.label ?? item.label;
    if (value === void 0) return null;
    if (!labelFormatter) return value;
    return labelFormatter(value, tooltipCtx.payload);
  })();
  const nestLabel = tooltipCtx.payload.length === 1 && indicator !== "dot";
  function TooltipLabel($$payload2) {
    if (formattedLabel) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${attr_class(clsx(cn("font-medium", labelClassName)))}>`;
      if (typeof formattedLabel === "function") {
        $$payload2.out += "<!--[-->";
        formattedLabel($$payload2);
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(formattedLabel)}`;
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  $$payload.out += `<!---->`;
  Tooltip($$payload, {
    variant: "none",
    children: ($$payload2) => {
      const each_array = ensure_array_like(tooltipCtx.payload);
      $$payload2.out += `<div${spread_attributes(
        {
          class: clsx(cn("border-border/50 bg-background grid min-w-[9rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl", className)),
          ...restProps
        },
        null
      )}>`;
      if (!nestLabel) {
        $$payload2.out += "<!--[-->";
        TooltipLabel($$payload2);
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="grid gap-1.5"><!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let item = each_array[i];
        const key = `${nameKey || item.key || item.name || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(chart.config, item, key);
        const indicatorColor = color || item.payload?.color || item.color;
        $$payload2.out += `<div${attr_class(clsx(cn("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5", indicator === "dot" && "items-center")))}>`;
        if (formatter && item.value !== void 0 && item.name) {
          $$payload2.out += "<!--[-->";
          formatter($$payload2, {
            value: item.value,
            name: item.name,
            item,
            index: i,
            payload: tooltipCtx.payload
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          if (itemConfig?.icon) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<!---->`;
            itemConfig.icon($$payload2, {});
            $$payload2.out += `<!---->`;
          } else if (!hideIndicator) {
            $$payload2.out += "<!--[1-->";
            $$payload2.out += `<div${attr_style(`--color-bg: ${stringify(indicatorColor)}; --color-border: ${stringify(indicatorColor)};`)}${attr_class(clsx(cn("border-(--color-border) bg-(--color-bg) shrink-0 rounded-[2px]", {
              "size-2.5": indicator === "dot",
              "h-full w-1": indicator === "line",
              "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
              "my-0.5": nestLabel && indicator === "dashed"
            })))}></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> <div${attr_class(clsx(cn("flex flex-1 shrink-0 justify-between leading-none", nestLabel ? "items-end" : "items-center")))}><div class="grid gap-1.5">`;
          if (nestLabel) {
            $$payload2.out += "<!--[-->";
            TooltipLabel($$payload2);
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> <span class="text-muted-foreground">${escape_html(itemConfig?.label || item.name)}</span></div> `;
          if (item.value !== void 0) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<span class="text-foreground font-mono font-medium tabular-nums">${escape_html(item.value.toLocaleString())}</span>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!--]--></div></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function Rfid_scan_chart($$payload, $$props) {
  push();
  let { rawChartData } = $$props;
  function countScansPerDay(data) {
    const counts = {};
    for (const item of data) {
      if (!item.scanTime) continue;
      const d = item.scanTime instanceof Date ? item.scanTime : new Date(item.scanTime);
      if (isNaN(d.getTime())) continue;
      const dayKey = d.toISOString().slice(0, 10);
      counts[dayKey] = (counts[dayKey] || 0) + 1;
    }
    const result = Object.entries(counts).map(([dateStr, scans]) => {
      const date = /* @__PURE__ */ new Date(dateStr + "T00:00:00Z");
      return { date, dateStr, scans };
    });
    result.sort((a, b) => a.date.getTime() - b.date.getTime());
    return result;
  }
  const chartData = countScansPerDay(rawChartData);
  const chartConfig = { scans: { label: "Scans", color: "#2563eb" } };
  if (chartData.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-muted-foreground">No scan data available</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    Chart_container($$payload, {
      config: chartConfig,
      class: "w-full min-h-[250px]",
      children: ($$payload2) => {
        {
          let tooltip = function($$payload3) {
            $$payload3.out += `<!---->`;
            Chart_tooltip($$payload3, {});
            $$payload3.out += `<!---->`;
          };
          LineChart($$payload2, {
            data: chartData,
            x: "date",
            y: "scans",
            xScale: scaleUtc(),
            axis: "x",
            series: [
              {
                key: "scans",
                label: chartConfig.scans.label,
                color: chartConfig.scans.color
              }
            ],
            tooltip,
            $$slots: { tooltip: true }
          });
        }
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let animals = [];
  let rfidScans = [];
  for (const animal of data.animals) {
    let newAnimal = {
      id: animal.id,
      name: animal.name,
      dateOfBirth: animal.date_of_birth ? new Date(animal.date_of_birth) : null,
      species: animal.species,
      breed: animal.breed,
      furColour: animal.fur_color,
      weightKg: animal.weight_kg,
      arrivalDate: animal.arrival_date ? new Date(animal.arrival_date) : null,
      neutered: animal.neutered,
      adoptionStatus: animal.adoption_status,
      bondedWith: animal.bonded_with,
      rfidTag: animal.rfid_tag,
      specialNeeds: animal.special_needs,
      description: animal.description,
      createdAt: animal.createdAt,
      updatedAt: animal.updatedAt
    };
    animals.push(newAnimal);
  }
  for (const healthCheck of data.healthChecks) {
    ({
      id: healthCheck.id,
      animalId: healthCheck.animal_id,
      vetId: healthCheck.vet_id,
      checkDate: new Date(healthCheck.check_date),
      checkType: healthCheck.check_type,
      weightKg: healthCheck.weight_kg,
      temperatureCelsius: healthCheck.temperature_celsius,
      heartRate: healthCheck.heart_rate,
      examinationNotes: healthCheck.examination_notes,
      diagnosis: healthCheck.diagnosis,
      treatmentGiven: healthCheck.treatment_given,
      medicationsPrescribed: healthCheck.medications_prescribed,
      followUpRequired: healthCheck.follow_up_required,
      followUpDate: healthCheck.follow_up_date ? new Date(healthCheck.follow_up_date) : void 0,
      overallHealthStatus: healthCheck.overall_health_status,
      createdAt: healthCheck.createdAt
    });
  }
  for (const adoption of data.adoptions) {
    ({
      id: adoption.id,
      animalId: adoption.animal_id,
      adopterId: adoption.adopter_id,
      adoptionDate: new Date(adoption.adoption_date),
      adoptionFee: adoption.adoption_fee,
      returnDate: adoption.return_date ? new Date(adoption.return_date) : null,
      returnReason: adoption.return_reason ?? null,
      adoptionStatus: adoption.adoption_status ?? null,
      notes: adoption.notes ?? null,
      createdAt: new Date(adoption.createdAt),
      updatedAt: new Date(adoption.updatedAt)
    });
  }
  for (const shift of data.shifts) {
    ({
      shiftId: shift.shift_id,
      userId: shift.user_id,
      shiftType: shift.shift_type,
      shiftDate: new Date(shift.shift_date),
      actualStart: shift.actual_start ?? null,
      actualEnd: shift.actual_end ?? null,
      primaryRole: shift.primary_role ?? null,
      dutiesPerformed: shift.duties_performed ?? null,
      status: shift.status ?? null,
      notes: shift.notes ?? null,
      createdAt: shift.createdAt ? new Date(shift.createdAt) : null,
      updatedAt: shift.updatedAt ? new Date(shift.updatedAt) : null
    });
  }
  for (const rfid of data.rfids) {
    let newRfid = {
      id: rfid.id,
      scanTime: rfid.scan_time ? new Date(rfid.scan_time) : null,
      userId: rfid.user_id ?? null,
      animalId: rfid.animal_id ?? null
    };
    rfidScans.push(newRfid);
  }
  $$payload.out += `<main class="px-6 pt-6 pb-6"><div class="flex items-center justify-between mb-2"><div class="space-y-1"><h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard</h1> <p class="text-xl text-muted-foreground">Overview of shelter operations and animal status.</p></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">`;
  Card($$payload, {
    class: "w-full max-w-sm",
    children: ($$payload2) => {
      Card_header($$payload2, {
        class: "flex flex-row items-center justify-between space-y-0 pb-2",
        children: ($$payload3) => {
          Card_title($$payload3, {
            class: "text-lg font-medium",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Animals`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <a href="/animals">`;
          Button($$payload3, {
            size: "sm",
            variant: "outline",
            children: ($$payload4) => {
              $$payload4.out += `<!---->View Animals`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></a>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        class: "space-y-4",
        children: ($$payload3) => {
          if (animals.length === 0) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<p class="text-muted-foreground">No animals found.</p>`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `<div class="grid gap-3"><div class="flex items-center justify-between"><div class="space-y-1"><p class="text-2xl">${escape_html(animals.length)}</p> <p class="text-xs text-muted-foreground">Total animals</p></div> <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div></div> <div class="flex items-center justify-between"><div class="space-y-1"><p class="text-2xl">${escape_html(animals.filter((animal) => animal.arrivalDate && animal.arrivalDate > new Date(Date.now() - 14 * 24 * 60 * 60 * 1e3)).length)}</p> <p class="text-xs text-muted-foreground">New arrivals (14 days)</p></div> <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div> <div class="flex items-center justify-between"><div class="space-y-1"><p class="text-2xl">${escape_html(animals.filter((animal) => animal.adoptionStatus === "Available").length)}</p> <p class="text-xs text-muted-foreground">Available for adoption</p></div> <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></div></div> <div class="flex items-center justify-between"><div class="space-y-1"><p class="text-2xl">${escape_html(animals.filter((animal) => animal.adoptionStatus === "Adopted").length)}</p> <p class="text-xs text-muted-foreground">Successfully adopted</p></div> <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div></div>`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->  `;
  Card($$payload, {
    class: "w-full max-w-sm",
    children: ($$payload2) => {
      Card_header($$payload2, {
        class: "flex flex-row items-center justify-between space-y-0 pb-2",
        children: ($$payload3) => {
          Card_title($$payload3, {
            class: "text-lg font-medium",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Scan Logs`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <a href="/scan-logs">`;
          Button($$payload3, {
            size: "sm",
            variant: "outline",
            children: ($$payload4) => {
              $$payload4.out += `<!---->View scan logs`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></a>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        children: ($$payload3) => {
          if (rfidScans.length === 0) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<p class="text-muted-foreground">No logs found.</p>`;
          } else {
            $$payload3.out += "<!--[!-->";
            Rfid_scan_chart($$payload3, { rawChartData: rfidScans });
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Card($$payload, {
    class: "w-full max-w-sm",
    children: ($$payload2) => {
      Card_header($$payload2, {
        class: "flex flex-row items-center justify-between space-y-0 pb-2",
        children: ($$payload3) => {
          Card_title($$payload3, {
            class: "text-lg font-medium",
            children: ($$payload4) => {
              $$payload4.out += `<!---->My Profile`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <a href="/private">`;
          Button($$payload3, {
            size: "sm",
            variant: "outline",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Edit Profile`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></a>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        class: "space-y-4",
        children: ($$payload3) => {
          if (data.userProfile) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="grid gap-3"><div class="flex items-center justify-between"><div class="space-y-1"><p class="text-2xl">`;
            if (data.userProfile.first_name || data.userProfile.last_name) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `${escape_html(data.userProfile.first_name || "")}
                    ${escape_html(data.userProfile.last_name || "")}`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `${escape_html(data.userProfile.email)}`;
            }
            $$payload3.out += `<!--]--></p> <p class="text-xs text-muted-foreground">Name</p></div> <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div></div> <div class="flex items-center justify-between"><div class="space-y-1"><p class="text-2xl">Active</p> <p class="text-xs text-muted-foreground">Volunteer status</p></div> <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div> <div class="flex items-center justify-between"><div class="space-y-1">`;
            if (data.userProfile.volunteer_start_date) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<p class="text-2xl">${escape_html(new Date(data.userProfile.volunteer_start_date).toLocaleDateString())}</p> <p class="text-xs text-muted-foreground">Volunteer since</p>`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<p class="text-2xl">Not set</p> <p class="text-xs text-muted-foreground">Volunteer since</p>`;
            }
            $$payload3.out += `<!--]--></div> <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"></path></svg></div></div> <div class="flex items-center justify-between"><div class="space-y-1">`;
            if (data.userProfile.rfid_tag) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<p class="text-2xl">${escape_html(data.userProfile.rfid_tag)}</p> <p class="text-xs text-muted-foreground">RFID access card</p>`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<p class="text-2xl">Not Assigned</p> <p class="text-xs text-muted-foreground">RFID access card</p>`;
            }
            $$payload3.out += `<!--]--></div> <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div></div></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `<p class="text-muted-foreground">No profile information available.</p>`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></main>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
