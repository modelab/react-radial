import React, { Component } from 'react'
import { render } from 'react-dom'

import RadialMenu from '../../src'

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      message: null
    }
  }
  dummyFunction(i) {
    this.setState({ message: `You've clicked button number ${i}!` })
  }
  render() {
    return <div style={{ width: '100%', height: '100vh' }}>
      <h1 >React-Radial Demo</h1>
      {this.state.message}
      <RadialMenu
        delay={80}
        duration={400}
        innerRadius={20}
        outerRadius={120}
        buttons={['test1', 'test2', 'test3', 'test4', 'test5']}
        action={
          [
            () => this.dummyFunction(1),
            () => this.dummyFunction(2),
            () => this.dummyFunction(3),
            () => this.dummyFunction(4),
            () => this.dummyFunction(5),
          ]
        }
        strokeWidth={2}
        stroke="white"
        fill="rgba(0,0,0,.8)"
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
