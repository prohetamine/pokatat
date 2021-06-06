import React                    from 'react'
import { connect }              from 'react-redux'
import styled                   from 'styled-components'
import Info                     from './../atom/card/info'
import Tags                     from './../atom/card/tags'
import getTypeYear              from '../../other/getTypeYear'
import Sections                 from './../../style/sections'
import Button                   from './../atom/card/button'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 740px;
  filter: ${props => props.isHide ? 'blur(5px)' : 'blur(0px)'};
`

/*
const Navigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  max-width: calc(740px - 14px);
  width: calc(100% - 14px);
  height: ${props => props.height}px;
`
*/

/*<Navigation height={this.state.height_card}>
  <NavigationButton loaderProps={loaderProps} style={{  marginLeft: '15%' }}/>
  <NavigationButton loaderProps={loaderProps} />
  <NavigationButton loaderProps={loaderProps} />
</Navigation>*/


const Card = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 9px 10px;
  border-radius: 47px;
  width: 100%;
  max-width: 740px;
  font-family: Circle, sans-serif;
  font-weight: normal;
  background-color: #FCFCFC;
  box-shadow: 0px 1px 5px rgba(68, 68, 68, 0.27);
  margin-bottom: 12px;
  height: 78px;

  @media (max-width: 513px) {
    justify-content: space-between;
  }
`

function _Card (props) {
  const {
    lang,
    card: {
      age,
      city,
      usercount,
      username,
      reqname,
      id,
      description,
      pic,
      pics,
      tags,
      isLoad,
      isHide
    },
    activeTags,
    tagsConfig,
    style
  } = props

  const loaderProps = {
    isLoad,
    speed: 1,
    primaryColor: '#ffab91',
    secondaryColor: '#FF9777'
  }

  const years = lang.users_navigation.years

  return (
    <Wrapper style={style} isHide={isHide}>
      <Card>
        <Info
          loaderProps={loaderProps}
          pic={pic || pics}
          titleText={username || reqname}
          firstText={
            (age && age + ' ' + getTypeYear(age, years)) ||
            (usercount && usercount + ' ' + lang.requests.user_count_prefix)
          }
          lastText={city}
        />
        <Tags
          description={description}
          tags={tags}
          tagsConfig={tagsConfig}
          activeTags={activeTags}
          loaderProps={loaderProps}
        />
        <Button
          icon='open-card-control-navigation'
          loaderProps={loaderProps}
        />
      </Card>
    </Wrapper>
  )
}

export default connect(
  state => ({
    ...state,
    section: Sections[state.global.section],
    lang: state.lang[state.lang.selected]
  })
)(_Card)
