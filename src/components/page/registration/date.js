import React, { Component, createRef }     from 'react'
import { connect }                         from 'react-redux'
import styled                              from 'styled-components'
import VisibilitySensor                    from 'react-visibility-sensor'
import Input                               from '../../atom/input-style'
import toDateRect                          from '../../../other/toDateRect'
import formatDate                          from '../../../other/formatDate'
import calendar_icon                       from '../../../style/icons/calendar.svg'
import happy_icon                          from '../../../style/icons/happy.svg'
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

const TipImage = styled.img(props => props)

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

const Wrapper = styled.div`
  padding-top: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  font-family: Circe;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.18em;
  color: #757575;
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

class Date extends Component {
  constructor (props) {
    super(props)

    this.state = {
      focus: false
    }

    this.input = createRef()

    this.prev = '/registration/2-12/username/#prev'
    this.next = '/registration/4-12/geo#next'
  }

  componentDidMount () {
    window.onkeydown = () => (this.isDown = 1)
    window.onkeyup = ({ keyCode }) =>
      this.isDown === 1 &&
      keyCode === 13 &&
      this.state.date.length === 8 &&
      this.props.history.location.pathname.match(/3-12/gi) !== null &&
      this.props.history.push(this.next)
  }

  onFocus () {
    this.setState({
      focus: true
    })
  }

  onBlur (value) {
    this.setState({
      focus: false
    })
  }

  render () {
    const date = toDateRect(this.props.date)

    console.log(date)
    return (
      <VisibilitySensor onChange={isEndAnimation => isEndAnimation && this.input.current.focus()}>
        <Body>
          <Form>
            <Title>{this.props.lang.auth.registration.date.title}</Title>
            <TipWrapper>
              <TipImage src={happy_icon} />
            </TipWrapper>
            <label htmlFor='date__'>
              <Container>
                <TipInput>
                  <TipIcon src={calendar_icon} />
                </TipInput>
                <Wrapper>
                    <input
                      style={{ position: 'absolute', width: '0px', height: '0px', opacity: '0' }}
                      type="text"
                      autoComplete='off'
                      id='date__'
                      ref={this.input}
                      value={this.props.date}
                      onFocus={() => this.onFocus()}
                      onBlur={() => this.onBlur()}
                      onChange={({ target: { value } }) =>
                        this.props.onDate(
                          formatDate(value)
                        )
                      }
                    />
                    <Input
                      value={date}
                      placeholder={'00/00/0000'}
                      isHiddenPlaceholder={false}
                      isShowCursor={this.state.focus}
                      indexCursor={date.length}
                      indexMaxCursor={10}

                      symbolCursorStyle={{
                        marginTop: '20px',
                        width: '10px',
                        height: '2px',
                        background: '#FC8763',
                        animation: 'blink 1s infinite'
                      }}

                      symbolHiddenPlaceholderStyle={{
                        '(\\w|\\/)': {
                          opacity: '0'
                        }
                      }}

                      symbolCursorHiddenPlaceholderStyle={{
                        '(\\w|\\/)': {
                          color: '#FC8763'
                        }
                      }}

                      symbolPlaceholderStyle={{
                        '\\d': {
                          color: '#AAA9A9'
                        },
                        '\\/': {
                          marginBottom: '2px',
                          color: '#757575'
                        }
                      }}

                      symbolStyle={{
                        '\\/': {
                          marginBottom: '2px',
                          color: '#757575'
                        },
                        '\\d': {
                          color: '#5A5A5A'
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
                        width: '15px',
                        minWidth: '15px'
                      }}

                      style={{
                        width: '150px',
                        height: '21px',
                        cursor: 'text',
                        userSelect: 'none'
                      }}
                    />

                </Wrapper>
              </Container>
            </label>
            <Description>{this.props.lang.auth.registration.date.description}</Description>
            <Navigation prev='/registration/2-12/username/#prev' next='/registration/4-12/geo#next' isNext={this.props.date.length === 8} />
          </Form>
        </Body>
      </VisibilitySensor>
    )
  }
}

export default connect(
  state => ({
    ...state,
    date: state.auth.registration.date,
    lang: state.lang[state.lang.selected]
  }),
  dispatch => ({
    onDate: value =>
      dispatch({ type: 'REGISTRATION_DATE_VALUE', payload: value })
  })
)(Date)
