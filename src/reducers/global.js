let globalState = {
  filter: {
      geo: {
        isError: true,
        isCity: false,
        latitude: null,
        longitude: null,
        city: null,
        contry: null,
        lang_region: null
      }
  }
}

//globalState = localStorage.globalState ? JSON.parse(localStorage.globalState) : globalState

function global (state = globalState, action) {
  if (action.type === 'FILTER_LOCATION') {
    return {
      ...state,
      filter: {
        ...state.filter,
        geo: action.payload
      }
    }
  }

  if (action.type === 'FILTER_LOCATION_ERROR') {
    return {
      ...state,
      filter: {
        ...state.filter,
        geo: {
          ...state.filter.geo,
          isError: true
        }
      }
    }
  }

  return state
}

export default global
