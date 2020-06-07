import { BaseType, Selection } from 'd3-selection';

export type PlotImplementation<T> =
  (selection: Selection<BaseType, T, Element | SVGSVGElement, unknown>) =>
    Selection<BaseType, T, Element | SVGSVGElement, unknown>;
