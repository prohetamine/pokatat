import React, { Component }     from 'react'
import { connect }              from 'react-redux'
import geolocation              from 'geolocation'
import sleep                    from 'sleep-promise'
import styled                   from 'styled-components'
import ymaps                    from 'ymaps'
import geolocator_icon          from '../../../style/icons/geolocator.svg'
import geolocator_loader_icon   from '../../../style/icons/geolocator-loader.svg'
import geo_icon                 from '../../../style/icons/geo.svg'
import cross_icon               from '../../../style/icons/cross.svg'
import dotString                from '../../../other/dotString'
import Body                     from '../../../components/atom/auth/body'
import Form                     from '../../../components/atom/auth/form'
import Title                    from '../../../components/atom/auth/title'
import Icon                     from '../../../components/atom/auth/icon'
import Label                    from '../../../components/atom/auth/label'
import Button                   from '../../../components/atom/auth/button'
import Description              from '../../../components/atom/auth/description'
import Navigation               from '../../../components/molecule/auth-navigation'

const TipWrapper = styled.div`
  width: 157px;
  height: 157px;
  border-radius: 100%;
  background-color: #FC8763;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Geo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      load: 3
    }

    this.prev = '/registration/3-12/date/#prev'
    this.next = '/registration/5-12/photo#next'
  }


  componentDidMount () {
    window.onkeydown = () => (this.isDown = 1)
    window.onkeyup = ({ keyCode }) => {
      this.isDown === 1 &&
      (this.state.title || this.getCity()) &&
      keyCode === 13 &&
      this.props.history.location.pathname.match(/4-12/gi) !== null &&
      this.props.history.push(this.next)
    }
  }

  getCity () {
    this.setState({ load: 2 }, async () => {
      await sleep(500)
      geolocation.getCurrentPosition(async (err, position) => {
        try {
          const { latitude, longitude } = position.coords
          const maps = await ymaps.load(`https://api-maps.yandex.ru/2.1/?apikey=cd4b2c10-b5d3-4183-8a6c-6dcaddbaff17&lang=ru_RU`)

          const title = (title => title.join ? title[title.length - 1] : title)(
            (
              geo => geo && geo.getLocalities().length
                ? geo.getLocalities()
                : geo.getAdministrativeAreas()
            )(
              (await maps.geocode([latitude, longitude])).geoObjects.get(0)
            )
          )

          this.props.onGeo({
            title,
            location: {
              latitude:latitude,
              longitude
            }
          })

          if (!title) {
              throw new Error('title undefined')
          }

          this.setState({ load: 1 })

        } catch (e) {
          this.setState({ load: 0 }, async () => {
            setTimeout(() => {
              this.props.history.push(
                '/registration/4-12/map#next'
              )
            }, 500)
          })
        }

      })
    })
  }

  render () {
    return (
      <Body>
        <Form>
          <Title>{this.props.lang.auth.registration.geo.title}</Title>
          <TipWrapper>
            <img src={geo_icon} alt='geo_icon' />
          </TipWrapper>
          <Button onClick={() => this.getCity()} style={{ padding: '0px 12px 0px 18px' }}>
            <Label>{dotString(this.props.auth.registration.geo.title ? this.props.auth.registration.geo.title : this.props.lang.auth.registration.geo.placeholder, 21)}</Label>
            <Icon
              src={
                ({
                  0: cross_icon,
                  1: geolocator_icon,
                  2: geolocator_loader_icon,
                  3: geolocator_icon
                })[this.state.load]
            } />
          </Button>
          <Description>{this.props.lang.auth.registration.geo.description}</Description>
          <Navigation prev={this.prev} next={this.next} isNext={this.props.auth.registration.geo.title} />
        </Form>
      </Body>
    )
  }
}

export default connect(
  state => ({
    ...state,
    lang_selected: state.lang.selected,
    lang: state.lang[state.lang.selected]
  }),
  dispatch => ({
    onGeo: value =>
      dispatch({ type: 'REGISTRATION_GEO_VALUE', payload: value })
  })
)(Geo)
