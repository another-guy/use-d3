# `use-d3`

React hooks for D3.js data visualization library.

Please make sure to follow our [Code of Conduct](./CODE_OF_CONDUCT.md). 

Code of `use-d3` and the package are distributed under [MIT License](./LICENSE) terms.


## Installation

| yarn              | npm                         |
| ----------------- | --------------------------- |
| `yarn add use-d3` | `npm install --save use-d3` |

## Usage

### `useSelectionWithData` hook

Renders static or dynamic data by mapping data points into SVG DOM elements.

#### Parameters

* `svgRef` — ref object corresponding to the SVG-container.
* `svgTag` — valid SVG tag to render for each data point.
* `cssClassName` — CSS class to apply to each generated SVG tag. **IMPORTANT:** this class has to be unique among all calls of any `use-d3` hooks!
* `data` — array with the data points to map into svg tags.
* `plotImplementation` — code that consumes the generated D3 selection and assigns new attributes to each generated SVG tag.

#### Example

```tsx
import { useSelectionWithData } from 'use-d3';

export const TestComponent: React.FC<{}> = props => {
  const svgRef: React.RefObject<SVGSVGElement> = useRef(null);
  const data = [1, 4, 9, 16, 25];

  useSelectionWithData(
    svgRef,
    'text',
    'data-point',
    data,
    selection => selection
      .attr('x', d => 0)
      .attr('y', (d, i) => 15 * (i + 1))
      .attr('width', d => d * 10)
      .attr('height', 10)
      .attr('fill', 'red'),
      // [ data.length ]  <-- Any additional dependencies besides `data`
      //                      whose changes should result in an update/re-render.
  );

  return (<svg ref={svgRef} viewBox="0 0 -100 100" width="350" height="100" />);
};
```

Rendered result DOM.

```html
<svg viewBox="0 0 -100 100" width="350" height="100">
  <rect class="data-point" x="0" y="15" width="10" height="10" fill="red" />
  <rect class="data-point" x="0" y="30" width="40" height="10" fill="red" />
  <rect class="data-point" x="0" y="45" width="90" height="10" fill="red" />
  <rect class="data-point" x="0" y="60" width="160" height="10" fill="red" />
  <rect class="data-point" x="0" y="75" width="250" height="10" fill="red" />
</svg>
```

Appearance of the rendered HTML.

<svg viewBox="0 0 -100 100" width="350" height="100">
  <rect class="data-point" x="0" y="15" width="10" height="10" fill="red" />
  <rect class="data-point" x="0" y="30" width="40" height="10" fill="red" />
  <rect class="data-point" x="0" y="45" width="90" height="10" fill="red" />
  <rect class="data-point" x="0" y="60" width="160" height="10" fill="red" />
  <rect class="data-point" x="0" y="75" width="250" height="10" fill="red" />
</svg>

### `useSelectionWithoutData` hook

Consumes a D3 selection exactly once without implicitly generating any SVG DOM elements.

This is useful in scenarios like creation of unique reusable definitions which don't depend on any data.

#### Parameters

* `svgRef` — ref object corresponding to the SVG-container.
* `plotImplementation` — code that consumes the generated D3 selection.

#### Example

```tsx
import { useSelectionWithoutData } from 'use-d3';

export const TestComponent: React.FC<{}> = props => {
  const svgRef: React.RefObject<SVGSVGElement> = useRef(null);
  useSelectionWithoutData(
    svgRef,
    svg => {
      const defs = select(svg).append('defs');
      defs
        .append('pattern')
        .attr('id', 'HashLine')
        .attr('width', '3')
        .attr('height', '3')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('patternTransform', 'rotate(37)')
        .append('rect')
        .attr('width', '1.5')
        .attr('height', '3')
        .attr('transform', 'translate(0,0)')
        .attr('fill', 'silver');
    }
  );
  return (<svg ref={svgRef} viewBox="0 0 -100 100" width="350" height="100" />);
};
```

Rendered result DOM.

```html
<svg viewBox="0 0 -100 100" width="350" height="100">
  <defs>
    <pattern id="HashLine" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(37)">
      <rect width="1.5" height="3" transform="translate(0,0)" fill="silver" />
    </pattern>
  </defs>
</svg>
```

When the pattern is used in a `<rect>` tag like this

```html
<rect x="0" y="0" width="100" height="100" fill="url(#HashLine)" />
```

the result rectangle appears shaded.

<svg viewBox="0 0 -100 100" width="100" height="100">
  <defs>
    <pattern id="HashLine" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(37)">
      <rect width="1.5" height="3" transform="translate(0,0)" fill="silver" />
    </pattern>
  </defs>

  <rect x="0" y="0" width="100" height="100" fill="url(#HashLine)" />
</svg>
