import React, { Component } from 'react';
import { NodeGroup } from 'resonance';
import * as d3 from 'd3';
import { renderObject } from './renderObject';

class Radial extends Component {
  componentDidMount() {
    this.props.updateData();
  }
  render() {
    const _this = this;
    const { innerRadius, outerRadius, stroke, strokeWidth, duration, delay, cx, cy, data } = this.props;
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
              return d.key; //needed for unique key (just like react)
            }}
            start={(data, i) => {
              return { ...renderObject(data, i) } //main object
            }}
            update={(dat, i) => {
              return ({
                ...renderObject(dat, i), //main object
                timing: { //transition timing
                  duration,
                  delay: i * delay,
                  ease: d3.easeCircleInOut
                },
                events: { //this is needed to prevent DOM failure on interruptions
                  start() {
                    if (i === 0) _this.props.start(); //prevent interruption at start of transition
                  },
                  end() {
                    if (i === data.length - 1) _this.props.end(); //end transition on last node
                  },
                },
              })
            }}
          >
            {(nodes) => {
              return (
                <g>
                  {nodes.map(({ key, data, state }) => { //state here comes from our render object
                    return (
                      <g {...state.g} >
                        <path {...state.region} />
                        <path {...state.arc} />
                        <text {...state.text} >
                          <textPath {...state.textPath}>{data.text}</textPath>
                        </text>
                      </g>
                    )
                  })}
                </g>
              )
            }}
          </NodeGroup>
        </svg>
      </div >
    );
  }
}

export default Radial;

