import React, { Component } from 'react';
import { NodeGroup } from 'resonance';
import * as d3 from 'd3';
import { renderObject } from './renderObject';

class Radial extends Component {
  componentDidMount() {
    this.props.updateData();
  }

  componentDidUpdate() {
    // this needs to be called due to a bug in the resonance v0.9.5, it should otherwise live in the render object
    const { data } = this.props;
    data.forEach(d => {
      const { buttonFunctions, text } = d;
      d3.select(`#arc${text}`)
        .on('mouseover', function () {
          // these are minor faux-dom operations, styling only
          d3.select(`#arc${text}`).style('fill-opacity', 1);
          // this id matches the svg group id specified above
          document.body.style.cursor = "pointer";
        })
        .on('mouseout', function () {
          // these are minor faux-dom operations, styling only
          d3.select(`#arc${text}`).style('fill-opacity', .6);
          // this id matches the svg group id specified above
          document.body.style.cursor = "default";
        })
        .on('click', function (event) {
          d3.event.stopPropagation();
          buttonFunctions()
        })
    })
  }
  render() {
    const _this = this;
    const { innerRadius, outerRadius, stroke, strokeWidth, duration, delay, cx, cy, data, fill } = this.props;
    const totalRadius = innerRadius + outerRadius;
    const size = totalRadius * 2 + strokeWidth * 2;
    return (
      <div style={{
        position: 'fixed',
        zIndex: 20000,
        width: size + 'px',
        height: size + 'px',
        transform: `translate(${cx - totalRadius}px,${cy - totalRadius}px)`
      }}>
        <svg
          viewBox={`${strokeWidth} ${strokeWidth} ${size} ${size}`}
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            left: 0, top: 0, width: '100%', height: '100%',
          }}
        >
          <NodeGroup
            data={data}
            keyAccessor={(d) => {
              return d.key;
            }}
            start={(dat, i) => {
              return {
                ...renderObject(dat, i)
              }
            }}
            update={(dat, i) => {
              return ({
                ...renderObject(dat, i),
                timing: {
                  duration,
                  delay: i * delay,
                  ease: d3.easeCircleInOut
                },
              })
            }}
          >
            {(nodes) => {

              return (
                <g>
                  {nodes.map(({ key, data, state }) => { // state here comes from our render object
                    return (
                      <g {...state.g} >
                        <path {...{ ...state.region, style: { ...state.region.style, ...{ stroke, fill } } }} />
                        <path {...state.arc} />
                        <text {...state.text} >
                          <textPath {...{ ...state.textPath, fill: stroke }}> {data.text}</textPath>
                        </text>
                      </g>
                    )
                  })}
                </g>
              )
            }}
          </NodeGroup>
          <circle
            cx={innerRadius + outerRadius + strokeWidth}
            cy={innerRadius + outerRadius + strokeWidth}
            r={3}
            fill={'none'}
            stroke={stroke}
            opacity={.5}
          />
        </svg>

      </div >
    );
  }
}

export default Radial;