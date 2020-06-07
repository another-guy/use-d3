/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { useRef } from 'react';
import { SvgTag } from '../src/svg-tag';
import { useSelectionWithoutData } from '../src/use-selection-without-data';

describe(useSelectionWithoutData.name, () => {
  it('renders DOM correctly', () => {
    const tag = 'text';
    const content = 'It worked!';

    render(
      <TestComponent
        tag={tag}
        content={content}
      />
    );

    expect(screen.getByTestId('root'))
      .toContainHTML(
        `<div data-testid="root"><div>Start</div><svg><${tag}>${content}</${tag}></svg><div>End</div></div>`
      );
  });
});

export const TestComponent: React.FC<{ tag: SvgTag; content: string; }> = props => {
  const svgRef: React.RefObject<SVGSVGElement> = useRef(null);
  useSelectionWithoutData(svgRef, selection => selection.append(props.tag).text(props.content));
  return (
    <div data-testid='root'>
      <div>Start</div>
      <svg ref={svgRef} />
      <div>End</div>
    </div>
  );
};

