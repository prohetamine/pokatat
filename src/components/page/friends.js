import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import BottomNavigation       from './../organism/navigation/head'
import TopNavigation          from './../organism/navigation/users'
import Filter                 from './../organism/filter/users'
import List                   from './../organism/card-list'
import GeoError               from './../organism/geo-error'
import CardsError             from './../organism/friends-noncards'
import usersSearchFilter      from './../../other/usersSearchFilter'
import API                    from '../../api/server'

class Friends extends Component {
  componentDidMount () {
    API.checkAuth(this.props.token).then(({ data: { auth } }) =>
      !auth && this.props.history.push('/login')
    )

    this.props.setUpdateCards(true)
    setTimeout(this.props.setUpdateCards, 800, false)

    const { updTime, cards } = this.props.users.friends
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
    const { updTime, cards } = this.props.users.friends
        , { radius } = this.props.users.filter
        , { latitude, longitude } = this.props.global.filter.geo
        , updIds = cards.map(value => value.id)
        , eventUpdate = (
             prevProps.users.friends.cards.length !== this.props.users.friends.cards.length ||
            (
              prevProps.users.friends.cards.length !== 0 &&
              this.props.users.friends.cards.length !== 0 &&
              prevProps.users.friends.cards[0].username !== this.props.users.friends.cards[0].username
            ) ||
            (
              prevProps.users.friends.length === 0 &&
              this.props.users.friends.length === 0
            )
          ) && cards.length < 1000
        , eventRadius = prevProps.users.filter.radius !== this.props.users.filter.radius
        , eventLocation = prevProps.global.filter.geo.latitude !== this.props.global.filter.geo.latitude ||
                          prevProps.global.filter.geo.longitude !== this.props.global.filter.geo.longitude

    if (eventRadius || eventLocation) this.props.setUpdateCards(true)
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
        const { updTime, cards } = this.props.users.friends
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
        , { approved
        ,   invite
        ,   new: _new }                 = this.props.lang.friends
        , geoError                      = this.props.global.filter.geo.isError
        , { cards: _cards_
        ,   fake_cards: _fake_cards_
        ,   isUpdate
        ,   nonCards }                  = this.props.users.friends
        , keywords                      = search.value
        , activeTags                    = filter.tagIds
        , _cards                        = usersSearchFilter(_cards_, keywords, activeTags)
        , fake_cards                    = _fake_cards_.reduce((ctx, card) => {
                                            card.isNewFriend  && ctx.isNewFriend.push(card)
                                            card.isInvite     && ctx.isInvite.push(card)
                                            card.isFriend     && ctx.isFriend.push(card)

                                            return ctx
                                          }, { isNewFriend: [], isInvite: [], isFriend: [] })
        , cards                         = _cards.reduce((ctx, card) => {
                                            card.isNewFriend  && ctx.isNewFriend.push(card)
                                            card.isInvite     && ctx.isInvite.push(card)
                                            card.isFriend     && ctx.isFriend.push(card)

                                            return ctx
                                          }, { isNewFriend: [], isInvite: [], isFriend: [] })

    return (
      <>
        <TopNavigation active={'friends'} />
        <Filter unlimitRadius={true} />
        {
          nonCards
            ? <CardsError />
            : isUpdate || (cards.isNewFriend.length  === 0 &&
                           cards.isInvite.length     === 0 &&
                           cards.isFriend.length     === 0)
                ? <>
                    <List
                      items={fake_cards.isInvite}
                      activeTags={activeTags}
                      title={invite}
                      bottomMargin={fake_cards.isFriend.length === 0}
                    />
                    <List
                      items={fake_cards.isFriend}
                      activeTags={activeTags}
                      title={approved}
                      bottomMargin={true}
                    />
                  </>
                : <>
                    <List
                      items={cards.isNewFriend}
                      activeTags={activeTags}
                      title={_new}
                      bottomMargin={cards.isInvite.length === 0 && cards.isFriend.length === 0}
                      showed={true}
                    />
                    <List
                      items={cards.isInvite}
                      activeTags={activeTags}
                      title={invite}
                      bottomMargin={cards.isFriend.length === 0}
                      showed={true}
                    />
                    <List
                      items={cards.isFriend}
                      activeTags={activeTags}
                      title={approved}
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
  dispatch => {
    return {
      setUpdateCards: flag =>
        dispatch({ type: 'FRIENDS_SET_UPDATE_CARDS', payload: flag }),
      getCards: query =>
        dispatch(
          async (dispatch) => {
            const response = await API.getFriends(query)
            dispatch({ type: 'FRIENDS_GET_CARDS', payload: response.data })
          }
        ),
      kickHideUsers: () =>
        dispatch({ type: 'FRIENDS_KICK_HIDE_CARDS' })
    }
  }
)(Friends)
