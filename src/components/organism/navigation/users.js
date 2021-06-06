import React          from 'react'
import { connect }    from 'react-redux'
import styled         from 'styled-components'
import MediaQuery     from 'react-responsive'
import Link           from './../../atom/navigation-link-round'
import Button         from './../../atom/navigation-button'
import Search         from './../../atom/navigation-search'

const Wrapper = styled.div`
  width: calc(100% - 14px);
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7px;

  @media (min-width: 790px) {
    margin-top: 24px;
  }
`

const Body = styled.div`
  width: 100%;
  max-width: 740px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Navigation (props) {
  const users_navigation = props.lang.users_navigation
  const filterSubtype = props.users.filter.show ? ['fill'] : ['clean']

  const linkSubtype = {
    friends: ['clean'],
    users: ['clean'],
    subscribes: ['clean'],
  }

  linkSubtype[props.active][0] = 'fill'

  if (props.notify.users.added_friend || props.notify.users.request_friend) {
    linkSubtype.friends[1] = 'notify'
  }

  const hideLabel = props.users.search.value.length > 0

  return (
    <Wrapper>
      <Body>
        <MediaQuery query="(min-width: 491px)">
          <Search onClear={() => props.onSearchClear()} onChange={value => props.onSearch(value)} value={props.users.search.value} placeholder={users_navigation.search_placeholder} />
          <Button icon='navigation-filter' onClick={() => props.onFilterShow()} subtype={filterSubtype}></Button>
          <Link hideLabel={hideLabel} to='/friends' icon='users-navigation-friends' subtype={linkSubtype.friends}>{users_navigation.friends}</Link>
          <Link hideLabel={hideLabel} to='/users' icon='users-navigation-users' subtype={linkSubtype.users}>{users_navigation.users}</Link>
          <Link hideLabel={hideLabel} to='/subscribes' icon='users-navigation-subscribes' subtype={linkSubtype.subscribes}>{users_navigation.subscribes}</Link>
        </MediaQuery>
        <MediaQuery query="(max-width: 490px)">
          {
            props.users.search.show
              ? (
                  <>
                    <Search onClear={() => props.onSearchClear()} onChange={value => props.onSearch(value)} value={props.users.search.value} placeholder={users_navigation.search_placeholder} />
                    <Button onClick={() => props.onFilterShow()} style={{ width: '30%' }} icon='navigation-filter' subtype={filterSubtype} />
                    <Button onClick={() => props.onSearchShow()} style={{ width: '30%' }} icon='navigation-search' subtype={['hide']} />
                  </>
                )
              : (
                  <>
                    <Button onClick={() => props.onSearchShow()} style={{ width: '100%', marginLeft: '0px' }} icon='navigation-search' subtype={['show']} />
                    <Button onClick={() => props.onFilterShow()} style={{ width: '100%' }} icon='navigation-filter' subtype={filterSubtype} />
                    <Link to='/friends' icon='users-navigation-friends' style={{ width: '100%' }} subtype={linkSubtype.friends} />
                    <Link to='/users' icon='users-navigation-users' style={{ width: '100%' }} subtype={linkSubtype.users} />
                    <Link to='/subscribes' icon='users-navigation-subscribes' style={{ width: '100%' }} subtype={linkSubtype.subscribes} />
                  </>
                )
          }
        </MediaQuery>
      </Body>
    </Wrapper>
  )
}

export default connect(
  state => ({
    ...state,
    lang: state.lang[state.lang.selected]
  }),
  dispath => {
    return {
      onFilterShow: () => {
        dispath({ type: 'USERS_FILTER_SHOW' })
      },
      onSearchShow: () => {
        dispath({ type: 'USERS_SEARCH_SHOW' })
      },
      onSearch: (value) => {
        dispath({ type: 'USERS_SEARCH_VALUE', payload: value })
      },
      onSearchClear: () => {
        dispath({ type: 'USERS_SEARCH_VALUE_CLEAR' })
      }
    }
  }
)(Navigation)
