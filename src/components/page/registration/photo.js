import React, { Component, createRef }    from 'react'
import { connect }                        from 'react-redux'
import geolocation                        from 'geolocation'
import sleep                              from 'sleep-promise'
import styled                             from 'styled-components'
import API                                from '../../../api/server'
import geolocator_icon                    from '../../../style/icons/geolocator.svg'
import geolocator_loader_icon             from '../../../style/icons/geolocator-loader.svg'
import photo_loader_icon                  from '../../../style/icons/photo-loader.svg'
import photo_icon                         from '../../../style/icons/photo.svg'
import Body                               from '../../../components/atom/auth/body'
import Form                               from '../../../components/atom/auth/form'
import Title                              from '../../../components/atom/auth/title'
import Icon                               from '../../../components/atom/auth/icon'
import Label                              from '../../../components/atom/auth/label'
import Button                             from '../../../components/atom/auth/button'
import Description                        from '../../../components/atom/auth/description'
import Navigation                         from '../../../components/molecule/auth-navigation'
import Files                              from 'react-butterfiles'


const TipWrapper = styled.div`
  width: 157px;
  height: 157px;
  border-radius: 100%;
  background-color: #FC8763;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Image = styled.div`
  width: 157px;
  height: 157px;
  border-radius: 100%;
  background: url(${props => props.src});
  background-size: cover;
  background-position: center center;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

class Geo extends Component {
  constructor (props) {
    super(props)

    this.upload = createRef()

    this.prev = '/registration/4-12/geo/#prev'
    this.next = '/registration/6-12/section#next'
  }

  componentDidMount () {
    window.onkeydown = () => (this.isDown = 1)
    window.onkeyup = ({ keyCode }) => {
      this.isDown === 1 &&
      (this.props.auth.registration.photo || this.upload.current.click()) &&
      keyCode === 13 &&
      this.props.history.location.pathname.match(/5-12/gi) !== null &&
      this.props.history.push(this.next)
    }
  }

  render () {
    return (
      <Body>
        <Form>
          <Title>{this.props.lang.auth.registration.photo.title}</Title>
          {
            this.props.auth.registration.photo
            ? <Image src={this.props.auth.registration.photo} />
            : <TipWrapper>
                <img
                  src={photo_icon}
                  alt='geo_icon'
                />
              </TipWrapper>
          }
          <Files
              maxSize='2mb'
              convertToBase64
              accept={['image/gif', 'image/jpg', 'image/jpeg', 'image/png']}
              onSuccess={files => this.props.onPhoto(files[0].src.base64)}
              onError={errors => this.props.setState(false)}
          >
              {({ browseFiles, getLabelProps }) => (
                <Button onClick={browseFiles} ref={this.upload} style={{ padding: '0px 12px 0px 18px' }}>
                  <Label>{this.props.lang.auth.registration.photo.placeholder[1]}</Label>
                  <Icon src={photo_loader_icon} />
                </Button>
              )}
          </Files>
          <Description>{this.props.lang.auth.registration.photo.description}</Description>
          <Navigation prev={this.prev} next={this.next} isNext={this.props.auth.registration.photo} />
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
    onPhoto: value =>
      dispatch({ type: 'REGISTRATION_PHOTO_VALUE', payload: value })
  })
)(Geo)
