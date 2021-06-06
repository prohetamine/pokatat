import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import BottomNavigation       from './../organism/navigation/head'
import TopNavigation          from './../organism/navigation/users'
import Filter                 from './../organism/filter/users'
import List                   from './../organism/card-list'
import GeoError               from './../organism/geo-error'
import CardsError             from './../organism/users-noncards'
import usersSearchFilter      from './../../other/usersSearchFilter'
import API                    from '../../api/server'

class Users extends Component {
  componentDidMount () {
    API.checkAuth(this.props.token).then(({ data: { auth } }) =>
      !auth && this.props.history.push('/login')
    )

    this.props.setUpdateCards(true)
    setTimeout(this.props.setUpdateCards, 800, false)

    const { updTime, cards } = this.props.users.users
        , { radius } = this.props.users.filter
        , { latitude, longitude } = this.props.global.filter.geo
        , updIds = cards.map(value => value.id)

    this.props.kickHideUsers();

    cards.length < 1000 &&
    this.props.getCards({
      contry: null, city: null, latitude, longitude, updTime, updIds, radius
    })
  }

  componentWillMount () {
    for (let i = 0; i < 9999; i++) {
      clearInterval(i)
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { updTime, cards } = this.props.users.users
        , { radius } = this.props.users.filter
        , { latitude, longitude } = this.props.global.filter.geo
        , updIds = cards.map(value => value.id)
        , eventUpdate = (
             prevProps.users.users.cards.length !== this.props.users.users.cards.length ||
            (
              prevProps.users.users.cards.length !== 0 &&
              this.props.users.users.cards.length !== 0 &&
              prevProps.users.users.cards[0].username !== this.props.users.users.cards[0].username
            ) ||
            (
              prevProps.users.users.length === 0 &&
              this.props.users.users.length === 0
            )
          ) && cards.length < 1000
        , eventRadius = prevProps.users.filter.radius !== this.props.users.filter.radius
        , eventLocation = prevProps.global.filter.geo.latitude !== this.props.global.filter.geo.latitude ||
                          prevProps.global.filter.geo.longitude !== this.props.global.filter.geo.longitude

    if (eventRadius || eventLocation) {
      this.props.setUpdateCards(true)
    }
    if (eventUpdate) this.props.setUpdateCards(false)

    if (
       eventUpdate   ||
       eventRadius    ||
       eventLocation
    ) {

      this.props.getCards({
        contry: null, city: null, latitude, longitude, updTime, updIds, radius
      })

      clearInterval(this.updater)
      this.updater = setInterval(() => {
        const { updTime, cards } = this.props.users.users
            , { radius } = this.props.users.filter
            , { latitude, longitude } = this.props.global.filter.geo
            , updIds = cards.map(value => value.id)

        this.props.getCards({
          contry: null, city: null, latitude, longitude, updTime, updIds, radius
        })
      }, 5000)
    }
  }

  render () {
    const { filter, search }            = this.props.users
        , { subscribed_to
        ,   other_users }               = this.props.lang.users
        , geoError                      = this.props.global.filter.geo.isError
        , { cards: _cards_
        ,   fake_cards: _fake_cards_
        ,   isUpdate,
            nonCards }                  = this.props.users.users
        , keywords                      = search.value
        , activeTags                    = filter.tagIds
        , _cards                        = usersSearchFilter(_cards_, keywords, activeTags)
        , fake_cards                    = _fake_cards_.reduce((ctx, card) => {
                                            card.isOther          && ctx.isOther.push(card)
                                            card.isSubscribedTo   && ctx.isSubscribedTo.push(card)
                                            card.isFriend         && ctx.isFriend.push(card)
                                            return ctx
                                          }, { isSubscribedTo: [], isFriend: [], isOther: [] })
        , cards                         = _cards.reduce((ctx, card) => {
                                            card.isOther          && ctx.isOther.push(card)
                                            card.isSubscribedTo   && ctx.isSubscribedTo.push(card)
                                            card.isFriend         && ctx.isFriend.push(card)
                                            return ctx
                                          }, { isSubscribedTo: [], isFriend: [], isOther: [] })

    return (
      <>
        <TopNavigation active={'users'} />
        <Filter />
        {
          geoError
            ? <GeoError />
            : nonCards
                ? <CardsError />
                : isUpdate || (cards.isSubscribedTo.length  === 0 &&
                               cards.isOther.length         === 0 &&
                               cards.isFriend.length        === 0)
                  ? <>
                      <List
                        items={fake_cards.isSubscribedTo}
                        activeTags={activeTags}
                        title={subscribed_to}
                        bottomMargin={fake_cards.isOther.length === 0}
                      />
                      <List
                        items={fake_cards.isOther}
                        activeTags={activeTags}
                        title={other_users}
                        bottomMargin={true}
                      />
                    </>
                  : <>
                      <List
                        items={cards.isSubscribedTo}
                        activeTags={activeTags}
                        title={subscribed_to}
                        bottomMargin={[...cards.isOther, ...cards.isFriend].length === 0}
                        showed={true}
                      />
                      <List
                        items={[...cards.isOther, ...cards.isFriend]}
                        activeTags={activeTags}
                        title={other_users}
                        bottomMargin={true}
                      />
                    </>
        }
        <BottomNavigation active={'users'} />
      </>
    )
  }
}

export default connect(
  state => ({
    ...state,
    token: state.auth.token,
    lang: state.lang[state.lang.selected]
  }),
  dispatch => ({
    setUpdateCards: flag =>
      dispatch({ type: 'USERS_SET_UPDATE_CARDS', payload: flag }),
    getCards: query =>
      dispatch(
        async (dispatch) => {
          const response = await API.getUsers(query)
          dispatch({ type: 'USERS_GET_CARDS', payload: response.data })
        }
      ),
    kickHideUsers: () =>
      dispatch({ type: 'USERS_KICK_HIDE_CARDS' })
  })
)(Users)
