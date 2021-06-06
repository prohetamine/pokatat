let authState = {
  token: null,
  login: {
    username: '',
    password: '',
    incorrect_login_or_password: false,
  },
  registration: {
    lang: 'ru',
    username: '',
    date: '',
    geo: {
      title: '',
      location: {
        latitude: 0,
        longitude: 0
      }
    },
    photo: false,
    section: false,
    phone: {
        number: '+',
        country: ''
    }
  }
}

//globalState = localStorage.globalState ? JSON.parse(localStorage.globalState) : globalState

function auth (state = authState, action) {
  if (action.type === 'SET_AUTH_TOKEN') {
    return {
      ...state,
      token: action.payload
    }
  }

  if (action.type === 'INCORRECT_LOGIN_OR_PASSWORD') {
    return {
      ...state,
      incorrect_login_or_password: action.payload
    }
  }

  if (action.type === 'LOGIN_USERNAME_VALUE') {
    return {
      ...state,
      login: {
        ...state.login,
        username: action.payload
      }
    }
  }

  if (action.type === 'LOGIN_PASSWORD_VALUE') {
    return {
      ...state,
      login: {
        ...state.login,
        password: action.payload
      }
    }
  }

  if (action.type === 'REGISTRATION_LANG_VALUE') {
    return {
      ...state,
      registration: {
        ...state.registration,
        lang: action.payload
      }
    }
  }

  if (action.type === 'REGISTRATION_USERNAME_VALUE') {
    return {
      ...state,
      registration: {
        ...state.registration,
        username: action.payload
      }
    }
  }

  if (action.type === 'REGISTRATION_DATE_VALUE') {
    return {
      ...state,
      registration: {
        ...state.registration,
        date: action.payload
      }
    }
  }

  if (action.type === 'REGISTRATION_GEO_VALUE') {
    return {
      ...state,
      registration: {
        ...state.registration,
        geo: action.payload
      }
    }
  }

  if (action.type === 'REGISTRATION_PHOTO_VALUE') {
    return {
      ...state,
      registration: {
        ...state.registration,
        photo: action.payload
      }
    }
  }

  if (action.type === 'REGISTRATION_SECTION_VALUE') {
    return {
      ...state,
      registration: {
        ...state.registration,
        section: action.payload
      }
    }
  }

  if (action.type === 'REGISTRATION_PHONE_VALUE') {
    return {
      ...state,
      registration: {
        ...state.registration,
        phone: {
          number: action.payload.number,
          country: action.payload.country
        }
      }
    }
  }

  return state
}

export default auth
