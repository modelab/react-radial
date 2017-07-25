import { describeArc, describeArcRegion } from './util/svghelper';
import * as d3 from 'd3';

export const renderObject = (data, i) => {
    const { cx, cy, radius, angleStart, angleEnd, key, fill, strokeWidth, radiusDiff, stroke, action, text } = data;
    return ({
        g: {
            // parent svg group
            fillOpacity: .6,
            key,
            id: 'arc' + text,
            style: {
                transform: `translate(${strokeWidth}px,${strokeWidth}px)`
            },
            onMouseOver: () => () => {
                // these are minor faux-dom operations, styling only
                d3.select(`#arc${text}`).style('fill-opacity', 1);
                // this id matches the svg group id specified above
                document.body.style.cursor = "pointer";
            },
            onMouseLeave: () => () => {
                d3.select(`#arc${text}`).style('fill-opacity', .6);
                document.body.style.cursor = "default";
            },
            onClick: (event) => action
        },
        region: {
            // main pie slice
            d: [describeArcRegion(cx, cy, radius, radius + radiusDiff, angleStart, angleEnd)],
            style: {
                fill,
                strokeWidth,
                stroke,
            },
        },
        arc: {
            // smaller outside arc to set path for text
            d: [describeArc(cx, cy, radius + radiusDiff * .8, angleStart, angleEnd)],
            style: { opacity: 1e-6 },
            id: angleStart
        },
        text: {
            // main text tag
            textAnchor: 'middle',
            fontFamily: 'sans-serif',
        },
        textPath: {
            // each line of text
            fontSize: (radius + radiusDiff) / 9,
            fontWeight: 100,
            fill: 'white',
            startOffset: '50%',
            xlinkHref: "#" + angleStart
            // this matches the arc id (above)
        }
    })
}