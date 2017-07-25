import React, { Component } from 'react'
import { render } from 'react-dom'

import RadialMenu from '../../src'

class Demo extends Component {
  render() {
    return <div style={{ width: '100%', height: '100vh' }}>
      <h1 >react-radial Demo</h1>
      <RadialMenu
        innerRadius={20}
        outerRadius={120}
        cx={0}
        cy={0}
        stroke="white"
        fill="rgba(0,0,0,.8)"
        strokeWidth={2}
        delay={80}
        duration={400}
        buttons={['test1', 'test2', 'test3', 'test4', 'test5']}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
