import React, { Component, createRef, useState, useEffect }   from 'react'
import { connect }                                            from 'react-redux';
import styled                                                 from 'styled-components'
import Emoji                                                  from 'react-emojis'
import { useSprings, useSpring, animated }                    from 'react-spring-useTransition'
import Body                                                   from '../../../components/atom/auth/body'
import Form                                                   from '../../../components/atom/auth/form'
import Title                                                  from '../../../components/atom/auth/title'
import Description                                            from '../../../components/atom/auth/description'
import Navigation                                             from '../../../components/molecule/auth-navigation'

import section_motorcycle_icon                                from '../../../style/icons/motorcycle.svg'
import section_quadbike_icon                                  from '../../../style/icons/quadbike.svg'
import section_bicycle_icon                                   from '../../../style/icons/bicycle.svg'
import section_rollerskates_icon                              from '../../../style/icons/rollerskates.svg'
import section_scooter_icon                                   from '../../../style/icons/scooter.svg'
import section_skates_icon                                    from '../../../style/icons/skates.svg'
import section_skateboard_icon                                from '../../../style/icons/skateboard.svg'
import section_snowboard_icon                                 from '../../../style/icons/snowboard.svg'
import section_ski_icon                                       from '../../../style/icons/ski.svg'
import section_car_icon                                       from '../../../style/icons/car.svg'
import section_boat_icon                                      from '../../../style/icons/boat.svg'
import section_other_icon                                     from '../../../style/icons/other.svg'
import section_selected_icon                                  from '../../../style/icons/section-selected.svg'

const AnimationSectionInfo = styled(animated.div)`
  width: 100%;
  height: 100%;
  opacity: 0;
  background: #fff;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  border-radius: 22px;
`

const SectionTitle = styled.div`
  font-family: CRC55;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  margin-top: -10px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`

const SectionSelected = styled.div`
  position: absolute;
  margin-top: 62px;
  margin-left: 62px;
  top: ${props => props.top};
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #fff;
  animation: blink 1s infinite;

  @media (max-width: 365px) {
    margin-top: 53px;
    margin-left: 53px;
  }
`

const SectionPeople = styled.div`
  font-family: CRC55;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 0px;
  margin-left: 20px;
`

const Sections = styled.div`
  position: relative;
  height: 227px;
  width: 279px;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-width: 365px) {
    width: 243px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const AnimationSection = styled(animated.div)`
  width: 80px;
  height: 80px;
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 73px;
  background-color: #FC8763;
  box-shadow: 0px 0px 4px rgba(68, 68, 68, 0.27);
  border-radius: 22px;
  display: inline-block;
  margin: 5px;
  user-select: none;
  cursor: ${props => props.cursor};
  overflow: hidden;

  @media (max-width: 365px) {
    width: 71px;
    height: 71px;
    background-size: 63px;
  }
`

function SectionSelect ({ show }) {
  const style = useSpring(
    show
      ? {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      : {
        from: {
          opacity: 0
        },
        to: {
          opacity: 0
        }
      }
  )

  return <SectionSelected style={style} />
}

function SectionInfo ({ show, people, title }) {
  const dataStyle = useSpring(
    show ? {
      to: [{
        opacity: 1
      }, {
        color: '#5A5A5A;'
      }],
      from: {
        opacity: 0,
        color: '#fff'
      },
      config: {
        duration: 300,
      }
    } : {
      to: [{
        color: '#fff'
      }, {
        opacity: 0
      }],
      from: {
        opacity: 0,
        color: '#5A5A5A'
      },
      config: {
        duration: 150,
      }
    }
  )

  return (
    <AnimationSectionInfo style={dataStyle}>
      <SectionTitle>{title}</SectionTitle>
      <SectionPeople>{people} участников</SectionPeople>
    </AnimationSectionInfo>
  )
}

function Section (props) {
  const sections = props.children
      , value    = props.value
      , isMaxWidth = window.innerWidth > 365


  const dafaultStyle = {
    transform: 'translate(0px, 0px)',
    opacity: 1,
    width: isMaxWidth ? '80px' : '71px',
    marginLeft: '5px',
    backgroundColor: '#FC8763'
  }

  const defaultSection = Array(sections.length).fill(dafaultStyle)

  const [state, set] = useState({
    items:defaultSection,
    active: null,
    disabled: null
  });

  const active = state.active;

  const springs = useSprings(
    state.items.length,
    state.items
  )

  return springs.map((style, index) =>
    <AnimationSection
      src={index !== state.disabled ? sections[index].icon : ''}
      cursor={index !== state.disabled ? 'pointer' : 'default'}
      onClick={() => {
          const copyDefaultSection = defaultSection.slice();

          if (index === state.active) {
            props.onChange(sections[index].id)

            set({
              active: null,
              disabled: null,
              items: copyDefaultSection
            })
          }

          if (index % 3 === 0 && index !== state.active && index !== state.disabled) {
            copyDefaultSection[index] = { transform: 'translate(0px, 0px)' }
            copyDefaultSection[index+1] = { transform: `translate(${isMaxWidth ? '45px' : '40.5px'}, 0px)`, opacity: 0 }
            copyDefaultSection[index+2] = { transform: 'translate(0px, 0px)', backgroundColor: '#FFF', width: isMaxWidth ? '165px' : '147px', marginLeft: isMaxWidth ? '-85px' : '-76px' }

            props.onChange(sections[index].id)

            set({
              active: index,
              disabled: index+2,
              items: copyDefaultSection
            })
          }

          if ((index-1) % 3 === 0 && index !== state.active && index !== state.disabled) {
            copyDefaultSection[index-1] = { transform: `translate(${isMaxWidth ? '45px' : '40.5px'}, 0px)`, opacity: 0 }
            copyDefaultSection[index] = { transform: `translate(${isMaxWidth ? '-90px' : '-81px'}, 0px)` }
            copyDefaultSection[index+1] = { transform: 'translate(0px, 0px)', backgroundColor: '#FFF', width: isMaxWidth ? '165px' : '147px', marginLeft: isMaxWidth ? '-85px' : '-76px' }

            props.onChange(sections[index].id)

            set({
              active: index,
              disabled: index+1,
              items: copyDefaultSection
            })
          }

          if ((index-2) % 3 === 0 && index !== state.active && index !== state.disabled) {
            copyDefaultSection[index-2] =  { transform: `translate(${isMaxWidth ? '45px' : '40.5px'}, 0px)`, opacity: 0 }
            copyDefaultSection[index-1] = { transform: 'translate(0px, 0px)', backgroundColor: '#FFF', width: isMaxWidth ? '165px' : '147px', marginLeft: isMaxWidth ? '-85px' : '-76px' }
            copyDefaultSection[index] = { transform: 'translate(0px, 0px)' }

            props.onChange(sections[index].id)

            set({
              active: index,
              disabled: index-1,
              items: copyDefaultSection
            })
          }
        }
      }
      key={index}
      style={style}
    >
      {
        !index === state.active || (value-1) === index &&
          <SectionSelect />
      }
      <SectionInfo
        show={index === state.disabled}
        people={sections[state.active || 0].people}
        title={sections[state.active || 0].title}
      />
    </AnimationSection>
  )
}

const Shadow = styled.div`
  display: ${props => props.active ? 'block' : 'none'}
  position: relative;
  z-index: 999;
  width: 100%;
  height: 24px;
  background: linear-gradient(180deg, rgba(252, 252, 252, 0) 0%, #FCFCFC 64.06%);
`

class _Section extends Component {
  constructor (props) {
    super (props)

    this.state = {
      top_shadow: false,
      bottom_shadow: true,
      sections: [
        {
          title: this.props.lang.auth.registration.section.type[0],
          icon: section_motorcycle_icon,
          id: 1,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[1],
          icon: section_quadbike_icon,
          id: 2,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[2],
          icon: section_bicycle_icon,
          id: 3,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[3],
          icon: section_rollerskates_icon,
          id: 4,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[4],
          icon: section_scooter_icon,
          id: 5,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[5],
          icon: section_skates_icon,
          id: 6,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[6],
          icon: section_skateboard_icon,
          id: 7,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[7],
          icon: section_snowboard_icon,
          id: 8,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[8],
          icon: section_ski_icon,
          id: 9,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[9],
          icon: section_car_icon,
          id: 10,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[10],
          icon: section_boat_icon,
          id: 11,
          people: '0'
        },
        {
          title: this.props.lang.auth.registration.section.type[11],
          icon: section_other_icon,
          id: 12,
          people: '0'
        }
      ]
    }

    this.prev = '/registration/5-12/photo#prev'
    this.next = '/registration/7-12/phone#next'
  }

  componentDidMount () {
    window.onkeydown = () => (this.isDown = 1)
    window.onkeyup = ({ keyCode }) =>
      this.isDown === 1 &&
      keyCode === 13 &&
      this.props.history.location.pathname.match(/6-12/gi) !== null &&
      this.props.history.push(this.next)

    const sections = this.state.sections.map((section, index) => ({
        ...section,
        people: '30 000'
    }))

    this.setState({
      sections
    })
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
      <Body>
        <Form>
          <Title>{this.props.lang.auth.registration.section.title}</Title>
          <Shadow active={this.state.top_shadow} style={{ marginBottom: '-24px', transform: 'matrix(1, 0, 0, -1, 0, 0)' }} />
          <Sections onScroll={e => this.onHandleShadow(e)}>
            <Section
              value={this.props.auth.registration.section}
              onChange={section => this.props.onSection(section)}
            >
              {
                this.state.sections
              }
            </Section>
          </Sections>
          <Shadow active={this.state.bottom_shadow} style={{ marginTop: '-24px' }} />
          <Description>{this.props.lang.auth.registration.section.description}</Description>
          <Navigation prev={this.prev} next={this.next} isNext={this.props.auth.registration.section} />
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
    onSection: (section) => {
      dispath({ type: 'REGISTRATION_SECTION_VALUE', payload: section })
    }
  })
)(_Section)
