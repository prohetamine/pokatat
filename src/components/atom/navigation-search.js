import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import styled                 from 'styled-components'
import Sections               from './../../style/sections'

const Body = styled.div`
  width: 100%;
  transition: 1s;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #FCFCFC;
  box-shadow: 0px 0px 4px rgba(68, 68, 68, 0.27);
  border-radius: 114px;
  height: calc(47px - 24px);
  color: #5A5A5A;
  padding: 12px 8.5px 12px 18px;
  overflow: hidden;
  cursor: text;
  @media (max-width: 790px) {
    padding: 12px 8.5px 12px 15px;
  }
`

const Placeholder = styled.div`
  position: absolute;
  user-select: none;
  margin-left: 2px;
  font-family: CRC35;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #AAA9A9;
`

const Input = styled.input`
  background: #FCFCFC;
  width: 100%;
  border: none;
  outline: none;
  font-family: CRC55;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #5A5A5A;
`

const Clear = styled.div`
  width: 30px;
  min-width: 30px;
  height: 30px;
  cursor: pointer;
  background: url(${props => props.src});
  background-size: cover;
`


class TopNavigationInput extends Component {
  constructor (props) {
    super(props)

    this.input = React.createRef();

    this.state = {
      placeholder: {
        isShow: this.props.value.length === 0 ? true : false
      }
    }
  }

  onHidePlaceholder () {
    this.setState({
      placeholder: {
        isShow: false
      }
    }, () => {
      this.input.current.focus();
    })
  }

  onShowPlaceholder () {
    this.setState({
      placeholder: {
        isShow: this.props.value.length === 0 ? true : false
      }
    }, () => {
      this.input.current.blur();
    })
  }

  onClear () {
    this.props.onClear();
  }

  render () {
    const icon = Sections[this.props.section].icons['navigation-search-clear']
    return (
      <Body onClick={() => this.onHidePlaceholder()}>
        <Input ref={this.input} onBlur={() => this.onShowPlaceholder()} onChange={({ target: { value } }) => this.props.onChange(value)} value={this.props.value} />
        {
            this.state.placeholder.isShow
              ? <Placeholder>{this.props.placeholder}</Placeholder>
              : <Clear onClick={() => this.onClear()} src={icon}></Clear>
        }
      </Body>
    )
  }
}

export default connect(
  state => state.profile
)(TopNavigationInput)
