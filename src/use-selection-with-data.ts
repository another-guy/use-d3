import { select } from 'd3-selection';
import { useEffect } from 'react';
import { PlotImplementation } from './plot-implementation';
import { SvgTag } from './svg-tag';

export function useSelectionWithData<TData>(
  svgRef: React.RefObject<SVGSVGElement>,
  svgTag: SvgTag,
  cssClassName: string,
  data: TData[],
  plotImplementation: PlotImplementation<TData>,
  dependencies: any[] = [],
): void {
  const getSelectionWithData = (svgElement: SVGSVGElement) =>
    select(svgElement)
      .selectAll(`${svgTag}.${cssClassName}`)
      .data(data);

  useEffect(
    () => {
      const svgElement = svgRef.current
      if (svgElement) {
        const selectionWithData = getSelectionWithData(svgElement);

        selectionWithData
          .exit()
          .remove();

        const fullSelection = selectionWithData
          .enter()
          .append(svgTag)
          .attr('class', cssClassName);

        plotImplementation(fullSelection);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [svgRef, svgRef.current, svgTag, cssClassName],
  );

  useEffect(
    () => {
      const svgElement = svgRef.current;
      if (svgElement) {
        plotImplementation(getSelectionWithData(svgElement));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [svgRef, svgRef.current, svgTag, cssClassName, data, ...dependencies],
  );
};