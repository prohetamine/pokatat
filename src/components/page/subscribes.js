import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import BottomNavigation       from './../organism/navigation/head'
import TopNavigation          from './../organism/navigation/users'
import Filter                 from './../organism/filter/users'
import List                   from './../organism/card-list'
import GeoError               from './../organism/geo-error'
import CardsError             from './../organism/subscribes-noncards'
import usersSearchFilter      from './../../other/usersSearchFilter'
import API                    from '../../api/server'

class Subscribes extends Component {
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
    const { updTime, cards } = this.props.users.subscribes
        , { radius } = this.props.users.filter
        , { latitude, longitude } = this.props.global.filter.geo
        , updIds = cards.map(value => value.id)
        , eventUpdate = (
             prevProps.users.subscribes.cards.length !== this.props.users.subscribes.cards.length ||
            (
              prevProps.users.subscribes.cards.length !== 0 &&
              this.props.users.subscribes.cards.length !== 0 &&
              prevProps.users.subscribes.cards[0].username !== this.props.users.subscribes.cards[0].username
            ) ||
            (
              prevProps.users.subscribes.length === 0 &&
              this.props.users.subscribes.length === 0
            )
          ) && cards.length < 1000
        , eventRadius = prevProps.users.filter.radius !== this.props.users.filter.radius
        , eventLocation = prevProps.global.filter.geo.latitude !== this.props.global.filter.geo.latitude ||
                          prevProps.global.filter.geo.longitude !== this.props.global.filter.geo.longitude

    if (eventRadius || eventLocation) this.props.setUpdateCards(true)
    if (eventUpdate) this.props.setUpdateCards(false)

    if (
       eventUpdate    ||
       eventRadius    ||
       eventLocation
    ) {

      this.props.getCards({
        contry: null, city: null, latitude, longitude, updTime, updIds, radius
      })

      clearInterval(this.updater)
      this.updater = setInterval(() => {
        const { updTime, cards } = this.props.users.subscribes
            , { radius } = this.props.users.filter
            , { latitude, longitude } = this.props.global.filter.geo
            , updIds = cards.map(value => value.id)

        this.props.getCards({
          contry: null , city: null, latitude, longitude, updTime, updIds, radius
        })
      }, 5000)
    }
  }

  render () {
    const { filter, search }            = this.props.users
        , { subscribe }                 = this.props.lang.friends
        , geoError                      = this.props.global.filter.geo.isError
        , { cards: _cards_
        ,   fake_cards: _fake_cards_
        ,   isUpdate
        ,   nonCards }                  = this.props.users.subscribes
        , keywords                      = search.value
        , activeTags                    = filter.tagIds
        , _cards                        = usersSearchFilter(_cards_, keywords, activeTags)
        , fake_cards                    = _fake_cards_.reduce((ctx, card) => {
                                            card.isSubscribe  && ctx.isSubscribe.push(card)

                                            return ctx
                                          }, { isSubscribe: [] })
        , cards                         = _cards.reduce((ctx, card) => {
                                            card.isSubscribe  && ctx.isSubscribe.push(card)

                                            return ctx
                                          }, { isSubscribe: [] })

    return (
      <>
        <TopNavigation active={'subscribes'} />
        <Filter unlimitRadius={true} />
        {
          nonCards
            ? <CardsError />
            : isUpdate || cards.isSubscribe.length === 0
              ? <List
                  items={fake_cards.isSubscribe}
                  activeTags={activeTags}
                  title={subscribe}
                  bottomMargin={true}
                />
              : <List
                  items={cards.isSubscribe}
                  activeTags={activeTags}
                  title={subscribe}
                  bottomMargin={true}
                />
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
  dispatch => {
    return {
      setUpdateCards: flag =>
        dispatch({ type: 'SUBSCRIBES_SET_UPDATE_CARDS', payload: flag }),
      getCards: query =>
        dispatch(
          async (dispatch) => {
            const response = await API.getSubscribes(query)
            dispatch({ type: 'SUBSCRIBES_GET_CARDS', payload: response.data })
          }
        ),
      kickHideUsers: () =>
        dispatch({ type: 'SUBSCRIBES_KICK_HIDE_CARDS' })
    }
  }
)(Subscribes)
