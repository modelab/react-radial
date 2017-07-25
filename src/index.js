import React, { Component } from 'react';
import { NodeGroup } from 'resonance';
import { describeArc, describeArcRegion } from './util/helper';
import Radial from './Radial';
import { arrayFill } from './util/helper';


class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitioning: false,
      enabled: false
    }
    this._updateData = this._updateData.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._transitionStart = this._transitionStart.bind(this);
    this._transitionEnd = this._transitionEnd.bind(this);
    this._buttonSelect = this._buttonSelect.bind(this);
  }
  _transitionStart() {
    this.setState({ transitioning: true })
  }
  _transitionEnd() {
    this.setState({ transitioning: false })
  }
  _updateData() {
    if (!this.state.transitioning) {
      this._updateState(this._getDataObject(this.props.innerRadius, this.props.outerRadius))
    }
  }
  _buttonSelect(event) {
    console.log('clicked!')
    if (!this.state.transitioning) {
      this._updateState(this._getDataObject(0, 0));
      setTimeout(() =>
        this.setState({ enabled: false }),
        this.props.duration + this.props.buttons.length * this.props.delay //wait until animation finishes
      )
    }
    event.stopPropagation();
  }
  _getDataObject(radInner = 0, radOuter = 0) {
    const numberOfTabs = this.props.buttons.length;
    const data = this.props.buttons.map((d, i) => {
      return (
        {
          cx: this.props.innerRadius + this.props.outerRadius,
          cy: this.props.innerRadius + this.props.outerRadius,
          radiusDiff: radOuter - this.props.strokeWidth,
          radius: radInner, angleStart: i * 360 / numberOfTabs, angleEnd: (i + 1) * 360 / numberOfTabs,
          key: d,
          text: this.props.buttons[i],
          stroke: arrayFill(this.props.stroke, numberOfTabs)[i],
          fill: arrayFill(this.props.fill, numberOfTabs)[i],
          strokeWidth: arrayFill(this.props.strokeWidth, numberOfTabs)[i],
          action: arrayFill(this._buttonSelect, numberOfTabs)[i]
        }
      )
    })
    return data;
  }
  _updateState(data) {
    this.setState({ data });
  }

  _handleClick = (event) => {
    if (!this.state.transitioning) {
      if (!this.state.enabled) {
        const div = event.target;
        const cx = (event.clientX - div.offsetLeft);
        const cy = (event.clientY - div.offsetTop);
        this.setState({ cx, cy, enabled: true, data: this._getDataObject(0, 0) });
      }
      else {
        this.setState({ enabled: false })
      }
    }
  }

  render() {
    const propOb = {
      ...this.props,
      ...this.state,
    };

    return (
      <div style={{ width: '100%', height: '100%' }} onClick={this._handleClick}>
        {this.state.enabled ? <Radial {...propOb} updateData={this._updateData} start={this._transitionStart} end={this._transitionEnd} /> : null}
      </div>
    )
  }
}

export default Module;

