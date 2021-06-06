import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import styled                 from 'styled-components'
import geolocation            from 'geolocation'
import Sections               from './../../style/sections'
import sleep                  from 'sleep-promise'

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 480px) {
    margin-top: 10px;
  }
`


const Button = styled.button`
  -webkit-appearance: none;
  margin-left: 9px;
  outline: none;
  width: 25px;
  height: 25px;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  background-color: #FC8763;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
  padding: 0px;
`

const Image = styled.img``

const Label = styled.div`
  font-family: CRC35;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #AAA9A9;
`

class CityButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      load: false
    }
  }

  getCity () {
    this.setState({ load: true }, async () => {
      await sleep(500)
      geolocation.getCurrentPosition((err, position) => {
        if (err) {
          this.setState({ load: false }, () => this.props.onChange(null, null))
          return
        }
        const { latitude, longitude } = position.coords
        this.setState({ load: false }, () => this.props.onChange(latitude, longitude))
      })
    })
  }

  render () {
    const label = this.props.label
    const section = this.props.section
    const loader = Sections[section].icons['city-loading']
    const getgeo = Sections[section].icons['city-geo']

    return (
      <Wrapper>
        <Label>{label}: {this.props.children}</Label>
        <Button onClick={() => this.getCity()}>
          {
            <Image src={
                this.state.load
                  ? loader
                  : getgeo
            } style={{ width: this.state.load ? '25px' : '10px' }} />
          }
        </Button>
      </Wrapper>
    )
  }
}

export default connect(
  state => ({
    ...state,
    section: state.profile.section,
    lang: state.lang[state.lang.selected]
  })
)(CityButton)
