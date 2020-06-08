import { select, Selection } from 'd3';
import { useEffect, useState } from 'react';

export function useSelectionWithoutData(
  svgRef: React.RefObject<SVGSVGElement>,
  callback: (selection: Selection<SVGSVGElement, unknown, null, undefined>) => void,
): void {
  const [processed, setProcessed] = useState(false);
  useEffect(
    () => {
      const svgElement = svgRef.current;
      if (svgElement && !processed) {
        setProcessed(true);
        callback(select(svgElement));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [svgRef, svgRef.current],
  );
};
