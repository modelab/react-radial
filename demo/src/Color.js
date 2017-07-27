import React from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'
import './style.css';

class ChromePick extends React.Component {
    constructor(props) {
        super(props);
        const { r, g, b, a } = props.color;
        this.state = {
            displayColorPicker: false,
            color: { r, g, b, a },
        };
    }

    handleClick = () => {
        this.props.handleClick(this.props.view)
    };

    handleClose = () => {
        this.props.handleClick(this.props.view)
    };

    handleChange = (color) => {
        this.props.handleChange(color, this.props.param)
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '100%',
                    height: '8px',
                    borderRadius: '2px',
                    border: '1px solid black',
                    background: `rgba(${this.props.color.r}, ${this.props.color.g}, ${this.props.color.b}, ${this.props.color.a})`,
                },
                swatch: {
                    width: '100%',
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });
        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                {this.props.enabled ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <ChromePicker color={this.props.color} onChange={this.handleChange} />
                </div> : null}

            </div>
        )
    }
}

export default ChromePick