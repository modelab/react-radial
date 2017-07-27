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
      this._updateState(this._getDataObject(this.props.innerRadius, this.props.outerRadius, { ...this.props }))
    }
  }

  _buttonSelect() {
    if (!this.state.transitioning) {
      this._updateState(this._getDataObject(0, 0, { ...this.props })); // close menu
      setTimeout(() => {
        document.body.style.cursor = 'default';
        this.setState({ enabled: false, transitioning: false })
      }, this.props.duration + this.props.buttons.length * this.props.delay // wait until animation finishes
      )
    }
  }
  _getDataObject(radInner = 0, radOuter = 0, propOb) {
    const numberOfTabs = propOb.buttons.length;
    const data = propOb.buttons.map((d, i) => {
      return (
        {
          key: d,
          text: d,
          stroke: arrayFill(propOb.stroke, numberOfTabs)[i],
          fill: arrayFill(propOb.fill, numberOfTabs)[i],
          strokeWidth: arrayFill(propOb.strokeWidth, numberOfTabs)[i],
          action: arrayFill((event) => {
            this._buttonSelect(event);
            propOb.action[i]();
          }, numberOfTabs)[i],
          cx: propOb.innerRadius + propOb.outerRadius,
          cy: propOb.innerRadius + propOb.outerRadius,
          radiusDiff: radOuter - propOb.strokeWidth,
          radius: radInner, angleStart: i * 360 / numberOfTabs,
          angleEnd: (i + 1) * 360 / numberOfTabs,
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
        this.setState({ cx, cy, enabled: true, data: this._getDataObject(0, 0, { ...this.props }) });
      }
      else {
        this.setState({ enabled: false })
      }
    }
  }
  shouldComponentUpdate() {
    return !this.state.transitioning;
  }

  componentWillUpdate(nextProps) {
    if (!this.state.transitioning && (
      nextProps.innerRadius !== this.props.innerRadius ||
      nextProps.outerRadius !== this.props.outerRadius ||
      nextProps.buttons.length !== this.props.buttons.length ||
      nextProps.strokeWidth !== this.props.strokeWidth
    )) {
      this._transitionStart();
      this._updateState(this._getDataObject(nextProps.innerRadius, nextProps.outerRadius, { ...nextProps }))
      setTimeout(this._transitionEnd, this.props.duration + this.props.buttons.length * this.props.delay);
      // wait until animation finishes
      // the transition functions needs to be used due to a bug in resonance 0.9.3.
      // they should otherwise live in the events objects of the update function
    }
  }

  render() {

    const propOb = {
      ...this.props,
      ...this.state,
    };

    return (
      <div style={{ width: '100%', height: '100%', background: 'red' }} onClick={this._handleClick}>
        {this.state.enabled ?
          <Radial {...propOb}
            updateData={this._updateData}
            start={this._transitionStart}
            end={this._transitionEnd} />
          : null}
      </div>
    )
  }
}

export default Module;

