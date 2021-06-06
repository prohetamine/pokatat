import React, { Component }   from 'react'
import { connect }            from 'react-redux';
import BottomNavigation       from './../organism/navigation/head'
import TopNavigation          from './../organism/navigation/requests'
import Filter                 from './../organism/filter/requests'
import List                   from './../organism/card-list'
import requestsSearchFilter   from './../../other/requestsSearchFilter'
import API                    from '../../api/server'

class Requests extends Component {
  componentDidMount () {
    API.checkAuth(this.props.token).then(({ data: { auth } }) =>
      !auth && this.props.history.push('/login')
    )
  }

  render () {
    const activeFilter = this.props.requests.filter.show
        , keywords = this.props.requests.search.value
        , activeTags = activeFilter ? this.props.requests.filter.tagIds : []

        , _requests   = this.props.requests.requests
        , _active     = this.props.requests.actives
        , _historys   = this.props.requests.historys

        , requests    = requestsSearchFilter(_requests, keywords, activeTags)
        , actives     = requestsSearchFilter(_active, keywords, activeTags).filter(({ isInvite }) => !isInvite)
        , historys    = requestsSearchFilter(_historys, keywords, activeTags)
        , invites     = requestsSearchFilter(_active, keywords, activeTags).filter(({ isInvite }) => isInvite)
        , request_to  = requestsSearchFilter(_requests, keywords, activeTags).filter(({ isRequestTo }) => isRequestTo)

    const route = this.props.location.pathname

    if (route === '/search') {
      return (
        <>
          <TopNavigation active={'search'} />
          <Filter />
          <List items={request_to} activeTags={activeTags} title={this.props.lang.requests.request_to_list_title} bottomMargin={requests.length === 0} />
          <List items={requests} activeTags={activeTags} title={this.props.lang.requests.search_list_title} bottomMargin={true} />
          <BottomNavigation active={'requests'} />
        </>
      )
    }

    if (route === '/active' || route === '/requests') {
      return (
        <>
          <TopNavigation active={'active'} />
          <Filter />
          <List items={invites} activeTags={activeTags} title={this.props.lang.requests.invites_list_title} bottomMargin={actives.length === 0} />
          <List items={actives} activeTags={activeTags} title={this.props.lang.requests.active_list_title} bottomMargin={true} />
          <BottomNavigation active={'requests'} />
        </>
      )
    }

    if (route === '/history') {
      return (
        <>
          <TopNavigation active={'history'} />
          <Filter />
          <List items={historys} activeTags={activeTags} title={this.props.lang.requests.history_list_title} bottomMargin={true} />
          <BottomNavigation active={'requests'} />
        </>
      )
    }

  }
}

export default connect(
  state => ({
    ...state,
    token: state.auth.token,
    lang: state.lang[state.lang.selected]
  }),
  dispath => {
    return {

    }
  }
)(Requests)
