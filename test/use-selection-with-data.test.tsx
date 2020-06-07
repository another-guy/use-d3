/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { useRef } from 'react';
import { SvgTag, useSelectionWithData } from '../src';

describe(useSelectionWithData.name, () => {
  it('renders DOM correctly', () => {
    const tag = 'text';
    const cssClassName = 'xxx';
    let data = [0, 1, 2];

    render(
      <TestComponent
        tag={tag}
        cssClassName={cssClassName}
        data={data}
        onRemoveLast={() => { data[0] += 1; data[1] += 1; data[2] += 1; }}
      />
    );

    const expectedHtml1 = `<div data-testid="root"><div>Start</div><svg>${
      [0, 1, 2].map(d => `<${tag} class="${cssClassName}">${d + 1}</${tag}>`).join('')
      }</svg><div>End</div></div>`;

    expect(screen.getByTestId('root'))
      .toContainHTML(expectedHtml1);
  });
});

export const TestComponent: React.FC<{ tag: SvgTag; cssClassName: string; data: number[]; onRemoveLast: () => void }> = props => {
  const svgRef: React.RefObject<SVGSVGElement> = useRef(null);
  useSelectionWithData(
    svgRef,
    props.tag,
    props.cssClassName,
    props.data,
    s => s.text(d => d + 1),
    [props.data.length],
  );
  return (
    <div>
      <div data-testid='root'>
        <div>Start</div>
        <svg ref={svgRef} />
        <div>End</div>
      </div>
    </div>
  );
};

