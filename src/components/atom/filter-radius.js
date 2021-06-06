import React, { Component }  from 'react'
import styled from 'styled-components'

const Body = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
`

const Range = styled.input`
  -webkit-appearance: none;
  outline: none;
  width: 125px;
  height: 7px;
  background: #F0F0F0;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.23);
  border-radius: 117px;

  &::-webkit-slider-thumb{
    -webkit-appearance: none;
    cursor: pointer;
    border-radius:100%;
    cursor:pointer;
    width: 25px;
    height: 25px;
    border: none;
    background: #FC8763;
  }

  @media (max-width: 480px) {
    width: calc(100% - 100px);
  }
`

const Label = styled.div`
  width: 100px;
  font-family: CRC35;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #AAA9A9;
`

class FilterRadius extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value
    }
  }

  render () {
    const [radius, km] = this.props.label
    const max = this.props.unlimitRadius ? (parseInt(this.props.max) + 1).toString() : this.props.max

    const label = this.props.unlimitRadius
                    ? this.state.value === max
                        ? '∞'
                        : this.state.value
                    : this.state.value

    if (!this.props.unlimitRadius && this.state.value === (parseInt(this.props.max) + 1).toString()) {
      this.setState({ value: this.props.max })
    }

    return (
      <Body>
        <Label>{radius}: {`${label} ${km}`}
        </Label>
        <Range
          type='range'
          max={this.props.unlimitRadius ? max : this.props.max}
          min={this.props.min}
          step='1'
          onChange={({ target: { value } }) => this.setState(() => ({ value }))}
          value={this.state.value}
          onMouseUp={() => this.props.onChange(this.state.value)}
          onTouchEnd={() => this.props.onChange(this.state.value)}
        />
      </Body>
    )
  }
}

export default FilterRadius
