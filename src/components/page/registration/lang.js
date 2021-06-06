import React, { Component, createRef }   from 'react'
import { connect }                       from 'react-redux';
import styled                            from 'styled-components'
import Emoji                             from 'react-emojis'
import Body                              from '../../../components/atom/auth/body'
import Form                              from '../../../components/atom/auth/form'
import Title                             from '../../../components/atom/auth/title'
import Description                       from '../../../components/atom/auth/description'
import Navigation                        from '../../../components/molecule/auth-navigation'


const Itemise = styled.div`
  position: relative;
  height: 227px;
  width: 230px;
  overflow-y: scroll;
  margin-left: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Item = styled.div`
  user-select: none;
  cursor: pointer;
  font-family: CRC55;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 25px;
  color: #5A5A5A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 210px;
  height: 36px;
  border-bottom: 1px solid #E1E1E1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 15px;
  }

  &:nth-child(2) {
    margin-top: 5px;
  }
`

const Marker = styled.div`
  position: absolute;
  right: 2px;
  top: ${props => props.top};
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #FC8763;
  animation: blink 1s infinite;
`

const Shadow = styled.div`
  display: ${props => props.active ? 'block' : 'none'}
  position: relative;
  z-index: 999;
  width: 279px;
  height: 24px;
  background: linear-gradient(180deg, rgba(252, 252, 252, 0) 0%, #FCFCFC 64.06%);
`

const langs = [
    { title: 'Грузинский',    emoji: 'flag-georgia',                value: 'ka' }
  , { title: 'Український',   emoji: 'flag-ukraine',                value: 'ua' }
  , { title: 'Қазақ',         emoji: 'flag-kazakhstan',             value: 'kz' }
  , { title: 'English',       emoji: 'flag-usa-outlying-islands',   value: 'en' }
  , { title: 'Русский',       emoji: 'flag-russia',                 value: 'ru' }
  , { title: 'Română',        emoji: 'flag-romania',                value: 'ro' }
  , { title: 'Эстонский',     emoji: 'flag-estonia',                value: 'et' }
  , { title: 'Литовский',     emoji: 'flag-lithuania',              value: 'lt' }
]

class Lang extends Component {
  constructor (props) {
    super (props)

    this.state = {
      top_shadow: false,
      bottom_shadow: false,
      marker_top: langs.reduce((ctx, lang, i) => lang.value === this.props.lang_selected
          ? `${20+(i*36.5)}px`
          : ctx
      , '165px')
    }

    this.body = createRef()

    this.prev = '/#prev'
    this.next = '/registration/2-12/username#next'
  }

  componentDidMount () {
    window.onkeydown = () => (this.isDown = 1)
    window.onkeyup = ({ keyCode }) =>
      this.isDown === 1 &&
      keyCode === 13 &&
      this.props.history.location.pathname.match(/1-12/gi) !== null &&
      this.props.history.push(this.next)
  }

  onHandleLang ({ lang, top }) {
    this.setState({
      marker_top: top
    })

    this.props.setLang(lang)
  }

  onHandleShadow (e) {
    if (e.nativeEvent.target.scrollTop !== 0) {
      this.setState({
        top_shadow: true
      })
    } else {
      this.setState({
        top_shadow: false
      })
    }

    if (!(e.nativeEvent.target.offsetHeight + e.nativeEvent.target.scrollTop === e.nativeEvent.target.scrollHeight)) {
      this.setState({
        bottom_shadow: true
      })
    } else {
      this.setState({
        bottom_shadow: false
      })
    }
  }

  render () {
    return (
      <Body ref={this.body}>
        <Form>
          <Title>{this.props.lang.auth.registration.lang.title}</Title>
          <Shadow active={this.state.top_shadow} style={{ marginBottom: '-24px', transform: 'matrix(1, 0, 0, -1, 0, 0)' }} />
          <Itemise onScroll={(e) => this.onHandleShadow(e)}>
            <Marker top={this.state.marker_top}/>
            {
              langs.map((lang, i) => {
                  return (
                    <Item key={i} onClick={() => this.onHandleLang({ top: `${20+(i*36.5)}px`, lang: lang.value })}>
                      {lang.title}
                      <Emoji emoji={lang.emoji} />
                    </Item>
                  )
              })
            }
          </Itemise>
          <Shadow active={this.state.bottom_shadow} style={{ marginTop: '-24px' }} />
          <Description>{this.props.lang.auth.registration.lang.description}</Description>
          <Navigation prev={this.prev} next={this.next} isNext={true} />
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
  dispath => ({
    setLang: (lang) => {
      dispath({ type: 'SET_LANG', payload: lang })
      dispath({ type: 'REGISTRATION_LANG_VALUE', payload: lang })
    }
  })
)(Lang)
