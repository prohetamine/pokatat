import React, { Component, createRef }     from 'react'
import { connect }                         from 'react-redux'
import styled                              from 'styled-components'
import VisibilitySensor                    from 'react-visibility-sensor'
import { parsePhoneNumberFromString }      from 'libphonenumber-js'
import Emoji                               from 'react-emojis'
import ReactCountryFlag                    from "react-country-flag"
import formatPhone                         from '../../../other/formatPhone'
import toPhoneRect                         from '../../../other/toPhoneRect'
import pen_icon                            from '../../../style/icons/pen.svg'
import phone_icon                          from '../../../style/icons/phone.svg'
import Input                               from '../../atom/input-style'
import Body                                from '../../../components/atom/auth/body'
import Form                                from '../../../components/atom/auth/form'
import Title                               from '../../../components/atom/auth/title'
import Description                         from '../../../components/atom/auth/description'
import Navigation                          from '../../../components/molecule/auth-navigation'

window.formatPhone = formatPhone

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

const TipImage = styled.img``

const Container = styled.div`
  width: 260px;
  height: 47px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(68, 68, 68, 0.27);
  border-radius: 114px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 2px;
`

const Caret = styled.div`
  width: 2px;
  height: 20px;
  margin-left: -2px;
  background: #FC8763;
  animation: blink 1s infinite;
`

const CaretWrapper = styled.div`
  font-family: CRC35;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  margin-left: 21px;
  user-select: none;
  color: transparent;
  height: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const TipInput = styled.div`
  min-width: 58px;
  height: 47px;
  background: #FC8763;
  border-radius: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TipIcon = styled.img`
  width: 23px;
  height: 23px;
`

const Flag = styled.div`
  margin-left: 19px;
  margin-top: 4px;
`

class Phone extends Component {
  constructor (props) {
    super(props)

    this.state = {
      focus: true,
      country: ''
    }

    this.input = createRef()

    this.prev = '/registration/6-12/section/#prev'
    this.next = '/registration/8-12/verify#next'
  }

  onFocus () {
    this.setState({
      focus: true
    }, () =>
        this.input.current.focus()
    )
  }

  onBlur () {
    this.setState({
      focus: false
    }, () =>
        this.input.current.blur()
    )
  }

  componentDidMount () {
    window.onkeydown = () => (this.isDown = 1)
    window.onkeyup = ({ keyCode }) =>
      this.isDown === 1 &&
      keyCode === 13 &&
      this.props.phone.country !== '' &&
      parsePhoneNumberFromString(this.props.phone.number).isValid() &&
      formatPhone(this.props.phone.number).length === 12 &&
      this.props.history.location.pathname.match(/7-12/gi) !== null &&
      this.props.history.push(this.next)
  }

  render () {
    const phone = toPhoneRect(this.props.phone.number)

    console.log(phone)

    return (
      <VisibilitySensor onChange={isEndAnimation => isEndAnimation && this.onFocus()}>
        <Body>
          <Form>
            <Title>{this.props.lang.auth.registration.phone.title}</Title>
            <TipWrapper>
              <TipImage src={phone_icon} />
            </TipWrapper>
            <Container>
              <InputWrapper>
                <Flag>
                  <ReactCountryFlag
                    countryCode={this.props.phone.country || 'RU'}
                    title="US"
                  />
                </Flag>
                <label htmlFor='input_username_213122'>
                  <input
                    id='input_username_213122'
                    type='text'
                    autoComplete='off'
                    value={this.props.phone.number}
                    ref={this.input}
                    style={{ position: 'absolute', width: '0px', height: '0px', opacity: '0' }}
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    onChange={({ target: { value }, target }) =>
                      this.setState({
                        country: parsePhoneNumberFromString(
                          formatPhone(value)
                        )
                      }, () => {
                        this.props.onPhone(
                          formatPhone(
                            value
                          ),
                          (
                            v => v
                              ? v.country
                              : ''
                          )(this.state.country)
                        )
                      })
                    }

                  />
                  <Input
                    value={phone}
                    placeholder={this.props.lang.auth.registration.phone.placeholder}
                    isHiddenPlaceholder={false}
                    isShowCursor={this.state.focus}
                    indexCursor={phone.length}
                    maxCursor={18}

                    symbolCursorStyle={{
                      marginTop: '20px',
                      width: '10px',
                      height: '2px',
                      background: '#FC8763',
                      animation: 'blink 1s infinite'
                    }}

                    symbolCaretStyle={{
                      '-': {
                        marginBottom: '1.5px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '3px',
                        marginLeft: '3px'
                      },
                      '\\(': {
                        marginBottom: '4px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginRight: '2px',
                      },
                      '\\)': {
                        marginBottom: '4px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '2px',
                      },
                      ' ': {
                        marginTop: '',
                        width: '3.5px',
                        minWidth: '3.5px',
                      }
                    }}

                    symbolHiddenPlaceholderStyle={{
                      '\\+': {
                        marginTop: '0.8px',
                        opacity: 0
                      },
                      '\\d': {
                        opacity: 0
                      },
                      '-': {
                        marginBottom: '1.5px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '3px',
                        marginLeft: '3px',
                        opacity: 0
                      },
                      '\\(': {
                        marginBottom: '4px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginRight: '2px',
                        opacity: 0
                      },
                      '\\)': {
                        marginBottom: '4px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '2px',
                        opacity: 0
                      },
                      ' ': {
                        marginTop: '',
                        width: '3.5px',
                        minWidth: '3.5px',
                        opacity: 0
                      }
                    }}

                    symbolCursorHiddenPlaceholderStyle={{
                      '\\d': {
                        color: '#FC8763'
                      },
                      '-': {
                        marginBottom: '1.5px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '3px',
                        marginLeft: '3px'
                      },
                      '\\(': {
                        marginBottom: '4px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginRight: '2px'
                      },
                      '\\)': {
                        marginBottom: '4px',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '2px'
                      },
                      ' ': {
                        marginTop: '',
                        width: '3.5px',
                        minWidth: '3.5px'
                      }
                    }}

                    symbolPlaceholderStyle={{
                      '\\d': {
                        color: '#AAA9A9'
                      },
                      '-': {
                        marginBottom: '1.5px',
                        color: '#AAA9A9',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '3px',
                        marginLeft: '3px'
                      },
                      '\\(': {
                        marginBottom: '4px',
                        color: '#AAA9A9',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginRight: '2px'
                      },
                      '\\)': {
                        marginBottom: '4px',
                        color: '#AAA9A9',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '2px'
                      },
                      ' ': {
                        marginTop: '',
                        width: '3.5px',
                        minWidth: '3.5px'
                      }
                    }}

                    symbolStyle={{
                      '\\+': {
                        marginTop: '0.8px',
                        color: '#757575'
                      },
                      '\\d': {
                        color: '#757575'
                      },
                      '-': {
                        marginBottom: '1.5px',
                        color: '#757575',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '3px',
                        marginLeft: '3px'
                      },
                      '\\(': {
                        marginBottom: '4px',
                        color: '#757575',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginRight: '2px'
                      },
                      '\\)': {
                        marginBottom: '4px',
                        color: '#757575',
                        width: '3.5px',
                        minWidth: '3.5px',
                        marginLeft: '2px'
                      },
                      ' ': {
                        marginTop: '',
                        width: '3.5px',
                        minWidth: '3.5px'
                      }
                    }}

                    symbolDefaultStyle={{
                      fontFamily: 'CRC35',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontSize: '17px',
                      letterSpacing: '0px',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '9.5px',
                      minWidth: '9.5px'
                    }}

                    style={{
                      marginTop: '8px',
                      width: '141px',
                      height: '21px',
                      cursor: 'text',
                      marginLeft: '8px',
                      userSelect: 'none'
                    }}
                  />
                </label>
              </InputWrapper>
              <TipInput>
                <TipIcon src={pen_icon} />
              </TipInput>
            </Container>
            <Description>{this.props.lang.auth.registration.phone.description}</Description>
            <Navigation
              prev={this.prev}
              next={this.next}
              isNext={
                this.props.phone.country !== '' &&
                parsePhoneNumberFromString(this.props.phone.number).isValid() &&
                formatPhone(this.props.phone.number).length === 12
              }
            />
          </Form>
        </Body>
      </VisibilitySensor>
    )
  }
}

export default connect(
  state => ({
    ...state,
    phone: state.auth.registration.phone,
    lang: state.lang[state.lang.selected]
  }),
  dispatch => ({
    onPhone: (number, country) =>
      dispatch({
        type: 'REGISTRATION_PHONE_VALUE',
        payload: { number, country }
      })
  })
)(Phone)
