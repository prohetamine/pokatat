import React          from 'react'
import styled         from 'styled-components'
import { connect }    from 'react-redux'
import Link           from './../../atom/navigation-link'

const Wrapper = styled.div`
  width: 540px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: space-around;
  }
`

const Body = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FC8763;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.34);
`

function Navigation (props) {
  const navigation = props.lang.navigation

  const subtype = {
    profile: ['clean'],
    users: ['clean'],
    requests: ['clean']
  }

  subtype[props.active][0] = 'fill'

  if (false) {
    subtype.profile[1] = 'notify'
  }

  if (props.notify.users.added_friend || props.notify.users.request_friend) {
    subtype.users[1] = 'notify'
  }

  if (props.notify.requests.added_history) {
    subtype.requests[1] = 'notify'
  }

  return (
    <Body>
      <Wrapper>
        <Link to='/profile' icon='navigation-profile'   subtype={subtype.profile}>{navigation.profile}</Link>
        <Link to='/users' icon='navigation-users'       subtype={subtype.users}>{navigation.users}</Link>
        <Link to='/requests' icon='navigation-requests'  subtype={subtype.requests}>{navigation.requests}</Link>
      </Wrapper>
    </Body>
  )
}

export default connect(
  state => ({
    ...state,
    lang: state.lang[state.lang.selected]
  }),
  dispath => {
    return {

    }
  }
)(Navigation)
