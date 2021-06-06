import React, { Component, createRef }     from 'react'
import { connect }                         from 'react-redux'
import styled                              from 'styled-components'
import VisibilitySensor                    from 'react-visibility-sensor'
import isValidateUsername                  from '../../../other/isValidateUsername'
import validateUsername                    from '../../../other/validateUsername'
import pen_icon                            from '../../../style/icons/pen.svg'
import dog_tag_icon                        from '../../../style/icons/dog-tag.svg'
import Input                               from '../../atom/input-style'
import Body                                from '../../../components/atom/auth/body'
import Form                                from '../../../components/atom/auth/form'
import Title                               from '../../../components/atom/auth/title'
import Description                         from '../../../components/atom/auth/description'
import Navigation                          from '../../../components/molecule/auth-navigation'


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

const TipImage = styled.img`
  margin-right: 20px;
  margin-bottom: 20px;
`

const Container = styled.div`
  width: 260px;
  height: 47px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(68, 68, 68, 0.27);
  border-radius: 114px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 365px) {
    width: 234px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
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

class Username extends Component {
  constructor (props) {
    super(props)

    this.state = {
      focus: true,
      caret: 0
    }

    this.input = createRef()

    this.prev = '/registration/1-12/lang/#prev'
    this.next = '/registration/3-12/date#next'
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

  onCaret (value) {
    this.setState({
      caret: value
    })
  }

  componentDidMount () {
    window.onkeydown = () => (this.isDown = 1)
    window.onkeyup = ({ keyCode }) =>
      this.isDown === 1 &&
      keyCode === 13 &&
      isValidateUsername(this.props.username) &&
      this.props.history.location.pathname.match(/2-12/gi) !== null &&
      this.props.history.push(this.next)
  }

  render () {
    return (
      <VisibilitySensor onChange={isEndAnimation => isEndAnimation && this.onFocus()}>
        <Body>
          <Form>
            <Title>{this.props.lang.auth.registration.username.title}</Title>
            <TipWrapper>
              <TipImage src={dog_tag_icon} />
            </TipWrapper>
            <Container>
              <InputWrapper>
                <label htmlFor='input_username_44543'>
                  <input
                    id='input_username_44543'
                    type='text'
                    autoComplete='off'
                    value={this.props.username}
                    ref={this.input}
                    style={{ position: 'absolute', width: '0px', height: '0px', opacity: '0' }}
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    onChange={({ target: { value }, target }) => {
                      this.props.onUsername(
                        validateUsername(
                          value
                        )
                      )

                      this.setState({
                        caret: target.selectionEnd
                      })
                    }}
                    onKeyUp={({ target }) => {
                      this.setState({
                        caret: target.selectionEnd
                      })
                    }}
                    onKeyDown={({ target }) => {
                      this.setState({
                        caret: target.selectionEnd
                      })
                    }}
                  />
                  <Input
                    value={this.props.username}
                    placeholder={this.props.lang.auth.registration.username.placeholder}
                    isHiddenPlaceholder={this.props.username.length > 0}
                    isShowCursor={this.state.focus}
                    indexCursor={this.state.caret}
                    maxCursor={this.props.username.length+1}

                    symbolCursorStyle={{
                      width: '2px',
                      height: '20px',
                      background: '#FC8763',
                      marginLeft: '-2px',
                      animation: 'blink 1s infinite'
                    }}

                    symbolHiddenPlaceholderStyle={{
                      '.': {
                        opacity: '0'
                      }
                    }}

                    symbolCursorHiddenPlaceholderStyle={index => ({
                      '.': {
                        color: '#AAA9A9',
                        marginTop: '3px',
                        marginLeft: index == 0 ? '2px' : '1px'
                      }
                    })}

                    symbolPlaceholderStyle={index => ({
                      ' ': {
                        width: '4px'
                      },
                      '.': {
                        color: '#AAA9A9',
                        marginTop: '3px',
                        marginLeft: index == 0 ? '2px' : '1px'
                      }
                    })}

                    symbolCaretStyle={{
                      ' ': {
                        width: '4px'
                      }
                    }}

                    symbolStyle={{
                      ' ': {
                        width: '4px'
                      },
                      '.': {
                        color: '#5A5A5A',
                        marginTop: '3px'
                      }
                    }}

                    symbolDefaultStyle={{
                      fontFamily: 'CRC35',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontSize: '17px',
                      marginLeft: '1px',
                      letterSpacing: '0px',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}

                    style={{
                      width: '150px',
                      marginLeft: '20px',
                      marginTop: '4px',
                      height: '21px',
                      cursor: 'text',
                      userSelect: 'none'
                    }}
                  />
                </label>
              </InputWrapper>
              <TipInput>
                <TipIcon src={pen_icon} />
              </TipInput>
            </Container>
            <Description>{this.props.lang.auth.registration.username.description}</Description>
            <Navigation prev={this.prev} next={this.next} isNext={isValidateUsername(this.props.username)} />
          </Form>
        </Body>
      </VisibilitySensor>
    )
  }
}

export default connect(
  state => ({
    ...state,
    username: state.auth.registration.username,
    lang: state.lang[state.lang.selected]
  }),
  dispatch => ({
    onUsername: value =>
      dispatch({ type: 'REGISTRATION_USERNAME_VALUE', payload: value })
  })
)(Username)
