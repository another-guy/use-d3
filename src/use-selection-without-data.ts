import { select, Selection } from 'd3';
import { useEffect } from 'react';

export function useSelectionWithoutData(
  svgRef: React.RefObject<SVGSVGElement>,
  callback: (selection: Selection<SVGSVGElement, unknown, null, undefined>) => void,
): void {
  useEffect(
    () => {
      const svgElement = svgRef.current;
      if (svgElement)
        callback(select(svgElement));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [svgRef, svgRef.current],
  );
};
