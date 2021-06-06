import generateFakeRequest from './../other/generateFakeRequest'

const isInvite = true
    , isRequestTo = true

let requestsState = {
  search: {
    value: '',
    mobile_show: false
  },
  filter: {
    show: false,
    tagIds: [],
    location: {
      radius: 13,
      contry: null,
      city: null,
      geo: {
        latitude: null,
        longitude: null
      }
    }
  },

  historys: [
    ...Array.from({length: 3}, generateFakeRequest)
  ],

  actives: [
    ...Array.from({length: 1}, () => ({
      isInvite,
      ...generateFakeRequest()
    })),
    ...Array.from({length: 3}, () => ({
      ...generateFakeRequest()
    }))
  ],

  requests: [
    {
      id: 1330,
      isRequestTo,
      reqname: "Хижина 11",
      usercount: 2,
      pics: ["usr8.png", "usr7.jpg"],
      city: 'Алабама',
      description: 'Еще сравнительно недавно эта хижина в глубине леса жила полной жизнью - и казалось, что это надолго',
      tags: [
          { id: 1 }
        , { id: 18, label: 'в лесу' }
        , { id: 999, label: 'спешал', value: 'стуф' }
      ]
    }, {
      id: 1000,
      reqname: "Та Самая Площадь (длинное название)",
      usercount: 9,
      pics: ["usr1.jpg", "usr2.jpg", "usr3.png", "usr5.jpg"],
      city: 'Москва',
      description: 'Тут как-то так, что-то vans that carry Internet-ordered deliveries: if it is a good idea then why not?',
      tags: [
          { id: 9 }
        , { id: 10, value: '12:00-24:00' }
        , { id: 18, label: 'центр' }
        , { id: 999, label: 'спешал', value: 'стуф' }
      ]
    }, {
      id: 1001,
      reqname: "Титаник",
      usercount: 1316,
      pics: ["usr2.jpg", "usr4.png", "usr3.png"],
      city: 'Нью-Йорк',
      description: 'What about nested conditional renderings? Yes, it is possible. For instance,',
      tags: [
          { id: 5 }
        , { id: 18, label: 'бешбалык' }
        , { id: 999, label: 'очень', value: '123' }
      ]
    }, {
      id: 1002,
      reqname: "Сходка 1",
      usercount: 3,
      pics: ["usr4.png", "usr2.jpg", "usr1.jpg"],
      city: 'Саратов',
      description: 'However I would recommend to keep the nested conditional renderings to a minimum',
      tags: [
          { id: 10, value: '9:00' }
        , { id: 18, label: 'эверест' }
        , { id: 999, label: 'число', value: 'пи' }
        , { id: 999, label: 'число', value: 'не пи' }
        , { id: 999, label: 'число', value: 'пипипи' }
        , { id: 999, label: 'вход', value: '100$' }
      ]
    }
  ]

}

// requestsState = localStorage.requestsState ? JSON.parse(localStorage.requestsState) : requestsState

function requests (state = requestsState, action) {
  if (action.type === 'REQUESTS_RADIUS_LOCATION') {
    return {
      ...state,
      filter: {
        ...state.filter,
        radius: action.payload
      }
    }
  }

  if (action.type === 'FILTERS_LOCATION') {
    return {
      ...state,
      filter: {
        ...state.filter,
        location: action.payload
      }
    }
  }

  if (action.type === 'REQUESTS_ACTIVATED_FILTER_TAG') {
    return {
      ...state,
      filter: {
        ...state.filter,
        tagIds: [action.payload, ...state.filter.tagIds]
      }
    }
  }

  if (action.type === 'REQUESTS_DISABLED_FILTER_TAG') {
    return {
      ...state,
      filter: {
        ...state.filter,
        tagIds: state.filter.tagIds.filter(tagId => tagId !== action.payload)
      }
    }
  }

  if (action.type === 'REQUESTS_SEARCH_VALUE') {
    return {
      ...state,
      search: {
        ...state.search,
        value: action.payload
      }
    }
  }

  if (action.type === 'REQUESTS_SEARCH_VALUE_CLEAR') {
    return {
      ...state,
      search: {
        ...state.search,
        value: ''
      }
    }
  }

  if (action.type === 'REQUESTS_SEARCH_SHOW') {
    return {
      ...state,
      search: {
        ...state.search,
        show: !state.search.show
      }
    }
  }

  if (action.type === 'REQUESTS_FILTER_SHOW') {
    return {
      ...state,
      filter: {
        ...state.filter,
        show: !state.filter.show
      }
    }
  }
  return state
}

export default requests
