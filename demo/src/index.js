import React, { Component } from 'react'
import { render } from 'react-dom'

import ReactRadial from '../../src'


import { ChromePicker } from 'react-color';

//material-ui requirements
import Drawer from 'material-ui/Drawer';
import Slider from 'material-ui/Slider';

import Color from './Color';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class Demo extends Component {
  constructor() {
    super();
    this.state = {
      message: null,
      drawerOpen: true,
      sliderRadiusInner: 20,
      sliderRadiusInnerDisplay: 20,
      sliderRadiusOuter: 120,
      sliderRadiusOuterDisplay: 120,
      duration: 400,
      durationDisplay: 400,
      delay: 80,
      delayDisplay: 80,
      strokeWidth: 2,
      strokeWidthDisplay: 2,
      buttonCount: 5,
      buttonCountDisplay: 5,
      update: false,
      stroke: { r: 255, g: 255, b: 255, a: 1 },
      fill: { r: 0, g: 0, b: 0, a: .8 },
      displayColorPickerStroke: false,
      displayColorPickerFill: false,

    }
    this.handleSlider = this.handleSlider.bind(this);
    this.handleSliderUpdate = this.handleSliderUpdate.bind(this);
  }
  getChildContext() { //required for material-ui
    const mainTheme = getMuiTheme(baseTheme);
    mainTheme.slider.selectionColor = '#2194CE'
    return { muiTheme: mainTheme };
  }

  arrayMaker = (count, value) => {
    const arr = [];
    for (let i = 1; i <= count; i++) {
      const closureI = i;
      switch (value) {
        case 'button':
          arr.push(value + closureI)
          break;
        case 'function':
          arr.push(() => this.dummyFunction(closureI));
          break;
        default:
          arr.push(value)
          break;
      }
    }
    return arr;
  }

  dummyFunction(i) {
    this.setState({ message: `you've clicked button number ${i}!` })
  }

  handleSlider(event, value, key) {
    this.setState({ [key]: value })
  }
  handleSliderUpdate(key) {
    this.setState({ [key]: this.state[`${key}Display`] })
  }

  sliderMaker = (array) => (
    array.map((ob, i) =>
      <div key={i}>
        {`${ob.title}: ` + this.state[`${ob.value}Display`]}
        <Slider
          min={ob.min}
          max={ob.max}
          step={ob.step}
          value={this.state[`${ob.value}Display`]}
          onChange={(event, value) => this.handleSlider(event, value, `${ob.value}Display`)}
          onDragStop={() => this.handleSliderUpdate(ob.value)}
          sliderStyle={{ marginTop: '10px', marginBottom: '10px' }}
        />
      </div>
    )
  )
  colorHandleClick = (key) => {
    this.setState({ [key]: !this.state[key] })
  };

  colorHandleClose = (key) => {
    this.setState({ [key]: false })
  };

  colorHandleChange = (color, key) => {
    this.setState({ [key]: color.rgb })
  };

  render() {
    const codeOb = {
      delay: this.state.delay,
      duration: this.state.duration,
      stroke: `rgba(${this.state.stroke.r},${this.state.stroke.g},${this.state.stroke.b},${this.state.stroke.a})`,
      fill: `rgba(${this.state.fill.r},${this.state.fill.g},${this.state.fill.b},${this.state.fill.a})`,
      strokeWidth: this.state.strokeWidth,
      buttons: `['button1','button2', ...${this.state.buttonCount} strings}]`,
      buttonFunctions: `[()=>console.log(you've clicked button 1!), ...${this.state.buttonCount} functions]`,
      innerRadius: this.state.sliderRadiusInner,
      outerRadius: this.state.sliderRadiusOuter
    }
    return <div id='main' style={{ width: '100%', height: '100vh' }}>
      <div id='header' style={{ background: codeOb.fill, color: codeOb.stroke, fontWeight: 100 }}>
        <span style={{ fontSize: '20px' }} >react-radial demo</span>
        <span style={{ float: 'right', paddingRight: '10px' }}>
          <a href='https://www.npmjs.com/package/react-radial' target="_blank">npm</a><span style={{ paddingLeft: '10px', paddingRight: '10px' }}>|</span>
          <a href='https://github.com/modelab/react-radial' target="_blank">github</a><span style={{ paddingLeft: '10px', paddingRight: '10px' }}>|</span>
          <a href='https://modelab.is' target="_blank">modelab</a></span>
      </div >
      <div id='codeBlock' style={{ paddingTop: '20px' }}><code>
        {`<ReactRadial ` + Object.keys(codeOb).map(key => (
          key === 'stroke' || key === 'fill' ?
            `${key}={"${(codeOb[key])}"}` :
            `${key}={${(codeOb[key])}}`)
        ).join(' ') + `/>`
        }
      </code></div>
      <div style={{ position: 'absolute', bottom: '20px', width: '75%', marginLeft: '25%', textAlign: 'center', pointerEvents: 'none' }}>
        {this.state.message || 'click canvas to close. click canvas again to open.'}
      </div>
      <Drawer
        width='25%'
      >
        <div style={{ width: '75%', margin: '0 auto', marginTop: '30px', fontSize: '12px', padding: '0px' }}>
          <h3 style={{ marginBottom: '40px' }}>react-radial parameters</h3>
          <div style={{ marginBottom: '40px' }}>
            <h4>geometry</h4>
            {this.sliderMaker(geoArray)}
          </div>
          <div style={{ marginBottom: '40px' }}>
            <h4>color</h4>
            <div style={{ width: '100%' }}>
              <div style={{ marginBottom: '15px' }}> stroke color</div>
              <Color
                handleClick={this.colorHandleClick}
                handleClose={this.colorHandleClose}
                handleChange={this.colorHandleChange}
                enabled={this.state.displayColorPickerStroke}
                color={this.state.stroke}
                param='stroke'
                view='displayColorPickerStroke'
              />
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ marginTop: '15px', marginBottom: '15px' }}> fill color</div>
              <Color
                handleClick={this.colorHandleClick}
                handleClose={this.colorHandleClose}
                handleChange={this.colorHandleChange}
                enabled={this.state.displayColorPickerFill}
                color={this.state.fill}
                param='fill'
                view='displayColorPickerFill'
              />
            </div>
          </div>
          <h4>time</h4>
          {this.sliderMaker(timeArray)}
        </div>
      </Drawer>
      <ReactRadial
        delay={this.state.delay}
        duration={this.state.duration}
        innerRadius={this.state.sliderRadiusInner}
        outerRadius={this.state.sliderRadiusOuter}
        buttons={this.arrayMaker(this.state.buttonCount, 'button')}
        buttonFunctions={this.arrayMaker(this.state.buttonCount, 'function')}
        strokeWidth={this.state.strokeWidth}
        stroke={`rgba(${this.state.stroke.r},${this.state.stroke.g},${this.state.stroke.b},${this.state.stroke.a})`}
        fill={`rgba(${this.state.fill.r},${this.state.fill.g},${this.state.fill.b},${this.state.fill.a})`}
        autoLoad
      />
    </div >
  }
}

const geoArray = [
  {
    title: "button count",
    value: 'buttonCount',
    min: 2,
    max: 20,
    step: 1
  },
  {
    title: "inner radius",
    value: 'sliderRadiusInner',
    min: 1,
    max: 300,
    step: 1
  },
  {
    title: "outer radius",
    value: 'sliderRadiusOuter',
    min: 1,
    max: 300,
    step: 1
  },
  {
    title: "stroke width",
    value: 'strokeWidth',
    min: 0,
    max: 10,
    step: .1
  },

]

const timeArray = [
  {
    title: "duration",
    value: 'duration',
    min: 0,
    max: 1600,
    step: 1
  },
  {
    title: "delay",
    value: 'delay',
    min: 0,
    max: 200,
    step: 1
  },
]

Demo.childContextTypes = { //required for material-ui
  muiTheme: React.PropTypes.object.isRequired
};

render(<Demo />, document.querySelector('#demo'))
