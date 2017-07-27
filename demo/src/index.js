import React, { Component } from 'react'
import { render } from 'react-dom'

import RadialMenu from '../../src'


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
      update: false
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
    this.setState({ message: `You've clicked button number ${i}!` })
  }

  handleSlider(event, value, key) {
    this.setState({ [key]: value })
  }
  handleSliderUpdate(key) {
    this.setState({ [key]: this.state[`${key}Display`] })
  }

  render() {
    console.log(this.state)
    return <div style={{ width: '100%', height: '100vh' }}>
      <h1 >React-Radial Demo</h1>
      {this.state.message}
      <Drawer
        width='25%'
      >
        <div style={{ width: '75%', margin: '0 auto', marginTop: '30px', fontSize: '12px' }}>
          {uiArray.map((ob, i) =>
            <div key={i}>
              {`${ob.title}: ` + this.state[`${ob.value}Display`]}
              <Slider
                min={ob.min}
                max={ob.max}
                step={ob.step}
                value={this.state[`${ob.value}Display`]}
                onChange={(event, value) => this.handleSlider(event, value, `${ob.value}Display`)}
                onDragStop={() => this.handleSliderUpdate(ob.value)}
              />
            </div>
          )}
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '15px' }}> stroke color</div>
            <Color style={{ width: '100%' }} />
          </div>
          <br />
          <div style={{ width: '100%' }}>
            <div style={{ marginTop: '15px', marginBottom: '15px' }}> fill color</div>
            <Color />
          </div>
        </div>
      </Drawer>
      <RadialMenu
        delay={this.state.delay}
        duration={this.state.duration}
        innerRadius={this.state.sliderRadiusInner}
        outerRadius={this.state.sliderRadiusOuter}
        buttons={this.arrayMaker(this.state.buttonCount, 'button')}
        action={this.arrayMaker(this.state.buttonCount, 'function')}
        strokeWidth={this.state.strokeWidth}
        stroke="white"
        fill="rgba(0,0,0,.8)"
      />
    </div>
  }
}




const uiArray = [
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
