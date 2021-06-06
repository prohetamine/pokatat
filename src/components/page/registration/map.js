import React, { Component, createRef, useRef, useState }  from 'react'
import { connect }                                        from 'react-redux'
import styled                                             from 'styled-components'
import sleep                                              from 'sleep-promise'
import ymaps                                              from 'ymaps'
import { useSpring, animated, useChain }                  from 'react-spring-new'
import Body                                               from '../../../components/atom/auth/body'
import Form                                               from '../../../components/atom/auth/form'
import Title                                              from '../../../components/atom/auth/title'
import geo_icon                                           from '../../../style/icons/geo.svg'
import Description                                        from '../../../components/atom/auth/description'
import Navigation                                         from '../../../components/molecule/auth-navigation'
import geolocator_loader_noborder_icon                    from '../../../style/icons/geolocator-loader-noborder.svg'
import cross_noborder_icon                                from '../../../style/icons/cross-noborder.svg'
import geolocator_cursor_icon                             from '../../../style/icons/geolocator-cursor.svg'
import geo_cursor_icon                                    from '../../../style/icons/geo-cursor.svg'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const AnimatedMap = styled(animated.div)`
  position: relative;
  height: 230px;
  width: 260px;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const YandexMap = styled.div`
  min-height: 230px;
  min-width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AnimatedTipWrapper = styled(animated.div)`
  width: 157px;
  height: 157px;
  border-radius: 100%;
  background-color: #FC8763;
  margin-bottom: 24px;
  display: flex;
  position: absolute;
  z-index: 999999;
  justify-content: center;
  align-items: center;
`

const AnimatedCityWindowWrapper = styled(animated.div)`
  user-select: none;
  position: absolute;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const Icon = styled.div`
  width: 10px;
  height: 10px;
  margin-bottom: 10px;
  background: url(${props => props.src});
  background-size: cover;
`

const AnimatedCityWindow = styled(animated.div)`
  position: absolute;
  user-select: none;
  background: #FC8763;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100px;
`

const AnimatedCityText = styled(animated.div)`
  font-family: CRC55;
  font-style: normal;
  font-weight: bold;
  color: #fff;
  text-align: center;
`


const CityWindow = ({ show, children, onClick }) => {

  const propsWindow = useSpring({
    opacity: show ? '1' : '0',
    borderRadius: show ? '22px' : '100px',
    paddingLeft: show ? '25px' : '0px',
    paddingRight: show ? '25px' : '0px',
    paddingTop: show ? '14px' : '0px',
    paddingBottom: show ? '14px' : '0px',
    boxShadow: show ? '0px 0px 110px 128px #44444445' : '0px 0px 10px 0px #44444445',
    from: {
      boxShadow: '0px 0px 10px 0px #44444445',
      borderRadius: '100px',
      opacity: '0',
      paddingLeft: show ? '25px' : '0px',
      paddingRight: show ? '25px' : '0px',
      paddingTop: show ? '14px' : '0px',
      paddingBottom: show ? '14px' : '0px',
    }
  });

  const propsWindowHide = useSpring({
    display: show ? 'flex' : 'none',
    from: {
      display: 'flex',
    },
    delay: show ? 0 : 400
  });

  const propsText = useSpring({
    opacity: show ? '1' : '0',
    from: {
      opacity: '0'
    }
  });

  const propsWrapper = useSpring({
    height: show ? '230px' : '0px',
    width: show ? '260px' : '0px',
    from: {
      height: '0px',
      width: '0px'
    }
  });

  return (
    <AnimatedCityWindowWrapper style={propsWrapper} onClick={onClick}>
      <AnimatedCityWindow style={{...propsWindow, ...propsWindowHide}}>
        <AnimatedCityText style={propsText}>
          {children}
        </AnimatedCityText>
      </AnimatedCityWindow>
    </AnimatedCityWindowWrapper>
  )
}

const Map = ({ id, show, children }) => {
  const [isShowTip, setShowTip] = useState(true);

  const springMapRef = useRef()
  const propsMap = useSpring({
    width: show ? '260px' : '157px',
    height: show ? '230px' : '157px',
    marginTop: show ? '0px' : '30px',
    marginBottom: show ? '0px' : '43px',
    borderRadius: show ? '22px' : '1000px',
    boxShadow: show ? '0px 0px 4px rgba(68, 68, 68, 0.27)' : '0px 0px 0px rgba(68, 68, 68, 0.27)',
    from: {
      marginTop: '30px',
      marginBottom: '43px',
      boxShadow: '0px 0px 0px rgba(68, 68, 68, 0.27)',
      width: '157px',
      height: '157px',
      borderRadius: '1000px'
    },
    ref: springMapRef,
    delay: 250
  });

  const springTipRef = useRef()
  const propsTip = useSpring({
    opacity: show ? 0 : 1,
    from: {
      opacity: 1
    },
    onRest: ({ opacity }) => {
      !opacity && setShowTip(false)
    },
    ref: springTipRef
  });

  useChain([springTipRef, springMapRef])

  return (
    <AnimatedMap style={propsMap}>
      <YandexMap id={id}>
      {children}
      </YandexMap>
      {
        isShowTip && <AnimatedTipWrapper style={propsTip}>
          <img src={geolocator_cursor_icon} alt='geo_icon' />
        </AnimatedTipWrapper>
      }
    </AnimatedMap>
  )
}


class _Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      load: 1,
      loadMap: 0
    }

    setTimeout(() => {
      this.setState({
        load: this.props.geo.title ? 3 : 1
      })
    }, 1500)

    this.input = createRef()

    this.prev = '/registration/4-12/geo#prev'
    this.next = '/registration/5-12/photo#next'
  }

  componentDidMount () {
    window.onkeydown = () => (this.isDown = 1)
    window.onkeyup = ({ keyCode }) => {
      this.isDown === 1 &&
      keyCode === 13 &&
      this.props.geo.title &&
      this.props.history.location.pathname.match(/4-12/gi) !== null &&
      this.props.history.push(this.next)
    }

    ymaps
      .load(`https://api-maps.yandex.ru/2.1/?apikey=cd4b2c10-b5d3-4183-8a6c-6dcaddbaff17&lang=${this.props.lang_selected}_RU`)
      .then(async maps => {
        await sleep(500)
        this.setState({
          loadMap: true
        })

        const { latitude, longitude } = this.props.geo.location;

        const Map = new maps.Map('map', {
            center: latitude ? [latitude, longitude] : [55.75, 37.57],
            zoom: 9,
            controls: []
        }, {
            suppressMapOpenBlock: true
        });

        (() => [...document.querySelectorAll('ymaps')].forEach(ymaps => {
          if (ymaps.className.match(/copyright/)) {
            ymaps.remove()
          }
        }))();

        const squareLayout = {
          0: maps.templateLayoutFactory.createClass(`
              <div style='width: 24px; height: 34.27px; margin-top: -30px; margin-left: -12px; background: url(${geo_cursor_icon}); background-size: cover; display: flex; justify-content: center; align-items: center;filter: drop-shadow(0px 4px 4px rgba(68, 68, 68, 0.27));font-size: 0px;'>
                <div style='background: url(${cross_noborder_icon}); background-size: cover; width: 8px; height: 8px; margin-bottom: 10px;'></div>
              </div>
          `)
          ,
          1: maps.templateLayoutFactory.createClass(`
              <div style='width: 24px; height: 34.27px; margin-top: -30px; margin-left: -12px; background: url(${geo_cursor_icon}); background-size: cover; display: flex; justify-content: center; align-items: center;filter: drop-shadow(0px 4px 4px rgba(68, 68, 68, 0.27));font-size: 0px;'>
                <div style='animation: blink 1s infinite; width: 10px; height: 10px; border-radius: 100%; background: #fff; margin-bottom: 10px;'></div>
              </div>
          `)
          ,
          2: maps.templateLayoutFactory.createClass(`
              <div style='width: 24px; height: 34.27px; margin-top: -30px; margin-left: -12px; background: url(${geo_cursor_icon}); background-size: cover; display: flex; justify-content: center; align-items: center;filter: drop-shadow(0px 4px 4px rgba(68, 68, 68, 0.27));font-size: 0px;'>
                <div style='background: url(${geolocator_loader_noborder_icon}); background-size: cover; width: 18px; height: 18px; margin-bottom: 10px;'></div>
              </div>
          `)
          ,
          3: maps.templateLayoutFactory.createClass(`
              <div style='width: 24px; height: 34.27px; margin-top: -30px; margin-left: -12px; background: url(${geo_cursor_icon}); background-size: cover; display: flex; justify-content: center; align-items: center;filter: drop-shadow(0px 4px 4px rgba(68, 68, 68, 0.27));font-size: 0px;'>
                <div style='animation: blink 1s infinite; width: 10px; height: 10px; border-radius: 100%; background: #fff; margin-bottom: 10px;'></div>
              </div>
          `)
        }

        function setLocationType(latitude, longitude, type) {
          const placemark = new maps.Placemark([latitude, longitude], {}, {
              iconLayout: squareLayout[type]
          })

          Map.geoObjects.remove(Map.geoObjects.get(0))

          Map.geoObjects.add(placemark)
        }

        const coord = latitude ? [latitude, longitude] : [55.75, 37.57]

        setLocationType(...coord, 1)

        Map.events.add('click', async e => {
          const [latitude, longitude] = e.get('coords')

          Map.setCenter([latitude, longitude])

          const placemark = new maps.Placemark([latitude, longitude], {}, {
              iconLayout: squareLayout[this.state.load]
          })

          Map.geoObjects.remove(Map.geoObjects.get(0))

          Map.geoObjects.add(placemark)

          this.setState({ load: 2 }, async () => {
            setLocationType(latitude, longitude, this.state.load)
            await sleep(300);
            const title = (title => title.join ? title[title.length - 1] : title)(
                (
                geo => geo && geo.getLocalities().length
                  ? geo.getLocalities()
                  : geo.getAdministrativeAreas()
              )(
                (await maps.geocode([latitude, longitude])).geoObjects.get(0)
              )
            )

            this.setState({ load: title ? 3 : 0 }, async () => {
              setLocationType(latitude, longitude, this.state.load)
              this.state.load === 3 &&
              this.props.onGeo({
                title,
                location: {
                  latitude,
                  longitude
                }
              })
            })
          })
        })
      })
  }

  render () {
    return (
      <Body ref={this.body}>
        <Form>
          <Title>{this.props.lang.auth.registration.map.title}</Title>
          <Wrapper>
            <Map id='map' show={this.state.loadMap}>
              <CityWindow show={this.state.load === 3} onClick={() => this.setState({ load: 1 })}>
                {
                  this.props.geo.title
                }
              </CityWindow>
            </Map>
          </Wrapper>
          <Description>{this.props.lang.auth.registration.map.description}</Description>
          <Navigation prev={this.prev} next={this.next} isNext={this.state.load === 3 && this.props.auth.registration.geo.title} />
        </Form>
      </Body>
    )
  }
}

export default connect(
  state => ({
    ...state,
    geo: state.auth.registration.geo,
    lang_selected: state.lang.selected,
    lang: state.lang[state.lang.selected]
  }),
  dispatch => ({
    onGeo: value =>
      dispatch({ type: 'REGISTRATION_GEO_VALUE', payload: value })
  })
)(_Map)
