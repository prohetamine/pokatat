import React          from 'react'
import { connect }    from 'react-redux'
import styled         from 'styled-components'
import MediaQuery     from 'react-responsive';
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
  const requests_navigation = props.lang.requests_navigation //локализованный текст
  const filterSubtype = props.requests.filter.show ? ['fill'] : ['clean']

  const subtype = {
    search: ['clean'],
    active: ['clean'],
    history: ['clean']
  }

  subtype[props.active][0] = 'fill'

  if (props.notify.requests.added_history) {
    subtype.history[1] = 'notify'
  }

  const hideLabel = props.requests.search.value.length > 0

  return (
    <Wrapper>
      <Body>
        <MediaQuery query="(min-width: 531px)">
            <Search onClear={() => props.onSearchClear()} onChange={(value) => props.onSearch(value)} value={props.requests.search.value} placeholder={requests_navigation.search_placeholder} />
            <Button icon='navigation-filter' onClick={() => props.onFilterShow()} subtype={filterSubtype}>{requests_navigation.filter}</Button>
            <Link hideLabel={hideLabel} to='/search' icon='requests-navigation-search' subtype={subtype.search}>{requests_navigation.search}</Link>
            <Link hideLabel={hideLabel} to='/active' icon='requests-navigation-active' subtype={subtype.active}>{requests_navigation.active}</Link>
            <Link hideLabel={hideLabel} to='/history' icon='requests-navigation-history' subtype={subtype.history}>{requests_navigation.history}</Link>
        </MediaQuery>
        <MediaQuery query="(max-width: 530px)">
          {
            props.requests.search.show
              ? (
                  <>
                    <Search onClear={() => props.onSearchClear()} onChange={(value) => props.onSearch(value)} value={props.requests.search.value} placeholder={requests_navigation.search_placeholder} />
                    <Button icon='navigation-filter' onClick={() => props.onFilterShow()} style={{ width: '30%' }} subtype={filterSubtype} />
                    <Button icon='navigation-search'  onClick={() => props.onSearchShow()} style={{ width: '30%' }} subtype={['hide']} />
                  </>
                )
              : (
                  <>
                    <Button onClick={() => props.onSearchShow()} style={{ width: '100%', marginLeft: '0px' }} icon='navigation-search' subtype={['show']} />
                    <Button onClick={() => props.onFilterShow()} style={{ width: '100%' }} icon='navigation-filter' subtype={filterSubtype} />
                    <Link to='/search' icon='requests-navigation-search' style={{ width: '100%' }} subtype={subtype.search} />
                    <Link to='/active' icon='requests-navigation-active' style={{ width: '100%' }} subtype={subtype.active} />
                    <Link to='/history' icon='requests-navigation-history' style={{ width: '100%' }} subtype={subtype.history} />
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
        dispath({ type: 'REQUESTS_FILTER_SHOW' })
      },
      onSearchShow: () => {
        dispath({ type: 'REQUESTS_SEARCH_SHOW' })
      },
      onSearch: (value) => {
        dispath({ type: 'REQUESTS_SEARCH_VALUE', payload: value })
      },
      onSearchClear: () => {
        dispath({ type: 'REQUESTS_SEARCH_VALUE_CLEAR' })
      }
    }
  }
)(Navigation)
