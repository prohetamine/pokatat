import generateFakeProfile from './../other/generateFakeProfile'

const isAllCardsFetched   = false
    , isUpdate            = true
    , updTime             = 0
    , searchHash          = 0
    , nonCards            = false

let usersState = {
  search: {
    value: '',
    mobile_show: false
  },
  filter: {
    show: false,
    tagIds: [],
    radius: 13
  },

  users: {
    searchHash,
    isAllCardsFetched,
    isUpdate,
    nonCards,
    updTime,
    fake_cards: [
      ...Array.from({ length: 1 }, () => ({
        isSubscribedTo: true,
        ...generateFakeProfile()
      })),
      ...Array.from({ length: 3 }, () => ({
        isOther: true,
        ...generateFakeProfile()
      }))
    ],
    cards: [],
    hideIds: []
  },

  friends: {
    searchHash,
    isAllCardsFetched,
    isUpdate,
    nonCards,
    updTime,
    fake_cards: [
      ...Array.from({ length: 1 }, () => ({
        isNewFriend: true,
        ...generateFakeProfile()
      })),
      ...Array.from({ length: 1 }, () => ({
        isInvite: true,
        ...generateFakeProfile()
      })),
      ...Array.from({ length: 3 }, () => ({
        isFriend: true,
        ...generateFakeProfile()
      }))
    ],
    cards: [],
    hideIds: []
  },

  subscribes: {
    searchHash,
    isAllCardsFetched,
    isUpdate,
    nonCards,
    updTime,
    fake_cards: [
      ...Array.from({ length: 3 }, () => ({
        isSubscribe: true,
        ...generateFakeProfile()
      }))
    ],
    cards: []
  }
}

usersState = localStorage.usersState ? JSON.parse(localStorage.usersState) : usersState

function users (state = usersState, action) {

  if (action.type === 'USERS_RADIUS_LOCATION') {
    return {
      ...state,
      filter: {
        ...state.filter,
        radius: action.payload
      }
    }
  }

  if (action.type === 'USERS_ACTIVATED_FILTER_TAG') {
    return {
      ...state,
      filter: {
        ...state.filter,
        tagIds: [action.payload, ...state.filter.tagIds]
      }
    }
  }

  if (action.type === 'USERS_DISABLED_FILTER_TAG') {
    return {
      ...state,
      filter: {
        ...state.filter,
        tagIds: state.filter.tagIds.filter(tagId => tagId !== action.payload)
      }
    }
  }

  if (action.type === 'USERS_SEARCH_VALUE') {
    return {
      ...state,
      search: {
        ...state.search,
        value: action.payload
      }
    }
  }

  if (action.type === 'USERS_SEARCH_VALUE_CLEAR') {
    return {
      ...state,
      search: {
        ...state.search,
        value: ''
      }
    }
  }

  if (action.type === 'USERS_SEARCH_SHOW') {
    return {
      ...state,
      search: {
        ...state.search,
        show: !state.search.show
      }
    }
  }

  if (action.type === 'USERS_FILTER_SHOW') {
    return {
      ...state,
      filter: {
        ...state.filter,
        show: !state.filter.show
      }
    }
  }


  if (action.type === 'USERS_GET_CARDS') {
    const cards = (
      state.users.cards.length > 0
        ? action.payload.cards.filter(({ id }) =>
            state.users.cards.map(({ id }) => id).includes(id)
          ).length !== 0
            ? state.users.cards.map(card => {
                const _card = action.payload.cards.find(({ id }) => id === card.id)

                if (!!_card) {
                  return action.payload.cards.filter(({ id }) => id === _card.id)[0]
                } else {
                  return card
                }
              })
            : [...state.users.cards, ...action.payload.cards]
        : action.payload.cards
    ).filter(
      ({ id }) => !state.users.hideIds.includes(id)
    )

    return {
      ...state,
      users: {
        ...state.users,
        searchHash: action.payload.searchHash,
        updTime: action.payload.updTime,
        nonCards: action.payload.nonCards,
        cards: action.payload.searchHash !== state.users.searchHash ? action.payload.cards : cards
      }
    }
  }

  if (action.type === 'USERS_KICK_HIDE_CARDS') {
    return {
      ...state,
      users: {
        ...state.users,
        cards: state.users.cards.filter(({ isHide }) => !isHide),
        hideIds: state.users.cards.filter(({ isHide }) => isHide).map(({ id }) => id)
      }
    }
  }

  if (action.type === 'USERS_SET_UPDATE_CARDS') {
    return {
      ...state,
      users: {
        ...state.users,
        isUpdate: action.payload
      }
    }
  }

  if (action.type === 'SUBSCRIBES_GET_CARDS') {
    const cards = (
      state.subscribes.cards.length > 0
        ? action.payload.cards.filter(({ id }) =>
            state.subscribes.cards.map(({ id }) => id).includes(id)
          ).length !== 0
            ? state.subscribes.cards.map(card => {
                const _card = action.payload.cards.find(({ id }) => id === card.id)

                if (!!_card) {
                  return action.payload.cards.filter(({ id }) => id === _card.id)[0]
                } else {
                  return card
                }
              })
            : [...state.subscribes.cards, ...action.payload.cards]
        : action.payload.cards
    ).filter(
      ({ id }) => !state.subscribes.hideIds.includes(id)
    )

    return {
      ...state,
      subscribes: {
        ...state.subscribes,
        searchHash: action.payload.searchHash,
        updTime: action.payload.updTime,
        nonCards: action.payload.nonCards,
        cards: action.payload.searchHash !== state.subscribes.searchHash ? action.payload.cards : cards
      }
    }
  }

  if (action.type === 'SUBSCRIBES_KICK_HIDE_CARDS') {
    return {
      ...state,
      subscribes: {
        ...state.subscribes,
        cards: state.subscribes.cards.filter(({ isHide }) => !isHide),
        hideIds: state.subscribes.cards.filter(({ isHide }) => isHide).map(({ id }) => id)
      }
    }
  }

  if (action.type === 'SUBSCRIBES_SET_UPDATE_CARDS') {
    return {
      ...state,
      subscribes: {
        ...state.subscribes,
        isUpdate: action.payload
      }
    }
  }

  if (action.type === 'FRIENDS_GET_CARDS') {
    const cards = (
      state.friends.cards.length > 0
        ? action.payload.cards.filter(({ id }) =>
            state.friends.cards.map(({ id }) => id).includes(id)
          ).length !== 0
            ? state.friends.cards.map(card => {
                const _card = action.payload.cards.find(({ id }) => id === card.id)

                if (!!_card) {
                  return action.payload.cards.filter(({ id }) => id === _card.id)[0]
                } else {
                  return card
                }
              })
            : [...state.friends.cards, ...action.payload.cards]
        : action.payload.cards
    ).filter(
      ({ id }) => !state.friends.hideIds.includes(id)
    )

    return {
      ...state,
      friends: {
        ...state.friends,
        searchHash: action.payload.searchHash,
        updTime: action.payload.updTime,
        nonCards: action.payload.nonCards,
        cards: action.payload.searchHash !== state.friends.searchHash ? action.payload.cards : cards
      }
    }
  }

  if (action.type === 'FRIENDS_KICK_HIDE_CARDS') {
    return {
      ...state,
      friends: {
        ...state.friends,
        cards: state.friends.cards.filter(({ isHide }) => !isHide),
        hideIds: state.friends.cards.filter(({ isHide }) => isHide).map(({ id }) => id)
      }
    }
  }

  if (action.type === 'FRIENDS_SET_UPDATE_CARDS') {
    return {
      ...state,
      friends: {
        ...state.friends,
        isUpdate: action.payload
      }
    }
  }

  return state
}

export default users
